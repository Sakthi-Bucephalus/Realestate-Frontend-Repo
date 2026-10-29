import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Shield,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
  Radio,
  FileText,
  Users2,
  Building2,
} from 'lucide-react';
import { DocumentTitle } from '../../components/public/DocumentTitle';

export const AboutPage = () => {
  return (
    <div className="bg-white">
      <DocumentTitle
        title="About RSVLeadSync"
        description="Learn about RSVLeadSync, an independent lead synchronization and management software platform designed for businesses using Meta Lead Ads."
      />

      {/* Header */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-20 bg-gradient-to-b from-[#FCF8EF]/60 via-white to-white border-b border-[#E8E2D5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCF8EF] border border-[#DEC07A] text-xs font-semibold text-[#8C671D] mb-4">
            <Building2 className="w-3.5 h-3.5 text-[#B88A2E]" />
            <span>Company & Product Purpose</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#262626] tracking-tight mb-6">
            About RSVLeadSync
          </h1>
          <p className="text-base sm:text-lg text-[#525252] leading-relaxed max-w-2xl mx-auto">
            A reliable lead synchronization and management platform for businesses using Meta Lead Ads.
          </p>
        </div>
      </section>

      {/* Core Statement & Overview */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#E8E2D5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-[#F8F8F6] border border-[#E8E2D5] shadow-card">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#262626] mb-6">
              Our Mission & Focus
            </h2>

            {/* Exact Required Brand Description */}
            <div className="space-y-4 text-sm sm:text-base text-[#525252] leading-relaxed">
              <p>
                RSVLeadSync is a software platform designed to help businesses organize their lead management workflow by connecting supported advertising lead sources with their CRM processes.
              </p>
              <p>
                Our focus is to make authorized lead synchronization easier to understand, more organized, and more practical for businesses that want to manage customer inquiries efficiently.
              </p>
              <div className="p-4 rounded-xl bg-[#FCF8EF] border border-[#DEC07A] text-xs sm:text-sm text-[#8C671D] font-medium">
                RSVLeadSync is independently developed and is not affiliated with or endorsed by Meta Platforms, Inc.
              </div>
            </div>
          </div>

          {/* Architectural Principles */}
          <div className="mt-14">
            <h3 className="text-xs font-bold text-[#8C671D] uppercase tracking-widest mb-2 text-center">
              Core Principles
            </h3>
            <h4 className="text-xl sm:text-2xl font-extrabold text-[#262626] text-center mb-8">
              How We Build & Operate
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl border border-[#E8E2D5] bg-white">
                <div className="w-8 h-8 rounded-lg bg-[#FCF8EF] text-[#8C671D] flex items-center justify-center font-bold mb-3 border border-[#DEC07A]">
                  <Shield className="w-4 h-4 text-[#B88A2E]" />
                </div>
                <h5 className="text-sm font-bold text-[#262626] mb-1.5">
                  Permission-First Architecture
                </h5>
                <p className="text-xs text-[#737373] leading-relaxed">
                  We request and handle only the minimal access scopes required to discover authorized Pages and ingest lead form responses.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[#E8E2D5] bg-white">
                <div className="w-8 h-8 rounded-lg bg-[#FCF8EF] text-[#8C671D] flex items-center justify-center font-bold mb-3 border border-[#DEC07A]">
                  <Lock className="w-4 h-4 text-[#B88A2E]" />
                </div>
                <h5 className="text-sm font-bold text-[#262626] mb-1.5">
                  Data Governance & Security
                </h5>
                <p className="text-xs text-[#737373] leading-relaxed">
                  Meta access tokens are encrypted at rest using server-side AES-256 cryptography, and access is governed by strict role hierarchies.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[#E8E2D5] bg-white">
                <div className="w-8 h-8 rounded-lg bg-[#FCF8EF] text-[#8C671D] flex items-center justify-center font-bold mb-3 border border-[#DEC07A]">
                  <FileText className="w-4 h-4 text-[#B88A2E]" />
                </div>
                <h5 className="text-sm font-bold text-[#262626] mb-1.5">
                  Operational Transparency
                </h5>
                <p className="text-xs text-[#737373] leading-relaxed">
                  We maintain comprehensive public documentation, verifiable contact channels, and honest statements regarding system capabilities.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[#E8E2D5] bg-white">
                <div className="w-8 h-8 rounded-lg bg-[#FCF8EF] text-[#8C671D] flex items-center justify-center font-bold mb-3 border border-[#DEC07A]">
                  <Radio className="w-4 h-4 text-[#B88A2E]" />
                </div>
                <h5 className="text-sm font-bold text-[#262626] mb-1.5">
                  Reliable Dual Ingestion
                </h5>
                <p className="text-xs text-[#737373] leading-relaxed">
                  Event-driven webhooks deliver sub-second notifications, while on-demand manual batch reconciliation offers dependable failover.
                </p>
              </div>
            </div>
          </div>

          {/* Owner Deployment Verification Note */}
          <div className="mt-12 p-5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#737373] space-y-2">
            <p className="font-bold text-[#262626]">Deployment & Verification Notice:</p>
            <p>
              RSVLeadSync is deployed per organization workspace. Registered corporate address, legal registration details, and jurisdictional assignments are verified per organization deployment.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Links */}
      <section className="py-12 bg-[#F8F8F6]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-bold text-[#8C671D]">
            <Link to="/features" className="hover:underline flex items-center gap-1">
              <span>Explore Features</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span>•</span>
            <Link to="/how-it-works" className="hover:underline flex items-center gap-1">
              <span>How It Works</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:underline flex items-center gap-1">
              <span>Contact & Support</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
