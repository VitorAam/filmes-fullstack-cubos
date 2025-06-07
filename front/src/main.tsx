import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ThemeContextProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);