import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Users2,
  CalendarCheck,
  Building2,
  PhoneCall,
  Briefcase,
  DollarSign,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sliders,
  Sparkles,
  Layers,
  Check,
  ChevronRight,
  UserCheck,
} from 'lucide-react';
import { FacebookOfficialIcon, MetaOfficialIcon } from './BrandLogo';

export const ZigzagWorkflowSection = () => {
  const steps = [
    {
      step: '01',
      title: 'CONNECT META',
      description: 'Connect your Facebook Business Account.',
      align: 'left',
      uiContent: (
        <div className="bg-[#111827] text-white p-4 sm:p-5 rounded-2xl border border-[#202C3D] shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-[#202C3D]">
            <div className="flex items-center gap-2">
              <FacebookOfficialIcon className="w-5 h-5" />
              <span className="text-xs font-bold text-white">Meta OAuth 2.0 Authorization</span>
            </div>
            <span className="text-[10px] font-bold text-[#299D75] bg-[#299D75]/10 px-2 py-0.5 rounded-full border border-[#299D75]/20">
              Verified
            </span>
          </div>

          <div className="mt-3.5 space-y-3">
            <div className="p-3 rounded-xl bg-[#202C3D] border border-[#202C3D]/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#1877F2]/20 text-[#1877F2] font-bold flex items-center justify-center text-xs">
                  fb
                </div>
                <div>
                  <span className="font-bold text-white block">Skyline Realty Group</span>
                  <span className="text-[10px] text-[#A7B0C0]">Business Manager ID: 10482910</span>
                </div>
              </div>
              <span className="text-[#D6B46A] text-[11px] font-semibold">Connected</span>
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px] text-[#A7B0C0]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#299D75]" /> Encrypted Token Access
              </span>
              <button className="px-3 py-1 rounded-lg bg-[#D6B46A] text-[#111827] text-xs font-bold hover:bg-[#C5A257]">
                Connect Meta
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: '02',
      title: 'SELECT LEAD FORMS',
      description: 'Choose the pages and forms you want to track.',
      align: 'right',
      uiContent: (
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E5E0D5] shadow-lg text-[#182230]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D5]">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#D6B46A]" />
              <span className="text-xs font-bold">Select Active Facebook Lead Forms</span>
            </div>
            <span className="text-[10px] font-bold bg-[#F7F4ED] text-[#111827] px-2 py-0.5 rounded border border-[#E5E0D5]">
              3 Selected
            </span>
          </div>

          <div className="mt-3 space-y-2 text-xs">
            {/* Form 1 */}
            <div className="p-2.5 rounded-xl bg-[#F7F4ED] border border-[#D6B46A]/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#D6B46A] text-[#111827] flex items-center justify-center text-[10px]">
                  <Check className="w-3 h-3 text-[#111827]" />
                </div>
                <div>
                  <span className="font-bold text-[#182230] block">3BHK Luxury Brochure 2026</span>
                  <span className="text-[9.5px] text-[#667085]">Skyline Luxury Residences Page</span>
                </div>
              </div>
              <span className="text-[10px] text-[#299D75] font-semibold">Active</span>
            </div>

            {/* Form 2 */}
            <div className="p-2.5 rounded-xl bg-[#F7F4ED] border border-[#D6B46A]/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#D6B46A] text-[#111827] flex items-center justify-center text-[10px]">
                  <Check className="w-3 h-3 text-[#111827]" />
                </div>
                <div>
                  <span className="font-bold text-[#182230] block">Villa Plot Weekend Visit</span>
                  <span className="text-[9.5px] text-[#667085]">Grand Horizon Estates Page</span>
                </div>
              </div>
              <span className="text-[10px] text-[#299D75] font-semibold">Active</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#E5E0D5] flex items-center justify-between">
            <span className="text-[10.5px] text-[#667085]">Auto-sync on publish</span>
            <button className="px-3 py-1 rounded-lg bg-[#111827] text-white text-xs font-bold hover:bg-[#202C3D]">
              Sync Selection
            </button>
          </div>
        </div>
      ),
    },
    {
      step: '03',
      title: 'AUTOMATIC LEAD SYNC',
      description: 'Receive advertising enquiries directly inside your dashboard.',
      align: 'left',
      uiContent: (
        <div className="bg-[#111827] text-white p-4 sm:p-5 rounded-2xl border border-[#202C3D] shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-[#202C3D]">
            <span className="text-xs font-bold text-[#D6B46A] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Live Ingestion Pipeline
            </span>
            <span className="text-[10px] font-bold text-[#299D75] bg-[#299D75]/10 px-2 py-0.5 rounded-full">
              Success: 24 Leads Imported
            </span>
          </div>

          <div className="mt-3.5 space-y-2.5">
            {/* Lead Flow Card */}
            <div className="p-3 rounded-xl bg-[#202C3D] border border-[#202C3D] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D6B46A]/20 text-[#D6B46A] flex items-center justify-center font-bold text-xs">
                  AS
                </div>
                <div>
                  <span className="font-bold text-white block">Ananya Sharma</span>
                  <span className="text-[10px] text-[#A7B0C0]">Synced via Webhook in 0.4s</span>
                </div>
              </div>
              <span className="text-[9.5px] font-bold bg-[#D6B46A] text-[#111827] px-2 py-0.5 rounded-full">
                New Lead
              </span>
            </div>

            {/* Sync Progress Bar */}
            <div className="p-2.5 rounded-xl bg-[#202C3D]/60 border border-[#202C3D] text-[10.5px]">
              <div className="flex justify-between text-[#A7B0C0] mb-1">
                <span>Webhook Health: 100% Delivery</span>
                <span className="text-[#299D75] font-semibold">0 failed</span>
              </div>
              <div className="w-full bg-[#111827] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#299D75] h-full rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: '04',
      title: 'MANAGE & ASSIGN LEADS',
      description: 'Organize and assign every enquiry to your team.',
      align: 'right',
      uiContent: (
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E5E0D5] shadow-lg text-[#182230]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D5]">
            <span className="text-xs font-bold text-[#182230] flex items-center gap-1.5">
              <Users2 className="w-4 h-4 text-[#D6B46A]" /> Lead Assignment & Qualification
            </span>
            <span className="text-[10px] font-bold text-[#DC5252] bg-[#DC5252]/10 px-2 py-0.5 rounded-full">
              Hot Enquiry
            </span>
          </div>

          <div className="mt-3 space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-[#F7F4ED] border border-[#E5E0D5] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#182230] block">Vikramaditya Verma</span>
                <span className="text-[10px] text-[#667085]">Interest: Palm Boulevard Plot #42</span>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-[#DC5252]/10 text-[#DC5252]">
                  Hot
                </span>
                <span className="block text-[9.5px] text-[#667085] mt-0.5">Budget: ₹1.6 Cr</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-[#E5E0D5] flex items-center justify-between text-[11px]">
              <span className="text-[#667085] flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-[#299D75]" /> Assigned Sales Exec:
              </span>
              <span className="font-bold text-[#111827] bg-[#F7F4ED] px-2.5 py-0.5 rounded border border-[#E5E0D5]">
                Priya Menon (Senior VP)
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: '05',
      title: 'AUTOMATE FOLLOW-UPS',
      description: 'Stay connected with every potential buyer.',
      align: 'left',
      uiContent: (
        <div className="bg-[#111827] text-white p-4 sm:p-5 rounded-2xl border border-[#202C3D] shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-[#202C3D]">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <CalendarCheck className="w-4 h-4 text-[#D6B46A]" /> Scheduled Follow-up Activity
            </span>
            <span className="text-[10px] font-bold text-[#E5A23B] bg-[#E5A23B]/10 px-2 py-0.5 rounded-full">
              Reminder Active
            </span>
          </div>

          <div className="mt-3.5 space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-[#202C3D] border border-[#202C3D] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E5A23B]/20 text-[#E5A23B] flex items-center justify-center font-bold">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block">Site Visit Call: Rajesh Nair</span>
                  <span className="text-[10px] text-[#A7B0C0]">Scheduled: Today at 4:30 PM</span>
                </div>
              </div>
              <span className="text-[10px] text-[#299D75] font-semibold">Confirmed</span>
            </div>

            <div className="flex items-center justify-between text-[10.5px] text-[#A7B0C0] px-1">
              <span>Task: Share project master plan brochure</span>
              <span className="text-[#D6B46A]">Assigned: Suresh Rao</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: '06',
      title: 'MANAGE YOUR BUSINESS',
      description: 'Manage your entire real estate operation in one place.',
      align: 'right',
      uiContent: (
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E5E0D5] shadow-lg text-[#182230]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D5]">
            <span className="text-xs font-bold text-[#182230] flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#D6B46A]" /> Real Estate Enterprise Operations
            </span>
            <span className="text-[10px] font-bold bg-[#D6B46A] text-[#111827] px-2 py-0.5 rounded-full">
              Full Suite
            </span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-[#F7F4ED] border border-[#E5E0D5]">
              <span className="text-[10px] text-[#667085] block">Active Plots</span>
              <span className="text-sm font-extrabold text-[#182230]">148</span>
            </div>
            <div className="p-2 rounded-xl bg-[#F7F4ED] border border-[#E5E0D5]">
              <span className="text-[10px] text-[#667085] block">Site Visits</span>
              <span className="text-sm font-extrabold text-[#299D75]">32</span>
            </div>
            <div className="p-2 rounded-xl bg-[#F7F4ED] border border-[#E5E0D5]">
              <span className="text-[10px] text-[#667085] block">Deals Closed</span>
              <span className="text-sm font-extrabold text-[#D6B46A]">12</span>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#E5E0D5] flex items-center justify-between text-[11px] text-[#667085]">
            <span>Payments, CRM, Inventory & HR in sync</span>
            <span className="font-bold text-[#111827]">99.9% Uptime</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-32 bg-[#F7F4ED] border-b border-[#E5E0D5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E0D5] text-xs font-semibold text-[#182230] mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#D6B46A]" />
            <span className="font-bold">Seamless 6-Step Workflow</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#182230] tracking-tight mb-5">
            From Meta Ad Click to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111827] via-[#D6B46A] to-[#C5A257]">
              Closed Real Estate Deal
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#667085]">
            A clear, automated progression designed to eliminate manual data entry and keep high-intent property buyers engaged.
          </p>
        </div>

        {/* ZIGZAG TIMELINE CONTAINER */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Vertical Connecting Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute top-8 bottom-8 left-6 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#D6B46A] via-[#C5A257] to-[#111827]/30" />

          {/* Steps Loop */}
          <div className="space-y-12 sm:space-y-16">
            {steps.map((item, index) => {
              const isLeft = item.align === 'left';
              return (
                <div
                  key={item.step}
                  className="relative flex flex-col md:flex-row items-center"
                >
                  {/* Central Node Badge */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full bg-[#111827] border-2 border-[#D6B46A] text-[#D6B46A] font-extrabold text-xs flex items-center justify-center shadow-md">
                    {item.step}
                  </div>

                  {/* Left Column (Desktop) */}
                  <div
                    className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                      isLeft ? 'md:pr-12 md:text-right' : 'md:pr-12 md:order-1 hidden md:block'
                    }`}
                  >
                    {isLeft ? (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-3"
                      >
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#E5E0D5] text-[11px] font-bold text-[#D6B46A] shadow-sm">
                          STEP {item.step}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#182230]">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#667085] max-w-sm ml-auto">
                          {item.description}
                        </p>
                        <div className="mt-4 text-left">
                          {item.uiContent}
                        </div>
                      </motion.div>
                    ) : (
                      <div className="space-y-3">
                        {/* Empty on desktop for right-aligned items, as card goes to right */}
                      </div>
                    )}
                  </div>

                  {/* Right Column (Desktop) */}
                  <div
                    className={`w-full md:w-1/2 pl-14 md:pl-12 ${
                      !isLeft ? 'md:text-left md:order-2' : 'hidden md:block'
                    }`}
                  >
                    {!isLeft ? (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-3"
                      >
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#E5E0D5] text-[11px] font-bold text-[#D6B46A] shadow-sm">
                          STEP {item.step}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#182230]">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#667085] max-w-sm">
                          {item.description}
                        </p>
                        <div className="mt-4">
                          {item.uiContent}
                        </div>
                      </motion.div>
                    ) : (
                      <div />
                    )}
                  </div>

                  {/* Mobile Only Rendering for right-aligned steps */}
                  {!isLeft && (
                    <div className="w-full pl-14 md:hidden mt-3">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#E5E0D5] text-[11px] font-bold text-[#D6B46A] shadow-sm mb-2">
                        STEP {item.step}
                      </div>
                      <h3 className="text-xl font-extrabold text-[#182230] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#667085] mb-3">
                        {item.description}
                      </p>
                      {item.uiContent}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
