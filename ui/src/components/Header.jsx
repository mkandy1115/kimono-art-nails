import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import ExternalLink from './ExternalLink.jsx';
import { InstagramIcon, EtsyIcon, MenuIcon, CloseIcon } from './icons.jsx';
import { INSTAGRAM_URL, ETSY_URL } from '../lib/site.js';
import { useLocale } from '../i18n/LocaleContext.jsx';
import useFocusTrap from '../hooks/useFocusTrap.js';

const NAV = [
  { to: '/', labelKey: 'nav.home', end: true },
  { to: '/about', labelKey: 'nav.about' },
  { to: '/gallery', labelKey: 'nav.gallery' },
  { to: '/shop', labelKey: 'nav.shop' },
  { to: '/custom-order', labelKey: 'nav.customOrder' },
  { to: '/faq', labelKey: 'nav.faq' },
  { to: '/contact', labelKey: 'nav.contact' },
];

export default function Header() {
  const { locale, toggleLocale, t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const burgerRef = useRef(null);
  const trapRef = useRef(null);

  useFocusTrap({
    containerRef: trapRef,
    active: open,
    onEscape: () => setOpen(false),
    returnFocusRef: burgerRef,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const main = document.getElementById('main');
    const footer = document.getElementById('site-footer');
    if (open) {
      main?.setAttribute('aria-hidden', 'true');
      footer?.setAttribute('aria-hidden', 'true');
    } else {
      main?.removeAttribute('aria-hidden');
      footer?.removeAttribute('aria-hidden');
    }
    return () => {
      main?.removeAttribute('aria-hidden');
      footer?.removeAttribute('aria-hidden');
    };
  }, [open]);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner container">
        <Logo />

        <nav className="header__nav" aria-label={t('nav.ariaPrimary')}>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `header__link${isActive ? ' is-active' : ''}`}
            >
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="header__link header__lang"
            onClick={toggleLocale}
            aria-label={t('lang.toggleLabel')}
          >
            {locale === 'en' ? t('lang.toggleToJa') : t('lang.toggleToEn')}
          </button>
          <ExternalLink
            href={INSTAGRAM_URL}
            className="header__icon"
            ariaLabel={t('nav.instagram')}
          >
            <InstagramIcon />
          </ExternalLink>
          <ExternalLink
            href={ETSY_URL}
            className="header__icon"
            ariaLabel={t('nav.etsy')}
          >
            <EtsyIcon />
          </ExternalLink>
          <button
            ref={burgerRef}
            type="button"
            className="header__burger"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div ref={trapRef} aria-hidden={!open}>
        <div
          id="mobile-nav"
          className={`drawer${open ? ' drawer--open' : ''}`}
          aria-hidden={!open}
        >
          <nav className="drawer__nav" aria-label={t('nav.ariaMobile')}>
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `drawer__link${isActive ? ' is-active' : ''}`}
              >
                {t(item.labelKey)}
              </NavLink>
            ))}
          </nav>
          <div className="drawer__foot">
            <ExternalLink href={INSTAGRAM_URL} className="drawer__social">
              <InstagramIcon /> {t('nav.instagram')}
            </ExternalLink>
            <ExternalLink href={ETSY_URL} className="drawer__social">
              <EtsyIcon /> {t('nav.etsy')}
            </ExternalLink>
          </div>
        </div>
        <button
          type="button"
          className={`drawer__scrim${open ? ' drawer__scrim--open' : ''}`}
          aria-label={t('nav.closeMenu')}
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        />
      </div>
    </header>
  );
}
