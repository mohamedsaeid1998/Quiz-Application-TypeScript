//@ts-nocheck
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./en.json";
import translationAr from "./ar.json";
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: translationEn,
  },
  ar: {
    translation: translationAr,
  },
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  react: {
    useSuspense: false,
  },
  detection: {
    order: ['cookie', 'localStorage'],
    caches: ["cookie"]
  }
});

export default i18n;
