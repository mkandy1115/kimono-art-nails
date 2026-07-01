import SectionTitle from '../components/SectionTitle.jsx';
import InquiryForm from '../components/InquiryForm.jsx';
import { InstagramIcon, MailIcon, EtsyIcon } from '../components/icons.jsx';
import {
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  ETSY_URL,
  ETSY_SHOP_NAME,
  CONTACT_EMAIL,
  IG_PREFERRED_NOTE,
} from '../lib/site.js';
import useReveal from '../hooks/useReveal.js';

export default function Contact() {
  useReveal([]);
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero__eyebrow">Contact</span>
          <h1 className="page-hero__title">Let's talk nails</h1>
          <p className="page-hero__sub">
            For orders and custom requests, Instagram DM is our preferred channel and the fastest
            way to reach us. You can also email us or send an inquiry below.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container contact">
          <div className="contact__form reveal">
            <SectionTitle title="Send an inquiry" align="left" />
            <p className="muted">
              {IG_PREFERRED_NOTE} Ready-to-ship sets are also on{' '}
              <a href={ETSY_URL} target="_blank" rel="noreferrer">
                Etsy
              </a>
              .
            </p>
            <InquiryForm defaultSubject="" />
          </div>

          <aside className="contact__aside reveal">
            <h3 className="serif contact__aside-title">Other ways to reach us</h3>
            <a className="contact__link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <InstagramIcon /> {INSTAGRAM_HANDLE} (preferred)
            </a>
            <a className="contact__link" href={`mailto:${CONTACT_EMAIL}`}>
              <MailIcon /> {CONTACT_EMAIL}
            </a>
            <a className="contact__link" href={ETSY_URL} target="_blank" rel="noreferrer">
              <EtsyIcon /> {ETSY_SHOP_NAME} on Etsy
            </a>

            <div className="contact__card">
              <h4 className="contact__card-title">How ordering works</h4>
              <p className="muted">
                We discuss design details, pricing, and order specifics before purchase. Payment
                for custom orders is through Venmo after the total is confirmed.
              </p>
            </div>

            <div className="contact__card">
              <h4 className="contact__card-title">Ready-to-ship on Etsy</h4>
              <p className="muted">
                Browse in-stock nail sets on our Etsy shop — no custom consultation needed for
                those listings.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
