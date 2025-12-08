import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {he, en} from './translations';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: {
    he: {translation: he},
    en: {translation: en},
  },
  lng: 'he', // Default language: Hebrew
  fallbackLng: 'he',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
