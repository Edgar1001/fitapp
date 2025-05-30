import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { API_BASE_URL } from '../config';
import i18n from '../i18n';
import { useTheme } from '../ThemeContext';

import stylesLight, {
  mainGradientColors as lightMainGradient,
  getGradientColors as lightGetGradientColors,
  getActivityBackground as lightGetActivityBackground,
} from './Styles/Home.styles';

import stylesDark, {
  mainGradientColors as darkMainGradient,
  getGradientColors as darkGetGradientColors,
  getActivityBackground as darkGetActivityBackground,
} from './Styles/Home.styles2';

import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);


interface Activity {
  id: number;
  date: string;
  activity_name: string;
  start_time: string;
  duration_minutes: number;
  status: 'done' | 'ignored' | 'forgotten';
}

interface WeeklyProgress {
  week: number;
  progress: number;
}

interface HomeProps {
  userId: number;
  onNavigateGoals: () => void;
  onNavigateStats: () => void;
  onNavigateWeekDetail: () => void;
}

export function Home({ userId, onNavigateGoals, onNavigateStats, onNavigateWeekDetail }: HomeProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [userName, setUserName] = useState<string>('User');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgress[]>([]);
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const styles = isDarkMode ? stylesDark : stylesLight;
  const mainGradientColors = isDarkMode ? darkMainGradient : lightMainGradient;
  const getGradientColors = isDarkMode ? darkGetGradientColors : lightGetGradientColors;
  const getActivityBackground = isDarkMode ? darkGetActivityBackground : lightGetActivityBackground;
  const [currentWeekActivities, setCurrentWeekActivities] = useState<Activity[]>([]);
  const [previousWeekActivities, setPreviousWeekActivities] = useState<Activity[]>([]);

  const fetchActivities = async (date: Dayjs) => {
    try {
      const formattedDate = date.format('YYYY-MM-DD');
      const response = await fetch(`${API_BASE_URL}/api/activities/today?date=${formattedDate}&userId=${userId}`);
      const data = await response.json();
      setActivities(data.activities);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/profile/${userId}`);
      const data = await response.json();
      setUserName(data.profile?.name || 'User');
      setProfilePhoto(data.profile?.profile_photo || null);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchWeeklyProgress = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/activities/weekly?userId=${userId}`);
      const data = await response.json();
      const rawActivities = data.activities as Activity[];
  
     
  
      const grouped = rawActivities.reduce((acc: Record<number, Activity[]>, activity: Activity) => {
        const week = dayjs(activity.date).isoWeek();
        acc[week] = acc[week] || [];
        acc[week].push(activity);
        return acc;
      }, {});
  
      const currentIsoWeek = dayjs().isoWeek();
      const previousIsoWeek = currentIsoWeek - 1;
      setCurrentWeekActivities(grouped[currentIsoWeek] || []);
      setPreviousWeekActivities(grouped[previousIsoWeek]?.filter(a => a.status === 'done') || []);
  
      const progressData: WeeklyProgress[] = Object.entries(grouped).map(([weekStr, activities]) => {
        const week = parseInt(weekStr, 10);
        const done = activities.filter(a => a.status === 'done').length;
        const total = activities.length;
        const progress = total > 0 ? Math.round((done / total) * 100) : 0;
  
        return { week, progress };
      });
  
      setWeeklyProgress(progressData.sort((a, b) => a.week - b.week));
    } catch (error) {
      console.error("Error fetching weekly progress:", error);
    }
  };
  

  const updateActivityStatus = async (id: number, status: 'done' | 'ignored' | 'forgotten') => {
    try {
      await fetch(`${API_BASE_URL}/api/activities/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      await Promise.all([
        fetchActivities(selectedDate),
        fetchWeeklyProgress()  // 👈 this will refresh the bar
      ]);
      
    } catch (error) {
      console.error('Error updating activity status:', error);
    }
  };

  const markActivityAsDone = (id: number, status: Activity['status']) => {
    updateActivityStatus(id, status === 'done' ? 'forgotten' : 'done');
  };

  const toggleIgnoreActivity = (id: number, status: Activity['status']) => {
    updateActivityStatus(id, status === 'ignored' ? 'forgotten' : 'ignored');
  };

  useEffect(() => { fetchActivities(selectedDate); }, [selectedDate]);
  useEffect(() => { fetchUserProfile(); fetchWeeklyProgress(); }, []);

  const dailyProgress = activities.length > 0
    ? Math.round((activities.filter(a => a.status === 'done').length / activities.length) * 100)
    : 0;

  const pickRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const localizedMotivations = useMemo(() => ({
    zero: t('motivations.zero', { returnObjects: true }) as string[],
    upto25: t('motivations.upto25', { returnObjects: true }) as string[],
    upto50Excl: t('motivations.upto50Excl', { returnObjects: true }) as string[],
    exact50: t('motivations.exact50', { returnObjects: true }) as string[],
    upto75: t('motivations.upto75', { returnObjects: true }) as string[],
    upto100Excl: t('motivations.upto100Excl', { returnObjects: true }) as string[],
    complete: t('motivations.complete', { returnObjects: true }) as string[],
  }), [i18n.language]);

  const welcomeMessage = useMemo(() => {
    try {
      if (activities.length === 0)
        return t('home.noSessions', { name: userName });
      if (dailyProgress === 0) return pickRandom(localizedMotivations.zero).replace('{name}', userName);
      if (dailyProgress <= 25) return pickRandom(localizedMotivations.upto25).replace('{name}', userName);
      if (dailyProgress < 50) return pickRandom(localizedMotivations.upto50Excl).replace('{name}', userName);
      if (dailyProgress === 50) return pickRandom(localizedMotivations.exact50).replace('{name}', userName);
      if (dailyProgress <= 75) return pickRandom(localizedMotivations.upto75).replace('{name}', userName);
      if (dailyProgress < 100) return pickRandom(localizedMotivations.upto100Excl).replace('{name}', userName);
      return pickRandom(localizedMotivations.complete).replace('{name}', userName);
    } catch {
      return `Great effort, ${userName}! Keep it up!`;
    }
  }, [activities, dailyProgress, userName, localizedMotivations]);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.3, duration: 500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const getWeekLabel = (week: number) => {
    const currentWeek = dayjs().week();
    if (week === currentWeek) return 'Current Week';
    if (week === currentWeek - 1) return 'Previous Week';
    return `Week ${week}`;
  };

  return (
    <LinearGradient colors={mainGradientColors} style={styles.page} key={i18n.language}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <LinearGradient colors={getGradientColors(dailyProgress)} style={styles.welcomeContainer}>
          <View style={styles.avatarContainer}>
            {profilePhoto && (
              <TouchableOpacity onPress={() => setPreviewVisible(true)}>
                <Image source={{ uri: profilePhoto }} style={styles.avatar} />
              </TouchableOpacity>
            )}
            <Animated.View style={[styles.statusDot, { opacity: pulseAnim }]} />
            <Text style={styles.statusText}>{t('home.status')}</Text>
          </View>
  
          <Text style={styles.welcomeMessage}>{welcomeMessage}</Text>
  
          <View style={styles.welcomeButtons}>
            <TouchableOpacity style={styles.welcomeButton} onPress={onNavigateGoals}>
              <Text style={styles.welcomeButtonText}>{t('home.goals')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.welcomeButton} onPress={onNavigateStats}>
              <Text style={styles.welcomeButtonText}>{t('home.stats')}</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
  
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateSelectorContainer}>
          {Array.from({ length: 7 }).map((_, i) => {
            const date = dayjs().add(i, 'day');
            const isSelected = selectedDate.isSame(date, 'day');
            const dayName = t(`days.${date.format('ddd')}`);
            return (
              <TouchableOpacity
                key={i}
                style={[styles.dateButton, isSelected && styles.selectedDateButton]}
                onPress={() => setSelectedDate(date)}
              >
                <Text style={[styles.dateButtonText, isSelected && styles.selectedDateButtonText]}>
                  {i === 0 ? t('home.today') : dayName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
  
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('home.activeClasses', { count: activities.length })}</Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${dailyProgress}%` }]} />
          </View>
          <Text style={styles.progressText}>{t('home.progressCompleted', { percent: dailyProgress })}</Text>
  
          {activities.map((activity) => (
            <View key={activity.id} style={[styles.activityItem, { backgroundColor: getActivityBackground(activity.status) }]}>
              <Text style={styles.activityTitle}>{activity.activity_name}</Text>
              <Text>🕒 {activity.start_time} | ⏱️ {activity.duration_minutes} min</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={() => toggleIgnoreActivity(activity.id, activity.status)} style={[styles.button, styles.ignoreBtn]}>
                  <Text style={styles.buttonText}>{activity.status === 'ignored' ? t('home.ignored') : t('home.ignore')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => markActivityAsDone(activity.id, activity.status)} style={[styles.button, styles.doneBtn]}>
                  <Text style={styles.buttonText}>{activity.status === 'done' ? t('home.done') : t('home.markAsDone')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
  
                {/* Weekly Progress Section - Only Previous Week and Current Week */}
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{t('home.weeklyProgress') || 'Weekly Progress'}</Text>
                  {(() => {
                    const currentWeek = dayjs().isoWeek();
                    const previousWeek = currentWeek - 1;

                    const barsToShow = [
                      { label: t('home.currentWeek'), week: currentWeek },
                      { label: t('home.previousWeek'), week: previousWeek },
                    ];

                    return barsToShow.map(({ label, week }) => {
                      const match = weeklyProgress.find(wp => wp.week === week);
                      const progress = match ? match.progress : 0;
                      const isCurrent = week === currentWeek;

                      return (
                        <View key={label} style={{ marginBottom: 20 }}>
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={isCurrent ? onNavigateWeekDetail : undefined}
                          >
                            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 6 }}>
                              {label}
                            </Text>
                          </TouchableOpacity>

                          <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: 'green' }]} />
                          </View>

                          <Text style={styles.progressText}>{progress}% completed</Text>

                          {/* ✅ Show only completed activities as styled pink chips with checkmark */}
                          {isCurrent &&
                  currentWeekActivities
                    .filter(activity => activity.status === 'done')
                    .map(activity => (
                      <View key={activity.id} style={styles.completedChip}>
                        <Text style={styles.completedChipText}>{activity.activity_name}</Text>
                        <Text style={styles.completedChipCheck}>✔</Text>
                      </View>
                    ))}

                  {!isCurrent &&
                    previousWeekActivities
                      .filter(activity => activity.status === 'done')
                      .map(activity => (
                        <View key={activity.id} style={styles.completedChip}>
                          <Text style={styles.completedChipText}>{activity.activity_name}</Text>
                          <Text style={styles.completedChipCheck}>✔</Text>
                        </View>
                      ))}


                  </View>
                );
              });
            })()}
          </View>


      </ScrollView>
  
      {previewVisible && profilePhoto && (
        <View style={styles.previewOverlay}>
          <TouchableOpacity style={styles.previewBackground} activeOpacity={1} onPress={() => setPreviewVisible(false)}>
            <Image source={{ uri: profilePhoto }} style={styles.previewImage} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
  
  
}

export default Home;

