import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What is LevoraLead?',
      a: 'LevoraLead is a comprehensive Real Estate Lead Automation and Business Management Platform that connects Meta Lead Ads with a centralized operations system for CRM, properties, site visits, bookings, and payments.',
    },
    {
      q: 'How do I connect my Meta account?',
      a: 'You can connect your Meta account by signing in to your LevoraLead dashboard, navigating to the "Connect Meta" module, and authorizing via official Facebook OAuth 2.0. This allows LevoraLead to securely receive lead form responses without manual file exports.',
    },
    {
      q: 'Can I automatically receive Facebook Lead Ads enquiries?',
      a: 'Yes. LevoraLead integrates with Meta real-time webhooks, ensuring that every time a buyer submits an instant form on Facebook or Instagram, the lead is immediately created in your dashboard in under a second.',
    },
    {
      q: 'Can I connect multiple Facebook Pages?',
      a: 'Yes. You can connect and manage multiple verified Facebook Pages belonging to different real estate projects, joint ventures, or regional branches within a single organization workspace.',
    },
    {
      q: 'Can I manage multiple Lead Forms?',
      a: 'Yes. You can select specific lead generation forms across any connected Facebook Page, track which campaigns produce higher-intent enquiries, and route leads accordingly.',
    },
    {
      q: 'Can I assign leads to employees?',
      a: 'Yes. LevoraLead provides automated assignment rules and manual reassignment, allowing managers to allocate incoming property buyers to sales executives and relationship managers instantly.',
    },
    {
      q: 'Can I schedule follow-up reminders?',
      a: 'Yes. You can schedule specific follow-up dates and times, set reminder alerts for sales agents, track overdue tasks, and log call outcomes directly in the lead profile.',
    },
    {
      q: 'Can I manage properties and site visits?',
      a: 'Yes. LevoraLead includes dedicated modules to catalog apartments, plots, and villas with live availability, schedule physical or virtual site visits, and coordinate client itineraries.',
    },
   
    {
      q: 'Is LevoraLead suitable for my entire real estate team?',
      a: 'Yes. LevoraLead supports multi-user collaboration with granular role-based permissions tailored for Administrators, Sales Managers, Telecallers, and Accountants.',
    },
    {
      q: 'How can I get started?',
      a: 'Click the "Get Started" or "Sign In" button at the top of the page. Once signed into your workspace, proceed through the setup guide to link your Meta account and begin organizing your real estate sales operations.',
    },
  ];

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#F7F4ED] border-b border-[#E5E0D5] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E0D5] text-xs font-semibold text-[#182230] mb-4 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#D6B46A]" />
            <span className="font-bold">Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182230] tracking-tight mb-4">
            Everything You Need to Know About{' '}
            <span className="text-[#D6B46A]">LevoraLead</span>
          </h2>

          <p className="text-sm sm:text-base text-[#667085]">
            Quick answers regarding Meta integrations, real estate workflow automation, and platform capabilities.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#D6B46A] shadow-md'
                    : 'bg-white/80 border-[#E5E0D5] hover:bg-white hover:border-[#D6B46A]/50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full text-left px-5 py-4 sm:py-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-[#182230] flex items-center gap-3">
                    <span className="text-xs font-mono font-extrabold text-[#D6B46A]">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span>{faq.q}</span>
                  </span>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-[#111827] text-[#D6B46A] rotate-180' : 'bg-[#F7F4ED] text-[#667085]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#667085] leading-relaxed border-t border-[#E5E0D5]/40 pl-11">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
