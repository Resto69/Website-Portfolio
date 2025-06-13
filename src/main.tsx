import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Portfolio';
import './index.css';
import { PortfolioProvider } from './context/AppContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PortfolioProvider>
      <App />
    </PortfolioProvider>
  </React.StrictMode>
);
