import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ArrowRight,
  Shield,
  KeyRound,
  Radio,
  Share2,
  Users2,
  Database,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Info,
  Lock,
  RefreshCw,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { DocumentTitle } from '../../components/public/DocumentTitle';

export const HowItWorksPage = () => {
  const steps = [
    {
      num: '01',
      title: 'User Account Access',
      actor: 'RSVLeadSync Administrator',
      summary: 'User accesses the authenticated RSVLeadSync CRM instance with valid organization credentials.',
      detail:
        'A user with administrative privileges signs in to RSVLeadSync and navigates to the "Connect Meta" module. Session integrity is governed by secure HTTP-only cookies and role-based permissions.',
      icon: Users2,
    },
    {
      num: '02',
      title: 'Meta Authorization Initiation',
      actor: 'OAuth 2.0 Handshake Request',
      summary: 'The application generates a secure CSRF state token and redirects the administrator to Meta’s official OAuth dialog.',
      detail:
        'Clicking "Connect Meta Account" requests an authorization URL from the backend (/meta/connect/url). The URL redirects the user to facebook.com/v21.0/dialog/oauth with client_id, redirect_uri, and requested scopes.',
      icon: KeyRound,
    },
    {
      num: '03',
      title: 'Meta Consent & Scope Review',
      actor: 'Meta Platforms Dialog',
      summary: 'Meta presents the user with the explicit permissions requested by RSVLeadSync.',
      detail:
        'The official Meta consent interface prompts the user to review the scopes required: pages_show_list (to discover connected Pages), pages_read_engagement (to monitor Page events), and leads_retrieval (to access leadgen form data).',
      icon: Shield,
    },
    {
      num: '04',
      title: 'User Grants Specific Permissions',
      actor: 'User Consent Confirmation',
      summary: 'The user confirms permission to allow RSVLeadSync to access selected advertising assets.',
      detail:
        'The user selects which Facebook Pages and business accounts they wish to make available to the application and approves the authorization dialog.',
      icon: CheckCircle2,
    },
    {
      num: '05',
      title: 'Asset Discovery & Page Selection',
      actor: 'Meta Graph API Query',
      summary: 'RSVLeadSync queries the Graph API to list accessible Pages and associated Lead Generation Forms.',
      detail:
        'Upon receiving the OAuth authorization code at /connect-meta/callback, the backend exchanges the code for a long-lived access token, encrypts it at rest using AES-256, and fetches all authorized Pages and form IDs.',
      icon: Radio,
    },
    {
      num: '06',
      title: 'Webhook Subscription & Event Listening',
      actor: 'Event-Driven Webhook Pipeline',
      summary: 'Selected Facebook Pages are subscribed to Meta’s real-time leadgen webhook topic.',
      detail:
        'When a prospect submits an Instant Lead Form on Facebook or Instagram, Meta sends a POST webhook notification payload to /meta/webhook containing the leadgen_id, page_id, and form_id.',
      icon: RefreshCw,
    },
    {
      num: '07',
      title: 'Secure Ingestion & Field Mapping',
      actor: 'Lead Parsing & Sanitization Engine',
      summary: 'The backend decrypts the Page Access Token to query the specific lead record from Meta Graph API.',
      detail:
        'The server queries graph.facebook.com/v21.0/{leadgen_id}, retrieves the user response fields (Name, Phone, Email, custom qualifying questions), parses them into a standardized schema, and performs deduplication checks.',
      icon: Database,
    },
    {
      num: '08',
      title: 'CRM Pipeline Organization & Follow-up',
      actor: 'Sales Team Operational Workspace',
      summary: 'The lead appears in real-time inside the RSVLeadSync CRM pipeline.',
      detail:
        'Agents can immediately view the prospect’s details, lead score (Hot, Warm, Cold), campaign source attribution, and update pipeline stages (Contacted, Site Visit Scheduled, Won).',
      icon: Layers,
    },
    {
      num: '09',
      title: 'Disconnection & Data Deletion Support',
      actor: 'Privacy Governance & Deletion Control',
      summary: 'Administrators can disconnect at will, and users can request data deletion through clear instructions.',
      detail:
        'Clicking "Disconnect" revokes the stored Page access tokens and halts webhook synchronization immediately. Users and prospects can request full record deletion through our documented instructions at /data-deletion.',
      icon: Trash2,
    },
  ];

  return (
    <div className="bg-white">
      <DocumentTitle
        title="How It Works — Integration Workflow"
        description="Understand the step-by-step lifecycle of how RSVLeadSync securely connects to Meta Lead Ads via authorized OAuth and Webhook APIs."
      />

      {/* Header */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-20 bg-gradient-to-b from-[#FCF8EF]/60 via-white to-white border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCF8EF] border border-[#DEC07A] text-xs font-semibold text-[#8C671D] mb-4">
            <Share2 className="w-3.5 h-3.5 text-[#B88A2E]" />
            <span>End-to-End Integration Lifecycle</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#262626] tracking-tight mb-4">
            How RSVLeadSync Connects Your Lead Ads
          </h1>
          <p className="text-base sm:text-lg text-[#525252] leading-relaxed max-w-3xl mx-auto">
            A transparent, permission-based integration lifecycle explaining how authorized Meta Lead Ads data flows securely into your central CRM workspace.
          </p>
        </div>
      </section>

      {/* Security Scope Notice */}
      <section className="py-6 bg-[#FCF8EF] border-b border-[#DEC07A]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 text-xs sm:text-sm text-[#8C671D]">
            <Lock className="w-5 h-5 text-[#B88A2E] shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-[#262626]">Permission Boundary Notice: </strong>
              Authorizing RSVLeadSync does <strong>not</strong> grant unrestricted access to your personal Facebook profile, friends list, private messages, or billing details. Access is restricted exclusively to discovering Pages you administer and retrieving lead form submissions generated by your campaigns.
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Visual Workflow Diagram */}
      <section className="py-16 bg-white border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-[#8C671D] uppercase tracking-widest mb-2">
              System Architecture Diagram
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#262626]">
              Real-Time Lead Ingestion Flow
            </h3>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#F8F8F6] border border-[#E8E2D5] shadow-subtle max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Block 1: Meta Ad Form */}
              <div className="p-4 rounded-xl bg-white border border-[#E8E2D5] text-center shadow-subtle">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
                  META
                </div>
                <h4 className="text-xs font-bold text-[#262626]">Lead Ad Form</h4>
                <p className="text-[11px] text-[#737373] mt-1">Prospect submits form on Facebook or Instagram</p>
                <div className="mt-3 text-[10px] font-semibold text-blue-700 bg-blue-50 py-1 rounded">
                  Event: leadgen
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex flex-col items-center justify-center text-[#B88A2E]">
                <span className="text-[10px] font-bold uppercase mb-1">Webhook</span>
                <div className="w-full flex items-center justify-center">
                  <div className="h-0.5 w-full bg-[#DEC07A]"></div>
                  <ArrowRight className="w-4 h-4 shrink-0 -ml-1 text-[#8C671D]" />
                </div>
              </div>

              {/* Block 2: Ingestion Server */}
              <div className="p-4 rounded-xl bg-white border border-[#DEC07A] text-center shadow-gold-sm">
                <div className="w-10 h-10 rounded-lg bg-[#FCF8EF] text-[#8C671D] flex items-center justify-center mx-auto mb-2 font-bold text-xs border border-[#DEC07A]">
                  RSV
                </div>
                <h4 className="text-xs font-bold text-[#262626]">Ingestion Engine</h4>
                <p className="text-[11px] text-[#737373] mt-1">Webhook verification, decryption, & field parsing</p>
                <div className="mt-3 text-[10px] font-semibold text-[#8C671D] bg-[#FCF8EF] py-1 rounded border border-[#DEC07A]">
                  AES-256 Token Auth
                </div>
              </div>

              {/* Block 3: CRM Database */}
              <div className="p-4 rounded-xl bg-white border border-[#E8E2D5] text-center shadow-subtle md:col-start-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
                  CRM
                </div>
                <h4 className="text-xs font-bold text-[#262626]">Pipeline Workspace</h4>
                <p className="text-[11px] text-[#737373] mt-1">Real-time lead distribution, status, & agent follow-up</p>
                <div className="mt-3 text-[10px] font-semibold text-emerald-700 bg-emerald-50 py-1 rounded">
                  Zero Lead Decay
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8E2D5] flex flex-wrap items-center justify-between text-xs text-[#737373] gap-2">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#B88A2E]" />
                <span>Authorized Meta Graph API v21.0 Handshake</span>
              </span>
              <span>Manual Batch Reconciliation Available on Demand</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9-Step Lifecycle Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-[#8C671D] uppercase tracking-widest mb-2">
              Step-by-Step Architecture
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#262626]">
              The Complete 9-Stage Integration Lifecycle
            </h3>
          </div>

          <div className="space-y-6">
            {steps.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.num}
                  className="p-6 rounded-2xl border border-[#E8E2D5] bg-white hover:border-[#DEC07A] hover:shadow-card transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#FCF8EF] border border-[#DEC07A] text-[#8C671D] font-extrabold text-sm flex items-center justify-center shrink-0">
                        {st.num}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#737373] bg-[#F8F8F6] px-2 py-0.5 rounded border border-[#E8E2D5]">
                            {st.actor}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-[#262626]">
                          {st.title}
                        </h4>
                        <p className="text-xs sm:text-sm font-semibold text-[#8C671D] mt-1">
                          {st.summary}
                        </p>
                        <p className="text-xs sm:text-sm text-[#737373] mt-2 leading-relaxed">
                          {st.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Data Deletion Link Notice */}
          <div className="mt-12 p-6 rounded-2xl bg-[#F8F8F6] border border-[#E8E2D5] text-center">
            <h4 className="text-sm font-bold text-[#262626] mb-2">
              Need to Revoke Access or Request Data Deletion?
            </h4>
            <p className="text-xs text-[#737373] max-w-xl mx-auto mb-4 leading-relaxed">
              You maintain total authority over your Meta connections. Disconnect the integration from your workspace or submit a deletion request via our verified process.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/data-deletion"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#B88A2E] text-white text-xs font-bold hover:bg-[#8C671D] transition-colors"
              >
                <span>View User Data Deletion Instructions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/privacy-policy"
                className="text-xs font-bold text-[#8C671D] hover:underline"
              >
                Read Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
