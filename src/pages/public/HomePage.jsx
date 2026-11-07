import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DocumentTitle } from '../../components/public/DocumentTitle';
import { HeroSection } from '../../components/public/landing/HeroSection';
import { MetaIntegrationSection } from '../../components/public/landing/MetaIntegrationSection';
import { ZigzagWorkflowSection } from '../../components/public/landing/ZigzagWorkflowSection';
import { BusinessModulesSection } from '../../components/public/landing/BusinessModulesSection';
import { LeadManagementSection } from '../../components/public/landing/LeadManagementSection';
import { FollowUpAutomationSection } from '../../components/public/landing/FollowUpAutomationSection';
import { SocialProofSection, MetaTrustSection } from '../../components/public/landing/SocialProofSection';
import { FaqSection } from '../../components/public/landing/FaqSection';
import { FinalCtaSection } from '../../components/public/landing/FinalCtaSection';

export const HomePage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <div className="bg-[#FFFFFF] text-[#182230] selection:bg-[#F3E9D2] selection:text-[#111827]">
      <DocumentTitle
        title="Real Estate Lead Automation & Business Management Platform"
        description="LevoraLead connects Meta Lead Ads with a centralized real estate management system. Capture advertising leads, automate follow-ups, manage inventory, site visits, and bookings."
      />

      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. META INTEGRATION USP */}
      <MetaIntegrationSection />

      {/* 3. SIX-STEP ZIGZAG WORKFLOW */}
      <ZigzagWorkflowSection />

      {/* 4. COMPLETE REAL ESTATE BUSINESS MANAGEMENT */}
      <BusinessModulesSection />

      {/* 5. LEAD MANAGEMENT DASHBOARD SHOWCASE */}
      <LeadManagementSection />

      {/* 6. AUTOMATED FOLLOW-UP SHOWCASE */}
      <FollowUpAutomationSection />

      {/* 7. SOCIAL PROOF – BUSINESS TRUST */}
      <SocialProofSection />

      {/* 8. META INTEGRATION TRUST & SECURITY */}
      <MetaTrustSection />

      {/* 9. FAQ ACCORDION */}
      <FaqSection />

      {/* 10. FINAL CONVERSION CTA */}
      <FinalCtaSection />
    </div>
  );
};
