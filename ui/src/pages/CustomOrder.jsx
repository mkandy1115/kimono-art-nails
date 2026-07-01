import { Link } from 'react-router-dom';
import { ArrowIcon } from '../components/icons.jsx';
import ExternalLink from '../components/ExternalLink.jsx';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, CONTACT_EMAIL } from '../lib/site.js';
import useReveal from '../hooks/useReveal.js';
import { useLocale } from '../i18n/LocaleContext.jsx';

function PriceRow({ label, price, formula, note, perUnit, formulaPrefix, perNailLabel }) {
  return (
    <div className="price-sheet__entry">
      <div className="price-sheet__row">
        <span className="price-sheet__label">{label}</span>
        {price && (
          <span className="price-sheet__price">
            {price}
            {perUnit && <span className="price-sheet__unit"> {perNailLabel}</span>}
          </span>
        )}
      </div>
      {formula && <p className="price-sheet__formula">{formulaPrefix} {formula}</p>}
      {note && <p className="price-sheet__note">{note}</p>}
    </div>
  );
}

export default function CustomOrder() {
  const { t, messages } = useLocale();
  const co = messages.customOrder;
  useReveal([]);

  return (
    <>
      <section className="page-hero page-hero--compact">
        <div className="container">
          <span className="page-hero__eyebrow">{co.hero.eyebrow}</span>
          <h1 className="page-hero__title">{co.hero.title}</h1>
          <p className="page-hero__sub">{co.hero.sub}</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container container--narrow">
          <div className="price-sheet reveal">
            {co.pricingSections.map((section) => (
              <div key={section.title} className="price-sheet__section">
                <h2 className="price-sheet__heading">{section.title}</h2>
                {section.items.map((item) => (
                  <PriceRow
                    key={item.label}
                    {...item}
                    formulaPrefix={co.formulaPrefix}
                    perNailLabel={co.perNail}
                  />
                ))}
              </div>
            ))}

            <div className="price-sheet__section">
              <h2 className="price-sheet__heading">{co.addonSection.title}</h2>
              <p className="price-sheet__aside">{co.addonSection.note}</p>
              {co.addonSection.perNail.map((item) => (
                <PriceRow
                  key={item.label}
                  {...item}
                  perUnit
                  perNailLabel={co.perNail}
                />
              ))}
              <p className="price-sheet__sublabel">{co.partsLabel}</p>
              <div className="price-sheet__sub">
                {co.addonSection.parts.map((item) => (
                  <PriceRow key={item.label} {...item} />
                ))}
              </div>
            </div>
          </div>

          <p className="price-sheet__contact muted reveal">
            {t('customOrder.contact', { handle: INSTAGRAM_HANDLE, email: CONTACT_EMAIL })}
          </p>

          <figure className="custom-order-sample reveal">
            <img
              src="/4July-custom.jpg"
              alt={co.sampleImageAlt}
              width="448"
              height="448"
              loading="lazy"
            />
            <figcaption className="custom-order-sample__title">
              {t('customOrder.sampleTitle', { total: co.sampleOrder.total })}
            </figcaption>
            <div className="custom-order-sample__breakdown">
              {co.sampleOrder.lines.map((line) => (
                <PriceRow key={line.label} {...line} />
              ))}
              <p className="price-sheet__sublabel">{co.sampleAddons}</p>
              {co.sampleOrder.addons.map((line) => (
                <PriceRow key={line.label} {...line} />
              ))}
              <div className="custom-order-sample__total">
                <span>{co.total}</span>
                <span>{co.sampleOrder.total}</span>
              </div>
            </div>
          </figure>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="cta-band reveal">
            <h2 className="cta-band__title">{co.cta.title}</h2>
            <p className="cta-band__sub">{co.cta.sub}</p>
            <div className="hero__cta center">
              <ExternalLink href={INSTAGRAM_URL} className="btn btn--primary">
                {co.cta.instagram} <ArrowIcon className="btn__arrow" />
              </ExternalLink>
              <Link to="/contact" className="btn btn--ghost">
                {co.cta.inquiry}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
