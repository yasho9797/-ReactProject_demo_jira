import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


import { store, persistor } from './Components/store/store'; 

// ייבוא הקומפוננטה הראשית וספריות העיצוב
import App from './App.jsx';
import "primereact/resources/themes/lara-light-cyan/theme.css"; 
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css"; 
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> 
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);