import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext.jsx';

export default function Logo() {
  const { t } = useLocale();

  return (
    <Link to="/" className="logo" aria-label={t('common.logoHome')}>
      <img
        className="logo__img"
        src="/logo-grey.png"
        alt=""
        width="180"
        height="48"
      />
    </Link>
  );
}
