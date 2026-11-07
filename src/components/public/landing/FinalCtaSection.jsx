import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { BrandLogo, MetaOfficialIcon } from './BrandLogo';

export const FinalCtaSection = () => {
  return (
    <section className="py-20 sm:py-32 bg-[#111827] text-white relative overflow-hidden">
      {/* Subtle luxury gold gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#D6B46A]/15 to-[#C5A257]/10 blur-3xl rounded-full pointer-events-none" />

      {/* Subtle dashboard UI watermark in background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <div className="w-[1000px] h-[600px] border border-white/20 rounded-3xl grid grid-cols-12 p-8">
          <div className="col-span-3 border-r border-white/20 pr-4 space-y-4">
            <div className="h-4 bg-white/40 rounded w-3/4" />
            <div className="h-4 bg-white/20 rounded w-1/2" />
            <div className="h-4 bg-white/20 rounded w-2/3" />
          </div>
          <div className="col-span-9 pl-6 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-20 bg-white/20 rounded-xl" />
              <div className="h-20 bg-white/20 rounded-xl" />
              <div className="h-20 bg-white/20 rounded-xl" />
            </div>
            <div className="h-48 bg-white/10 rounded-2xl" />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Brand Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#202C3D] border border-[#D6B46A]/40 text-xs font-semibold text-[#D6B46A] mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real Estate Lead Acceleration</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6 max-w-4xl mx-auto">
          Take Control of Every Lead.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D6B46A] via-[#F3E9D2] to-[#D6B46A]">
            Grow Your Business.
          </span>
        </h2>

        {/* Supporting text */}
        <p className="text-base sm:text-lg lg:text-xl text-[#A7B0C0] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Bring your advertising, customers, team, and business operations together.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#D6B46A] hover:bg-[#C5A257] active:scale-[0.98] text-[#111827] text-base font-extrabold shadow-[0_4px_25px_rgba(214,180,106,0.35)] transition-all duration-200"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 text-[#111827]" />
          </Link>

          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#202C3D] hover:bg-[#202C3D]/80 border border-[#D6B46A]/30 text-white text-base font-bold transition-all duration-200"
          >
            <span>Login to Workspace</span>
          </Link>
        </div>

        {/* Trust Points */}
        <div className="pt-8 border-t border-[#202C3D] flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#A7B0C0]">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D6B46A]" /> Meta Graph API v20.0 Ready
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D6B46A]" /> Multi-Page & Multi-Form Support
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D6B46A]" /> End-to-End Real Estate CRM
          </span>
        </div>
      </div>
    </section>
  );
};
