import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users2,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Receipt,
  Briefcase,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Search,
  Check,
  Clock,
  Phone,
  DollarSign,
  TrendingUp,
  MapPin,
  Lock,
} from 'lucide-react';

export const BusinessModulesSection = () => {
  const [selectedModule, setSelectedModule] = useState(0);

  const modules = [
    {
      id: 'leads',
      title: 'Leads & CRM',
      icon: Users2,
      tagline: 'Capture, score, and nurture enquiries from initial ad click to customer signing.',
      preview: (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] pb-1 border-b border-[#E5E0D5]">
            <span className="font-bold text-[#182230]">Live Lead Ingestion</span>
            <span className="text-[10px] font-bold text-[#299D75] bg-[#299D75]/10 px-1.5 py-0.2 rounded">
              Active Sync
            </span>
          </div>
          <div className="p-2 rounded-lg bg-[#F7F4ED] border border-[#E5E0D5] flex items-center justify-between text-[11px]">
            <div>
              <span className="font-bold text-[#182230] block">Ananya Sharma</span>
              <span className="text-[9px] text-[#667085]">Skyline 3BHK • ₹1.45 Cr</span>
            </div>
            <span className="text-[9px] font-bold bg-[#DC5252]/10 text-[#DC5252] px-1.5 py-0.5 rounded">
              Hot
            </span>
          </div>
          <div className="p-2 rounded-lg bg-white border border-[#E5E0D5] flex items-center justify-between text-[11px]">
            <div>
              <span className="font-bold text-[#182230] block">Vikramaditya Verma</span>
              <span className="text-[9px] text-[#667085]">Plot #42 • ₹85 Lakh</span>
            </div>
            <span className="text-[9px] font-bold bg-[#E5A23B]/10 text-[#E5A23B] px-1.5 py-0.5 rounded">
              Warm
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'properties',
      title: 'Properties & Plots',
      icon: Building2,
      tagline: 'Catalog residential apartments, commercial units, and villa plots with live inventory status.',
      preview: (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] pb-1 border-b border-[#E5E0D5]">
            <span className="font-bold text-[#182230]">Unit Inventory Map</span>
            <span className="text-[10px] text-[#667085]">142 Units</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-bold">
            <div className="p-1.5 rounded bg-[#299D75]/10 border border-[#299D75]/30 text-[#299D75]">
              A-101
              <span className="block text-[8px] font-normal">Avail</span>
            </div>
            <div className="p-1.5 rounded bg-[#DC5252]/10 border border-[#DC5252]/30 text-[#DC5252]">
              A-102
              <span className="block text-[8px] font-normal">Booked</span>
            </div>
            <div className="p-1.5 rounded bg-[#D6B46A]/20 border border-[#D6B46A] text-[#111827]">
              A-103
              <span className="block text-[8px] font-normal">Hold</span>
            </div>
            <div className="p-1.5 rounded bg-[#299D75]/10 border border-[#299D75]/30 text-[#299D75]">
              A-104
              <span className="block text-[8px] font-normal">Avail</span>
            </div>
          </div>
          <span className="text-[9.5px] text-[#667085] block text-center">Dynamic pricing and square footage calculator</span>
        </div>
      ),
    },
    {
      id: 'site-visits',
      title: 'Site Visits',
      icon: CalendarCheck,
      tagline: 'Coordinate physical project walkthroughs, driver dispatch, and sales agent feedback.',
      preview: (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] pb-1 border-b border-[#E5E0D5]">
            <span className="font-bold text-[#182230]">Upcoming Itinerary</span>
            <span className="text-[10px] font-bold text-[#182230] bg-[#F7F4ED] px-1.5 py-0.2 rounded border border-[#E5E0D5]">
              Sunday
            </span>
          </div>
          <div className="p-2 rounded-lg bg-[#F7F4ED] border border-[#E5E0D5] text-[11px] space-y-1">
            <div className="flex justify-between font-bold text-[#182230]">
              <span>Visit with Mr. Rajesh Nair</span>
              <span className="text-[#299D75]">11:00 AM</span>
            </div>
            <div className="text-[9.5px] text-[#667085] flex justify-between">
              <span>Location: Grand Orchard Villa</span>
              <span>Host: Priya Menon</span>
            </div>
          </div>
          <div className="text-[9.5px] text-[#299D75] flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3 h-3" /> Client RSVP confirmed via phone
          </div>
        </div>
      ),
    },
    {
      id: 'bookings',
      title: 'Bookings & Deals',
      icon: CheckCircle2,
      tagline: 'Generate token receipts, block specific units, and process customer booking agreements.',
      preview: (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] pb-1 border-b border-[#E5E0D5]">
            <span className="font-bold text-[#182230]">Deal Docket #BK-9481</span>
            <span className="text-[10px] font-bold text-[#299D75] bg-[#299D75]/10 px-1.5 py-0.2 rounded">
              Signed
            </span>
          </div>
          <div className="p-2 rounded-lg bg-white border border-[#E5E0D5] text-[11px] space-y-1">
            <div className="flex justify-between font-bold text-[#182230]">
              <span>Tower B - Penthouse 1802</span>
              <span className="text-[#D6B46A]">₹2.10 Cr</span>
            </div>
            <div className="text-[9.5px] text-[#667085] flex justify-between">
              <span>Customer: Vikramaditya Verma</span>
              <span>Advance: ₹5,00,000</span>
            </div>
          </div>
          <span className="text-[9.5px] text-[#667085] block">Digital agreement generated and logged</span>
        </div>
      ),
    },
    {
      id: 'payments',
      title: 'Payment Ledger',
      icon: Receipt,
      tagline: 'Record milestones, partial token receipts, overdue alerts, and bank transaction proofs.',
      preview: (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] pb-1 border-b border-[#E5E0D5]">
            <span className="font-bold text-[#182230]">Recent Transactions</span>
            <span className="text-[10px] text-[#667085]">Ledger Audit</span>
          </div>
          <div className="p-2 rounded-lg bg-[#F7F4ED] border border-[#E5E0D5] text-[11px] flex items-center justify-between">
            <div>
              <span className="font-bold text-[#182230] block">Installment 2: Plot #42</span>
              <span className="text-[9px] text-[#667085]">NEFT REF: #UTR9482910</span>
            </div>
            <div className="text-right">
              <span className="font-extrabold text-[#299D75] block">+ ₹7,50,000</span>
              <span className="text-[9px] text-[#667085]">Reconciled</span>
            </div>
          </div>
          <span className="text-[9.5px] text-[#667085] block">Automated payment milestone reminder alerts</span>
        </div>
      ),
    },
    {
      id: 'employees',
      title: 'Employees & HR',
      icon: Briefcase,
      tagline: 'Assign target quotas, monitor lead response times, and measure sales executive conversion.',
      preview: (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] pb-1 border-b border-[#E5E0D5]">
            <span className="font-bold text-[#182230]">Executive Performance</span>
            <span className="text-[10px] font-bold text-[#D6B46A]">Leaderboard</span>
          </div>
          <div className="p-2 rounded-lg bg-white border border-[#E5E0D5] flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#111827] text-white flex items-center justify-center text-[10px] font-bold">
                PM
              </div>
              <div>
                <span className="font-bold text-[#182230] block">Priya Menon</span>
                <span className="text-[9px] text-[#667085]">Avg Response: 3.2m</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-[#299D75] text-xs">₹3.8 Cr</span>
              <span className="text-[9px] text-[#667085] block">14 Closures</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'reports',
      title: 'Reports & Analytics',
      icon: BarChart3,
      tagline: 'Track cost-per-lead, conversion rates across Facebook ad sets, and sales velocity.',
      preview: (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] pb-1 border-b border-[#E5E0D5]">
            <span className="font-bold text-[#182230]">Campaign ROI Analysis</span>
            <span className="text-[10px] font-bold text-[#299D75]">+42% MoM</span>
          </div>
          <div className="p-2 rounded-lg bg-[#111827] text-white text-[11px] space-y-1.5">
            <div className="flex justify-between text-[#A7B0C0] text-[10px]">
              <span>Meta Ads CPL: ₹284</span>
              <span className="text-[#D6B46A]">Win Rate: 18.2%</span>
            </div>
            <div className="flex items-end gap-1.5 h-7 pt-1">
              <div className="bg-[#D6B46A] w-1/4 h-3/5 rounded-t" />
              <div className="bg-[#D6B46A] w-1/4 h-4/5 rounded-t" />
              <div className="bg-[#D6B46A] w-1/4 h-1/2 rounded-t" />
              <div className="bg-[#299D75] w-1/4 h-full rounded-t" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'access',
      title: 'Team & Access Management',
      icon: ShieldCheck,
      tagline: 'Role-based access control protecting customer phone numbers and financial data.',
      preview: (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] pb-1 border-b border-[#E5E0D5]">
            <span className="font-bold text-[#182230]">Role Access Matrix</span>
            <span className="text-[10px] font-bold text-[#299D75] bg-[#299D75]/10 px-1.5 py-0.2 rounded">
              Enforced
            </span>
          </div>
          <div className="p-2 rounded-lg bg-[#F7F4ED] border border-[#E5E0D5] text-[10.5px] space-y-1">
            <div className="flex justify-between">
              <span className="font-bold text-[#182230]">Sales Telecaller Role</span>
              <span className="text-[#667085]">Masked Phone</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-[#182230]">General Manager Role</span>
              <span className="text-[#299D75]">Full Ledger Access</span>
            </div>
          </div>
          <span className="text-[9.5px] text-[#667085] flex items-center gap-1">
            <Lock className="w-3 h-3 text-[#D6B46A]" /> Audit trail logs every customer export
          </span>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E5E0D5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F4ED] border border-[#E5E0D5] text-xs font-semibold text-[#182230] mb-4">
            <Building2 className="w-3.5 h-3.5 text-[#D6B46A]" />
            <span className="font-bold">Enterprise Real Estate Operating System</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#182230] tracking-tight mb-5">
            More Than Leads.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111827] via-[#D6B46A] to-[#C5A257]">
              Your Entire Business.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#667085] leading-relaxed">
            LevoraLead is not merely a lead collector. It connects every critical touchpoint of your real estate firm — from advertising click to booking advance.
          </p>
        </div>

        {/* 8 MODULES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {modules.map((module, index) => {
            const Icon = module.icon;
            const isSelected = selectedModule === index;

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedModule(index)}
                className={`rounded-2xl border p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#D6B46A] shadow-[0_8px_30px_rgba(214,180,106,0.18)] ring-1 ring-[#D6B46A]'
                    : 'bg-[#F7F4ED]/50 border-[#E5E0D5] hover:bg-white hover:border-[#D6B46A]/60 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#111827] flex items-center justify-center shrink-0 shadow-sm">
                      <Icon className="w-5 h-5 text-[#D6B46A]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-[#182230]">
                        {module.title}
                      </h3>
                      <span className="text-[10px] font-semibold text-[#D6B46A] uppercase tracking-wider">
                        Module {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* One-Line Explanation */}
                  <p className="text-xs text-[#667085] leading-relaxed mb-4 min-h-[36px]">
                    {module.tagline}
                  </p>
                </div>

                {/* Small Realistic Interface Preview */}
                <div className="rounded-xl bg-white border border-[#E5E0D5] p-3 shadow-sm">
                  {module.preview}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
