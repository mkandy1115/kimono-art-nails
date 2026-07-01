import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import { ArrowIcon } from '../components/icons.jsx';
import { INSTAGRAM_URL } from '../lib/site.js';
import useReveal from '../hooks/useReveal.js';
import { useLocale } from '../i18n/LocaleContext.jsx';
import ExternalLink from '../components/ExternalLink.jsx';

function buildFaqItems(group, faq, faqAnswer) {
  return group.items.map((item, index) => {
    if (group.id === 'payment' && item.a === null) {
      return {
        q: item.q,
        content: (
          <p className="muted">
            {faq.paymentTextBefore}
            <Link to="/custom-order">{faq.paymentLink}</Link>
            {faq.paymentTextAfter}
          </p>
        ),
      };
    }
    if (group.id === 'care' && index === 0 && item.a === null) {
      return {
        q: item.q,
        panelTall: true,
        content: (
          <>
            <p className="muted">{faq.careApplyText}</p>
            <img
              className="accordion__figure"
              src="/supplies.jpg"
              alt={faq.careApplyImageAlt}
              width="640"
              height="480"
              loading="lazy"
            />
          </>
        ),
      };
    }
    return { q: item.q, a: faqAnswer(item.a) };
  });
}

function Accordion({ items, sectionId }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${sectionId}-button-${i}`;
        const panelId = `${sectionId}-panel-${i}`;
        return (
          <div
            key={item.q}
            className={`accordion__item${isOpen ? ' is-open' : ''}${item.panelTall ? ' accordion__item--tall' : ''}`}
          >
            <button
              type="button"
              id={buttonId}
              className="accordion__head"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{item.q}</span>
              <span className="accordion__icon" aria-hidden="true">
                {isOpen ? '–' : '+'}
              </span>
            </button>
            <div
              id={panelId}
              className="accordion__panel"
              role="region"
              aria-labelledby={buttonId}
              ref={(el) => {
                if (el) el.inert = !isOpen;
              }}
            >
              {item.content ?? <p className="muted">{item.a}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function FAQ() {
  const { messages, faqAnswer } = useLocale();
  const faq = messages.faq;

  const groups = useMemo(
    () =>
      faq.groups.map((group) => ({
        ...group,
        items: buildFaqItems(group, faq, faqAnswer),
      })),
    [faq, faqAnswer]
  );

  useReveal([messages]);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero__eyebrow">{faq.hero.eyebrow}</span>
          <h1 className="page-hero__title">{faq.hero.title}</h1>
          <p className="page-hero__sub">
            {faq.hero.subBefore}
            <Link to="/custom-order">{faq.hero.subLink}</Link>
            {faq.hero.subAfter}
          </p>
        </div>
      </section>

      {groups.map((group, idx) => (
        <section
          key={group.id}
          id={group.id}
          className={`section section--tight${idx % 2 === 1 ? ' section--base' : ''}`}
        >
          <div className="container container--narrow">
            <SectionTitle title={group.title} align="center" />
            <div className="reveal">
              <Accordion items={group.items} sectionId={group.id} />
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="container">
          <div className="cta-band reveal">
            <h2 className="cta-band__title">{faq.cta.title}</h2>
            <p className="cta-band__sub">{faq.cta.sub}</p>
            <div className="hero__cta center">
              <ExternalLink href={INSTAGRAM_URL} className="btn btn--primary">
                {faq.cta.instagram} <ArrowIcon className="btn__arrow" />
              </ExternalLink>
              <Link to="/contact" className="btn btn--ghost">
                {faq.cta.contact}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
