import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { fetchProducts, fetchCategories } from '../api/client.js';
import useReveal from '../hooks/useReveal.js';
import { useLocale } from '../i18n/LocaleContext.jsx';

export default function Shop() {
  const { messages } = useLocale();
  const shop = messages.shop;
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([fetchProducts(), fetchCategories()]).then(([prod]) => {
      if (!active) return;
      setProducts(prod.data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter(
      (p) => p.categorySlug === activeCategory || p.category?.slug === activeCategory
    );
  }, [products, activeCategory]);

  useReveal([loading, filtered.length, activeCategory]);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero__eyebrow">{shop.hero.eyebrow}</span>
          <h1 className="page-hero__title">{shop.hero.title}</h1>
          <p className="page-hero__sub">{shop.hero.sub}</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          {loading ? (
            <div className="grid grid--cards">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card card--skeleton" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="empty">{shop.empty}</p>
          ) : (
            <div className="grid grid--cards">
              {filtered.map((p) => (
                <div key={p.slug} className="reveal">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
