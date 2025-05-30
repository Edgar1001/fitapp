import React, { useState, useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Image
} from 'react-native';
import { API_BASE_URL } from './config'; 
import Viewer from './Viewer';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './i18n'; // <- must be imported early
import { I18nextProvider, useTranslation } from 'react-i18next';
import * as SecureStore from 'expo-secure-store';
import { ThemeProvider, useTheme } from './ThemeContext'; // adjust the path if needed

const LoginOverlay: React.FC<{ onLoginSuccess: (token: string, userId: number) => void }> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setErrorMsg('');

      const response = await fetch(`${API_BASE_URL}/api/login`, {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Login failed");

      const { token, userId } = await response.json();
      onLoginSuccess(token, userId);
    } catch (err) {
      setErrorMsg(t('login.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="black" />
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView 
          contentContainerStyle={styles.overlayContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={
              isDarkMode
                ? require('../assets/images/fitness5.png') // dark version
                : require('../assets/images/fitness4.png') // light version
            }
            style={styles.logo}
          />

          <View style={styles.formWrapper}>
            <Text style={styles.heading}>{t('login.title')}</Text>

            <TextInput
              style={styles.input}
              placeholder={t('login.email')}
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder={t('login.password')}
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
              <Text style={styles.buttonText}>
                {loading ? t('login.connecting') : t('login.submit')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      const storedUserId = await AsyncStorage.getItem('userId');

      if (storedToken && storedUserId) {
        setAuthToken(storedToken);
        setUserId(Number(storedUserId));
        setIsAuthenticated(true);
      }
    };

    checkAuthentication();
  }, []);

  const handleLoginSuccess = async (token: string, userId: number) => {
    setIsAuthenticated(true);
    setAuthToken(token);
    setUserId(userId);
  
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('userId', userId.toString());

    await SecureStore.setItemAsync('userId', userId.toString());
    console.log('Stored token:', token);
    console.log('Stored userId:', userId);
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    setAuthToken(null);
    setUserId(null);

    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userId');
  };

  return (
    <ThemeProvider>
      <I18nextProvider i18n={require('./i18n').default}>
        {!isAuthenticated || userId == null ? (
          <LoginOverlay onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Viewer userId={userId!} onLogout={handleLogout} />
        )}
      </I18nextProvider>
    </ThemeProvider>
  );
  
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'black' },
  overlayContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, backgroundColor: 'black' },
  logo: { width: 250, height: 250, resizeMode: 'contain', marginBottom: 30 },
  formWrapper: { backgroundColor: '#2a2a2a', padding: 20, borderRadius: 16, width: '100%', maxWidth: 350, alignItems: 'center' },
  heading: { fontSize: 22, color: '#1de1dd', marginBottom: 20, textAlign: 'center' },
  input: { width: '100%', backgroundColor: '#3a3a3a', borderRadius: 8, padding: 12, fontSize: 16, color: 'white', marginBottom: 12 },
  button: { backgroundColor: '#1de1dd', paddingVertical: 12, borderRadius: 999, marginTop: 12, width: '100%', alignItems: 'center' },
  buttonText: { color: 'black', fontWeight: 'bold', fontSize: 16 },
  errorText: { color: 'red', fontSize: 13, marginBottom: 10, textAlign: 'center' },
});
