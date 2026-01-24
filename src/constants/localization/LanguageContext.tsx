import { createContext, ReactNode, useState } from 'react';
import { languages, LanguageKey } from '@/constants/localization';

export const LanguageContext = createContext({
  language: 'en' as LanguageKey,
  t: languages.en,
  setLanguage: (_: LanguageKey) => {},
});

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageKey>('en');

  return (
    <LanguageContext.Provider
      value={{
        language,
        t: languages[language],
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
