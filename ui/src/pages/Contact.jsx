import SectionTitle from '../components/SectionTitle.jsx';
import InquiryForm from '../components/InquiryForm.jsx';
import { InstagramIcon, MailIcon } from '../components/icons.jsx';
import useReveal from '../hooks/useReveal.js';

const CONTACT_EMAIL = 'hello@kimonoartnails.com';
const INSTAGRAM_URL = 'https://instagram.com';

export default function Contact() {
  useReveal([]);
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero__eyebrow">Contact</span>
          <h1 className="page-hero__title">Let's talk nails</h1>
          <p className="page-hero__sub">
            Questions about a design, sizing, or a custom set? Send a note and we'll get back to
            you by email — usually within a day or two.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container contact">
          <div className="contact__form reveal">
            <SectionTitle title="Send an inquiry" align="left" />
            <InquiryForm defaultSubject="" />
          </div>

          <aside className="contact__aside reveal">
            <h3 className="serif contact__aside-title">Other ways to reach us</h3>
            <a className="contact__link" href={`mailto:${CONTACT_EMAIL}`}>
              <MailIcon /> {CONTACT_EMAIL}
            </a>
            <a className="contact__link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <InstagramIcon /> @kimonoartnails
            </a>

            <div className="contact__card">
              <h4 className="contact__card-title">Studio hours</h4>
              <p className="muted">
                We reply to inquiries Monday–Friday. Because each set is handmade, please allow a
                little extra time during busy seasons.
              </p>
            </div>

            <div className="contact__card">
              <h4 className="contact__card-title">Custom requests</h4>
              <p className="muted">
                Dreaming of a specific motif or color? Tell us your idea and we'll see what we can
                create together.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
