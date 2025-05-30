import './backgroundLocationTask';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';

import { useTranslation } from 'react-i18next';

import Home from './viewer/home';
import Calendar from './viewer/calendar';
import Profile from './viewer/Profile';
import Maps from './viewer/Maps';
import Goals from './viewer/goals';
import Stats from './viewer/stats';
import Settings from './viewer/settings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from './ThemeContext';
import stylesLight from './Styles/Viewer.styles';
import stylesDark from './Styles/Viewer.styles2';
import WeekDetail from './viewer/WeekDetail';


type ViewerProps = {
  userId: number;
  onLogout: () => void;
};

export default function Viewer({ userId, onLogout }: ViewerProps) {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? stylesDark : stylesLight;
  const iconColor = isDarkMode ? 'white' : '#831843';
  

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState<
  'home' | 'calendar' | 'maps' | 'profile' | 'goals' | 'stats' | 'settings' | 'contact' | 'otherSettings' | 'weekDetail'
>('home');

  const [splashVisible, setSplashVisible] = useState(false);

  const slideAnim = useRef(new Animated.Value(-250)).current;
  const splashScale = useRef(new Animated.Value(0.1)).current;


  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: sidebarVisible ? 0 : -250,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [sidebarVisible]);

  const handleMenuPress = () => {
    setSplashVisible(true);
    splashScale.setValue(0.1);

    Animated.timing(splashScale, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setSidebarVisible(!sidebarVisible);
    setTimeout(() => setSplashVisible(false), 300);
  };

  const handleNavigate = (page: typeof currentPage) => {
    setCurrentPage(page);
    setSidebarVisible(false);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Topbar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
          <View style={styles.hamburgerIcon}>
            <View style={styles.line} />
            <View style={styles.line} />
            <View style={styles.line} />
          </View>
          {splashVisible && (
            <Animated.View
              style={[
                styles.splash,
                {
                  opacity: splashScale,
                  transform: [{ scale: splashScale }],
                },
              ]}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.title}>{t('viewer.title')}</Text>
      </View>

      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
        <TouchableOpacity style={styles.sidebarButton} onPress={() => handleNavigate('home')}>
          <View style={styles.sidebarButtonContent}>
            <MaterialIcons name="home" size={22} color={iconColor} style={styles.sidebarIcon} />
            <Text style={styles.sidebarButtonText}>{t('viewer.home')}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarButton} onPress={() => handleNavigate('calendar')}>
          <View style={styles.sidebarButtonContent}>
            <MaterialIcons name="calendar-today" size={22} color={iconColor} style={styles.sidebarIcon} />
            <Text style={styles.sidebarButtonText}>{t('viewer.calendar')}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarButton} onPress={() => handleNavigate('maps')}>
          <View style={styles.sidebarButtonContent}>
            <MaterialIcons name="map" size={22} color={iconColor} style={styles.sidebarIcon} />
            <Text style={styles.sidebarButtonText}>{t('viewer.map')}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarButton} onPress={() => handleNavigate('profile')}>
          <View style={styles.sidebarButtonContent}>
            <MaterialIcons name="person" size={22} color={iconColor} style={styles.sidebarIcon} />
            <Text style={styles.sidebarButtonText}>{t('viewer.profile')}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sidebarButton, styles.settingsButton]}
          onPress={() => handleNavigate('settings')}
        >
          <View style={styles.sidebarButtonContent}>
            <MaterialIcons name="settings" size={22} color="white" style={styles.sidebarIcon} />
            <Text style={[styles.sidebarButtonText, { color: 'white' }]}>{t('viewer.settings')}</Text>
          </View>
        </TouchableOpacity>



        <TouchableOpacity style={[styles.sidebarButton, styles.logoutButton]} onPress={handleLogout}>
          <View style={styles.sidebarButtonContent}>
            <MaterialIcons name="logout" size={22} color="white" style={styles.sidebarIcon} />
            <Text style={[styles.sidebarButtonText, styles.logoutButtonText]}>
              {t('viewer.logout')}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Content Pages */}
      <View style={styles.contentWrapper}>
        {currentPage === 'home' && (
          <Home
          userId={userId}
          onNavigateGoals={() => setCurrentPage('goals')}
          onNavigateStats={() => setCurrentPage('stats')}
          onNavigateWeekDetail={() => setCurrentPage('weekDetail')} // 👈 Add this
        />
        )}
        {currentPage === 'calendar' && <Calendar userId={userId} />}
        {currentPage === 'maps' && <Maps userId={userId} />}
        {currentPage === 'goals' && <Goals userId={userId} onNavigateHome={() => setCurrentPage('home')} />}
        {currentPage === 'stats' && <Stats userId={userId} onNavigateHome={() => setCurrentPage('home')} />}
        {currentPage === 'weekDetail' && (<WeekDetail userId={userId} onNavigateHome={() => setCurrentPage('home')} />)}
        {currentPage === 'profile' && <Profile userId={userId} onNavigateHome={() => setCurrentPage('home')} />}
        {currentPage === 'settings' && <Settings onNavigateContact={() => handleNavigate('contact')} onNavigateOtherSettings={() => handleNavigate('otherSettings')} />}
        {currentPage === 'contact' && (
          <View style={styles.centeredContent}>
            <Text style={{ fontSize: 20, color: '#dbeafe' }}>{t('viewer.contact')}</Text>
          </View>
        )}
        {currentPage === 'otherSettings' && (
          <View style={styles.centeredContent}>
            <Text style={{ fontSize: 20, color: '#dbeafe' }}>{t('viewer.otherSettings')}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

