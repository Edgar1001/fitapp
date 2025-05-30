import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import { setAppLanguage } from '../i18n';

import { useTheme } from '../ThemeContext';
import lightStyles from './Styles/Settings.styles';
import darkStyles from './Styles/Settings.styles2';

interface SettingsProps {
  onNavigateContact: () => void;
  onNavigateOtherSettings: () => void;
}

export default function Settings({ onNavigateContact, onNavigateOtherSettings }: SettingsProps) {
  const [showContact, setShowContact] = useState(false);
  const [showUpdates, setShowUpdates] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  const [fontsLoaded] = useFonts({
    'Lord of the Rings': require('../../assets/fonts/lor.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const handleBackToSettings = () => {
    setShowContact(false);
    setShowUpdates(false);
    setShowLanguageDropdown(false);
  };

  const handleContactPress = () => setShowContact(true);
  const handleUpdatesPress = () => setShowUpdates(true);
  const handleLanguagePress = () => setShowLanguageDropdown(!showLanguageDropdown);

  const handleChangeLanguage = async (lang: 'en' | 'es') => {
    await setAppLanguage(lang);
    setShowLanguageDropdown(false);
  };

  return (
    <ImageBackground
  source={require('../../assets/images/pergamino.png')}
  style={styles.container}
  imageStyle={{ opacity: isDarkMode ? 1 : 0.3 }}
>

      {!showContact && !showUpdates ? (
        <>
          <Text style={styles.title}>{t('settings.title')}</Text>

          {/* Theme Toggle */}
          <TouchableOpacity style={styles.optionButton} onPress={toggleTheme}>
            <Text style={styles.optionText}>
              {isDarkMode ? t('settings.lightTheme') : t('settings.darkTheme')}
            </Text>
          </TouchableOpacity>

          {/* Language Option */}
          <TouchableOpacity style={styles.optionButton} onPress={handleLanguagePress}>
            <Text style={styles.optionText}>{t('settings.language')}</Text>
          </TouchableOpacity>

          {showLanguageDropdown && (
            <View style={styles.dropdown}>
              <TouchableOpacity onPress={() => handleChangeLanguage('en')} style={styles.dropdownOption}>
                <Text style={styles.optionText}>{t('settings.english')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChangeLanguage('es')} style={styles.dropdownOption}>
                <Text style={styles.optionText}>{t('settings.spanish')}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Updates Option */}
          <TouchableOpacity style={styles.optionButton} onPress={handleUpdatesPress}>
            <Text style={styles.optionText}>{t('settings.updates')}</Text>
          </TouchableOpacity>

          {/* Contact Option */}
          <TouchableOpacity style={styles.optionButton} onPress={handleContactPress}>
            <Text style={styles.optionText}>{t('settings.contact')}</Text>
          </TouchableOpacity>
        </>
      ) : showUpdates ? (
        <View style={styles.contactContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.epicMessage}>
              {t('settings.updatesTitle')}
              {t('settings.updateList')}
            </Text>
          </ScrollView>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToSettings}>
            <Text style={styles.backButtonText}>{t('settings.back')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.contactContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.epicMessage}>
              {t('settings.contactMessage')}
            </Text>
          </ScrollView>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToSettings}>
            <Text style={styles.backButtonText}>{t('settings.back')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
}

