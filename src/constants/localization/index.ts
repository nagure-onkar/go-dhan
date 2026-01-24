import en from './languages/en';
import mr from './languages/mr';

export const languages = { en, mr };
export type LanguageKey = keyof typeof languages;
