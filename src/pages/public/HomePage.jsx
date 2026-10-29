import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ArrowRight,
  Shield,
  CheckCircle2,
  Radio,
  Share2,
  Users2,
  Clock,
  Sparkles,
  Zap,
  Lock,
  Sliders,
  ExternalLink,
  AlertCircle,
  FileText,
  Building2,
  ChevronRight,
  Check,
  RefreshCw,
} from 'lucide-react';
import { DocumentTitle } from '../../components/public/DocumentTitle';
import { LeadDashboardPreview } from '../../components/public/LeadDashboardPreview';

export const HomePage = () => {
  return (
    <div className="bg-white">
      <DocumentTitle
        title="Meta Ads Lead Integration & CRM Platform"
        description="Connect authorized Meta Lead Ads integrations with your CRM, synchronize lead information securely, and manage incoming leads in one organized workspace."
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-[#FCF8EF]/70 via-white to-white border-b border-[#E8E2D5]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FCF8EF] border border-[#DEC07A] text-xs font-semibold text-[#8C671D] mb-6 shadow-subtle">
              <span className="w-2 h-2 rounded-full bg-[#B88A2E] animate-pulse"></span>
              <span>Enterprise Meta Lead Ads Synchronization</span>
              <span className="text-[#DEC07A]">•</span>
              <span className="text-[#525252]">Real-Time Ingestion</span>
            </div>

            {/* Primary Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#262626] tracking-tight leading-[1.15] mb-6">
              Turn Every Lead Into an{' '}
              <span className="bg-gradient-to-r from-[#B88A2E] via-[#CCA34A] to-[#8C671D] bg-clip-text text-transparent">
                Opportunity.
              </span>
            </h1>

            {/* Subheading / Description */}
            <p className="text-base sm:text-lg lg:text-xl text-[#525252] leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
              RSVLeadSync helps businesses connect authorized Meta Lead Ads integrations with their CRM, synchronize lead information, and manage incoming leads in one organized workspace.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#B88A2E] text-white text-sm sm:text-base font-bold shadow-gold-md hover:bg-[#8C671D] active:scale-[0.99] transition-all"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#E8E2D5] text-[#262626] text-sm sm:text-base font-bold hover:bg-[#F8F8F6] hover:border-[#DEC07A] transition-all shadow-subtle"
              >
                <span>Explore Features</span>
              </Link>
            </div>

            {/* Alternative short headline & transparency pill */}
            <div className="flex items-center justify-center gap-2 text-xs text-[#737373]">
              <Shield className="w-3.5 h-3.5 text-[#B88A2E]" />
              <span className="font-semibold text-[#262626]">Your Ads. Your Leads. One Connected Workspace.</span>
            </div>
          </div>

          {/* Interactive Realistic Product Dashboard Preview */}
          <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
            <LeadDashboardPreview />
          </div>
        </div>
      </section>

      {/* 2. PROBLEM AND SOLUTION SECTION */}
      <section className="py-16 sm:py-24 bg-[#F8F8F6] border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-[#8C671D] uppercase tracking-widest mb-2">
              The Lead Synchronization Challenge
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#262626] tracking-tight">
              Moving from Disconnected Spreadsheets to an Automated Ingestion Pipeline
            </h3>
            <p className="mt-3 text-sm sm:text-base text-[#737373] leading-relaxed">
              When advertising on Meta Lead Ads, response speed and data clarity dictate conversion rates. RSVLeadSync bridges the gap between ad click and sales action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* The Challenges Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E2D5] shadow-card">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5 font-bold">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-[#262626] mb-3">
                Common Operational Obstacles
              </h4>
              <p className="text-xs sm:text-sm text-[#737373] mb-6 leading-relaxed">
                Businesses managing Meta campaigns without direct CRM connectivity often encounter severe operational bottlenecks:
              </p>

              <ul className="space-y-3.5 text-xs sm:text-sm text-[#525252]">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs shrink-0 font-bold mt-0.5">✕</span>
                  <span><strong>Manual CSV Downloads:</strong> Logging in daily to download lead files creates delay and exposes prospective inquiries to cold decay.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs shrink-0 font-bold mt-0.5">✕</span>
                  <span><strong>Fragmented Tool Switching:</strong> Sales agents constantly shift between Ads Manager, email exports, and standalone CRM sheets.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs shrink-0 font-bold mt-0.5">✕</span>
                  <span><strong>Delayed Follow-ups:</strong> Research shows prospect conversion falls drastically after the first hour of submission.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs shrink-0 font-bold mt-0.5">✕</span>
                  <span><strong>Duplicate & Unorganized Inquiries:</strong> Lack of deduplication creates duplicate assignments and conflicting sales touches.</span>
                </li>
              </ul>
            </div>

            {/* The Solution Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DEC07A] shadow-gold-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FCF8EF] rounded-full blur-2xl pointer-events-none -mr-10 -mt-10"></div>
              <div className="w-10 h-10 rounded-xl bg-[#FCF8EF] text-[#8C671D] border border-[#DEC07A] flex items-center justify-center mb-5 font-bold">
                <CheckCircle2 className="w-5 h-5 text-[#B88A2E]" />
              </div>
              <h4 className="text-lg font-bold text-[#262626] mb-3">
                How RSVLeadSync Solves This
              </h4>
              <p className="text-xs sm:text-sm text-[#737373] mb-6 leading-relaxed">
                RSVLeadSync is engineered to organize and synchronize authorized lead data directly into your operational CRM pipeline:
              </p>

              <ul className="space-y-3.5 text-xs sm:text-sm text-[#525252]">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs shrink-0 font-bold mt-0.5">✓</span>
                  <span><strong>Direct Webhook Ingestion:</strong> Form submissions on connected Facebook Pages trigger secure webhook notifications for swift lead retrieval.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs shrink-0 font-bold mt-0.5">✓</span>
                  <span><strong>Unified Workspace Console:</strong> Incoming leads appear directly in your team pipeline with full contact details and form attribution.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs shrink-0 font-bold mt-0.5">✓</span>
                  <span><strong>Automated Field Standardization:</strong> Phone numbers, email addresses, and form answers are mapped and stored in consistent schema formats.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs shrink-0 font-bold mt-0.5">✓</span>
                  <span><strong>On-Demand Reconciliation:</strong> Manual API batch sync lets you recover historical leads from specific forms whenever required.</span>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-[#F5EBD3] text-xs text-[#8C671D] bg-[#FCF8EF] p-3 rounded-lg border">
                <strong>Platform Notice:</strong> Synchronization requires valid user authorization, verified Meta App credentials, and appropriate Page advertiser permissions.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES SECTION */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-[#8C671D] uppercase tracking-widest mb-2">
              Platform Features
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#262626] tracking-tight">
              Built Specifically for Authorized Meta Lead Ads Workflows
            </h3>
            <p className="mt-3 text-sm sm:text-base text-[#737373]">
              Every capability is designed to maintain data integrity, adhere to Meta developer policies, and empower your sales team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl border border-[#E8E2D5] bg-[#FFFFFF] hover:border-[#DEC07A] hover:shadow-card transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#FCF8EF] border border-[#DEC07A] text-[#8C671D] flex items-center justify-center mb-4 group-hover:bg-[#B88A2E] group-hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#262626] mb-2">
                Meta Lead Ads Integration
              </h4>
              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                Connect via official Meta OAuth 2.0 authorization flows. Support for Meta Graph API v21.0 with secure token validation and health checks.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl border border-[#E8E2D5] bg-[#FFFFFF] hover:border-[#DEC07A] hover:shadow-card transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#FCF8EF] border border-[#DEC07A] text-[#8C671D] flex items-center justify-center mb-4 group-hover:bg-[#B88A2E] group-hover:text-white transition-colors">
                <Radio className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#262626] mb-2">
                Authorized Page Selection
              </h4>
              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                Granular control over which Facebook Pages and lead generation forms are enabled for synchronization. Only process assets you explicitly select.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl border border-[#E8E2D5] bg-[#FFFFFF] hover:border-[#DEC07A] hover:shadow-card transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#FCF8EF] border border-[#DEC07A] text-[#8C671D] flex items-center justify-center mb-4 group-hover:bg-[#B88A2E] group-hover:text-white transition-colors">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#262626] mb-2">
                Dual Lead Synchronization
              </h4>
              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                Combines real-time Webhook listener subscriptions with on-demand manual batch reconciliation by Form ID and customizable retrieval limits.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl border border-[#E8E2D5] bg-[#FFFFFF] hover:border-[#DEC07A] hover:shadow-card transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#FCF8EF] border border-[#DEC07A] text-[#8C671D] flex items-center justify-center mb-4 group-hover:bg-[#B88A2E] group-hover:text-white transition-colors">
                <Users2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#262626] mb-2">
                Centralized CRM Pipeline
              </h4>
              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                Manage incoming inquiries through configurable status stages: New Lead, Contacted, Qualified, Site Visit, and Closed.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl border border-[#E8E2D5] bg-[#FFFFFF] hover:border-[#DEC07A] hover:shadow-card transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#FCF8EF] border border-[#DEC07A] text-[#8C671D] flex items-center justify-center mb-4 group-hover:bg-[#B88A2E] group-hover:text-white transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#262626] mb-2">
                Lead Source & Campaign Tracking
              </h4>
              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                Retain explicit attribution metadata connecting each contact to its origin Facebook Page, Adset, Form ID, and timestamp.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl border border-[#E8E2D5] bg-[#FFFFFF] hover:border-[#DEC07A] hover:shadow-card transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#FCF8EF] border border-[#DEC07A] text-[#8C671D] flex items-center justify-center mb-4 group-hover:bg-[#B88A2E] group-hover:text-white transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#262626] mb-2">
                Encrypted Credentials & RBAC
              </h4>
              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                Meta access tokens encrypted at rest using server-side AES-256. Role-based access governance ensures only authorized personnel manage integrations.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/features"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8C671D] hover:text-[#B88A2E] transition-colors"
            >
              <span>View In-Depth Technical Capabilities & Limitations</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS PREVIEW */}
      <section className="py-16 sm:py-24 bg-[#F8F8F6] border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-[#8C671D] uppercase tracking-widest mb-2">
              Integration Workflow
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#262626] tracking-tight">
              Connecting Your Meta Lead Ads in 5 Steps
            </h3>
            <p className="mt-3 text-sm sm:text-base text-[#737373]">
              A transparent, permission-based integration that gives you full control over your advertising assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 relative">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D5] shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#FCF8EF] text-[#8C671D] font-extrabold text-sm flex items-center justify-center border border-[#DEC07A] mb-3">
                  1
                </div>
                <h4 className="text-sm font-bold text-[#262626] mb-1.5">Sign In</h4>
                <p className="text-xs text-[#737373] leading-relaxed">
                  Sign in to your organization's RSVLeadSync workspace with authenticated user credentials.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D5] shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#FCF8EF] text-[#8C671D] font-extrabold text-sm flex items-center justify-center border border-[#DEC07A] mb-3">
                  2
                </div>
                <h4 className="text-sm font-bold text-[#262626] mb-1.5">Authorize Meta</h4>
                <p className="text-xs text-[#737373] leading-relaxed">
                  Initiate the official OAuth flow and authorize requested permissions on Meta's secure consent screen.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D5] shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#FCF8EF] text-[#8C671D] font-extrabold text-sm flex items-center justify-center border border-[#DEC07A] mb-3">
                  3
                </div>
                <h4 className="text-sm font-bold text-[#262626] mb-1.5">Select Pages</h4>
                <p className="text-xs text-[#737373] leading-relaxed">
                  Choose only the eligible Facebook Pages and instant lead forms you want connected to your pipeline.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D5] shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#FCF8EF] text-[#8C671D] font-extrabold text-sm flex items-center justify-center border border-[#DEC07A] mb-3">
                  4
                </div>
                <h4 className="text-sm font-bold text-[#262626] mb-1.5">Subscribe Sync</h4>
                <p className="text-xs text-[#737373] leading-relaxed">
                  Subscribe the selected Page to webhooks and configure automated or on-demand retrieval settings.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D5] shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#FCF8EF] text-[#8C671D] font-extrabold text-sm flex items-center justify-center border border-[#DEC07A] mb-3">
                  5
                </div>
                <h4 className="text-sm font-bold text-[#262626] mb-1.5">Manage in CRM</h4>
                <p className="text-xs text-[#737373] leading-relaxed">
                  Incoming lead records populate your CRM pipeline in real-time, ready for immediate follow-up.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white rounded-xl border border-[#E8E2D5] text-center max-w-2xl mx-auto">
            <p className="text-xs text-[#737373] leading-relaxed">
              <strong className="text-[#262626]">Important Note:</strong> Access depends on user authorization, Meta permissions, account eligibility, and applicable platform policies.{' '}
              <Link to="/how-it-works" className="text-[#8C671D] font-semibold hover:underline">
                Read full integration lifecycle →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 5. SECURITY & TRANSPARENCY SECTION */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCF8EF] border border-[#DEC07A] text-xs font-semibold text-[#8C671D] mb-3">
                <Shield className="w-3.5 h-3.5 text-[#B88A2E]" />
                <span>Governance & Privacy</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#262626] tracking-tight">
                Security, Permissions & Transparent Data Handling
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#737373]">
                We maintain an honest, permission-first architecture designed to safeguard your business assets and prospect privacy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl border border-[#E8E2D5] bg-[#F8F8F6]">
                <h4 className="text-sm font-bold text-[#262626] mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#B88A2E]" />
                  <span>Permission-Based Access</span>
                </h4>
                <p className="text-xs text-[#737373] leading-relaxed">
                  RSVLeadSync requests only the specific Meta permissions necessary to list Pages and retrieve lead form responses. No access is requested for unrelated personal feeds, friends, or messaging.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[#E8E2D5] bg-[#F8F8F6]">
                <h4 className="text-sm font-bold text-[#262626] mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#B88A2E]" />
                  <span>Data Minimization</span>
                </h4>
                <p className="text-xs text-[#737373] leading-relaxed">
                  Only lead data submitted through your connected forms is retrieved and stored for CRM processing. We do not scrape, harvest, or aggregate unauthorized user data.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[#E8E2D5] bg-[#F8F8F6]">
                <h4 className="text-sm font-bold text-[#262626] mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#B88A2E]" />
                  <span>Account Authority Requirement</span>
                </h4>
                <p className="text-xs text-[#737373] leading-relaxed">
                  Users should connect only Meta accounts and Facebook Pages they are legally and administratively authorized to manage.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[#E8E2D5] bg-[#F8F8F6]">
                <h4 className="text-sm font-bold text-[#262626] mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#B88A2E]" />
                  <span>Clear Disconnection & Deletion</span>
                </h4>
                <p className="text-xs text-[#737373] leading-relaxed">
                  Integrations can be disconnected at any time. Detailed instructions for requesting data deletion are publicly available in our{' '}
                  <Link to="/data-deletion" className="text-[#8C671D] font-bold underline">
                    User Data Deletion Guide
                  </Link>.
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-[#FCF8EF] border border-[#DEC07A] text-xs text-[#8C671D] flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#B88A2E] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-0.5">Independent Platform Disclosure:</strong>
                RSVLeadSync is an independent software platform that integrates with supported Meta services, subject to applicable permissions and availability. RSVLeadSync is not owned, developed, endorsed, certified, or officially partnered with Meta Platforms, Inc.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CALL TO ACTION */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#1F1F1F] via-[#2A2A2A] to-[#1A1A1A] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#B88A2E] to-[#8C671D] flex items-center justify-center text-white mx-auto mb-6 shadow-gold-md">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
            Bring Your Lead Management Workflow Together.
          </h2>
          <p className="text-sm sm:text-base text-[#D4D4D4] max-w-2xl mx-auto mb-8 leading-relaxed">
            Eliminate manual downloads and fragmented handoffs. Synchronize authorized Meta Lead Ads directly into your team CRM.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#B88A2E] text-white text-sm sm:text-base font-bold shadow-gold-md hover:bg-[#8C671D] active:scale-[0.99] transition-all"
            >
              <span>Get Started with RSVLeadSync</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-transparent border border-[#525252] text-[#E5E5E5] text-sm sm:text-base font-bold hover:bg-white/10 transition-colors"
            >
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
