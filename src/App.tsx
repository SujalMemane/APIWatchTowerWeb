import { AntigravityCanvas } from './components/AntigravityCanvas';
import { CursorSpotlight } from './components/CursorSpotlight';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductMockup } from './components/ProductMockup';
import { ProblemSection } from './components/ProblemSection';
import { WorkflowProgression } from './components/WorkflowProgression';
import { CapabilitiesGrid } from './components/CapabilitiesGrid';
import { ApiComparisonDemo } from './components/ApiComparisonDemo';
import { ExtensionShowcase } from './components/ExtensionShowcase';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { DeveloperSection } from './components/DeveloperSection';
import { BusinessValue } from './components/BusinessValue';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const handleOpenQuickstart = () => {
    const el = document.getElementById('developer-docs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Antigravity Floating Particles & Graph Canvas */}
      <AntigravityCanvas />

      {/* Background Interactive Cursor Spotlight */}
      <CursorSpotlight />

      {/* Navigation */}
      <Navbar onOpenQuickstart={handleOpenQuickstart} />

      {/* Main Content */}
      <main id="main-content" style={{ flex: 1, position: 'relative', zIndex: 2 }}>
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Hero Product Mockup / Demo */}
        <ProductMockup />

        {/* 3. Problem & Value Statement */}
        <ProblemSection />

        {/* 4. How It Works: 5-Stage Lifecycle */}
        <WorkflowProgression />

        {/* 5. Product Capabilities Grid */}
        <CapabilitiesGrid />

        {/* 6. Interactive API Change Comparison */}
        <ApiComparisonDemo />

        {/* 7. VS Code Extension Showcase */}
        <ExtensionShowcase />

        {/* 8. Architecture & System Flow */}
        <ArchitectureDiagram />

        {/* 9. Developer Resources & Contracts */}
        <DeveloperSection />

        {/* 10. Engineering Business Value */}
        <BusinessValue />

        {/* 11. FAQ Accordion */}
        <FaqSection />

        {/* 12. Final Call to Action */}
        <FinalCta />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
