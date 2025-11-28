import { lazy, Suspense, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/sections/HeroSection';
import ChatBot from './components/ChatBot';
import { VoiceCommandHelper } from './components/VoiceCommandHelper';
import { AIInsights } from './components/AIInsights';
import { SmartScrollPredictor } from './components/SmartScrollPredictor';
import { AdvancedScreenshotTool } from './components/AdvancedScreenshotTool';

const Scene3D = lazy(() => import('./components/3d/Scene3D').then(module => ({ default: module.Scene3D })));
const AboutSection = lazy(() => import('./components/sections/AboutSection').then(module => ({ default: module.AboutSection })));
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection').then(module => ({ default: module.ProjectsSection })));
const SkillsSection = lazy(() => import('./components/sections/SkillsSection').then(module => ({ default: module.SkillsSection })));
const AchievementsSection = lazy(() => import('./components/sections/AchievementsSection').then(module => ({ default: module.AchievementsSection })));
const StorySection = lazy(() => import('./components/sections/StorySection').then(module => ({ default: module.StorySection })));
// const BlogsSection = lazy(() => import('./components/sections/BlogsSection').then(module => ({ default: module.BlogsSection })));
const ContactSection = lazy(() => import('./components/sections/ContactSection').then(module => ({ default: module.ContactSection })));
const PlanningBoardSection = lazy(() => import('./components/sections/PlanningBoardSection').then(module => ({ default: module.PlanningBoardSection })));

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0a0a0a]">
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
      <Navigation />

      {/* AI-Powered Insights - Top Banner */}
      <div className="relative z-10 pt-20">
        <AIInsights />
      </div>

      <main className="relative z-10">
        <HeroSection />
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading...</div>
          </div>
        }>
          <AboutSection />
          <StorySection />
          <ProjectsSection />
          <SkillsSection />
          <AchievementsSection />
          <PlanningBoardSection />
          {/* <BlogsSection /> */}
          <ContactSection />
        </Suspense>
      </main>

      {/* AI-Enhanced Features */}
      <ChatBot />
      <VoiceCommandHelper />
      <SmartScrollPredictor />
      <AdvancedScreenshotTool />

      <footer className="relative z-10 py-6 md:py-8 text-center text-gray-500 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-xs sm:text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            © 2025 SUJAL TALREJA. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;