import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs, { Dayjs } from 'dayjs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../ThemeContext';

import stylesLight from './Styles/Calendar.styles';
import stylesDark from './Styles/Calendar.styles2';



interface Activity {
  id: number;
  activity_name: string;
  start_time: string;
  duration_minutes: number;
  date: string;
  description?: string;
}

import { API_BASE_URL } from '../config';

export default function Calendar({ userId }: { userId: number }) {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? stylesDark : stylesLight;


  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [step, setStep] = useState<'selectDate' | 'inputActivity'>('selectDate');
  const [activityName, setActivityName] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [activitiesForDate, setActivitiesForDate] = useState<Activity[]>([]);
  const [allActivitiesForMonth, setAllActivitiesForMonth] = useState<Activity[]>([]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    refreshMonthlyActivities();
  }, [userId]);

  const refreshMonthlyActivities = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/activities/month?userId=${userId}`);
      const data = await response.json();

      const sortedActivities = data.activities
        ? data.activities.sort((a: Activity, b: Activity) => {
            const dateA = dayjs(a.date).isSame(dayjs(b.date), 'day')
              ? dayjs(a.start_time).isBefore(dayjs(b.start_time))
                ? -1
                : 1
              : dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1;
            return dateA;
          })
        : [];

      setAllActivitiesForMonth(sortedActivities);
    } catch (error) {
      console.error('Error refreshing monthly activities:', error);
    }
  };

  const fetchActivitiesForDate = async (date: Dayjs) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/activities/today?date=${date.format('YYYY-MM-DD')}&userId=${userId}`
      );
      const data = await response.json();
      setActivitiesForDate(data.activities || []);
    } catch (error) {
      console.error('Error fetching activities for the date:', error);
    }
  };

  const handleDateSelect = async (_event: any, date?: Date) => {
    if (date) {
      const selectedDay = dayjs(date);
      setSelectedDate(selectedDay);
      setStep('inputActivity');
      await fetchActivitiesForDate(selectedDay);
    }
  };

  const handleStartTimeSelect = (_event: any, date?: Date) => {
    if (date) {
      setStartTime(dayjs(date));
    }
  };

  const handleSubmitActivity = async () => {
    if (activityName && startTime && durationMinutes && selectedDate) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/activities`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            date: selectedDate.format('YYYY-MM-DD'),
            activityName: activityName.trim(),
            startTime: startTime.format('HH:mm'),
            durationMinutes: Number(durationMinutes),
          }),
        });

        if (response.ok) {
          Alert.alert(t('calendar.activitySaved'));
          await fetchActivitiesForDate(selectedDate);
          await refreshMonthlyActivities(); // Refresh list after adding
          setActivityName('');
          setStartTime(null);
          setDurationMinutes('');
          setStep('selectDate');
          setSelectedDate(null);
        } else {
          Alert.alert(t('calendar.activitySaveFailed'));
        }
      } catch (error) {
        console.error('Error saving:', error);
        Alert.alert(t('calendar.errorOccurred'));
      }
    } else {
      Alert.alert(t('calendar.fillAllFields'));
    }
  };

  const handleDeleteActivity = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/activities/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert(t('calendar.activityDeleted'));
        if (selectedDate) await fetchActivitiesForDate(selectedDate);
        await refreshMonthlyActivities(); // Refresh after delete
      } else {
        console.error(t('calendar.failedToDelete'));
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const handleChangeDate = () => {
    setStep('selectDate');
    setActivitiesForDate([]);
  };

  const openActivityModal = (activity: Activity) => {
    setSelectedActivity(activity);
    setNewDescription(activity.description || '');
    setIsModalVisible(true);
  };

  const saveDescription = async () => {
    if (selectedActivity && newDescription !== selectedActivity.description) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/activities/${selectedActivity.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ description: newDescription }),
        });

        if (response.ok) {
          Alert.alert(t('calendar.descriptionUpdated'));
          setIsModalVisible(false);
          const dateToRefresh = selectedActivity?.date
            ? dayjs(selectedActivity.date)
            : selectedDate || dayjs();

          await fetchActivitiesForDate(dateToRefresh);
          await refreshMonthlyActivities();

        } else {
          Alert.alert(t('calendar.failedToUpdateDescription'));
        }
      } catch (error) {
        console.error('Error updating description:', error);
        Alert.alert(t('calendar.errorOccurred'));
      }
    } else {
      setIsModalVisible(false);
    }
  };

  // Get today's date for comparison
  const today = dayjs().startOf('day');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {step === 'selectDate' && (
        <>
          <Text style={styles.header}>{t('calendar.planYourSchedule')}</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{selectedDate ? selectedDate.format('MMMM D, YYYY') : t('calendar.tapToSelectDate')}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate ? selectedDate.toDate() : new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) handleDateSelect(event, date);
              }}
            />
          )}

          {/* Show all activities for the month before selecting a date */}
<View style={styles.activitiesContainer}>
  <Text style={styles.monthTitle}>{t('calendar.currentMonthActivities')}</Text>
  {allActivitiesForMonth.map((activity) => {
    const activityDate = dayjs(activity.date);
    const isPastActivity = activityDate.isBefore(today, 'day'); // Check if the activity is in the past

    return (
      <View
        key={activity.id}
        style={[styles.activityItem, isPastActivity && styles.pastActivityItem]} // Apply a grey background for past activities
      >
        <View>
          <Text style={styles.activityName}>{activity.activity_name}</Text>
          <Text style={styles.activityTime}>
            🗓️ {activityDate.format('DD/MM/YYYY')} | 🕒 {activity.start_time}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteActivity(activity.id)}
        >
          <Icon name="delete" size={20} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => openActivityModal(activity)} // Open modal on activity click
        >
          <Text style={styles.viewButtonText}>{t('calendar.view')}</Text>
        </TouchableOpacity>
      </View>
    );
  })}
</View>
</>
)}

{/* Activity Description Modal */}
<Modal
  visible={isModalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setIsModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      {selectedActivity && (
        <>
          <Text style={styles.modalHeader}>{t('calendar.activityDetails')}</Text>
          <Text style={styles.activityName}>{selectedActivity.activity_name}</Text>
          <Text style={styles.activityTime}>
            🗓️ {dayjs(selectedActivity.date).format('DD/MM/YYYY')} | 🕒 {selectedActivity.start_time}
          </Text>
          <TextInput
            style={[styles.input, styles.multilineInput, { marginTop: 25 }]}
            placeholder={t('calendar.addDescription')}
            value={newDescription}
            onChangeText={setNewDescription}
            multiline
            numberOfLines={6}
            maxLength={1000} // Optional: limit text length
          />
          <View style={styles.modalButtonGroup}>
            <TouchableOpacity
              style={[styles.cancelButton, { flex: 1, marginRight: 10 }]}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>{t('calendar.cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveButton, { flex: 1, marginLeft: 10 }]}
              onPress={saveDescription}
            >
              <Text style={styles.saveButtonText}>{t('calendar.save')}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  </View>
</Modal>

{step === 'inputActivity' && (
  <>
    <View style={styles.formContainer}>
      <Text style={styles.header}>{t('calendar.addActivity')}</Text>
      <Text style={styles.dateText}>
        {t('calendar.date')}: {selectedDate?.format('MMMM D, YYYY')}
      </Text>

      <TextInput
        style={styles.input}
        placeholder={t('calendar.activityName')}
        value={activityName}
        onChangeText={setActivityName}
      />

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowTimePicker(true)}
      >
        <Text>{startTime ? startTime.format('HH:mm') : t('calendar.tapToSelectTime')}</Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={startTime ? startTime.toDate() : new Date()}
          mode="time"
          display="default"
          onChange={(event, date) => {
            setShowTimePicker(false);
            if (date) handleStartTimeSelect(event, date);
          }}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder={t('calendar.durationMinutes')}
        keyboardType="numeric"
        value={durationMinutes}
        onChangeText={setDurationMinutes}
      />

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmitActivity}>
          <Text style={styles.saveButtonText}>{t('calendar.saveActivity')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.changeDateButton} onPress={handleChangeDate}>
          <Text style={styles.changeDateButtonText}>{t('calendar.changeDate')}</Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* Show activities for the selected date */}
    <View style={styles.activitiesContainer}>
      {activitiesForDate.map((activity) => (
        <View key={activity.id} style={styles.activityItem}>
          <View>
            <Text style={styles.activityName}>{activity.activity_name}</Text>
            <Text style={styles.activityTime}>
              🕒 {activity.start_time} | ⏱️ {activity.duration_minutes} {t('calendar.minutes')}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteActivity(activity.id)}
          >
            <Text style={styles.deleteButtonText}>{t('calendar.delete')}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  </>
)}
</ScrollView>
);
}


