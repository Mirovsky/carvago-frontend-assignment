import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import App from './App';
import WebVitals from './WebVitals';
import './i18n/i18n';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
      <WebVitals showStatusInConsoleLog />
    </HelmetProvider>
  </StrictMode>
);
