import React from 'react';
import { Link } from 'react-router-dom';
import {
  Share2,
  Radio,
  RefreshCw,
  Users2,
  ShieldCheck,
  Activity,
  Lock,
  ArrowRight,
  AlertTriangle,
  Info,
  CheckCircle2,
  Sliders,
  FileSpreadsheet,
  Database,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { DocumentTitle } from '../../components/public/DocumentTitle';

export const FeaturesPage = () => {
  const coreFeatures = [
    {
      id: 'connectivity',
      icon: Share2,
      title: 'Meta Lead Ads Connectivity',
      badge: 'Core Integration',
      businessValue:
        'Connects your business workspace directly to the Meta Graph API (v21.0) using official OAuth 2.0 authorization, eliminating insecure password sharing or manual export procedures.',
      capabilities: [
        'Official Meta OAuth 2.0 handshake with CSRF state verification',
        'Automated token exchange and lifecycle management',
        'Real-time connection health verification via dedicated health check endpoints',
        'Automatic detection of expired or revoked access tokens with reauthorization prompts',
      ],
      limitations:
        'Requires an active Meta business user account with administrative or advertising privileges over the target assets. Does not support personal Facebook profile lead extraction.',
    },
    {
      id: 'page-selection',
      icon: Radio,
      title: 'Authorized Page & Form Selection',
      badge: 'Granular Governance',
      businessValue:
        'Prevents unwanted data clutter by allowing administrators to hand-pick only the specific Facebook Pages and instant lead forms intended for CRM synchronization.',
      capabilities: [
        'Auto-discovery of all Facebook Pages accessible under the authorized Meta account',
        'Granular toggle activation per Page to control synchronization scope',
        'Form-level selection to map individual advertising campaigns to the CRM',
        'Instant webhook subscription binding per activated Page',
      ],
      limitations:
        'Pages must have lead generation permissions enabled. Forms created in external or third-party web landing pages outside Meta Instant Forms require separate webhook setups.',
    },
    {
      id: 'retrieval',
      icon: RefreshCw,
      title: 'Lead Information Retrieval Engine',
      badge: 'Dual Ingestion',
      businessValue:
        'Combines real-time event-driven notifications with reliable on-demand manual batch reconciliation to ensure zero lead drop-off during traffic surges or temporary network blips.',
      capabilities: [
        'Sub-second webhook ingestion upon lead submission on Facebook or Instagram Instant Forms',
        'On-demand manual reconciliation sync by specific Form ID with adjustable retrieval batch limits',
        'Automated parsing of standard fields: Full Name, Phone Number, Email, and Location',
        'Flexible custom question mapping to capture campaign-specific qualifying criteria',
      ],
      limitations:
        'Historical lead retrieval via manual sync is subject to Meta Graph API rate limits and data retention windows (typically up to 90 days on Meta’s ad servers).',
    },
    {
      id: 'crm-sync',
      icon: Database,
      title: 'CRM Pipeline Synchronization',
      badge: 'Workflow Automation',
      businessValue:
        'Transforms raw API payloads into actionable CRM records with organized status pipelines, eliminating the time lag between prospect expression of interest and sales outreach.',
      capabilities: [
        'Instant record generation inside the central CRM database with full audit trail',
        'Automatic deduplication checks against existing records by phone and email',
        'Configurable pipeline status assignment (New Lead, Contacted, Qualified, Site Visit, Won, Lost)',
        'Lead scoring tier classification (Hot, Warm, Cold) based on campaign parameters',
      ],
      limitations:
        'Lead assignment and follow-up notifications require proper internal role assignment and team member configuration.',
    },
    {
      id: 'tracking',
      icon: Users2,
      title: 'Lead Attribution & Campaign Tracking',
      badge: 'Marketing Intelligence',
      businessValue:
        'Maintains full provenance for every prospective buyer, allowing marketing and sales teams to accurately evaluate advertising ROI per campaign and creative.',
      capabilities: [
        'Persistent attribution linking each lead to its origin Facebook Page and Form ID',
        'Preservation of ad campaign identifiers and submission timestamps',
        'Complete chronological audit history tracking status transitions and user notes',
        'Exportable filtered views for internal reporting and compliance audits',
      ],
      limitations:
        'Attribution accuracy depends on Meta providing ad identifiers in the leadgen payload, which requires active ad delivery on Meta’s ad platforms.',
    },
    {
      id: 'security',
      icon: Lock,
      title: 'Access Management & Token Encryption',
      badge: 'Enterprise Security',
      businessValue:
        'Shields your proprietary customer leads and advertising credentials with robust server-side cryptography and strict role-based authorization controls.',
      capabilities: [
        'AES-256 symmetric encryption of Meta Page Access Tokens at rest in the database',
        'Granular Role-Based Access Control (RBAC): Owner, Admin, HR, and Employee tiers',
        'Strict endpoint authorization requiring elevated permissions to modify Meta connections',
        'Secure session validation with HTTP-only cookies and signed JSON Web Tokens',
      ],
      limitations:
        'Security depends on administrators safeguarding their login credentials and not sharing login sessions.',
    },
    {
      id: 'diagnostics',
      icon: Activity,
      title: 'Operational Visibility & Diagnostics',
      badge: 'System Reliability',
      businessValue:
        'Provides administrators with continuous visibility into connection health, webhook operational status, and synchronization errors.',
      capabilities: [
        'Live connection status badge: CONNECTED, NEEDS_REAUTHORIZATION, or DISCONNECTED',
        'Dedicated health test action to verify token validity against Meta Graph servers',
        'Detailed error response surfacing for webhook subscription failures or permission drops',
        'Immediate disconnection controls allowing instant revocation of stored tokens',
      ],
      limitations:
        'Webhook delivery diagnostic logs depend on incoming traffic from Meta servers and public URL reachability.',
    },
  ];

  return (
    <div className="bg-white">
      <DocumentTitle
        title="Product Features & Capabilities"
        description="Explore RSVLeadSync's purpose-built features: Meta Lead Ads integration, authorized page selection, CRM pipeline synchronization, and security controls."
      />

      {/* Header Section */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-20 bg-gradient-to-b from-[#FCF8EF]/60 via-white to-white border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCF8EF] border border-[#DEC07A] text-xs font-semibold text-[#8C671D] mb-4">
            <Sliders className="w-3.5 h-3.5 text-[#B88A2E]" />
            <span>Architecture & Feature Matrix</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#262626] tracking-tight mb-4">
            Purpose-Built Lead Synchronization Features
          </h1>
          <p className="text-base sm:text-lg text-[#525252] leading-relaxed max-w-3xl mx-auto">
            RSVLeadSync is engineered to connect authorized Meta Lead Ads directly to your CRM workflow. Discover each feature’s business value, operational capabilities, and technical boundaries.
          </p>
        </div>
      </section>

      {/* Scope & Non-Scope Transparency Banner */}
      <section className="py-6 bg-[#FCF8EF] border-b border-[#DEC07A]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs sm:text-sm text-[#8C671D]">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#B88A2E] shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-[#262626]">Clear Functional Scope: </strong>
                RSVLeadSync focuses strictly on authorized Meta Lead Ads and Facebook Page Instant Forms. We do not provide automated Instagram Direct Message scraping, WhatsApp personal chat extraction, or third-party ad network syncing (e.g., Google Ads) without separate native connectors.
              </div>
            </div>
            <Link
              to="/how-it-works"
              className="shrink-0 font-bold underline hover:text-[#B88A2E] flex items-center gap-1"
            >
              <span>See Workflow Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {coreFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                id={feat.id}
                className="p-6 sm:p-8 lg:p-10 rounded-2xl border border-[#E8E2D5] bg-white shadow-card hover:border-[#DEC07A] transition-all scroll-mt-24"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[#E8E2D5]">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FCF8EF] border border-[#DEC07A] text-[#8C671D] flex items-center justify-center shrink-0 shadow-gold-sm">
                      <Icon className="w-6 h-6 text-[#B88A2E]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C671D] bg-[#FCF8EF] px-2 py-0.5 rounded border border-[#DEC07A]">
                          {feat.badge}
                        </span>
                        <span className="text-xs text-[#737373]">Feature 0{idx + 1}</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[#262626]">
                        {feat.title}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
                  {/* Business Value */}
                  <div className="lg:col-span-1">
                    <h3 className="text-xs font-bold text-[#8C671D] uppercase tracking-wider mb-2">
                      Business Value
                    </h3>
                    <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">
                      {feat.businessValue}
                    </p>
                  </div>

                  {/* Operational Capabilities */}
                  <div className="lg:col-span-1">
                    <h3 className="text-xs font-bold text-[#8C671D] uppercase tracking-wider mb-2">
                      Key Capabilities
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#525252]">
                      {feat.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technical Limitations */}
                  <div className="lg:col-span-1 bg-[#F8F8F6] p-4 rounded-xl border border-[#E8E2D5]">
                    <h3 className="text-xs font-bold text-[#737373] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Operational Limitations</span>
                    </h3>
                    <p className="text-xs text-[#737373] leading-relaxed">
                      {feat.limitations}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#F8F8F6] border-t border-[#E8E2D5]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#262626] tracking-tight mb-4">
            Ready to Connect Your Lead Generation?
          </h2>
          <p className="text-sm text-[#737373] max-w-xl mx-auto mb-8">
            Access your RSVLeadSync workspace to authorize your eligible Meta Pages and configure live webhook synchronization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B88A2E] text-white text-sm font-bold shadow-gold-sm hover:bg-[#8C671D] transition-all"
            >
              <span>Sign In & Connect Meta</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#E8E2D5] text-[#262626] text-sm font-bold hover:bg-[#F8F8F6] transition-all"
            >
              <span>Read How It Works</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
