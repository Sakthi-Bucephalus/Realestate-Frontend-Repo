import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Users2,
  Building2,
  CalendarCheck,
  CheckCircle2,
  PhoneCall,
  Clock,
  TrendingUp,
  Sliders,
  DollarSign,
  Briefcase,
  FileText,
  Search,
  Bell,
  ChevronRight,
  Filter,
  Check,
  Circle,
  ExternalLink,
} from 'lucide-react';
import { BrandLogo, FacebookOfficialIcon, MetaOfficialIcon } from './BrandLogo';

export const HeroSection = () => {
  const scrollToPlatform = (e) => {
    e.preventDefault();
    const el = document.getElementById('platform');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-32 sm:pt-40 lg:pt-44 pb-20 sm:pb-32 overflow-hidden bg-[#F7F4ED] border-b border-[#E5E0D5]">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#D6B46A]/15 via-[#F3E9D2]/30 to-transparent blur-3xl rounded-full" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D6B46A]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#202C3D]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Text Group */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E0D5] text-xs font-semibold text-[#182230] shadow-sm mb-6"
          >
            <MetaOfficialIcon className="w-3.5 h-3.5" />
            <span className="font-bold text-[#182230]">Meta Platform Integration</span>
            <span className="text-[#D6B46A]">•</span>
            <span className="text-[#667085]">Instant Webhook Synchronization</span>
          </motion.div>

          {/* Primary Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#182230] tracking-tight leading-[1.12] mb-6"
          >
            Every Lead. Every Follow-up.{' '}
            <span className="relative inline-block text-[#111827]">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#111827] via-[#D6B46A] to-[#C5A257]">
                One Powerful Platform.
              </span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#D6B46A]/20 -z-0 rounded" />
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-[#667085] leading-relaxed max-w-2xl mx-auto mb-8 font-normal"
          >
            Connect your Meta Ads, manage every enquiry, automate follow-ups, and run your real estate business from one platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14"
          >
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#D6B46A] hover:bg-[#C5A257] active:scale-[0.98] text-[#111827] text-sm sm:text-base font-extrabold shadow-[0_4px_20px_rgba(214,180,106,0.35)] transition-all duration-200"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-[#111827]" />
            </Link>

            <a
              href="#platform"
              onClick={scrollToPlatform}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#E5E0D5] hover:border-[#D6B46A] text-[#182230] text-sm sm:text-base font-bold shadow-sm hover:bg-[#F7F4ED] transition-all duration-200"
            >
              <span>Explore Platform</span>
              <ChevronRight className="w-4 h-4 text-[#667085]" />
            </a>
          </motion.div>
        </div>

        {/* HERO VISUAL COMPOSITION: Realistic SaaS Dashboard + Outboard Floating UI Cards */}
        <div className="relative mt-14 sm:mt-20 lg:mt-24 max-w-6xl mx-auto pb-16 sm:pb-20">
          {/* Main Dashboard Mockup Container */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="rounded-2xl border border-[#E5E0D5] bg-[#FFFFFF] shadow-[0_20px_60px_-15px_rgba(17,24,39,0.18)] overflow-hidden relative z-10"
          >
            {/* Window Top Chrome */}
            <div className="bg-[#111827] px-4 py-2.5 flex items-center justify-between border-b border-[#202C3D]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#DC5252]/80" />
                <div className="w-3 h-3 rounded-full bg-[#E5A23B]/80" />
                <div className="w-3 h-3 rounded-full bg-[#299D75]/80" />
                <span className="ml-3 text-[11px] font-semibold text-[#A7B0C0] tracking-wide flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#299D75] animate-pulse" />
                  LevoraLead Real Estate Console — Skyline Grand Properties Workspace
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-[11px] text-[#A7B0C0]">
                <span className="inline-flex items-center gap-1 bg-[#202C3D] px-2 py-0.5 rounded text-[10px] text-[#D6B46A]">
                  <MetaOfficialIcon className="w-2.5 h-2.5" /> Meta Sync Active
                </span>
                <span>Role: Enterprise Admin</span>
              </div>
            </div>

            {/* Dashboard Inner Shell: Midnight Navy Sidebar + White Canvas */}
            <div className="grid grid-cols-12 min-h-[580px] bg-[#FFFFFF]">
              {/* SIDEBAR: Midnight Navy (#111827) */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 bg-[#111827] p-3 text-[#A7B0C0] border-r border-[#202C3D] flex flex-col justify-between hidden md:flex">
                <div className="space-y-4">
                  {/* Sidebar Brand header */}
                  <div className="px-2 py-2 flex items-center border-b border-[#202C3D] pb-3">
                    <BrandLogo size="sm" light={true} />
                  </div>

                  {/* Sidebar Menu Items */}
                  <nav className="space-y-0.5 text-xs">
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#202C3D] text-[#D6B46A] font-bold border-l-2 border-[#D6B46A]">
                      <span className="flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 text-[#D6B46A]" /> Overview
                      </span>
                    </div>

                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-[#202C3D]/60 hover:text-white transition-colors cursor-pointer">
                      <span className="flex items-center gap-2">
                        <Users2 className="w-3.5 h-3.5" /> Leads
                      </span>
                      <span className="bg-[#D6B46A] text-[#111827] text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                        24
                      </span>
                    </div>

                    <div className="flex items-center px-2.5 py-1.5 rounded-lg hover:bg-[#202C3D]/60 hover:text-white transition-colors cursor-pointer">
                      <span className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5" /> Properties
                      </span>
                    </div>

                    <div className="flex items-center px-2.5 py-1.5 rounded-lg hover:bg-[#202C3D]/60 hover:text-white transition-colors cursor-pointer">
                      <span className="flex items-center gap-2">
                        <CalendarCheck className="w-3.5 h-3.5" /> Site Visits
                      </span>
                    </div>

                    <div className="flex items-center px-2.5 py-1.5 rounded-lg hover:bg-[#202C3D]/60 hover:text-white transition-colors cursor-pointer">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Bookings
                      </span>
                    </div>

                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-[#202C3D]/60 hover:text-white transition-colors cursor-pointer">
                      <span className="flex items-center gap-2">
                        <PhoneCall className="w-3.5 h-3.5" /> Follow-ups
                      </span>
                      <span className="bg-[#DC5252] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                        6
                      </span>
                    </div>

                    <div className="flex items-center px-2.5 py-1.5 rounded-lg hover:bg-[#202C3D]/60 hover:text-white transition-colors cursor-pointer">
                      <span className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5" /> Employees
                      </span>
                    </div>

                    <div className="flex items-center px-2.5 py-1.5 rounded-lg hover:bg-[#202C3D]/60 hover:text-white transition-colors cursor-pointer">
                      <span className="flex items-center gap-2">
                        <DollarSign className="w-3.5 h-3.5" /> Payments
                      </span>
                    </div>

                    <div className="flex items-center px-2.5 py-1.5 rounded-lg hover:bg-[#202C3D]/60 hover:text-white transition-colors cursor-pointer">
                      <span className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5" /> Reports
                      </span>
                    </div>

                    <div className="flex items-center px-2.5 py-1.5 rounded-lg hover:bg-[#202C3D]/60 hover:text-white transition-colors cursor-pointer">
                      <span className="flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5" /> Settings
                      </span>
                    </div>
                  </nav>
                </div>

                {/* Sidebar Footer User */}
                <div className="p-2 bg-[#202C3D]/70 rounded-xl border border-[#202C3D] flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#D6B46A] text-[#111827] font-bold flex items-center justify-center text-xs">
                    SR
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-[11px] font-bold text-white truncate">Sakthivel R.</span>
                    <span className="text-[9px] text-[#A7B0C0] truncate">Admin Account</span>
                  </div>
                </div>
              </div>

              {/* MAIN CONTENT AREA */}
              <div className="col-span-12 md:col-span-9 lg:col-span-10 p-3 sm:p-5 flex flex-col gap-4 bg-[#FFFFFF]">
                {/* Sub-header inside Dashboard */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5E0D5]">
                  <div>
                    <h2 className="text-base sm:text-lg font-extrabold text-[#182230]">
                      Real Estate Lead Operations
                    </h2>
                    <p className="text-xs text-[#667085]">
                      Live performance metrics & incoming Meta advertising enquiries
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1.5 bg-[#F7F4ED] border border-[#E5E0D5] px-2.5 py-1 rounded-lg text-[#182230] font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#D6B46A]" />
                      <span>Today • Live Feed</span>
                    </div>
                    <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#111827] text-white text-xs font-semibold">
                      <Filter className="w-3 h-3 text-[#D6B46A]" /> Filter
                    </button>
                  </div>
                </div>

                {/* METRICS ROW (4 Cards) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                  {/* Total Leads */}
                  <div className="p-3 rounded-xl bg-[#F7F4ED]/80 border border-[#E5E0D5]">
                    <div className="flex items-center justify-between text-[#667085] text-[11px] font-semibold mb-1">
                      <span>Total Leads</span>
                      <Users2 className="w-3.5 h-3.5 text-[#182230]" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-extrabold text-[#182230]">1,284</span>
                      <span className="text-[10px] font-bold text-[#299D75] bg-[#299D75]/10 px-1.5 py-0.5 rounded">
                        +18.4%
                      </span>
                    </div>
                    <span className="text-[10px] text-[#667085] mt-1 block">From all Meta ad campaigns</span>
                  </div>

                  {/* New Leads */}
                  <div className="p-3 rounded-xl bg-white border border-[#D6B46A]/50 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-8 h-8 bg-[#D6B46A]/10 rounded-bl-xl flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#D6B46A] animate-ping" />
                    </div>
                    <div className="flex items-center justify-between text-[#667085] text-[11px] font-semibold mb-1">
                      <span>New Leads</span>
                      <span className="text-[10px] font-bold text-[#111827] bg-[#D6B46A] px-1.5 py-0.2 rounded-full">
                        Today
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-extrabold text-[#182230]">38</span>
                      <span className="text-[10px] font-bold text-[#299D75] bg-[#299D75]/10 px-1.5 py-0.5 rounded">
                        Sync Active
                      </span>
                    </div>
                    <span className="text-[10px] text-[#667085] mt-1 block">Avg ingestion speed: 0.8s</span>
                  </div>

                  {/* Hot Leads */}
                  <div className="p-3 rounded-xl bg-[#F7F4ED]/80 border border-[#E5E0D5]">
                    <div className="flex items-center justify-between text-[#667085] text-[11px] font-semibold mb-1">
                      <span>Hot Leads</span>
                      <span className="w-2 h-2 rounded-full bg-[#DC5252]" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-extrabold text-[#182230]">142</span>
                      <span className="text-[10px] font-bold text-[#DC5252] bg-[#DC5252]/10 px-1.5 py-0.5 rounded">
                        High Intent
                      </span>
                    </div>
                    <span className="text-[10px] text-[#667085] mt-1 block">Budget &gt; ₹1.2 Cr+</span>
                  </div>

                  {/* Follow-ups Due */}
                  <div className="p-3 rounded-xl bg-[#F7F4ED]/80 border border-[#E5E0D5]">
                    <div className="flex items-center justify-between text-[#667085] text-[11px] font-semibold mb-1">
                      <span>Follow-ups Due</span>
                      <Clock className="w-3.5 h-3.5 text-[#E5A23B]" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-extrabold text-[#182230]">19</span>
                      <span className="text-[10px] font-bold text-[#E5A23B] bg-[#E5A23B]/10 px-1.5 py-0.5 rounded">
                        Pending
                      </span>
                    </div>
                    <span className="text-[10px] text-[#667085] mt-1 block">Scheduled for today</span>
                  </div>
                </div>

                {/* TWO COLUMN INTERFACE: Recent Leads Table + Analytics Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mt-1">
                  {/* Left 8 Cols: Recent Leads Table */}
                  <div className="lg:col-span-8 rounded-xl border border-[#E5E0D5] bg-white overflow-hidden flex flex-col">
                    <div className="px-3.5 py-2.5 bg-[#F7F4ED] border-b border-[#E5E0D5] flex items-center justify-between">
                      <span className="text-xs font-bold text-[#182230] flex items-center gap-1.5">
                        <Users2 className="w-3.5 h-3.5 text-[#D6B46A]" /> Recent Advertising Enquiries
                      </span>
                      <span className="text-[10px] text-[#667085] font-semibold">Live Updating</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#E5E0D5] text-[10px] uppercase font-bold text-[#667085] bg-[#FFFFFF]">
                            <th className="py-2 px-3">Customer</th>
                            <th className="py-2 px-3">Property Interest</th>
                            <th className="py-2 px-3">Source</th>
                            <th className="py-2 px-3">Status</th>
                            <th className="py-2 px-3">Assigned To</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E0D5]/70 text-[11px]">
                          <tr className="hover:bg-[#F7F4ED]/50 transition-colors">
                            <td className="py-2 px-3 font-semibold text-[#182230]">
                              <div>Ananya Sharma</div>
                              <span className="text-[9.5px] text-[#667085] font-normal">+91 98201 •••••</span>
                            </td>
                            <td className="py-2 px-3 text-[#182230] font-medium">Skyline Royal 3BHK</td>
                            <td className="py-2 px-3">
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#1877F2]/10 text-[#1877F2] font-semibold text-[9.5px]">
                                <FacebookOfficialIcon className="w-2.5 h-2.5" /> Meta Ads
                              </span>
                            </td>
                            <td className="py-2 px-3">
                              <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-[#DC5252]/10 text-[#DC5252] border border-[#DC5252]/20">
                                Hot
                              </span>
                            </td>
                            <td className="py-2 px-3 text-[#667085]">Priya Menon</td>
                          </tr>

                          <tr className="hover:bg-[#F7F4ED]/50 transition-colors">
                            <td className="py-2 px-3 font-semibold text-[#182230]">
                              <div>Vikramaditya Verma</div>
                              <span className="text-[9.5px] text-[#667085] font-normal">+91 98112 •••••</span>
                            </td>
                            <td className="py-2 px-3 text-[#182230] font-medium">Palm Boulevard Plot #42</td>
                            <td className="py-2 px-3">
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#1877F2]/10 text-[#1877F2] font-semibold text-[9.5px]">
                                <FacebookOfficialIcon className="w-2.5 h-2.5" /> Meta Ads
                              </span>
                            </td>
                            <td className="py-2 px-3">
                              <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-[#D6B46A]/20 text-[#111827] border border-[#D6B46A]">
                                New
                              </span>
                            </td>
                            <td className="py-2 px-3 text-[#667085]">Rajesh Kumar</td>
                          </tr>

                          <tr className="hover:bg-[#F7F4ED]/50 transition-colors">
                            <td className="py-2 px-3 font-semibold text-[#182230]">
                              <div>Meera Patel</div>
                              <span className="text-[9.5px] text-[#667085] font-normal">+91 97234 •••••</span>
                            </td>
                            <td className="py-2 px-3 text-[#182230] font-medium">Emerald Horizon Penthouse</td>
                            <td className="py-2 px-3">
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#1877F2]/10 text-[#1877F2] font-semibold text-[9.5px]">
                                <FacebookOfficialIcon className="w-2.5 h-2.5" /> Meta Ads
                              </span>
                            </td>
                            <td className="py-2 px-3">
                              <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-[#299D75]/10 text-[#299D75] border border-[#299D75]/20">
                                Interested
                              </span>
                            </td>
                            <td className="py-2 px-3 text-[#667085]">Suresh Rao</td>
                          </tr>

                          <tr className="hover:bg-[#F7F4ED]/50 transition-colors">
                            <td className="py-2 px-3 font-semibold text-[#182230]">
                              <div>Rajesh K. Nair</div>
                              <span className="text-[9.5px] text-[#667085] font-normal">+91 94471 •••••</span>
                            </td>
                            <td className="py-2 px-3 text-[#182230] font-medium">Grand Orchard Villa #18</td>
                            <td className="py-2 px-3">
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#1877F2]/10 text-[#1877F2] font-semibold text-[9.5px]">
                                <FacebookOfficialIcon className="w-2.5 h-2.5" /> Meta Ads
                              </span>
                            </td>
                            <td className="py-2 px-3">
                              <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-[#E5A23B]/10 text-[#E5A23B] border border-[#E5A23B]/20">
                                Warm
                              </span>
                            </td>
                            <td className="py-2 px-3 text-[#667085]">Priya Menon</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right 4 Cols: Pipeline & Recent Activities */}
                  <div className="lg:col-span-4 flex flex-col gap-3">
                    {/* Source Breakdown */}
                    <div className="p-3 rounded-xl border border-[#E5E0D5] bg-[#F7F4ED]/50 flex flex-col justify-between">
                      <span className="text-xs font-bold text-[#182230] mb-2 flex items-center justify-between">
                        <span>Lead Acquisition Channel</span>
                        <span className="text-[10px] text-[#D6B46A] font-semibold">Meta 78%</span>
                      </span>

                      <div className="space-y-1.5 text-[11px]">
                        <div>
                          <div className="flex justify-between text-[#182230] font-semibold text-[10px] mb-0.5">
                            <span>Facebook Lead Ads</span>
                            <span>78%</span>
                          </div>
                          <div className="w-full bg-[#E5E0D5] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#1877F2] h-full rounded-full" style={{ width: '78%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[#182230] font-semibold text-[10px] mb-0.5">
                            <span>Website Enquiry Form</span>
                            <span>14%</span>
                          </div>
                          <div className="w-full bg-[#E5E0D5] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#D6B46A] h-full rounded-full" style={{ width: '14%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[#182230] font-semibold text-[10px] mb-0.5">
                            <span>Direct Walk-in</span>
                            <span>8%</span>
                          </div>
                          <div className="w-full bg-[#E5E0D5] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#111827] h-full rounded-full" style={{ width: '8%' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live Activities Stream */}
                    <div className="p-3 rounded-xl border border-[#E5E0D5] bg-white flex flex-col flex-1">
                      <span className="text-xs font-bold text-[#182230] mb-2">Live Team Activity</span>
                      <div className="space-y-2 text-[10.5px] text-[#667085]">
                        <div className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#299D75] mt-1 shrink-0" />
                          <span><strong>Priya M.</strong> logged follow-up call with Ananya S.</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D6B46A] mt-1 shrink-0" />
                          <span><strong>Rajesh K.</strong> scheduled site visit for Sunday 11 AM</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4388C7] mt-1 shrink-0" />
                          <span><strong>System</strong> synced 4 new leads from Campaign #892</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FLOATING UI CARD 1: TOP-LEFT OUTBOARD WING (Meta Integration Card - Clear of Dashboard Content) */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: -10 }}
            animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.5 },
              x: { duration: 0.6, delay: 0.5 },
              y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute -top-12 sm:-top-16 left-2 sm:left-6 lg:left-8 xl:-left-20 2xl:-left-28 xl:top-6 z-20 w-64 sm:w-72 lg:w-76 rounded-2xl bg-white/95 backdrop-blur-md p-3.5 sm:p-4 border border-[#E5E0D5] shadow-[0_12px_36px_rgba(0,0,0,0.12)] hidden sm:block"
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-[#E5E0D5]">
              <div className="flex items-center gap-2">
                <FacebookOfficialIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs font-bold text-[#182230]">Meta Connected</span>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-[#299D75] bg-[#299D75]/10 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#299D75] animate-pulse" /> Live
              </span>
            </div>

            <div className="mt-2.5 space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-[#667085]">
                <span>Connected Page:</span>
                <span className="font-semibold text-[#182230] truncate max-w-[130px]">
                  Skyline Residences
                </span>
              </div>
              <div className="flex justify-between items-center text-[#667085]">
                <span>Active Lead Forms:</span>
                <span className="font-bold text-[#111827] bg-[#F7F4ED] px-2 py-0.5 rounded border border-[#E5E0D5]">
                  4 Forms Active
                </span>
              </div>
              <div className="flex justify-between items-center text-[#667085]">
                <span>Webhook Latency:</span>
                <span className="font-semibold text-[#299D75]">0.4s Instant</span>
              </div>
            </div>
          </motion.div>

          {/* FLOATING UI CARD 2: TOP-RIGHT OUTBOARD WING (Incoming Lead Notification - Clear of Metrics) */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: -10 }}
            animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.6 },
              x: { duration: 0.6, delay: 0.6 },
              y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute -top-12 sm:-top-16 right-2 sm:right-6 lg:right-8 xl:-right-20 2xl:-right-28 xl:top-8 z-20 w-64 sm:w-72 lg:w-76 rounded-2xl bg-[#111827] text-white p-3.5 sm:p-4 border border-[#202C3D] shadow-[0_16px_40px_rgba(17,24,39,0.35)] hidden sm:block"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#202C3D]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D6B46A] animate-ping" />
                <span className="text-[10px] sm:text-[11px] font-bold text-[#D6B46A] uppercase tracking-wider">
                  New Lead Received
                </span>
              </div>
              <span className="text-[10px] text-[#A7B0C0]">Just now</span>
            </div>

            <div className="mt-2 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-white">Ananya Sharma</span>
                <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-[#D6B46A] text-[#111827]">
                  New Lead
                </span>
              </div>
              <p className="text-[#A7B0C0] text-[10.5px]">
                Interest: <strong className="text-white">Skyline 3BHK Luxury</strong>
              </p>
              <div className="pt-1.5 flex items-center justify-between border-t border-[#202C3D] text-[10px]">
                <span className="flex items-center gap-1 text-[#A7B0C0]">
                  <FacebookOfficialIcon className="w-3 h-3" /> Meta Lead Ads
                </span>
                <span className="text-[#D6B46A] font-semibold">Budget: ₹1.45 Cr</span>
              </div>
            </div>
          </motion.div>

          {/* FLOATING UI CARD 3: BOTTOM DOCKED (Follow-up Automation Card - Clear of Table Rows) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.7 },
              y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2 z-20 w-72 sm:w-80 lg:w-96 rounded-2xl bg-white p-3 sm:p-3.5 border border-[#D6B46A]/60 shadow-[0_16px_40px_rgba(214,180,106,0.18)] hidden sm:block"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#111827] flex items-center justify-center shrink-0">
                <PhoneCall className="w-4 h-4 text-[#D6B46A]" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#182230]">Follow-up Scheduled</span>
                  <span className="text-[9.5px] font-bold text-[#DC5252] bg-[#DC5252]/10 px-2 py-0.5 rounded-full">
                    Due in 25 mins
                  </span>
                </div>
                <span className="text-[10.5px] sm:text-[11px] text-[#667085]">
                  Assigned: <strong>Priya Menon</strong> → Call Ananya Sharma for site visit
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
