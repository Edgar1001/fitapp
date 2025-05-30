import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { API_BASE_URL } from '../config';
import { BarChart } from 'react-native-gifted-charts';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../ThemeContext';

import lightStyles from './Styles/Stats.styles';
import darkStyles from './Styles/Stats.styles2';

dayjs.extend(weekOfYear);

interface StatsProps {
  userId: number;
  onNavigateHome: () => void;
}

const colors = {
  chartBlue: '#3b82f6',
  chartRed: '#ef4444',
  chartYellow: '#facc15',
};

export default function Stats({ userId, onNavigateHome }: StatsProps) {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  const [monthlyStats, setMonthlyStats] = useState<number[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivitiesForMonth = async (monthOffset: number): Promise<number> => {
    const targetDate = dayjs().subtract(monthOffset, 'month');
    const startOfMonth = targetDate.startOf('month').format('YYYY-MM-DD');
    const endOfMonth = targetDate.endOf('month').format('YYYY-MM-DD');

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/activities/month?userId=${userId}&start=${startOfMonth}&end=${endOfMonth}`
      );
      const data = await res.json();
      const activities = data.activities.filter((a: any) => a.date >= startOfMonth && a.date <= endOfMonth);
      const doneCount = activities.filter((a: any) => a.status === 'done').length;
      return activities.length > 0 ? Math.round((doneCount / activities.length) * 100) : 0;
    } catch (error) {
      console.error('Error fetching activities:', error);
      return 0;
    }
  };

  const fetchActivitiesForWeek = async (): Promise<number[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/activities/weekly?userId=${userId}`);
      const data = await res.json();
      const activities = data.activities;
      const weeks = [2, 1, 0];
      return weeks.map((offset) => {
        const week = dayjs().week() - offset;
        const weekActivities = activities.filter((a: any) => dayjs(a.date).week() === week);
        const done = weekActivities.filter((a: any) => a.status === 'done').length;
        return weekActivities.length > 0 ? Math.round((done / weekActivities.length) * 100) : 0;
      });
    } catch (error) {
      console.error('Error fetching weekly activities:', error);
      return [0, 0, 0];
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const [m2, m1, m0] = await Promise.all([
        fetchActivitiesForMonth(2),
        fetchActivitiesForMonth(1),
        fetchActivitiesForMonth(0),
      ]);
      const weekly = await fetchActivitiesForWeek();
      setMonthlyStats([m2, m1, m0]);
      setWeeklyStats(weekly);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 150;

  const monthLabels = [
    dayjs().subtract(2, 'month').format('MMM'),
    dayjs().subtract(1, 'month').format('MMM'),
    dayjs().format('MMM'),
    '',
  ];

  const data = monthlyStats.map((value, idx) => ({
    value,
    label: monthLabels[idx],
    color: [colors.chartBlue, colors.chartRed, colors.chartYellow][idx],
  }));

  const weekLabels = [
    `${t('stats.week')} ${dayjs().week() - 2}`,
    `${t('stats.week')} ${dayjs().week() - 1}`,
    `${t('stats.week')} ${dayjs().week()}`,
    '',
  ];

  const weeklyData = weeklyStats.map((value, idx) => ({
    value,
    label: weekLabels[idx],
    color: [colors.chartBlue, colors.chartRed, colors.chartYellow][idx],
  }));

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={isDarkMode ? '#60a5fa' : '#831843'} />
        <Text style={{ marginTop: 10, color: isDarkMode ? '#60a5fa' : '#831843' }}>
          {t('stats.loading')}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onNavigateHome} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color={isDarkMode ? '#60a5fa' : '#831843'} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>📊 {t('stats.title')}</Text>
        </View>
      </View>

      <View style={[styles.card, styles.chartContainer]}>
        <Text style={[styles.cardText, { fontWeight: 'bold', marginBottom: 30 }]}>
          {t('stats.monthlyComparison')}
        </Text>
        <BarChart
          data={data}
          width={chartWidth}
          height={220}
          barWidth={30}
          maxValue={100}
          backgroundColor={isDarkMode ? 'rgba(30, 64, 175, 0.2)' : 'rgba(212, 9, 219, 0.1)'}
          barBorderTopRightRadius={10}
          barBorderTopLeftRadius={10}
          frontColor="purple"
          spacing={30}
        />
      </View>

      <View style={[styles.card, styles.chartContainer]}>
        <Text style={[styles.cardText, { fontWeight: 'bold', marginBottom: 30 }]}>
          {t('stats.weeklyComparison')}
        </Text>
        <BarChart
          data={weeklyData}
          width={chartWidth}
          height={220}
          barWidth={30}
          maxValue={100}
          backgroundColor={isDarkMode ? 'rgba(30, 64, 175, 0.2)' : 'rgba(212, 9, 219, 0.1)'}
          barBorderTopRightRadius={10}
          barBorderTopLeftRadius={10}
          frontColor="purple"
          spacing={30}
        />
      </View>
    </ScrollView>
  );
}
