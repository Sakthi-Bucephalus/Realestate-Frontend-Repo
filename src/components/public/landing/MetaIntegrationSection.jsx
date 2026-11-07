import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Zap,
  Sliders,
  Radio,
  Layers,
  ChevronRight,
  Database,
  Lock,
  Sparkles,
  ArrowDownRight,
  FileCheck2,
} from 'lucide-react';
import { FacebookOfficialIcon, MetaOfficialIcon } from './BrandLogo';

export const MetaIntegrationSection = () => {
  const [activeStep, setActiveStep] = useState(3);

  const workflowSteps = [
    { num: '01', title: 'CONNECT ACCOUNT', desc: 'OAuth 2.0 Meta authorization' },
    { num: '02', title: 'SELECT PAGES', desc: 'Choose active real estate pages' },
    { num: '03', title: 'SELECT LEAD FORMS', desc: 'Map instant lead forms' },
    { num: '04', title: 'SYNC LEADS', desc: 'Sub-second webhook pipeline' },
    { num: '05', title: 'MANAGE LEADS', desc: 'Auto-assign & execute follow-up' },
  ];

  return (
    <section id="integration" className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E5E0D5] relative overflow-hidden">
      {/* Decorative subtle background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#E5E0D5_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F4ED] border border-[#E5E0D5] text-xs font-semibold text-[#182230] mb-4">
            <FacebookOfficialIcon className="w-3.5 h-3.5" />
            <span className="font-bold text-[#182230]">Meta Platform Integration</span>
            <span className="text-[#D6B46A]">•</span>
            <span className="text-[#667085]">Zero-Loss Lead Delivery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#182230] tracking-tight leading-tight mb-5">
            Your Meta Ads. Your Leads.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111827] via-[#D6B46A] to-[#C5A257]">
              One Dashboard.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#667085] leading-relaxed">
            Connect your Facebook Business Account and manage your advertising enquiries directly inside LevoraLead.
          </p>
        </div>

        {/* TWO-SIDED INTEGRATION VISUALIZATION */}
        <div className="max-w-6xl mx-auto bg-[#F7F4ED]/60 rounded-3xl border border-[#E5E0D5] p-4 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* LEFT SIDE: Official Facebook / Meta Connection Interface */}
            <div className="lg:col-span-5 rounded-2xl bg-white border border-[#E5E0D5] p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D5]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1877F2]/10 flex items-center justify-center">
                    <FacebookOfficialIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#182230]">Facebook Business Suite</h3>
                    <p className="text-[11px] text-[#667085]">ID: 894028491823901</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#299D75] bg-[#299D75]/10 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-[#299D75]" /> Authorized
                </span>
              </div>

              {/* Connected Pages list inside Meta card */}
              <div className="mt-4 space-y-2.5">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#667085]">
                  Active Connected Real Estate Pages
                </span>

                <div className="p-2.5 rounded-xl bg-[#F7F4ED] border border-[#E5E0D5] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#1877F2] text-white flex items-center justify-center text-[10px] font-bold">
                      S
                    </div>
                    <div>
                      <span className="font-bold text-[#182230] block">Skyline Residences Official</span>
                      <span className="text-[10px] text-[#667085]">2 Active Campaigns • 3 Lead Forms</span>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#299D75]" />
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-[#E5E0D5] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#1877F2] text-white flex items-center justify-center text-[10px] font-bold">
                      G
                    </div>
                    <div>
                      <span className="font-bold text-[#182230] block">Grand Horizon Townships</span>
                      <span className="text-[10px] text-[#667085]">1 Active Campaign • 2 Lead Forms</span>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#299D75]" />
                </div>
              </div>

              {/* Active Forms */}
              <div className="mt-4 pt-3 border-t border-[#E5E0D5]">
                <div className="flex items-center justify-between text-xs text-[#667085] mb-2">
                  <span>Selected Lead Forms</span>
                  <span className="font-bold text-[#182230]">4 of 4 Forms Synced</span>
                </div>
                <div className="bg-[#111827] text-white rounded-xl p-2.5 text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium">
                    <FileCheck2 className="w-3.5 h-3.5 text-[#D6B46A]" /> Instant Form: 3BHK Pre-Launch
                  </span>
                  <span className="text-[10px] bg-[#D6B46A] text-[#111827] px-2 py-0.5 rounded font-extrabold">
                    Listening
                  </span>
                </div>
              </div>
            </div>

            {/* CENTER: Animated Conduit & Ingestion Indicator */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 lg:py-0">
              <div className="flex lg:flex-col items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#111827] border border-[#D6B46A] flex items-center justify-center shadow-lg relative">
                  <RefreshCw className="w-5 h-5 text-[#D6B46A] animate-spin" style={{ animationDuration: '4s' }} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#299D75] rounded-full border-2 border-white" />
                </div>

                <div className="text-center">
                  <span className="text-[11px] font-extrabold text-[#182230] uppercase tracking-wider block">
                    Instant Webhook
                  </span>
                  <span className="text-[10px] font-bold text-[#299D75] bg-[#299D75]/10 px-2 py-0.5 rounded-full inline-block mt-0.5">
                    &lt; 0.8s Sync Speed
                  </span>
                </div>

                {/* Animated Dash Line */}
                <div className="hidden lg:flex flex-col items-center gap-1 my-1">
                  <span className="w-1 h-3 rounded-full bg-[#D6B46A] animate-pulse" />
                  <span className="w-1 h-3 rounded-full bg-[#D6B46A] opacity-75" />
                  <span className="w-1 h-3 rounded-full bg-[#D6B46A] opacity-50" />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: LevoraLead Dashboard Ingestion View */}
            <div className="lg:col-span-5 rounded-2xl bg-[#111827] border border-[#202C3D] p-5 text-white shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#202C3D]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#202C3D] border border-[#D6B46A]/50 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-[#D6B46A]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">LevoraLead Incoming Stream</h3>
                    <p className="text-[11px] text-[#A7B0C0]">Auto-Assignment & CRM Ready</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#D6B46A] bg-[#D6B46A]/20 px-2 py-0.5 rounded-full border border-[#D6B46A]/40">
                  Real-time Ingestion
                </span>
              </div>

              {/* Incoming Cards */}
              <div className="mt-4 space-y-2.5">
                {/* Lead 1 */}
                <div className="p-3 rounded-xl bg-[#202C3D] border border-[#202C3D] hover:border-[#D6B46A]/60 transition-colors">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white">Ananya Sharma</span>
                    <span className="text-[9.5px] font-extrabold bg-[#D6B46A] text-[#111827] px-2 py-0.2 rounded-full">
                      New Lead
                    </span>
                  </div>
                  <div className="text-[11px] text-[#A7B0C0] flex items-center justify-between">
                    <span>Skyline Royal 3BHK • ₹1.45 Cr</span>
                    <span className="text-[#299D75] font-semibold">Auto-assigned: Priya M.</span>
                  </div>
                </div>

                {/* Lead 2 */}
                <div className="p-3 rounded-xl bg-[#202C3D]/80 border border-[#202C3D]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white">Vikramaditya Verma</span>
                    <span className="text-[9.5px] font-extrabold bg-[#DC5252] text-white px-2 py-0.2 rounded-full">
                      Hot Lead
                    </span>
                  </div>
                  <div className="text-[11px] text-[#A7B0C0] flex items-center justify-between">
                    <span>Palm Boulevard Plot #42</span>
                    <span className="text-[#299D75] font-semibold">Auto-assigned: Rajesh K.</span>
                  </div>
                </div>
              </div>

              {/* Status footer inside dark card */}
              <div className="mt-4 pt-3 border-t border-[#202C3D] flex items-center justify-between text-xs text-[#A7B0C0]">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D6B46A]" /> No Manual CSV Exports Needed
                </span>
                <span className="text-[#D6B46A] font-semibold text-[11px]">Deduplication: Enabled</span>
              </div>
            </div>
          </div>

          {/* BELOW VISUALIZATION: 5-STEP PROCESS FLOW */}
          <div className="mt-8 pt-6 border-t border-[#E5E0D5]">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {workflowSteps.map((step, idx) => (
                <div
                  key={step.num}
                  className={`p-3 rounded-xl border transition-all text-left relative ${
                    idx === activeStep
                      ? 'bg-white border-[#D6B46A] shadow-sm'
                      : 'bg-white/60 border-[#E5E0D5] hover:bg-white'
                  }`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-extrabold text-[#D6B46A]">{step.num}</span>
                    {idx < 4 && (
                      <ArrowRight className="w-3 h-3 text-[#667085] hidden lg:block" />
                    )}
                  </div>
                  <h4 className="text-xs font-extrabold text-[#182230] leading-tight mb-1">
                    {step.title}
                  </h4>
                  <p className="text-[10.5px] text-[#667085] leading-normal">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
