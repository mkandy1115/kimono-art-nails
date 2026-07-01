import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="KIMONO Art Nails — home">
      <img
        className="logo__img"
        src="/logo-grey.png"
        alt="KIMONO Art Nails"
        width="180"
        height="48"
      />
    </Link>
  );
}
