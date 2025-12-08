import {create} from 'zustand';
import i18n from '../../assets/i18n';
import {I18nManager} from 'react-native';

type Language = 'he' | 'en';

interface LanguageState {
  language: Language;
  isRTL: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>(set => {
  const currentLang = (i18n.language || 'he') as Language;
  const isRTL = currentLang === 'he';

  // Set initial RTL/LTR
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.forceRTL(isRTL);
    I18nManager.allowRTL(isRTL);
  }

  return {
    language: currentLang,
    isRTL,
    setLanguage: (lang: Language) => {
      i18n.changeLanguage(lang);
      const newIsRTL = lang === 'he';
      I18nManager.forceRTL(newIsRTL);
      I18nManager.allowRTL(newIsRTL);
      set({language: lang, isRTL: newIsRTL});
    },
    toggleLanguage: () => {
      set(state => {
        const newLang = state.language === 'he' ? 'en' : 'he';
        i18n.changeLanguage(newLang);
        const newIsRTL = newLang === 'he';
        I18nManager.forceRTL(newIsRTL);
        I18nManager.allowRTL(newIsRTL);
        return {
          language: newLang,
          isRTL: newIsRTL,
        };
      });
    },
  };
});
