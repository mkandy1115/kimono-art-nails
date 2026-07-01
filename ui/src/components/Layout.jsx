import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import { useLocale } from '../i18n/LocaleContext.jsx';

export default function Layout() {
  const { t } = useLocale();

  return (
    <>
      <a href="#main" className="skip-link">{t('common.skipToContent')}</a>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
