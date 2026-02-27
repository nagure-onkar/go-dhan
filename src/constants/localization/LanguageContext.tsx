import { createContext, ReactNode, useState, useContext } from 'react';
import { languages, LanguageKey } from '@/constants/localization';

interface LanguageContextType {
  language: LanguageKey;
  t: (key: string) => string;
  setLanguage: (lang: LanguageKey) => void;
}


export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  t: (key: string) => key, 
  setLanguage: () => {},
});

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageKey>('en');

  
  const t = (key: string) => languages[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}


export const useLanguage = () => useContext(LanguageContext);
