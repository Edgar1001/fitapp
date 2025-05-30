// app/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import es from './locales/es.json';

const LANGUAGE_KEY = 'user-language';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: 'en', // default, will be overwritten if user has stored preference
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Load saved language from AsyncStorage
AsyncStorage.getItem(LANGUAGE_KEY).then((lng) => {
  if (lng && lng !== i18n.language) {
    i18n.changeLanguage(lng);
  }
});

// Export a utility function to change language and persist it
export const setAppLanguage = async (lng: string) => {
  await i18n.changeLanguage(lng);
  await AsyncStorage.setItem(LANGUAGE_KEY, lng);
};

export default i18n;

