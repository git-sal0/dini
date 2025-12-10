import React, { createContext, useState, useEffect, useCallback } from 'react';
import translations from './translations';

export const LanguageContext = createContext({
  language: 'fr',
  setLanguage: () => {},
  t: (key) => key
});

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('dini_lang');
      return saved || 'fr';
    } catch (e) {
      return 'fr';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dini_lang', language);
    } catch (e) {}
  }, [language]);

  const t = useCallback((key) => {
    return translations[language] && translations[language][key] ? translations[language][key] : key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
