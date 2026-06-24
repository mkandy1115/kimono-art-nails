import { Link } from 'react-router-dom';

export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo${light ? ' logo--light' : ''}`} aria-label="KIMONO Art Nails — home">
      <span className="logo__main">KIMONO</span>
      <span className="logo__sub">Art&nbsp;Nails</span>
    </Link>
  );
}
