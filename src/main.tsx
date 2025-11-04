import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LoadingScreen } from './components/LoadingScreen.tsx';
import { ScrollProvider } from './contexts/ScrollContext.tsx';

const Main = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Always show loading screen in development
    // In production, check if loading screen was already shown (in this session)
    const isDevelopment = import.meta.env.DEV;
    const hasShownLoading = sessionStorage.getItem('hasShownLoading');
    
    if (!isDevelopment && hasShownLoading) {
      // Skip loading screen in production if already shown in this session
      setLoading(false);
    } else {
      // Show loading screen
      // Keep it in session storage so it doesn't show again during navigation (production only)
      if (!isDevelopment) {
        sessionStorage.setItem('hasShownLoading', 'true');
      }
    }
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <ScrollProvider>
      <App />
    </ScrollProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>
);