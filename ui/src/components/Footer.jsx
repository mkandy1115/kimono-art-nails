import { Link } from 'react-router-dom';
import { InstagramIcon, MailIcon } from './icons.jsx';

const INSTAGRAM_URL = 'https://instagram.com';
const CONTACT_EMAIL = 'hello@kimonoartnails.com';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <span className="footer__logo">KIMONO</span>
          <span className="footer__logo-sub">Art Nails</span>
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
          <Link to="/faq#care">Care & reuse</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="footer__col">
          <h4 className="footer__heading">Stay in touch</h4>
          <a className="footer__contact" href={`mailto:${CONTACT_EMAIL}`}>
            <MailIcon /> {CONTACT_EMAIL}
          </a>
          <a className="footer__contact" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            <InstagramIcon /> @kimonoartnails
          </a>
          <p className="footer__note">
            New collections drop just a few times a year. Follow along for first looks.
          </p>
        </div>
      </div>

      <div className="footer__bottom container">
        <span>© {year} KIMONO Art Nails. All rights reserved.</span>
        <span className="footer__made">Handmade in small batches · Ships worldwide</span>
      </div>
    </footer>
  );
}
