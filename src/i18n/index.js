import en from '../i18n/locales/en/common.json';
import i18next from 'i18next';
import uk from '../i18n/locales/ua/common.json';

i18next.init({
  lng: localStorage.getItem('lang') || 'uk',
  fallbackLng: 'en',
  debug: false,
  resources: {
    en: { translation: en },
    uk: { translation: uk },
  },
});

export default i18next;
