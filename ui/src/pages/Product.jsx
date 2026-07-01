import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductVisual from '../components/ProductVisual.jsx';
import ProductCard from '../components/ProductCard.jsx';
import InquiryForm from '../components/InquiryForm.jsx';
import { ArrowIcon } from '../components/icons.jsx';
import { fetchProduct, fetchProducts } from '../api/client.js';
import {
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  ETSY_URL,
  ETSY_SHOP_NAME,
  IG_PREFERRED_NOTE,
} from '../lib/site.js';
import { formatPrice, STATUS_LABEL } from '../lib/format.js';
import useReveal from '../hooks/useReveal.js';

export default function Product() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | found | missing
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let active = true;
    setStatus('loading');
    setShowForm(false);
    fetchProduct(slug).then(({ data }) => {
      if (!active) return;
      if (!data) {
        setStatus('missing');
        return;
      }
      setProduct(data);
      setStatus('found');
      const cat = data.category?.slug || data.categorySlug;
      if (cat) {
        fetchProducts({ category: cat }).then(({ data: list }) => {
          if (!active) return;
          setRelated(list.filter((p) => p.slug !== data.slug).slice(0, 3));
        });
      }
    });
    return () => {
      active = false;
    };
  }, [slug]);

  useReveal([status, product?.slug, related.length]);

  if (status === 'loading') {
    return (
      <section className="section">
        <div className="container">
          <div className="product">
            <div className="product__media card--skeleton" style={{ minHeight: 360 }} />
            <div className="product__info">
              <div className="card--skeleton" style={{ height: 28, width: '60%', marginBottom: 16 }} />
              <div className="card--skeleton" style={{ height: 16, width: '90%', marginBottom: 10 }} />
              <div className="card--skeleton" style={{ height: 16, width: '80%' }} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (status === 'missing') {
    return (
      <section className="section center">
        <div className="container">
          <h1 className="serif" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
            Design not found
          </h1>
          <p className="muted" style={{ marginBottom: '1.5rem' }}>
            This set may have sold out or been retired.
          </p>
          <Link to="/shop" className="btn btn--primary">
            Back to shop <ArrowIcon className="btn__arrow" />
          </Link>
        </div>
      </section>
    );
  }

  const isOrderable = product.status === 'available' || product.status === 'made_to_order';

  const specs = [
    ['Shape', product.shape],
    ['Length', product.length],
    ['Pieces', product.pieces ? `${product.pieces} chips` : null],
    ['Collection', product.category?.name],
    ['Materials', product.materials],
  ].filter(([, v]) => v);

  return (
    <>
      <section className="section section--tight">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/shop">Shop</Link>
            <span aria-hidden="true">/</span>
            <span>{product.name}</span>
          </nav>

          <div className="product">
            <div className="product__media reveal">
              <ProductVisual product={product} className="product__img" />
              {product.gallery?.length > 0 && (
                <div className="product__thumbs">
                  {product.gallery.map((src, i) => (
                    <img key={i} src={src} alt={`${product.name} detail ${i + 1}`} loading="lazy" />
                  ))}
                </div>
              )}
            </div>

            <div className="product__info reveal">
              <span className={`badge badge--${product.status}`}>
                {STATUS_LABEL[product.status] || product.status}
              </span>
              {product.category?.name && (
                <span className="product__cat">{product.category.name}</span>
              )}
              <h1 className="product__title">{product.name}</h1>
              <p className="product__tagline">{product.tagline}</p>
              <p className="product__price">{formatPrice(product.price, product.currency)}</p>
              <p className="product__desc">{product.description}</p>

              {/* <dl className="specs">
                {specs.map(([k, v]) => (
                  <div key={k} className="specs__row">
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl> */}

              {isOrderable ? (
                <>
                  <button
                    type="button"
                    className="btn btn--primary btn--block"
                    onClick={() => setShowForm((v) => !v)}
                  >
                    {product.status === 'made_to_order' ? 'Request this set' : 'Inquire to order'}
                    <ArrowIcon className="btn__arrow" />
                  </button>
                  <p className="product__hint muted">
                    To order this set, DM us on Instagram ({INSTAGRAM_HANDLE}) — that is our
                    preferred channel and the fastest way to get a reply. {IG_PREFERRED_NOTE} You
                    can also use the inquiry form below, or browse ready-to-ship sets on{' '}
                    <a href={ETSY_URL} target="_blank" rel="noreferrer">
                      {ETSY_SHOP_NAME} on Etsy
                    </a>
                    . We will discuss design details, pricing, and payment (Venmo) before
                    production begins.
                  </p>
                </>
              ) : (
                <div className="product__soldout">
                  {product.status === 'coming_soon'
                    ? `This design is coming soon. DM us on Instagram (${INSTAGRAM_HANDLE}) to be notified when it launches.`
                    : `This design is currently sold out. DM us on Instagram (${INSTAGRAM_HANDLE}) about a restock or custom set.`}
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--ghost"
                    style={{ marginTop: '1rem' }}
                  >
                    Message on Instagram
                  </a>
                </div>
              )}

              {showForm && isOrderable && (
                <div className="product__form">
                  <InquiryForm
                    productSlug={product.slug}
                    defaultSubject={`Order inquiry: ${product.name}`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--base">
          <div className="container">
            <h2 className="serif center" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: '2rem' }}>
              You may also like
            </h2>
            <div className="grid grid--cards">
              {related.map((p) => (
                <div key={p.slug} className="reveal">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
