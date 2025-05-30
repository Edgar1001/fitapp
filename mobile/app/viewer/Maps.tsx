import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, Linking } from 'react-native';
import * as Location from 'expo-location';
import { WebView } from 'react-native-webview';
import { API_BASE_URL } from '../config';
import * as TaskManager from 'expo-task-manager';
import * as SecureStore from 'expo-secure-store';
import { LOCATION_TASK_NAME } from '../backgroundLocationTask'; // adjust path



const Maps = ({ userId }: { userId: number }) => {
  const [location, setLocation] = useState<any | null>(null);
  const [locationsHistory, setLocationsHistory] = useState<any[]>([]);
  const [distanceTraveled, setDistanceTraveled] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [permissionInfo, setPermissionInfo] = useState('');
  const webviewRef = useRef<WebView | null>(null);
  const lastLocationRef = useRef<any | null>(null);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const saveLocationToBackend = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/locations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, latitude, longitude }),
      });
      const result = await response.json();
      if (!response.ok) {
        console.error('Failed to save location:', result);
      }
    } catch (error) {
      console.error('Error saving location:', error);
      Alert.alert('Error', 'Failed to save location');
    }
  };

  useEffect(() => {
    const fetchLocationHistory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/locations/${userId}`);
        const result = await response.json();
        if (result.locations) {
          setLocationsHistory(result.locations);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
        Alert.alert('Error', 'Failed to fetch location history');
      }
    };

    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Required',
            'We need location access to track your position.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open Settings', onPress: () => Linking.openSettings() },
            ]
          );
          return;
        }

        const { coords } = await Location.getCurrentPositionAsync({});
        console.log('Location obtained:', coords);
        setLocation({ latitude: coords.latitude, longitude: coords.longitude });
        await saveLocationToBackend(coords.latitude, coords.longitude);
      } catch (error) {
        console.error('Error getting location:', error);
        Alert.alert('Error', 'Failed to get location');
      }
    };

    fetchLocationHistory();
    getLocation();
  }, []);

  useEffect(() => {
    const checkPermissions = async () => {
      const fg = await Location.getForegroundPermissionsAsync();
      const bg = await Location.getBackgroundPermissionsAsync();
      setPermissionInfo(`Foreground: ${fg.status}, Background: ${bg.status}`);
    };
    checkPermissions();
  }, []);

  const sendLocationToWebView = useCallback(() => {
    if (webviewRef.current && location) {
      webviewRef.current.postMessage(
        JSON.stringify({
          latitude: location.latitude,
          longitude: location.longitude,
          path: locationsHistory,
          distance: distanceTraveled,
        })
      );
    }
  }, [location, locationsHistory, distanceTraveled]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (location) {
        const { coords } = await Location.getCurrentPositionAsync({});
        const newLocation = { latitude: coords.latitude, longitude: coords.longitude };

        if (
          !lastLocationRef.current ||
          calculateDistance(
            lastLocationRef.current.latitude,
            lastLocationRef.current.longitude,
            newLocation.latitude,
            newLocation.longitude
          ) > 0.01
        ) {
          setLocation(newLocation);

          if (locationsHistory.length > 0) {
            const lastLocation = locationsHistory[locationsHistory.length - 1];
            const distance = calculateDistance(lastLocation.latitude, lastLocation.longitude, newLocation.latitude, newLocation.longitude);
            setDistanceTraveled((prev) => prev + distance);
          }

          await saveLocationToBackend(newLocation.latitude, newLocation.longitude);
          setLocationsHistory((prev) => [...prev, newLocation]);
          sendLocationToWebView();
          lastLocationRef.current = newLocation;
        }
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [location, locationsHistory, distanceTraveled, sendLocationToWebView]);

  useEffect(() => {
    const startBackgroundUpdate = async () => {
      const { status } = await Location.requestBackgroundPermissionsAsync();
      console.log('🛂 Background location permission status:', status);

      if (status !== 'granted') {
        Alert.alert(
          'Background Permission Required',
          'Enable background location in settings to allow tracking while the app is closed.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return;
      }

      const isTaskRunning = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
      console.log('🤖 Is background task running?', isTaskRunning);

      if (!isTaskRunning) {
        console.log('🚀 Starting background task now...');
        try {
          await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.High,
            timeInterval: 60000,
            distanceInterval: 50,
            showsBackgroundLocationIndicator: true,
            foregroundService: {
              notificationTitle: 'Tracking Location',
              notificationBody: 'Your location is being tracked in the background',
            },
          });
        } catch (e) {
          console.error('❌ Failed to start background location task:', e);
          return;
        }
      }

      const isNowRunning = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
      console.log('✅ Confirmed background task running:', isNowRunning);
      setIsTracking(isNowRunning);
    };

    startBackgroundUpdate();
  }, []);

  if (!location) {
    return (
      <View style={styles.centered}>
        <Text>Loading your location...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>
          Your Km/day are: {distanceTraveled.toFixed(2)} km
        </Text>
        <Text style={styles.debugText}>Tracking task: {isTracking ? 'ON' : 'OFF'}</Text>
        <Text style={styles.debugText}>{permissionInfo}</Text>
      </View>

      <WebView
        originWhitelist={['*']}
        ref={webviewRef}
        source={{ html: `<!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8" />
              <title>Leaflet Map</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
              <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
              <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
              <style>
                #map { height: 100%; width: 100%; }
                body { margin: 0; padding: 0; }
                html, body { height: 100%; }
              </style>
            </head>
            <body>
              <div id="map"></div>
              <script>
                const initialLatitude = ${location.latitude};
                const initialLongitude = ${location.longitude};
                const map = L.map('map').setView([initialLatitude, initialLongitude], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  maxZoom: 19,
                  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);

                let blueDotMarker = L.circle([initialLatitude, initialLongitude], {
                  color: 'blue', 
                  fillOpacity: 0.5, 
                  radius: 10
                }).addTo(map);

                let pathCoordinates = ${JSON.stringify(locationsHistory)}.map(loc => [loc.latitude, loc.longitude]);
                const polyline = L.polyline(pathCoordinates, { color: 'red' }).addTo(map);

                window.addEventListener('message', (event) => {
                  const data = JSON.parse(event.data);
                  const { latitude, longitude, path } = data;
                  blueDotMarker.setLatLng([latitude, longitude]);
                  pathCoordinates.push([latitude, longitude]);
                  polyline.setLatLngs(pathCoordinates);
                });
              </script>
            </body>
          </html>` }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    backgroundColor: 'pink',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
  },
  topBarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  debugText: {
    fontSize: 12,
    color: 'white',
    marginTop: 2,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Maps;
