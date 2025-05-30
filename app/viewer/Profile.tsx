import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Switch, Image, ScrollView, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import dayjs, { Dayjs } from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { API_BASE_URL } from '../config';
import * as Location from 'expo-location';
import { Checkbox } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../ThemeContext';

import stylesLight from './Styles/Profile.styles';
import stylesDark from './Styles/Profile.styles2';



// Normalization helper for days (from day names to language-independent keys)
const normalizeDayKey = (day: string): string | null => {
  const map: Record<string, string> = {
    lunes: 'mon', monday: 'mon',
    martes: 'tue', tuesday: 'tue',
    miércoles: 'wed', wednesday: 'wed',
    jueves: 'thu', thursday: 'thu',
    viernes: 'fri', friday: 'fri',
    sábado: 'sat', saturday: 'sat',
    domingo: 'sun', sunday: 'sun'
  };

  return map[day.toLowerCase()] || null;
};

// Normalize the selected days to language-independent keys
const normalizePreferredDays = (days: string[]): string[] => {
  return days.map(day => normalizeDayKey(day)).filter(Boolean) as string[];
};

export default function Profile({
  userId,
  onNavigateHome
}: {
  userId: number;
  onNavigateHome: () => void;
}) {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? stylesDark : stylesLight;


  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState<Dayjs | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [fitnessGoals, setFitnessGoals] = useState<string[]>([]);
  const [preferredDays, setPreferredDays] = useState<string[]>([]);
  const [preferredActivity, setPreferredActivity] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [location, setLocation] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`${API_BASE_URL}/api/profile/${userId}`);
        const { profile } = await res.json();
        if (profile) {
          setName(profile.name || '');
          setGender(profile.gender || '');
          setBirthday(profile.birthday ? dayjs(profile.birthday) : null);
          setWeight(profile.weight ? String(profile.weight) : '');
          setHeight(profile.height ? String(profile.height) : '');
          setFitnessGoals(profile.fitness_goals || []);
          setPreferredActivity(profile.preferred_activity || '');
          setNotifications(profile.notifications || false);
          setLocation(profile.location || '');
          setProfilePhoto(profile.profile_photo || '');
  
          // 🧠 Map normalized keys to localized day strings
          const normalizedDays = profile.preferred_days || [];
          const workoutDays = t('profile.workoutDaysList', { returnObjects: true }) as string[];
  
          const localizedMap = workoutDays.reduce((acc, label) => {
            const key = normalizeDayKey(label);
            if (key) acc[key] = label;
            return acc;
          }, {} as Record<string, string>);
  
         const localizedPreferredDays = normalizedDays.map((key: string) => localizedMap[key]).filter(Boolean);

          setPreferredDays(localizedPreferredDays);
        }
      } catch (e) {
        console.error('Error loading profile:', e);
      }
    };
  
    fetchProfile();
  }, [userId]);
  

  const handleSaveProfile = async () => {
    // Normalize the preferredDays before sending to backend
    const normalizedPreferredDays = normalizePreferredDays(preferredDays);
    console.log('Normalized preferredDays:', normalizedPreferredDays); // Check that normalized days are correct

    if (!/^data:image\/(png|jpeg|jpg);base64,/.test(profilePhoto)) {
      Alert.alert(t('profile.invalidPhotoTitle'), t('profile.invalidPhotoMsg'));
      return;
    }

    const payload = {
      userId,
      name,
      gender,
      birthday: birthday?.format('YYYY-MM-DD'),
      weight: weight ? Number(weight) : null,
      height: height ? Number(height) : null,
      fitnessGoals,
      preferredDays: normalizedPreferredDays, // Use normalized preferredDays
      preferredActivity,
      notifications,
      location,
      profilePhoto,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        Alert.alert(t('profile.successTitle'), t('profile.savedMsg'));
        onNavigateHome();
      } else {
        const updateRes = await fetch(`${API_BASE_URL}/api/profile/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (updateRes.ok) {
          Alert.alert(t('profile.updateTitle'), t('profile.updatedMsg'));
          onNavigateHome();
        } else {
          Alert.alert(t('profile.errorTitle'), t('profile.saveFailMsg'));
        }
      }
    } catch (err) {
      console.error(err);
      Alert.alert(t('profile.errorTitle'), t('profile.saveError'));
    }
  };

  const handleDetectLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(t('profile.permissionDeniedTitle'), t('profile.permissionDeniedMsg'));
        return;
      }

      const locationResult = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = locationResult.coords;

      setLocation(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
    } catch (err) {
      console.error('Location error:', err);
      Alert.alert(t('profile.errorTitle'), t('profile.locationError'));
    }
  };

  const handlePhotoChange = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('profile.permissionTitle'), t('profile.permissionPhotoMsg'));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 300 } }],
        {
          compress: 0.7,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      const base64 = await FileSystem.readAsStringAsync(manipResult.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const base64DataUrl = `data:image/jpeg;base64,${base64}`;

      setProfilePhoto(base64DataUrl);
    }
  };

  const fitnessGoalKeys = ['lose_weight', 'gain_muscle', 'improve_endurance', 'flexibility', 'stay_healthy'];
  const workoutDays = t('profile.workoutDaysList', { returnObjects: true }) as string[];

  const toggleSelection = (item: string, list: string[], setList: (val: string[]) => void) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingTop: 10 }]}>
      <Text style={styles.title}>{t('profile.title')}</Text>

      <View style={styles.formContainer}>
        <Image source={{ uri: profilePhoto }} style={styles.profilePhoto} />
        <TouchableOpacity onPress={handlePhotoChange} style={styles.photoButton}>
          <Text style={styles.buttonText}>{t('profile.changePhoto')}</Text>
        </TouchableOpacity>

        <TextInput placeholder={t('profile.name')} value={name} onChangeText={setName} style={styles.input} />

        <Text style={styles.label}>{t('profile.gender')}</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
            dropdownIconColor="#4c1d95"
          >
            <Picker.Item label={t('profile.selectGender')} value="" color="#4c1d95" />
            <Picker.Item label={t('profile.male')} value="Male" color="#4c1d95" />
            <Picker.Item label={t('profile.female')} value="Female" color="#4c1d95" />
            <Picker.Item label={t('profile.other')} value="Other" color="#4c1d95" />
          </Picker>
        </View>

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            placeholder={t('profile.birthday')}
            value={birthday?.format('YYYY-MM-DD') || ''}
            editable={false}
            style={styles.input}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={birthday?.toDate() || new Date()}
            mode="date"
            display="default"
            onChange={(e, date) => {
              setShowDatePicker(false);
              if (date) setBirthday(dayjs(date));
            }}
          />
        )}

        <TextInput placeholder={t('profile.weight')} value={weight} onChangeText={setWeight} style={styles.input} keyboardType="numeric" />
        <TextInput placeholder={t('profile.height')} value={height} onChangeText={setHeight} style={styles.input} keyboardType="numeric" />

        <Text style={styles.label}>{t('profile.fitnessGoals')}</Text>
        {fitnessGoalKeys.map((key) => (
          <View key={key} style={styles.checkboxContainer}>
            <Checkbox
              status={fitnessGoals.includes(key) ? 'checked' : 'unchecked'}
              onPress={() => toggleSelection(key, fitnessGoals, setFitnessGoals)}
            />
            <Text style={styles.checkboxText}>{t(`fitnessGoals.${key}.title`)}</Text>
          </View>
        ))}


        <Text style={styles.label}>{t('profile.workoutDays')}</Text>
        {workoutDays.map((day) => (
          <View key={day} style={styles.checkboxContainer}>
            <Checkbox
              status={preferredDays.includes(day) ? 'checked' : 'unchecked'}
              onPress={() => toggleSelection(day, preferredDays, setPreferredDays)}
            />
            <Text style={styles.checkboxText}>{day}</Text>
          </View>
        ))}

        <Text style={styles.label}>{t('profile.preferredActivity')}</Text>
        <View style={styles.pickerContainer}>
        <Picker
          selectedValue={preferredActivity}
          onValueChange={(itemValue) => setPreferredActivity(itemValue)}
          style={styles.picker}
          dropdownIconColor="#4c1d95"
        >
          <Picker.Item label={t('profile.selectActivity')} value="" />
          <Picker.Item label={t('profile.activities.spinning')} value="Spinning" />
          <Picker.Item label={t('profile.activities.running')} value="Running" />
          <Picker.Item label={t('profile.activities.gym')} value="Gym" />
          <Picker.Item label={t('profile.activities.walking')} value="Walking" />
          <Picker.Item label={t('profile.activities.yoga')} value="Yoga" />
          <Picker.Item label={t('profile.activities.basketball')} value="Basketball" />
          <Picker.Item label={t('profile.activities.tennis')} value="Tennis" />
          <Picker.Item label={t('profile.activities.swimming')} value="Swimming" />
        </Picker>

        </View>

        <TouchableOpacity onPress={handleDetectLocation} style={styles.photoButton}>
          <Text style={styles.buttonText}>{t('profile.detectLocation')}</Text>
        </TouchableOpacity>
        <TextInput placeholder={t('profile.location')} value={location} editable={false} style={styles.input} />

        <View style={styles.switchContainer}>
          <Text>{t('profile.notifications')}</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>

        <TouchableOpacity onPress={handleSaveProfile} style={styles.saveButton}>
          <Text style={styles.buttonText}>{t('profile.saveProfile')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
