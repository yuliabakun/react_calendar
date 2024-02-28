import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ContextProvider } from './components/TodosContext.tsx';
import { CalendarContextProvider } from './components/CalendarContext.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CalendarContextProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </CalendarContextProvider>
  </React.StrictMode>,
);
