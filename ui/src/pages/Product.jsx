import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductVisual from '../components/ProductVisual.jsx';
import ProductCard from '../components/ProductCard.jsx';
import InquiryForm from '../components/InquiryForm.jsx';
import { ArrowIcon } from '../components/icons.jsx';
import ExternalLink from '../components/ExternalLink.jsx';
import { fetchProduct, fetchProducts } from '../api/client.js';
import { INSTAGRAM_URL, ETSY_SHOP_NAME } from '../lib/site.js';
import { formatPrice } from '../lib/format.js';
import { localizedDescription, localizedTagline } from '../lib/productLocale.js';
import useReveal from '../hooks/useReveal.js';
import { useLocale } from '../i18n/LocaleContext.jsx';

export default function Product() {
  const { locale, t, messages } = useLocale();
  const productCopy = messages.product;
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [status, setStatus] = useState('loading');
  const [showForm, setShowForm] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    let active = true;
    setStatus('loading');
    setShowForm(false);
    setActiveImage(null);
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

  useReveal([status, product?.slug, related.length, locale]);

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
            {productCopy.notFound.title}
          </h1>
          <p className="muted" style={{ marginBottom: '1.5rem' }}>
            {productCopy.notFound.sub}
          </p>
          <Link to="/shop" className="btn btn--primary">
            {t('common.backToShop')} <ArrowIcon className="btn__arrow" />
          </Link>
        </div>
      </section>
    );
  }

  const isOrderable = product.status === 'available' || product.status === 'made_to_order';
  const statusLabel = messages.status[product.status] || product.status;
  const mainImage = activeImage ?? product.image;
  const gallery = product.gallery ?? [];
  const thumbImages =
    activeImage === null
      ? gallery
      : [product.image, ...gallery.filter((src) => src !== activeImage)].filter(Boolean);

  const handleThumbClick = (src) => {
    if (src === product.image) {
      setActiveImage(null);
    } else {
      setActiveImage(src);
    }
  };

  const hintVars = {
    igPreferredNote: t('common.igPreferredNote'),
    etsyShop: ETSY_SHOP_NAME,
  };

  return (
    <>
      <section className="section section--tight">
        <div className="container">
          <nav className="crumbs" aria-label={productCopy.breadcrumbAria}>
            <Link to="/shop">{productCopy.breadcrumbShop}</Link>
            <span aria-hidden="true">/</span>
            <span>{product.name}</span>
          </nav>

          <div className="product">
            <div className="product__media reveal">
              {mainImage ? (
                <img
                  className="product__img"
                  src={mainImage}
                  alt={product.name}
                  width="330"
                  height="330"
                />
              ) : (
                <ProductVisual product={product} className="product__img" />
              )}
              {thumbImages.length > 0 && (
                <div className="product__thumbs">
                  {thumbImages.map((src) => (
                    <button
                      key={src}
                      type="button"
                      className="product__thumb"
                      aria-label={t('product.viewPhoto', { name: product.name })}
                      onClick={() => handleThumbClick(src)}
                    >
                      <img src={src} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="product__info reveal">
              <span className={`badge badge--${product.status}`}>{statusLabel}</span>
              {product.category?.name && (
                <span className="product__cat">{product.category.name}</span>
              )}
              <h1 className="product__title">{product.name}</h1>
              <p className="product__tagline">{localizedTagline(product, locale)}</p>
              <p className="product__price">{formatPrice(product.price, product.currency)}</p>
              <p className="product__desc">{localizedDescription(product, locale)}</p>

              {isOrderable ? (
                <>
                  <button
                    type="button"
                    className="btn btn--primary btn--block"
                    onClick={() => setShowForm((v) => !v)}
                  >
                    {product.status === 'made_to_order'
                      ? productCopy.request
                      : productCopy.inquire}
                    <ArrowIcon className="btn__arrow" />
                  </button>
                  <p className="product__hint muted">{t('product.hint', hintVars)}</p>
                </>
              ) : (
                <div className="product__soldout">
                  {product.status === 'coming_soon'
                    ? t('product.comingSoon')
                    : t('product.soldOut')}
                  <ExternalLink
                    href={INSTAGRAM_URL}
                    className="btn btn--ghost"
                    style={{ marginTop: '1rem' }}
                  >
                    {t('common.messageInstagram')}
                  </ExternalLink>
                </div>
              )}

              {showForm && isOrderable && (
                <div className="product__form">
                  <InquiryForm
                    productSlug={product.slug}
                    defaultSubject={t('inquiry.defaultOrderSubject', { name: product.name })}
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
              {productCopy.related}
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
