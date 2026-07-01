import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import en from './en.js';
import ja from './ja.js';
import { CONTACT_EMAIL, ETSY_SHOP_NAME, ETSY_URL, INSTAGRAM_HANDLE } from '../lib/site.js';

const STORAGE_KEY = 'kimono-locale';
const MESSAGES = { en, ja };

const FAQ_VARS = {
  handle: INSTAGRAM_HANDLE,
  email: CONTACT_EMAIL,
  etsyShop: ETSY_SHOP_NAME,
  etsyUrl: ETSY_URL.replace('https://', ''),
};

const LocaleContext = createContext(null);

function interpolate(template, vars = {}) {
  if (typeof template !== 'string') return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? '');
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'ja' ? 'ja' : 'en';
    } catch {
      return 'en';
    }
  });
  const [localeAnnouncement, setLocaleAnnouncement] = useState('');
  const skipLocaleAnnouncement = useRef(true);

  const setLocale = useCallback((next) => {
    const value = next === 'ja' ? 'ja' : 'en';
    setLocaleState(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'ja' : 'en');
  }, [locale, setLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    const meta = MESSAGES[locale]?.meta;
    if (meta?.title) document.title = meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && meta?.description) desc.setAttribute('content', meta.description);
  }, [locale]);

  useEffect(() => {
    if (skipLocaleAnnouncement.current) {
      skipLocaleAnnouncement.current = false;
      return;
    }
    const message = MESSAGES[locale]?.a11y?.localeChanged;
    if (message) setLocaleAnnouncement(message);
  }, [locale]);

  const messages = MESSAGES[locale] ?? MESSAGES.en;

  const t = useCallback(
    (key, vars = {}) => {
      const parts = key.split('.');
      let value = messages;
      for (const part of parts) {
        value = value?.[part];
      }
      return interpolate(value, { ...FAQ_VARS, ...vars });
    },
    [messages]
  );

  const faqAnswer = useCallback((text) => interpolate(text, FAQ_VARS), []);

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale, t, faqAnswer, messages }),
    [locale, setLocale, toggleLocale, t, faqAnswer, messages]
  );

  return (
    <LocaleContext.Provider value={value}>
      <div aria-live="polite" aria-atomic="true" className="visually-hidden">
        {localeAnnouncement}
      </div>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}

export function useOptionalLocale() {
  return useContext(LocaleContext);
}
