import { createRoot } from 'react-dom/client';
import { App, AppContextProvider } from './features/app';
import './index.css';

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
