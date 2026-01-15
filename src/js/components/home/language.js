import i18next from 'i18next';

i18next.init({
  lng: 'en', 
  fallbackLng: 'ua',
  resources: {
    ua: {
      translation: {
        hello: "Привіт",
        button: "Натисни мене"
      }
    },
    en: {
      translation: {
        hello: "Hello",
        button: "Click me"
      }
    }
  }
});
