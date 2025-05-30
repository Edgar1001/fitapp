import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../config';
import { useTheme } from '../ThemeContext';
import stylesLight from './Styles/WeekDetail.styles';
import stylesDark from './Styles/WeekDetail.styles2';

dayjs.extend(isoWeek);

interface Activity {
  id: number;
  date: string;
  status: 'done' | 'ignored' | 'forgotten';
}

interface Props {
  userId: number;
  onNavigateHome: () => void;
}

export default function WeekDetail({ userId, onNavigateHome }: Props) {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? stylesDark : stylesLight;
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/activities/weekly?userId=${userId}`);
        const contentType = response.headers.get('Content-Type');
        if (!response.ok || !contentType?.includes('application/json')) {
          const errorText = await response.text();
          throw new Error(`Invalid response: ${errorText}`);
        }

        const data = await response.json();
        const thisWeek = dayjs().isoWeek();

        const filtered = data.activities.filter((a: Activity) =>
          dayjs(a.date).isoWeek() === thisWeek
        );

        setActivities(filtered);
      } catch (error) {
        console.error('Error fetching week detail:', error);
      }
    };

    fetchActivities();
  }, [userId]);

  const renderDay = (offset: number) => {
    const date = dayjs().startOf('week').add(offset, 'day');
    const abbrev = date.format('ddd');
    
    let translatedDay = t(`days.${abbrev}`, { defaultValue: abbrev });
    if (typeof translatedDay !== 'string') translatedDay = abbrev;

    const dayActivities = activities.filter(a => dayjs(a.date).isSame(date, 'day'));
    const done = dayActivities.filter(a => a.status === 'done').length;
    const total = dayActivities.length;
    const progress = total > 0 ? Math.round((done / total) * 100) : 0;

    let progressLabel = t('weekDetail.progressCompleted', {
      percent: progress,
      defaultValue: `${progress}% completed`
    });
    if (typeof progressLabel !== 'string') progressLabel = `${progress}% completed`;

    return (
      <View key={abbrev} style={{ marginBottom: 16 }}>
        <Text style={styles.dayLabel}>{translatedDay}</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{progressLabel}</Text>
      </View>
    );
  };

  let titleText = t('weekDetail.title', { defaultValue: 'This Week' });
  if (typeof titleText !== 'string') titleText = 'This Week';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc' }}>
      <View
        style={[
          styles.topBar,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          },
        ]}
      >
        <TouchableOpacity
          onPress={onNavigateHome}
          style={{
            position: 'absolute',
            left: 10,
            padding: 10,
            zIndex: 1,
          }}
        >
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={isDarkMode ? 'white' : '#0f172a'}
          />
        </TouchableOpacity>

        <Text style={styles.cardTitle}>{titleText}</Text>
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { padding: 16 }]}>
        {Array.from({ length: 6 }).map((_, i) => renderDay(i + 1))}
        {renderDay(0)}
      </ScrollView>
    </SafeAreaView>
  );
}
