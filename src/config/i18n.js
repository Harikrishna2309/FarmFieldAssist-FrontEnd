import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../translations/en.json";
import ta from "../translations/ta.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ta: {
      translation: ta,
    },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
