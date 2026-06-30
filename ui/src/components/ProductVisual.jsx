import NailIllustration from './NailIllustration.jsx';

// Shows a real photo when `product.image` is set; otherwise renders the
// elegant illustrated placeholder keyed to the product's theme.
export default function ProductVisual({ product, className }) {
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
  return (
    <NailIllustration className={className} theme={product?.theme} seed={product?.slug || 'kimono'} />
  );
}
