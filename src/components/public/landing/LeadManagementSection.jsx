import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Phone,
  PhoneCall,
  Mail,
  Calendar,
  Clock,
  UserCheck,
  ChevronRight,
  X,
  Building2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { FacebookOfficialIcon } from './BrandLogo';

export const LeadManagementSection = () => {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLead, setActiveLead] = useState(null);

  // Status Color Mapping matching exact prompt guidelines
  // new: #D6B46A, hot: #DC5252, warm: #E5A23B, cold: #4388C7, interested: #299D75, not-interested: #8992A2, progress: #8065C9
  const statusStyles = {
    New: 'bg-[#D6B46A]/20 text-[#111827] border-[#D6B46A]',
    Hot: 'bg-[#DC5252]/10 text-[#DC5252] border-[#DC5252]/30',
    Warm: 'bg-[#E5A23B]/10 text-[#E5A23B] border-[#E5A23B]/30',
    Cold: 'bg-[#4388C7]/10 text-[#4388C7] border-[#4388C7]/30',
    Interested: 'bg-[#299D75]/10 text-[#299D75] border-[#299D75]/30',
    'Not Interested': 'bg-[#8992A2]/10 text-[#8992A2] border-[#8992A2]/30',
    'In Progress': 'bg-[#8065C9]/10 text-[#8065C9] border-[#8065C9]/30',
  };

  const sampleLeads = [
    {
      id: 'LEAD-1042',
      customer: 'Ananya Sharma',
      phone: '+91 98201 44829',
      email: 'ananya.sharma@example.com',
      property: 'Skyline Royal 3BHK Luxury',
      budget: '₹1.45 Cr - ₹1.60 Cr',
      source: 'Facebook Ads (Pre-Launch)',
      assignedTo: 'Priya Menon',
      status: 'Hot',
      nextFollowUp: 'Today, 4:30 PM',
      timeline: [
        { time: '10:14 AM', text: 'Lead ingested via Meta Lead Ad "Luxury Waterfront Form"' },
        { time: '10:15 AM', text: 'Auto-assigned to Priya Menon via round-robin rule' },
        { time: '11:30 AM', text: 'Outbound call: Prospect interested in high-floor units' },
        { time: '02:00 PM', text: 'Follow-up scheduled: Site visit confirmation' },
      ],
    },
    {
      id: 'LEAD-1041',
      customer: 'Vikramaditya Verma',
      phone: '+91 98112 90184',
      email: 'vikram.verma@example.com',
      property: 'Palm Boulevard Plot #42',
      budget: '₹85 Lakh - ₹1.10 Cr',
      source: 'Facebook Ads (Villa Plots)',
      assignedTo: 'Rajesh Kumar',
      status: 'New',
      nextFollowUp: 'Tomorrow, 11:00 AM',
      timeline: [
        { time: '09:00 AM', text: 'Meta form submitted: Weekend site tour request' },
        { time: '09:02 AM', text: 'Auto-assigned to Rajesh Kumar' },
      ],
    },
    {
      id: 'LEAD-1040',
      customer: 'Meera Patel',
      phone: '+91 97234 11928',
      email: 'meera.patel@example.com',
      property: 'Emerald Horizon Penthouse',
      budget: '₹2.20 Cr+',
      source: 'Facebook Ads (Exclusive)',
      assignedTo: 'Suresh Rao',
      status: 'Interested',
      nextFollowUp: '09 Nov, 02:00 PM',
      timeline: [
        { time: 'Yesterday', text: 'Consultation conducted with Senior Relationship Manager' },
        { time: 'Yesterday', text: 'Shared architectural elevations and floor plans' },
      ],
    },
    {
      id: 'LEAD-1039',
      customer: 'Rajesh K. Nair',
      phone: '+91 94471 88392',
      email: 'rajesh.nair@example.com',
      property: 'Grand Orchard Villa #18',
      budget: '₹1.15 Cr',
      source: 'Facebook Ads (Early Bird)',
      assignedTo: 'Priya Menon',
      status: 'In Progress',
      nextFollowUp: '10 Nov, 05:00 PM',
      timeline: [
        { time: '02 Nov', text: 'Initial enquiry verified' },
        { time: '04 Nov', text: 'Bank loan eligibility consultation requested' },
      ],
    },
    {
      id: 'LEAD-1038',
      customer: 'Kavita Sundaram',
      phone: '+91 98402 77103',
      email: 'kavita.s@example.com',
      property: 'Skyline Royal 2BHK',
      budget: '₹75 Lakh',
      source: 'Facebook Ads (Compact Luxury)',
      assignedTo: 'Rajesh Kumar',
      status: 'Warm',
      nextFollowUp: '11 Nov, 10:30 AM',
      timeline: [
        { time: '05 Nov', text: 'Prospect attended online walkthrough demo' },
      ],
    },
    {
      id: 'LEAD-1037',
      customer: 'Arun Balakrishnan',
      phone: '+91 99401 22841',
      email: 'arun.b@example.com',
      property: 'Commercial Boulevard Office 401',
      budget: '₹95 Lakh',
      source: 'Facebook Ads (Commercial ROI)',
      assignedTo: 'Suresh Rao',
      status: 'Cold',
      nextFollowUp: '15 Nov, 12:00 PM',
      timeline: [
        { time: '01 Nov', text: 'Follow-up call: Currently exploring competitor project' },
      ],
    },
  ];

  const filteredLeads = sampleLeads.filter((lead) => {
    const matchesFilter =
      selectedFilter === 'ALL' || lead.status.toUpperCase() === selectedFilter;
    const matchesSearch =
      lead.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="platform" className="py-20 sm:py-28 bg-[#F7F4ED] border-b border-[#E5E0D5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E0D5] text-xs font-semibold text-[#182230] mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#D6B46A]" />
            <span className="font-bold text-[#182230]">Live Lead Management Console</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#182230] tracking-tight mb-5">
            Every Enquiry.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111827] via-[#D6B46A] to-[#C5A257]">
              Fully Under Control.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#667085] leading-relaxed">
            Search, filter, assign, and qualify leads in real-time. Built specifically for high-velocity real estate sales teams.
          </p>
        </div>

        {/* INTERACTIVE LEAD MANAGEMENT INTERFACE */}
        <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-[#E5E0D5] shadow-[0_16px_50px_rgba(17,24,39,0.08)] overflow-hidden">
          {/* Top Bar: Search, Status Filters & Counter */}
          <div className="p-4 sm:p-5 bg-white border-b border-[#E5E0D5] flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search prospect, property, or agent..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F7F4ED] border border-[#E5E0D5] text-xs text-[#182230] placeholder-[#667085] focus:outline-none focus:border-[#D6B46A] focus:ring-1 focus:ring-[#D6B46A]"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {['ALL', 'HOT', 'NEW', 'WARM', 'INTERESTED', 'IN PROGRESS', 'COLD'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    selectedFilter === filter
                      ? 'bg-[#111827] text-[#D6B46A] shadow-sm'
                      : 'bg-[#F7F4ED] text-[#667085] hover:text-[#182230] hover:bg-[#E5E0D5]/50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E5E0D5] text-[11px] uppercase font-bold text-[#667085] bg-[#F7F4ED]/80">
                  <th className="py-3 px-4 sm:px-6">Customer</th>
                  <th className="py-3 px-4">Property Interest</th>
                  <th className="py-3 px-4">Lead Source</th>
                  <th className="py-3 px-4">Assigned To</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Next Follow-up</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E0D5]">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setActiveLead(lead)}
                    className={`hover:bg-[#F7F4ED]/60 transition-colors cursor-pointer ${
                      activeLead?.id === lead.id ? 'bg-[#F7F4ED]' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="font-bold text-[#182230]">{lead.customer}</div>
                      <div className="text-[11px] text-[#667085] font-mono">{lead.phone}</div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-[#182230]">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#D6B46A]" />
                        <span>{lead.property}</span>
                      </div>
                      <span className="text-[10px] text-[#667085] font-normal">{lead.budget}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#1877F2]/10 text-[#1877F2] font-semibold text-[10px]">
                        <FacebookOfficialIcon className="w-3 h-3" />
                        <span>{lead.source}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-[#182230]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-[#111827] text-white flex items-center justify-center text-[9px] font-bold">
                          {lead.assignedTo.charAt(0)}
                        </div>
                        <span>{lead.assignedTo}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                          statusStyles[lead.status] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[#182230]">
                      <div className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3 text-[#D6B46A]" />
                        <span>{lead.nextFollowUp}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLead(lead);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#111827] text-white hover:bg-[#D6B46A] hover:text-[#111827] text-[11px] font-bold transition-all"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Interactive Lead Details Drawer */}
          <AnimatePresence>
            {activeLead && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t-2 border-[#D6B46A] bg-[#FFFFFF] p-5 sm:p-6"
              >
                <div className="flex items-start justify-between pb-4 border-b border-[#E5E0D5]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold text-[#182230]">
                        {activeLead.customer}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                          statusStyles[activeLead.status]
                        }`}
                      >
                        {activeLead.status} Lead
                      </span>
                    </div>
                    <p className="text-xs text-[#667085] mt-0.5">
                      Lead ID: {activeLead.id} • {activeLead.source}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveLead(null)}
                    className="p-1.5 rounded-lg text-[#667085] hover:bg-[#F7F4ED] hover:text-[#182230]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  {/* Prospect Details */}
                  <div className="space-y-3 text-xs">
                    <span className="font-bold text-[#182230] uppercase tracking-wider text-[10px] block">
                      Enquiry Profile
                    </span>
                    <div className="p-3 rounded-xl bg-[#F7F4ED] border border-[#E5E0D5] space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#667085]">Phone:</span>
                        <span className="font-mono font-bold text-[#182230]">{activeLead.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#667085]">Email:</span>
                        <span className="text-[#182230]">{activeLead.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#667085]">Property:</span>
                        <span className="font-bold text-[#182230]">{activeLead.property}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#667085]">Budget:</span>
                        <span className="font-bold text-[#D6B46A]">{activeLead.budget}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Assignment */}
                  <div className="space-y-3 text-xs">
                    <span className="font-bold text-[#182230] uppercase tracking-wider text-[10px] block">
                      Sales Actions
                    </span>
                    <div className="p-3 rounded-xl bg-white border border-[#E5E0D5] space-y-2.5">
                      <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#299D75] text-white font-bold hover:bg-[#238563] transition-colors">
                        <PhoneCall className="w-4 h-4" /> Call Prospect Now
                      </button>

                      <div className="pt-2 border-t border-[#E5E0D5]">
                        <label className="block text-[10px] uppercase font-bold text-[#667085] mb-1">
                          Reassign Team Member
                        </label>
                        <select
                          defaultValue={activeLead.assignedTo}
                          className="w-full p-2 rounded-lg bg-[#F7F4ED] border border-[#E5E0D5] text-xs text-[#182230] font-semibold focus:outline-none focus:border-[#D6B46A]"
                        >
                          <option>Priya Menon (Senior VP)</option>
                          <option>Rajesh Kumar (Senior Sales)</option>
                          <option>Suresh Rao (Commercial Lead)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Lead Activity Timeline */}
                  <div className="space-y-3 text-xs">
                    <span className="font-bold text-[#182230] uppercase tracking-wider text-[10px] block">
                      Lead Activity Timeline
                    </span>
                    <div className="p-3 rounded-xl bg-[#F7F4ED] border border-[#E5E0D5] space-y-2.5">
                      {activeLead.timeline.map((event, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D6B46A] mt-1.5 shrink-0" />
                          <div>
                            <span className="font-bold text-[#182230] mr-1.5">{event.time}</span>
                            <span className="text-[#667085]">{event.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
