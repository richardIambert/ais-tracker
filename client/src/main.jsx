import { App } from './features/app';
import { AISMapContextProvider } from './features/ais-map';
import { AISMessageContextProvider } from './features/ais-message';
import { createRoot } from 'react-dom/client';
import './index.css';

createRoot(document.getElementById('root')).render(
  <AISMessageContextProvider>
    <AISMapContextProvider>
      <App />
    </AISMapContextProvider>
  </AISMessageContextProvider>
);
