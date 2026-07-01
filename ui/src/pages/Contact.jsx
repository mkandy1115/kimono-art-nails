import SectionTitle from '../components/SectionTitle.jsx';
import InquiryForm from '../components/InquiryForm.jsx';
import ExternalLink from '../components/ExternalLink.jsx';
import { InstagramIcon, MailIcon, EtsyIcon } from '../components/icons.jsx';
import {
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  ETSY_URL,
  ETSY_SHOP_NAME,
  CONTACT_EMAIL,
} from '../lib/site.js';
import useReveal from '../hooks/useReveal.js';
import { useLocale } from '../i18n/LocaleContext.jsx';

export default function Contact() {
  const { t, messages } = useLocale();
  const contact = messages.contact;
  useReveal([]);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero__eyebrow">{contact.hero.eyebrow}</span>
          <h1 className="page-hero__title">{contact.hero.title}</h1>
          <p className="page-hero__sub">{contact.hero.sub}</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container contact">
          <div className="contact__form reveal">
            <SectionTitle title={contact.form.title} align="left" />
            <p className="muted">
              {t('common.igPreferredNote')} {contact.form.etsyIntro}{' '}
              <ExternalLink href={ETSY_URL}>
                {t('common.etsyLink')}
              </ExternalLink>
              .
            </p>
            <InquiryForm defaultSubject="" />
          </div>

          <aside className="contact__aside reveal">
            <h3 className="serif contact__aside-title">{contact.aside.title}</h3>
            <ExternalLink className="contact__link" href={INSTAGRAM_URL}>
              <InstagramIcon /> {t('contact.aside.instagram', { handle: INSTAGRAM_HANDLE })}
            </ExternalLink>
            <a className="contact__link" href={`mailto:${CONTACT_EMAIL}`}>
              <MailIcon /> {CONTACT_EMAIL}
            </a>
            <ExternalLink className="contact__link" href={ETSY_URL}>
              <EtsyIcon /> {t('common.etsyOnEtsy', { etsyShop: ETSY_SHOP_NAME })}
            </ExternalLink>

            <div className="contact__card">
              <h4 className="contact__card-title">{contact.cards.ordering.title}</h4>
              <p className="muted">{contact.cards.ordering.text}</p>
            </div>

            <div className="contact__card">
              <h4 className="contact__card-title">{contact.cards.etsy.title}</h4>
              <p className="muted">{contact.cards.etsy.text}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
