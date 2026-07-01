import NailIllustration from './NailIllustration.jsx';
import { useLocale } from '../i18n/LocaleContext.jsx';

// Shows a real photo when `product.image` is set; otherwise renders the
// elegant illustrated placeholder keyed to the product's theme.
export default function ProductVisual({ product, className }) {
  const { t } = useLocale();

  if (product?.image) {
    return (
      <img
        className={className}
        src={product.image}
        alt={product.name}
        loading="lazy"
        width="330"
        height="330"
      />
    );
  }

  const ariaLabel = product?.name
    ? t('common.productIllustration', { name: product.name })
    : t('common.productIllustrationFallback');

  return (
    <NailIllustration
      className={className}
      theme={product?.theme}
      seed={product?.slug || 'kimono'}
      ariaLabel={ariaLabel}
    />
  );
}
