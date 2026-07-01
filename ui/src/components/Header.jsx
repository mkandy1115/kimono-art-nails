import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import { InstagramIcon, EtsyIcon, MenuIcon, CloseIcon } from './icons.jsx';
import { INSTAGRAM_URL, ETSY_URL } from '../lib/site.js';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/shop', label: 'Shop' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

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

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner container">
        <Logo />

        <nav className="header__nav" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `header__link${isActive ? ' is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="header__icon"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href={ETSY_URL}
            target="_blank"
            rel="noreferrer"
            className="header__icon"
            aria-label="Etsy shop"
          >
            <EtsyIcon />
          </a>
          <button
            type="button"
            className="header__burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div className={`drawer${open ? ' drawer--open' : ''}`} aria-hidden={!open}>
        <nav className="drawer__nav" aria-label="Mobile">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `drawer__link${isActive ? ' is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="drawer__foot">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="drawer__social">
            <InstagramIcon /> Instagram
          </a>
          <a href={ETSY_URL} target="_blank" rel="noreferrer" className="drawer__social">
            <EtsyIcon /> Etsy
          </a>
        </div>
      </div>
      <button
        type="button"
        className={`drawer__scrim${open ? ' drawer__scrim--open' : ''}`}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
      />
    </header>
  );
}
