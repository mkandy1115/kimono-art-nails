import { Link } from 'react-router-dom';
import { InstagramIcon, MailIcon, EtsyIcon } from './icons.jsx';
import ExternalLink from './ExternalLink.jsx';
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
    <footer id="site-footer" className="footer">
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
          <p className="footer__heading">{t('footer.explore')}</p>
          <Link to="/shop">{links.shop}</Link>
          <Link to="/gallery">{links.gallery}</Link>
          <Link to="/about">{links.about}</Link>
          <Link to="/faq">{links.faq}</Link>
          <Link to="/custom-order">{links.customOrder}</Link>
        </nav>

        <nav className="footer__col" aria-label={t('footer.help')}>
          <p className="footer__heading">{t('footer.help')}</p>
          <Link to="/faq#sizing">{links.sizing}</Link>
          <Link to="/faq#shipping">{links.shipping}</Link>
          <Link to="/faq#orders">{links.orders}</Link>
          <Link to="/faq#care">{links.care}</Link>
          <Link to="/contact">{links.contact}</Link>
        </nav>

        <div className="footer__col">
          <p className="footer__heading">{t('footer.stayInTouch')}</p>
          <ExternalLink className="footer__contact" href={INSTAGRAM_URL}>
            <InstagramIcon /> {INSTAGRAM_HANDLE}
          </ExternalLink>
          <a className="footer__contact" href={`mailto:${CONTACT_EMAIL}`}>
            <MailIcon /> {CONTACT_EMAIL}
          </a>
          <ExternalLink className="footer__contact" href={ETSY_URL}>
            <EtsyIcon /> {ETSY_SHOP_NAME}
          </ExternalLink>
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
