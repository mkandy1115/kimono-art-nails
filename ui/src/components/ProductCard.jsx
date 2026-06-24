import { Link } from 'react-router-dom';
import ProductVisual from './ProductVisual.jsx';
import { formatPrice, STATUS_LABEL } from '../lib/format.js';

export default function ProductCard({ product }) {
  return (
    <Link to={`/shop/${product.slug}`} className="card" aria-label={product.name}>
      <div className="card__media">
        <ProductVisual product={product} className="card__img" />
        <span className={`badge badge--${product.status} card__badge`}>
          {STATUS_LABEL[product.status] || product.status}
        </span>
      </div>
      <div className="card__body">
        {product.category?.name && (
          <span className="card__cat">{product.category.name}</span>
        )}
        <h3 className="card__name">{product.name}</h3>
        <p className="card__tag">{product.tagline}</p>
        <div className="card__foot">
          <span className="card__price">{formatPrice(product.price, product.currency)}</span>
          <span className="card__view">
            View <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
