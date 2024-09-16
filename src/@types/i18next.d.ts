import enGameStrings from '../locales/en/gamestrings';
import { defaultNS } from '../i18n';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS;
        resources: {
            translation: typeof enGameStrings
        }
    }
}