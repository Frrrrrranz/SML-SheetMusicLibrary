import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from './contexts/LanguageContext';
import { LandingScreen } from './screens/LandingScreen';


// NOTE: 全屏沉浸式布局 — Hero 入场动画直接作为开场，不需要额外 SplashScreen
const App: React.FC = () => {
  return (
    <>
      <LanguageProvider>
        <LandingScreen />
      </LanguageProvider>
      <Analytics />
    </>
  );
};

export default App;