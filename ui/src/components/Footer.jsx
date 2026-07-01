import { Link } from 'react-router-dom';
import { InstagramIcon, MailIcon, EtsyIcon } from './icons.jsx';
import {
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  ETSY_URL,
  ETSY_SHOP_NAME,
  CONTACT_EMAIL,
} from '../lib/site.js';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <img
            className="footer__logo-img"
            src="/logo-grey.png"
            alt="KIMONO Art Nails"
            width="180"
            height="48"
          />
          <p className="footer__tagline">
            Beauty of Japanese tradition, at your fingertips. Handcrafted press-on nail art in
            limited, small-batch collections.
          </p>
        </div>

        <nav className="footer__col" aria-label="Explore">
          <h4 className="footer__heading">Explore</h4>
          <Link to="/shop">Shop</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/about">About</Link>
          <Link to="/faq">FAQ</Link>
        </nav>

        <nav className="footer__col" aria-label="Help">
          <h4 className="footer__heading">Help</h4>
          <Link to="/faq#sizing">Sizing & fit</Link>
          <Link to="/faq#shipping">Shipping</Link>
          <Link to="/faq#orders">How to order</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="footer__col">
          <h4 className="footer__heading">Stay in touch</h4>
          <a className="footer__contact" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            <InstagramIcon /> {INSTAGRAM_HANDLE}
          </a>
          <a className="footer__contact" href={`mailto:${CONTACT_EMAIL}`}>
            <MailIcon /> {CONTACT_EMAIL}
          </a>
          <a className="footer__contact" href={ETSY_URL} target="_blank" rel="noreferrer">
            <EtsyIcon /> {ETSY_SHOP_NAME}
          </a>
          <p className="footer__note">
            DM us on Instagram for the quickest reply. Ready-to-ship sets are on Etsy.
          </p>
        </div>
      </div>

      <div className="footer__bottom container">
        <span>© {year} KIMONO Art Nails. All rights reserved.</span>
        <span className="footer__made">Handmade in small batches · Ships from the USA with tracking</span>
      </div>
    </footer>
  );
}
