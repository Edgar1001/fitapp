// src/types/react-native-location.d.ts
import Location from 'react-native-location';

declare module 'react-native-location' {
    // Define the LocationObject interface that represents the structure of a location object
    export interface LocationObject {
      latitude: number;
      longitude: number;
      speed: number;
      heading: number;
      altitude: number;
      accuracy: number;
      timestamp: number;
    }
  
    // Define the Location interface that includes the methods provided by react-native-location
    export interface Location {
      configure(options: { distanceFilter: number }): void;
      requestPermission(options: { ios: string; android: { detail: string } }): Promise<boolean>;
      getLatestLocation(options: { timeout: number }): Promise<LocationObject>;
      subscribeToLocationUpdates(callback: (locations: LocationObject[]) => void): () => void;
    }
  
    const Location: Location;
    export default Location;
  }
  