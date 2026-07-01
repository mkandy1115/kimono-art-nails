import { useLocale } from '../i18n/LocaleContext.jsx';
import VisuallyHidden from './VisuallyHidden.jsx';

export default function ExternalLink({
  href,
  className,
  children,
  ariaLabel,
  ...props
}) {
  const { t } = useLocale();
  const newTab = t('common.opensInNewTab');

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel ? `${ariaLabel} (${newTab})` : undefined}
      {...props}
    >
      {children}
      {!ariaLabel && <VisuallyHidden>{newTab}</VisuallyHidden>}
    </a>
  );
}
