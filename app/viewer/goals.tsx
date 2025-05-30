import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { API_BASE_URL } from '../config';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../ThemeContext';

import lightStyles from './Styles/Goals.styles';
import darkStyles from './Styles/Goals.styles2';

interface ProfileData {
  fitness_goals?: string;
  preferred_days?: string;
  preferred_activity?: string;
}

interface GoalsProps {
  userId: number;
  onNavigateHome: () => void;
}

export default function Goals({ userId, onNavigateHome }: GoalsProps) {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/profile/${userId}`);
        const data = await res.json();
        setProfile(data.profile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const parseGoals = (goals?: string | string[]): string[] => {
    if (!goals) return [];
    if (Array.isArray(goals)) return goals.map(g => g.trim());
    return goals
      .replace(/[{}"]/g, '')
      .split(',')
      .map(g => g.trim())
      .filter(Boolean);
  };

  const fitnessGoalsArray = parseGoals(profile?.fitness_goals);
  const preferredDaysArray = parseGoals(profile?.preferred_days);

  const getDescriptionsForGoal = (goalKey: string): string[] => {
    const desc = t(`fitnessGoals.${goalKey}.descriptions`, { returnObjects: true }) as string[];
    const totalGoals = fitnessGoalsArray.length;

    if (!desc) return [];

    if (totalGoals === 1) return desc.slice(0, 6);
    if (totalGoals === 2) return desc.slice(0, 3);
    if (totalGoals === 3 || totalGoals === 4) return desc.slice(0, 2);
    return desc.slice(0, 1);
  };

  const getSmartSuggestions = () => {
    const preferredDaysCount = preferredDaysArray.length;
    let suggestionKey = '';

    if (preferredDaysCount > 5) {
      suggestionKey = 'more_than_5_days';
    } else if (preferredDaysCount <= 2) {
      suggestionKey = '2_days_or_less';
    } else if (preferredDaysCount > 2 && preferredDaysCount <= 5) {
      suggestionKey = '3_to_5_days';
    }

    let baseSuggestion = t(`fitnessGoals.suggestions.${suggestionKey}`, { days: preferredDaysCount });

    const activity = profile?.preferred_activity;
    if (activity && activity.toLowerCase() !== 'gym') {
      baseSuggestion += `\n${t('goals.extraActivityTip', { activity })}`;
    }

    return baseSuggestion;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={isDarkMode ? '#60a5fa' : '#831843'} />
        <Text style={{ marginTop: 10, color: isDarkMode ? '#60a5fa' : '#831843' }}>
          {t('goals.loading')}
        </Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{t('goals.noData')}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onNavigateHome} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color={isDarkMode ? '#60a5fa' : '#831843'} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>🏆 {t('goals.title')}</Text>
        </View>
      </View>

      {fitnessGoalsArray.map(goalKey => {
        const title = t(`fitnessGoals.${goalKey}.title`);
        const descriptions = getDescriptionsForGoal(goalKey);
        return (
          <View key={goalKey} style={styles.card}>
            <Text style={styles.suggestionTitle}>{title}</Text>
            {descriptions.map((desc, idx) => (
              <Text key={idx} style={styles.suggestionText}>• {desc}</Text>
            ))}
          </View>
        );
      })}

      {preferredDaysArray.length > 0 && profile.preferred_activity && (
        <View style={styles.card}>
          <View style={styles.suggestionBox}>
            <Text style={styles.suggestionTitle}>{t('goals.suggestion')}</Text>
            <Text style={styles.suggestionText}>{getSmartSuggestions()}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
