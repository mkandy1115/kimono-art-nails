import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import { ArrowIcon } from '../components/icons.jsx';
import useReveal from '../hooks/useReveal.js';

const GROUPS = [
  {
    id: 'sizing',
    title: 'Sizing & fit',
    items: [
      {
        q: 'How do I find my size?',
        a: 'Each set comes with a printable sizing guide. Measure the width of each nail at its widest point and match it to the chart. If you are between sizes, we recommend sizing up. You can also send us your measurements and we will size the set for you.',
      },
      {
        q: 'Can I order a custom fit?',
        a: 'Yes. Made-to-order and custom sets are sized to your exact measurements for a glove-like fit. Choose a design marked “Made to order,” or contact us to start a custom request.',
      },
      {
        q: 'What shapes and lengths are available?',
        a: 'Most designs come in almond, oval, coffin, or square, in short to long lengths. The available options are listed on each product page. For other combinations, just ask.',
      },
    ],
  },
  {
    id: 'shipping',
    title: 'Orders & shipping',
    items: [
      {
        q: 'How do I place an order?',
        a: 'We are a tiny studio, so orders are taken by inquiry. On any available design, tap “Inquire to order,” send us a note, and we will reply by email with availability, the total, and payment details.',
      },
      {
        q: 'How long until my set ships?',
        a: 'Ready designs usually ship within 3–5 business days. Made-to-order and custom sets take 1–2 weeks because each one is painted by hand. We will confirm a timeline when you order.',
      },
      {
        q: 'Do you ship worldwide?',
        a: 'Yes, we ship internationally. Shipping cost and estimated delivery time depend on your location and will be confirmed in our reply to your inquiry.',
      },
    ],
  },
  {
    id: 'care',
    title: 'Application, care & reuse',
    items: [
      {
        q: 'How do I apply press-on nails?',
        a: 'Every set includes an application kit (prep pad, adhesive tabs, and glue) with simple instructions. Clean and buff your natural nails, choose the right size for each finger, then apply with tabs for a temporary hold or glue for a longer wear.',
      },
      {
        q: 'How long do they last?',
        a: 'With adhesive tabs, expect a few days of wear — ideal for events. With nail glue, a week or more is common. Wear time varies with your activity and natural nails.',
      },
      {
        q: 'Can I reuse my set?',
        a: 'Absolutely. Gently remove them, clean off any adhesive, and store them in the original case. With care, a well-made set can be worn many times.',
      },
    ],
  },
];

function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={`accordion__item${isOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="accordion__head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{item.q}</span>
              <span className="accordion__icon" aria-hidden="true">
                {isOpen ? '–' : '+'}
              </span>
            </button>
            <div className="accordion__panel">
              <p className="muted">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function FAQ() {
  useReveal([]);
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero__eyebrow">FAQ</span>
          <h1 className="page-hero__title">Good to know</h1>
          <p className="page-hero__sub">
            Answers to the questions we hear most. Still unsure? We're always happy to help.
          </p>
        </div>
      </section>

      {GROUPS.map((group, idx) => (
        <section
          key={group.id}
          id={group.id}
          className={`section section--tight${idx % 2 === 1 ? ' section--base' : ''}`}
        >
          <div className="container container--narrow">
            <SectionTitle title={group.title} align="center" />
            <div className="reveal">
              <Accordion items={group.items} />
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="container">
          <div className="cta-band reveal">
            <h2 className="cta-band__title">Still have a question?</h2>
            <p className="cta-band__sub">Send us a note — we'd love to help you find your set.</p>
            <div className="center">
              <Link to="/contact" className="btn btn--primary">
                Contact us <ArrowIcon className="btn__arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
