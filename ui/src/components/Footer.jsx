import { Link } from 'react-router-dom';
import { InstagramIcon, MailIcon, EtsyIcon } from './icons.jsx';
import {
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  ETSY_URL,
  ETSY_SHOP_NAME,
  CONTACT_EMAIL,
} from '../lib/site.js';
import { useLocale } from '../i18n/LocaleContext.jsx';

export default function Footer() {
  const { t, messages } = useLocale();
  const year = new Date().getFullYear();
  const links = messages.footer.links;

  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <img
            className="footer__logo-img"
            src="/logo-grey.png"
            alt={t('common.logoAlt')}
            width="180"
            height="48"
          />
          <p className="footer__tagline">{t('footer.tagline')}</p>
        </div>

        <nav className="footer__col" aria-label={t('footer.explore')}>
          <h4 className="footer__heading">{t('footer.explore')}</h4>
          <Link to="/shop">{links.shop}</Link>
          <Link to="/gallery">{links.gallery}</Link>
          <Link to="/about">{links.about}</Link>
          <Link to="/faq">{links.faq}</Link>
          <Link to="/custom-order">{links.customOrder}</Link>
        </nav>

        <nav className="footer__col" aria-label={t('footer.help')}>
          <h4 className="footer__heading">{t('footer.help')}</h4>
          <Link to="/faq#sizing">{links.sizing}</Link>
          <Link to="/faq#shipping">{links.shipping}</Link>
          <Link to="/faq#orders">{links.orders}</Link>
          <Link to="/faq#care">{links.care}</Link>
          <Link to="/contact">{links.contact}</Link>
        </nav>

        <div className="footer__col">
          <h4 className="footer__heading">{t('footer.stayInTouch')}</h4>
          <a className="footer__contact" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            <InstagramIcon /> {INSTAGRAM_HANDLE}
          </a>
          <a className="footer__contact" href={`mailto:${CONTACT_EMAIL}`}>
            <MailIcon /> {CONTACT_EMAIL}
          </a>
          <a className="footer__contact" href={ETSY_URL} target="_blank" rel="noreferrer">
            <EtsyIcon /> {ETSY_SHOP_NAME}
          </a>
          <p className="footer__note">{t('footer.note')}</p>
        </div>
      </div>

      <div className="footer__bottom container">
        <span>{t('footer.rights', { year })}</span>
        <span className="footer__made">{t('footer.made')}</span>
      </div>
    </footer>
  );
}
