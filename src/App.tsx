/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoServices } from './components/BentoServices';
import { KineticDataFlow } from './components/KineticDataFlow';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { LiveTerminalLog } from './components/LiveTerminalLog';
import { PricingAndCalculator } from './components/PricingAndCalculator';
import { Footer } from './components/Footer';
import { AuditModal } from './components/AuditModal';
import { LiveAiTestModal } from './components/LiveAiTestModal';

export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditCustomData, setAuditCustomData] = useState<any>(null);
  const [isAiTestModalOpen, setIsAiTestModalOpen] = useState(false);
  const [aiTestInitialMode, setAiTestInitialMode] = useState<'chat' | 'description' | 'review'>('chat');

  const handleOpenAuditModal = (customData?: any) => {
    setAuditCustomData(customData || null);
    setIsAuditModalOpen(true);
  };

  const handleCloseAuditModal = () => {
    setIsAuditModalOpen(false);
    setAuditCustomData(null);
  };

  const handleOpenAiTestModal = (mode: 'chat' | 'description' | 'review' = 'chat') => {
    setAiTestInitialMode(mode);
    setIsAiTestModalOpen(true);
  };

  const handleCloseAiTestModal = () => {
    setIsAiTestModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F5F1EA] selection:bg-[#C9A15A]/30 selection:text-[#E6C280] font-sans antialiased overflow-x-hidden">
      
      {/* Top sticky navbar */}
      <Navbar 
        onOpenAuditModal={() => handleOpenAuditModal()} 
        onOpenAiTestModal={() => handleOpenAiTestModal()} 
      />

      {/* Main Landing Sections */}
      <main>
        {/* 1. Hero with live telemetry dashboard */}
        <Hero 
          onOpenAuditModal={() => handleOpenAuditModal()}
          onOpenAiTestModal={() => handleOpenAiTestModal('description')}
        />

        {/* 2. Bento Grid with 6 interactive services */}
        <BentoServices 
          onOpenAuditModal={(serviceName) => handleOpenAuditModal({ servicesSelected: [serviceName] })}
          onOpenAiTestModal={handleOpenAiTestModal}
        />

        {/* 3. Kinetic Data Flow (Guest -> Kitchen -> Owner) */}
        <KineticDataFlow />

        {/* 4. Portfolio showcase of real projects (FreshFish, SABR, SUDO) */}
        <PortfolioShowcase />

        {/* 5. Live Terminal & Real-Time Log */}
        <LiveTerminalLog />

        {/* 6. Transparent Pricing & Interactive Custom Calculator */}
        <PricingAndCalculator 
          onOpenAuditModal={handleOpenAuditModal} 
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenAuditModal={() => handleOpenAuditModal()}
        onOpenAiTestModal={() => handleOpenAiTestModal()}
      />

      {/* Interactive Modals */}
      <AuditModal 
        isOpen={isAuditModalOpen} 
        onClose={handleCloseAuditModal}
        customData={auditCustomData}
      />

      <LiveAiTestModal 
        isOpen={isAiTestModalOpen}
        onClose={handleCloseAiTestModal}
        initialMode={aiTestInitialMode}
      />

    </div>
  );
}

