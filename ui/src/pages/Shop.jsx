import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { fetchProducts, fetchCategories } from '../api/client.js';
import useReveal from '../hooks/useReveal.js';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([fetchProducts(), fetchCategories()]).then(([prod, cats]) => {
      if (!active) return;
      setProducts(prod.data);
      setCategories(cats.data);
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

  const setCategory = (slug) => {
    const next = new URLSearchParams(searchParams);
    if (slug === 'all') next.delete('category');
    else next.set('category', slug);
    setSearchParams(next, { replace: true });
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero__eyebrow">Shop</span>
          <h1 className="page-hero__title">The collection</h1>
          <p className="page-hero__sub">
            Small-batch sets, ready to wear. Each design is limited — once a batch is gone, it may
            not return.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          {/* Filters */}
          <div className="filters" role="tablist" aria-label="Filter by collection">
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'all'}
              className={`filter${activeCategory === 'all' ? ' is-active' : ''}`}
              onClick={() => setCategory('all')}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                type="button"
                role="tab"
                aria-selected={activeCategory === c.slug}
                className={`filter${activeCategory === c.slug ? ' is-active' : ''}`}
                onClick={() => setCategory(c.slug)}
              >
                {c.name}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid--cards">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card card--skeleton" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="empty">No designs in this collection just yet — check back soon.</p>
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
