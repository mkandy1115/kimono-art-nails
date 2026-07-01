import { Link } from 'react-router-dom';
import ProductVisual from './ProductVisual.jsx';
import { formatPrice } from '../lib/format.js';
import { localizedTagline } from '../lib/productLocale.js';
import { useLocale } from '../i18n/LocaleContext.jsx';

export default function ProductCard({ product }) {
  const { locale, t, messages } = useLocale();
  const statusLabel = messages.status[product.status] || product.status;

  return (
    <Link to={`/shop/${product.slug}`} className="card" aria-label={product.name}>
      <div className="card__media">
        <ProductVisual product={product} className="card__img" />
        <span className={`badge badge--${product.status} card__badge`}>
          {statusLabel}
        </span>
      </div>
      <div className="card__body">
        {product.category?.name && (
          <span className="card__cat">{product.category.name}</span>
        )}
        <h3 className="card__name">{product.name}</h3>
        <p className="card__tag">{localizedTagline(product, locale)}</p>
        <div className="card__foot">
          <span className="card__price">{formatPrice(product.price, product.currency)}</span>
          <span className="card__view">
            {t('common.view')} <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
