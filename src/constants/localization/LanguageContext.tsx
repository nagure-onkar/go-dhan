import { createContext, ReactNode, useState, useContext } from 'react';
import { languages, LanguageKey } from '@/constants/localization';

interface LanguageContextType {
  language: LanguageKey;
  t: typeof languages["en"];
  setLanguage: (lang: LanguageKey) => void;
}


export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  t: languages.en,
  setLanguage: () => {},
});

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageKey>('en');
    const t: typeof languages["en"] = languages[language] as typeof languages["en"];



  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};


export const useLanguage = () => useContext(LanguageContext);
