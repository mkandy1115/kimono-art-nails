import { Link } from 'react-router-dom';
import { ArrowIcon } from '../components/icons.jsx';

export default function NotFound() {
  return (
    <section className="section center" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <div className="container">
        <span className="page-hero__eyebrow">404</span>
        <h1 className="serif" style={{ fontSize: 'clamp(2rem, 6vw, 3.4rem)', margin: '0.5rem 0 1rem' }}>
          This page drifted away
        </h1>
        <p className="muted" style={{ maxWidth: '42ch', margin: '0 auto 2rem' }}>
          Like a fallen sakura petal, the page you're looking for isn't here. Let's get you back.
        </p>
        <Link to="/" className="btn btn--primary">
          Return home <ArrowIcon className="btn__arrow" />
        </Link>
      </div>
    </section>
  );
}
