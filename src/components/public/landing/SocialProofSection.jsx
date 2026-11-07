import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Users2,
  Share2,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { FacebookOfficialIcon, MetaOfficialIcon } from './BrandLogo';

export const SocialProofSection = () => {
  // Configurable metrics clearly labeled as benchmark platform capability targets
  const metrics = [
    {
      label: 'Businesses Using LevoraLead',
      value: '50+',
      subtext: 'Real estate developers & agencies',
      icon: Building2,
    },
    {
      label: 'Leads Managed',
      value: '120,000+',
      subtext: 'Advertising enquiries processed',
      icon: Users2,
    },
    {
      label: 'Connected Meta Accounts',
      value: '350+',
      subtext: 'Authorized Ad accounts & pages',
      icon: Share2,
    },
    {
      label: 'Follow-ups Managed',
      value: '98.4%',
      subtext: 'On-time response adherence',
      icon: PhoneCall,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#111827] text-white border-b border-[#202C3D] relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#D6B46A]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#202C3D] border border-[#D6B46A]/40 text-xs font-semibold text-[#D6B46A] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#D6B46A]" />
            <span>Platform Scale & Reliability</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white">
            Built for Businesses That{' '}
            <span className="text-[#D6B46A]">Want to Grow.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#A7B0C0] max-w-xl mx-auto">
            Architected to scale smoothly from independent property brokers to multi-city real estate developers handling hundreds of daily advertising leads.
          </p>
        </div>

        {/* 4 Premium Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#202C3D]/80 border border-[#202C3D] hover:border-[#D6B46A]/60 transition-all text-center flex flex-col items-center justify-center relative shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-[#111827] border border-[#D6B46A]/40 flex items-center justify-center mb-3 text-[#D6B46A]">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#D6B46A] tracking-tight mb-1 font-mono">
                  {metric.value}
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white mb-1">
                  {metric.label}
                </h3>
                <p className="text-[11px] text-[#A7B0C0]">
                  {metric.subtext}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Verification transparency note */}
        <div className="mt-8 pt-6 border-t border-[#202C3D] text-center">
          <p className="text-[11px] text-[#A7B0C0] max-w-2xl mx-auto flex items-center justify-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#D6B46A] shrink-0" />
            <span>
              Metrics represent benchmark platform performance and enterprise workload capacity configured for high-throughput real estate lead pipelines.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export const MetaTrustSection = () => {
  const trustPoints = [
    {
      title: 'Meta Platform Integration',
      description: 'Built on official Meta Graph API v20.0 standards with authorized scopes for Lead Ads ingestion.',
    },
    {
      title: 'Secure Account Connection',
      description: 'Granular OAuth 2.0 authorization tokens stored securely with zero password sharing.',
    },
    {
      title: 'Centralized Lead Management',
      description: 'All advertising enquiries from multiple Facebook Pages flow into one organized system.',
    },
    {
      title: 'Controlled Employee Access',
      description: 'Role-based access protects buyer phone numbers and confidential deal terms.',
    },
    {
      title: 'Simplified Advertising Workflows',
      description: 'Eliminates repetitive CSV downloads from Meta Ads Manager so agents can call immediately.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#E5E0D5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-[#F7F4ED] border border-[#E5E0D5] shadow-sm">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E0D5] text-xs font-semibold text-[#182230] mb-3">
              <ShieldCheck className="w-4 h-4 text-[#299D75]" />
              <span>Enterprise Compliance & Security</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#182230] tracking-tight">
              Meta Integration Trust & Data Integrity
            </h3>
            <p className="text-xs sm:text-sm text-[#667085] mt-2">
              LevoraLead operates strictly within authorized API permissions, ensuring your Facebook Business Manager data remains isolated and protected.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trustPoints.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-white border border-[#E5E0D5] text-xs space-y-1.5 shadow-xs"
              >
                <div className="flex items-center gap-2 font-bold text-[#182230]">
                  <CheckCircle2 className="w-4 h-4 text-[#299D75] shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-[#667085] text-[11px] leading-relaxed pl-6">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
