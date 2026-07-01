import { Link } from 'react-router-dom';
import { ArrowIcon } from '../components/icons.jsx';
import { useLocale } from '../i18n/LocaleContext.jsx';

export default function NotFound() {
  const { messages } = useLocale();
  const nf = messages.notFound;

  return (
    <section className="section center" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <div className="container">
        <span className="page-hero__eyebrow">{nf.eyebrow}</span>
        <h1 className="serif" style={{ fontSize: 'clamp(2rem, 6vw, 3.4rem)', margin: '0.5rem 0 1rem' }}>
          {nf.title}
        </h1>
        <p className="muted" style={{ maxWidth: '42ch', margin: '0 auto 2rem' }}>
          {nf.sub}
        </p>
        <Link to="/" className="btn btn--primary">
          {nf.button} <ArrowIcon className="btn__arrow" />
        </Link>
      </div>
    </section>
  );
}
