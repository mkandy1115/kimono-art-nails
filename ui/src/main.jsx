import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { LocaleProvider } from './i18n/LocaleContext.jsx';

import './styles/tokens.css';
import './styles/global.css';
import './styles/components.css';
import './styles/pages.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </React.StrictMode>
);
