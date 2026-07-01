import { Link } from 'react-router-dom';
import { ArrowIcon } from '../components/icons.jsx';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, CONTACT_EMAIL } from '../lib/site.js';
import { PRICING_SECTIONS, ADDON_SECTION } from '../data/customPricing.js';
import useReveal from '../hooks/useReveal.js';

function PriceRow({ label, price, formula, note, perUnit }) {
  return (
    <div className="price-sheet__entry">
      <div className="price-sheet__row">
        <span className="price-sheet__label">{label}</span>
        {price && (
          <span className="price-sheet__price">
            {price}
            {perUnit && <span className="price-sheet__unit"> / nail</span>}
          </span>
        )}
      </div>
      {formula && <p className="price-sheet__formula">→ {formula}</p>}
      {note && <p className="price-sheet__note">{note}</p>}
    </div>
  );
}

export default function CustomOrder() {
  useReveal([]);

  return (
    <>
      <section className="page-hero page-hero--compact">
        <div className="container">
          <span className="page-hero__eyebrow">Custom Order</span>
          <h1 className="page-hero__title">Price list</h1>
          <p className="page-hero__sub">
            Design details, pricing, and payment are confirmed with you before purchase.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container container--narrow">
          <div className="price-sheet reveal">
            {PRICING_SECTIONS.map((section) => (
              <div key={section.title} className="price-sheet__section">
                <h2 className="price-sheet__heading">{section.title}</h2>
                {section.items.map((item) => (
                  <PriceRow key={item.label} {...item} />
                ))}
              </div>
            ))}

            <div className="price-sheet__section">
              <h2 className="price-sheet__heading">{ADDON_SECTION.title}</h2>
              <p className="price-sheet__aside">{ADDON_SECTION.note}</p>
              {ADDON_SECTION.perNail.map((item) => (
                <PriceRow key={item.label} {...item} perUnit />
              ))}
              <p className="price-sheet__sublabel">Additional charms / parts</p>
              <div className="price-sheet__sub">
                {ADDON_SECTION.parts.map((item) => (
                  <PriceRow key={item.label} {...item} />
                ))}
              </div>
            </div>
          </div>

          <p className="price-sheet__contact muted reveal">
            To order, contact us via Instagram DM ({INSTAGRAM_HANDLE}) or{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will discuss your design
            and send purchase details before payment.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="cta-band reveal">
            <h2 className="cta-band__title">Ready to order?</h2>
            <p className="cta-band__sub">
              DM us on Instagram for the fastest reply, or send an inquiry.
            </p>
            <div className="hero__cta center">
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="btn btn--primary">
                Message on Instagram <ArrowIcon className="btn__arrow" />
              </a>
              <Link to="/contact" className="btn btn--ghost">
                Send an inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
