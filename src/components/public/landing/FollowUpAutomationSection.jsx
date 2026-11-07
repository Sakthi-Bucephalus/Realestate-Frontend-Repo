import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  Building2,
  Bell,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  ChevronRight,
  Plus,
} from 'lucide-react';

export const FollowUpAutomationSection = () => {
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'completed'

  const pendingTasks = [
    {
      id: 'task-1',
      customer: 'Ananya Sharma',
      property: 'Skyline Royal 3BHK',
      time: '04:30 PM (Today)',
      urgent: true,
      assigned: 'Priya Menon',
      note: 'Confirm site visit schedule & share elevation plan brochure',
      phone: '+91 98201 44829',
    },
    {
      id: 'task-2',
      customer: 'Vikramaditya Verma',
      property: 'Palm Boulevard Plot #42',
      time: '11:00 AM (Tomorrow)',
      urgent: false,
      assigned: 'Rajesh Kumar',
      note: 'Follow-up on plot demarcation & payment installment schedule',
      phone: '+91 98112 90184',
    },
    {
      id: 'task-3',
      customer: 'Rajesh K. Nair',
      property: 'Grand Orchard Villa #18',
      time: '05:00 PM (10 Nov)',
      urgent: false,
      assigned: 'Suresh Rao',
      note: 'Check bank loan eligibility approval status with HDFC officer',
      phone: '+91 94471 88392',
    },
  ];

  const completedTasks = [
    {
      id: 'task-4',
      customer: 'Meera Patel',
      property: 'Emerald Horizon Penthouse',
      time: 'Completed 11:30 AM',
      assigned: 'Suresh Rao',
      note: 'Site visit completed. Customer requested draft agreement.',
      phone: '+91 97234 11928',
    },
    {
      id: 'task-5',
      customer: 'Kavita Sundaram',
      property: 'Skyline Royal 2BHK',
      time: 'Completed Yesterday',
      assigned: 'Rajesh Kumar',
      note: 'Virtual walkthrough conducted successfully.',
      phone: '+91 98402 77103',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E5E0D5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F4ED] border border-[#E5E0D5] text-xs font-semibold text-[#182230] mb-4">
            <Clock className="w-3.5 h-3.5 text-[#D6B46A]" />
            <span className="font-bold">Automated Follow-up Pipeline</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#182230] tracking-tight mb-5">
            Never Miss a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111827] via-[#D6B46A] to-[#C5A257]">
              Potential Buyer.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#667085] leading-relaxed">
            Real estate decisions require consistent follow-through. LevoraLead ensures no hot enquiry goes cold through intelligent call schedules and automated reminders.
          </p>
        </div>

        {/* INTERACTIVE FOLLOW-UP DASHBOARD */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Calendar View & Day Agenda (8 cols) */}
          <div className="lg:col-span-8 rounded-3xl border border-[#E5E0D5] bg-[#F7F4ED]/60 p-5 sm:p-7 shadow-sm">
            {/* Top Bar with Pending/Completed Tabs */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D5]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D6B46A]" />
                <span className="text-sm font-extrabold text-[#182230]">Follow-up Schedule</span>
              </div>

              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#E5E0D5]">
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'pending'
                      ? 'bg-[#111827] text-[#D6B46A] shadow-sm'
                      : 'text-[#667085] hover:text-[#182230]'
                  }`}
                >
                  Pending (3)
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'completed'
                      ? 'bg-[#111827] text-[#D6B46A] shadow-sm'
                      : 'text-[#667085] hover:text-[#182230]'
                  }`}
                >
                  Completed (2)
                </button>
              </div>
            </div>

            {/* List of Tasks */}
            <div className="mt-4 space-y-3">
              {(activeTab === 'pending' ? pendingTasks : completedTasks).map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-2xl bg-white border border-[#E5E0D5] hover:border-[#D6B46A] transition-all shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[#E5E0D5]/70">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#182230]">{task.customer}</span>
                        {task.urgent && (
                          <span className="px-2 py-0.5 rounded-full text-[9.5px] font-extrabold bg-[#DC5252]/10 text-[#DC5252] border border-[#DC5252]/20">
                            Urgent Call
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#667085] font-medium flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-[#D6B46A]" /> {task.property}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#111827] bg-[#F7F4ED] px-2.5 py-1 rounded-lg border border-[#E5E0D5] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D6B46A]" /> {task.time}
                      </span>
                      <button className="p-1.5 rounded-lg bg-[#299D75] text-white hover:bg-[#238563] transition-colors">
                        <PhoneCall className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <p className="text-[#667085] text-[11px] leading-relaxed">
                      <strong>Notes:</strong> {task.note}
                    </p>
                    <span className="text-[10.5px] font-semibold text-[#182230] bg-[#F7F4ED] px-2 py-0.5 rounded border border-[#E5E0D5] shrink-0">
                      Assigned: {task.assigned}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Live Reminder Toast & Calendar Widget (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Animated Active Reminder Toast */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: [1, 1.02, 1], opacity: 1 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="p-4 rounded-2xl bg-[#111827] text-white border border-[#202C3D] shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#D6B46A] text-[#111827] flex items-center justify-center">
                  <Bell className="w-3.5 h-3.5 animate-bounce" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Upcoming Reminder</span>
                  <span className="text-[10px] text-[#D6B46A] font-semibold">In 25 minutes</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#202C3D] border border-[#202C3D] text-xs space-y-1">
                <span className="font-bold text-white block">Ananya Sharma</span>
                <span className="text-[11px] text-[#A7B0C0] block">Site Visit Confirmation Call</span>
                <span className="text-[10px] text-[#299D75] font-semibold block">
                  Agent Phone Ring Enabled
                </span>
              </div>
            </motion.div>

            {/* Calendar Mini View */}
            <div className="p-4 rounded-2xl bg-white border border-[#E5E0D5] shadow-sm">
              <span className="text-xs font-extrabold text-[#182230] block mb-3">
                Daily Follow-up Capacity
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-[#667085]">
                  <span>Priya Menon</span>
                  <span className="font-bold text-[#182230]">4 of 6 Completed</span>
                </div>
                <div className="w-full bg-[#F7F4ED] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#D6B46A] h-full rounded-full" style={{ width: '66%' }} />
                </div>

                <div className="flex justify-between items-center text-[#667085] pt-1">
                  <span>Rajesh Kumar</span>
                  <span className="font-bold text-[#182230]">5 of 5 Completed</span>
                </div>
                <div className="w-full bg-[#F7F4ED] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#299D75] h-full rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5E0D5] text-center">
                <span className="text-[10.5px] text-[#667085]">
                  Overdue follow-up alert sent automatically to team lead
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
