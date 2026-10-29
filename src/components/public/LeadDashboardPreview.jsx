import React, { useState } from 'react';
import {
  Users2,
  Radio,
  CheckCircle2,
  Clock,
  Share2,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw,
  Phone,
  Mail,
  Calendar,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';

export const LeadDashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('leads');

  // Realistic fictional sample data for illustration (labeled clearly as sample data)
  const sampleLeads = [
    {
      id: 'LEAD-1042',
      name: 'Ananya Sharma',
      source: 'Meta Lead Ads',
      page: 'Skyline Luxury Residences',
      form: 'Premium 3BHK Brochure 2026',
      status: 'New Lead',
      score: 'Hot',
      phone: '+91 98201 •••••',
      email: 'ananya.s•••••@example.com',
      time: '4 mins ago',
      syncMethod: 'Instant Webhook',
    },
    {
      id: 'LEAD-1041',
      name: 'Vikramaditya Verma',
      source: 'Meta Lead Ads',
      page: 'Grand Horizon Estates',
      form: 'Weekend Site Visit Form',
      status: 'Contacted',
      score: 'Hot',
      phone: '+91 98112 •••••',
      email: 'vikram.v•••••@example.com',
      time: '28 mins ago',
      syncMethod: 'Instant Webhook',
    },
    {
      id: 'LEAD-1040',
      name: 'Meera Patel',
      source: 'Meta Lead Ads',
      page: 'Skyline Luxury Residences',
      form: 'Investment Consultation Inquiry',
      status: 'Qualified',
      score: 'Warm',
      phone: '+91 97234 •••••',
      email: 'meera.p•••••@example.com',
      time: '1 hr ago',
      syncMethod: 'API Reconciliation',
    },
    {
      id: 'LEAD-1039',
      name: 'Rajesh K. Nair',
      source: 'Meta Lead Ads',
      page: 'Royal Palm Villas',
      form: 'Exclusive Pre-Launch Offer',
      status: 'In Progress',
      score: 'Warm',
      phone: '+91 94471 •••••',
      email: 'rajesh.n•••••@example.com',
      time: '3 hrs ago',
      syncMethod: 'Instant Webhook',
    },
  ];

  const connectedPages = [
    {
      pageName: 'Skyline Luxury Residences',
      pageId: '108429184719283',
      formsCount: 3,
      webhookStatus: 'Active & Listening',
      lastSynced: '2 mins ago',
    },
    {
      pageName: 'Grand Horizon Estates',
      pageId: '109847120938472',
      formsCount: 2,
      webhookStatus: 'Active & Listening',
      lastSynced: '15 mins ago',
    },
    {
      pageName: 'Royal Palm Villas',
      pageId: '104729184729481',
      formsCount: 4,
      webhookStatus: 'Active & Listening',
      lastSynced: '1 hr ago',
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E8E2D5] shadow-card overflow-hidden">
      {/* Top Banner / Window Bar */}
      <div className="bg-[#F8F8F6] px-4 py-3 border-b border-[#E8E2D5] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
          </div>
          <span className="text-xs font-bold text-[#262626] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#B88A2E]" />
            <span>RSVLeadSync Workspace Console</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Meta Webhook Live</span>
          </span>
        </div>

        {/* Disclaimer Tag */}
        <div className="flex items-center gap-1 text-[11px] text-[#8C671D] bg-[#FCF8EF] px-2.5 py-1 rounded-md border border-[#DEC07A]">
          <Info className="w-3 h-3" />
          <span className="font-medium">Illustrative Sample Data — For Demonstration Only</span>
        </div>
      </div>

      {/* Console Subheader / Stats Row */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-[#FCF8EF]/60 via-white to-[#FCF8EF]/40 border-b border-[#E8E2D5] grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 bg-white rounded-xl border border-[#E8E2D5] shadow-subtle">
          <p className="text-[11px] font-bold text-[#737373] uppercase tracking-wider">Synchronized Today</p>
          <p className="text-xl sm:text-2xl font-extrabold text-[#262626] mt-0.5">24 Leads</p>
          <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="w-3 h-3" /> 100% Delivery Rate
          </span>
        </div>

        <div className="p-3 bg-white rounded-xl border border-[#E8E2D5] shadow-subtle">
          <p className="text-[11px] font-bold text-[#737373] uppercase tracking-wider">Connected Pages</p>
          <p className="text-xl sm:text-2xl font-extrabold text-[#262626] mt-0.5">3 Pages</p>
          <span className="text-[10px] font-semibold text-[#8C671D] flex items-center gap-1 mt-0.5">
            <Radio className="w-3 h-3 text-[#B88A2E]" /> Webhooks Subscribed
          </span>
        </div>

        <div className="p-3 bg-white rounded-xl border border-[#E8E2D5] shadow-subtle">
          <p className="text-[11px] font-bold text-[#737373] uppercase tracking-wider">Average Sync Latency</p>
          <p className="text-xl sm:text-2xl font-extrabold text-[#262626] mt-0.5">&lt; 1.8 sec</p>
          <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
            <Sparkles className="w-3 h-3" /> Near Real-Time
          </span>
        </div>

        <div className="p-3 bg-white rounded-xl border border-[#E8E2D5] shadow-subtle">
          <p className="text-[11px] font-bold text-[#737373] uppercase tracking-wider">Token Security</p>
          <p className="text-xl sm:text-2xl font-extrabold text-[#262626] mt-0.5">AES-256</p>
          <span className="text-[10px] font-semibold text-[#8C671D] flex items-center gap-1 mt-0.5">
            <ShieldCheck className="w-3 h-3 text-[#B88A2E]" /> Encrypted at Rest
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-3 border-b border-[#E8E2D5] flex items-center gap-4 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('leads')}
          className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'leads'
              ? 'border-[#B88A2E] text-[#8C671D]'
              : 'border-transparent text-[#737373] hover:text-[#262626]'
          }`}
        >
          <Users2 className="w-3.5 h-3.5" />
          <span>Synchronized Leads Pipeline</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('pages')}
          className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'pages'
              ? 'border-[#B88A2E] text-[#8C671D]'
              : 'border-transparent text-[#737373] hover:text-[#262626]'
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Meta Pages & Form Mapping</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-5 overflow-x-auto">
        {activeTab === 'leads' ? (
          <div className="min-w-[650px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E8E2D5] bg-[#FCF8EF] text-[#8C671D] font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Lead Contact</th>
                  <th className="py-2.5 px-3">Ad Source & Page</th>
                  <th className="py-2.5 px-3">Lead Form</th>
                  <th className="py-2.5 px-3">Pipeline Status</th>
                  <th className="py-2.5 px-3">Sync Method</th>
                  <th className="py-2.5 px-3 text-right">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D5]">
                {sampleLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#FCF8EF]/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-[#262626]">{lead.name}</div>
                      <div className="text-[11px] text-[#737373] flex items-center gap-2 mt-0.5">
                        <span>{lead.phone}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FCF8EF] text-[#8C671D] border border-[#DEC07A]">
                        {lead.source}
                      </span>
                      <div className="text-[11px] text-[#737373] mt-0.5 truncate max-w-[150px]">
                        {lead.page}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-[#262626] font-medium truncate max-w-[170px]">
                        {lead.form}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          lead.status === 'New Lead'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : lead.status === 'Contacted'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#262626]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{lead.syncMethod}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-[11px] text-[#737373]">
                      <span className="flex items-center justify-end gap-1">
                        <Clock className="w-3 h-3 text-[#B88A2E]" />
                        <span>{lead.time}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-3">
            {connectedPages.map((page) => (
              <div
                key={page.pageId}
                className="p-3.5 rounded-xl border border-[#E8E2D5] bg-[#F8F8F6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#262626] text-sm">{page.pageName}</span>
                    <span className="text-[10px] text-[#737373]">ID: {page.pageId}</span>
                  </div>
                  <div className="text-[11px] text-[#737373] mt-0.5">
                    {page.formsCount} Active Lead Generation Forms Configured • Last Synced: {page.lastSynced}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[11px]">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{page.webhookStatus}</span>
                  </span>
                  <span className="px-2 py-1 rounded-md bg-white border border-[#E8E2D5] text-[11px] text-[#262626] font-medium">
                    Webhook Subscribed
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info of Preview */}
      <div className="bg-[#F8F8F6] px-4 py-2.5 border-t border-[#E8E2D5] flex items-center justify-between text-[11px] text-[#737373]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B88A2E]" />
          <span>Meta Graph API v21.0 Leadgen Webhook Listener</span>
        </div>
        <div className="hidden sm:block">
          All Lead Ingestion Handled Securely via Authorized Scopes
        </div>
      </div>
    </div>
  );
};
