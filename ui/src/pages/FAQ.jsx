import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import { ArrowIcon } from '../components/icons.jsx';
import {
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  ETSY_URL,
  ETSY_SHOP_NAME,
  CONTACT_EMAIL,
  IG_PREFERRED_NOTE,
} from '../lib/site.js';
import useReveal from '../hooks/useReveal.js';

const GROUPS = [
  {
    id: 'orders',
    title: 'How to order',
    items: [
      {
        q: 'How do I place an order?',
        a: `For custom or made-to-order sets, contact us on Instagram DM (${INSTAGRAM_HANDLE}) — that is our preferred channel and the fastest way to get a reply. You can also email ${CONTACT_EMAIL} or use the inquiry form on our Contact page. We will discuss the design, pricing, and order details before purchase. ${IG_PREFERRED_NOTE}`,
      },
      {
        q: 'Can I buy ready-to-ship sets without a custom order?',
        a: `Yes. Ready-to-ship nail sets are available on our Etsy shop (${ETSY_SHOP_NAME}). Browse available designs at ${ETSY_URL.replace('https://', '')} and purchase directly there.`,
      },
    ],
  },
  {
    id: 'sizing',
    title: 'Sizing & fit',
    items: [
      {
        q: 'How do I measure my nail size?',
        a: '① Measuring tape: Place a soft tape measure across the widest part of each nail (near the base) and read the width in millimeters. ② Tape and ruler: Put clear tape over the nail, mark both edges, remove the tape, and measure the distance between the marks with a ruler — that length in mm is your nail width.',
      },
      {
        q: 'Any tips for choosing a size?',
        a: 'Measure along the curve of your nail, not in a straight line across flat space. If you are between sizes or unsure, choose a slightly larger size — you can file the nails down for a natural fit.',
      },
      {
        q: 'Can I order a custom fit?',
        a: 'Yes. Made-to-order and custom sets are created to your measurements. Our basic custom fee covers 10 nails sized to your nails. Share your measurements via Instagram DM or email when you order.',
      },
    ],
  },
  {
    id: 'shipping',
    title: 'Shipping',
    items: [
      {
        q: 'How are orders shipped?',
        a: 'All orders are shipped from the USA with a tracking number. Once your order has shipped, you can track delivery status using the tracking service.',
      },
      {
        q: 'When will my order arrive?',
        a: 'The shipping date is the day the package is handed to the postal service — not the delivery date. Delivery times vary depending on your location, weather, and carrier conditions. We will provide your tracking number after shipment.',
      },
      {
        q: 'What if my package is delayed or lost in transit?',
        a: 'For delays, lost packages, or other issues while the shipment is with the carrier, please contact the shipping carrier directly using your tracking number.',
      },
    ],
  },
  {
    id: 'payment',
    title: 'Payment',
    items: [
      {
        q: 'How do I pay for custom press-on nails?',
        a: 'The final price is confirmed after we discuss the design and any additional options. Once the total is agreed, payment is made through Venmo. Production begins after payment is confirmed.',
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Custom order pricing',
    items: [
      {
        q: 'What is the basic custom order fee?',
        a: 'Custom made-to-order creation fee: $10. This covers 10 nails made to fit your nail sizes.',
      },
      {
        q: 'How much do existing design orders cost?',
        a: 'Size customization for a design already in our collection: design price + $10 basic fee. Color change for an existing design: design price + $10 basic fee + $20.',
      },
      {
        q: 'What about simple one-color designs?',
        a: 'One color: $10. Magnet one color: $20.',
      },
      {
        q: 'What is a full custom design order?',
        a: 'Full custom design: $10 basic fee + $40.',
      },
      {
        q: 'What additional art fees apply?',
        a: 'Additional art fees apply to full custom design orders only: Japanese pattern art +$4 per nail, mirror art +$3 per nail, hand-painted design +$2 and up per nail, magnet +$1 per nail. Additional charms/parts: large +$2, medium +$1.50, small +$1.',
      },
    ],
  },
  {
    id: 'policies',
    title: 'Cancellations & returns',
    items: [
      {
        q: 'When can an order be canceled?',
        a: 'Orders may be canceled if we do not receive a reply within 72 hours during the order discussion, or if payment is not confirmed within 72 hours after we send the purchase page — unless you have told us your expected payment date in advance. Cancellations due to customer preference after purchase are generally not accepted.',
      },
      {
        q: 'Do you accept returns or exchanges?',
        a: 'We do not accept returns or exchanges when the design does not match your expectations, when the wrong size was selected by the customer, or for change-of-mind cancellations. If there is a mistake on our part — such as incorrect sizing or a defect — please contact us within one week of delivery and we will resolve it sincerely.',
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
            Answers about ordering, sizing, shipping, and custom pricing. For the fastest reply,
            DM us on Instagram.
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
            <p className="cta-band__sub">
              DM us on Instagram for the quickest response, or email us if you prefer.
            </p>
            <div className="hero__cta center">
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="btn btn--primary">
                Message on Instagram <ArrowIcon className="btn__arrow" />
              </a>
              <Link to="/contact" className="btn btn--ghost">
                Contact page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
