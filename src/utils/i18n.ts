import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from '../@types/resources';
import LanguageDetector from 'i18next-browser-languagedetector';

const options = {
    order: ['querystring', 'navigator'],
    lookupQuerystring: 'lng'
}

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        detection: options,
        fallbackLng: 'en',
        debug: true,
        resources,
        interpolation: {
            escapeValue: false,
        },
});

export default i18n;