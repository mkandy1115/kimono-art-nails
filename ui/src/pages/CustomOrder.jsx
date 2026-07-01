import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import { ArrowIcon } from '../components/icons.jsx';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../lib/site.js';
import {
  BASIC_FEE,
  ORDER_TYPES,
  ADDON_ART,
  ADDON_PARTS,
} from '../data/customPricing.js';
import useReveal from '../hooks/useReveal.js';

function PricingTable({ caption, headers, rows }) {
  return (
    <div className="pricing-table-wrap">
      <table className="pricing-table">
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              {row.cells.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CustomOrder() {
  useReveal([]);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero__eyebrow">Custom Order</span>
          <h1 className="page-hero__title">Pricing & options</h1>
          <p className="page-hero__sub">
            Compare custom order types and optional add-ons. Final totals are confirmed with you
            before payment. DM us on Instagram ({INSTAGRAM_HANDLE}) for the fastest reply.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container container--narrow">
          <SectionTitle title="Basic fee" align="center" />
          <div className="reveal">
            <PricingTable
              headers={['Fee', 'Price', 'Includes']}
              rows={[
                {
                  key: 'basic',
                  cells: [BASIC_FEE.label, BASIC_FEE.price, BASIC_FEE.note],
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section section--tight section--base">
        <div className="container container--narrow">
          <SectionTitle title="Order types" align="center" />
          <p className="center muted pricing-intro reveal">
            Choose the path that fits your request. Existing designs use prices listed in the shop.
          </p>
          <div className="reveal">
            <PricingTable
              caption="Compare custom order types"
              headers={['Order type', 'Price', 'Notes']}
              rows={ORDER_TYPES.map((row) => ({
                key: row.type,
                cells: [row.type, row.formula, row.example],
              }))}
            />
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container container--narrow">
          <SectionTitle title="Add-on art" align="center" />
          <p className="center muted pricing-intro reveal">
            These fees apply to <strong>full custom design orders only</strong>.
          </p>
          <div className="reveal">
            <PricingTable
              caption="Optional art upgrades per nail"
              headers={['Add-on', 'Price']}
              rows={ADDON_ART.map((row) => ({
                key: row.item,
                cells: [row.item, row.price],
              }))}
            />
          </div>
        </div>
      </section>

      <section className="section section--tight section--base">
        <div className="container container--narrow">
          <SectionTitle title="Charms & parts" align="center" />
          <p className="center muted pricing-intro reveal">
            Additional charms and parts for full custom design orders.
          </p>
          <div className="reveal">
            <PricingTable
              caption="Optional charms and parts"
              headers={['Size', 'Price']}
              rows={ADDON_PARTS.map((row) => ({
                key: row.item,
                cells: [row.item, row.price],
              }))}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band reveal">
            <h2 className="cta-band__title">Ready to order a custom set?</h2>
            <p className="cta-band__sub">
              DM us on Instagram for the fastest reply, or send an inquiry and we will get back to
              you.
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
