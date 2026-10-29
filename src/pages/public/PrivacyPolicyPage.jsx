import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Lock,
  FileText,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Mail,
  ArrowRight,
  ExternalLink,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { DocumentTitle } from '../../components/public/DocumentTitle';

export const PrivacyPolicyPage = () => {
  const EFFECTIVE_DATE = 'October 26, 2026';

  return (
    <div className="bg-white">
      <DocumentTitle
        title="Privacy Policy"
        description="Read the official RSVLeadSync Privacy Policy. Learn how we handle Meta Lead Ads platform data, user credentials, lead records, and data retention."
      />

      {/* Header */}
      <section className="pt-12 pb-14 sm:pt-16 sm:pb-16 bg-gradient-to-b from-[#FCF8EF]/60 via-white to-white border-b border-[#E8E2D5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCF8EF] border border-[#DEC07A] text-xs font-semibold text-[#8C671D] mb-4">
            <Shield className="w-3.5 h-3.5 text-[#B88A2E]" />
            <span>Compliance & Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#262626] tracking-tight mb-3">
            Privacy Policy
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#737373]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B88A2E]" />
              <span>Effective Date: <strong>{EFFECTIVE_DATE}</strong></span>
            </span>
            <span>•</span>
            <span>Last Updated: <strong>{EFFECTIVE_DATE}</strong></span>
            <span>•</span>
            <span>Applies to: RSVLeadSync Platform & Meta Integrations</span>
          </div>
        </div>
      </section>

      {/* Owner Confirmation Notice Box */}
      <section className="py-4 bg-[#FCF8EF] border-b border-[#DEC07A]/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 text-xs text-[#8C671D]">
            <HelpCircle className="w-4 h-4 text-[#B88A2E] shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-[#262626]">Deployment Configuration Checklist: </strong>
              Items marked with <span className="inline-block px-1 py-0.2 bg-[#F5EBD3] text-[#8C671D] font-mono text-[10px] rounded border border-[#DEC07A]">[Owner Confirmation]</span> must be verified and updated by the operating organization prior to production launch and Meta App Review submission.
            </div>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-[#262626] leading-relaxed">
          {/* Section A */}
          <section id="introduction" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">A.</span>
              <span>Introduction</span>
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              RSVLeadSync (“RSVLeadSync”, “we”, “our”, or “us”) provides a software-as-a-service application that enables authorized commercial organizations to connect their advertising lead sources—specifically Meta Lead Ads (Facebook and Instagram)—with their internal customer relationship management (CRM) workflows.
            </p>
            <p className="text-sm text-[#525252] leading-relaxed">
              This Privacy Policy explains how we collect, access, process, store, disclose, retain, and delete personal information when you access or use RSVLeadSync, connect your Meta advertising accounts, or synchronize prospective customer inquiries through our service.
            </p>
          </section>

          {/* Section B */}
          <section id="information-processed" className="scroll-mt-24 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">B.</span>
              <span>Information We May Process</span>
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              Depending on the functionality enabled and authorized by your organization, RSVLeadSync processes the following specific categories of data:
            </p>
            <div className="space-y-3 text-sm text-[#525252]">
              <div className="p-4 rounded-xl border border-[#E8E2D5] bg-[#F8F8F6]">
                <h3 className="font-bold text-[#262626] text-sm mb-1">1. Organization & User Account Information</h3>
                <p className="text-xs text-[#737373]">
                  Official name, corporate email address, password hashes (salted and hashed via bcrypt), user role (Owner, Admin, HR, Employee), and organization settings.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#E8E2D5] bg-[#F8F8F6]">
                <h3 className="font-bold text-[#262626] text-sm mb-1">2. Meta Platform Integration Identifiers</h3>
                <p className="text-xs text-[#737373]">
                  Authorized Facebook User ID, connected Facebook Page IDs, Facebook Page names, Instant Form IDs, Form names, webhook verification tokens, and Page Access Tokens (encrypted at rest using AES-256).
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#E8E2D5] bg-[#F8F8F6]">
                <h3 className="font-bold text-[#262626] text-sm mb-1">3. Lead Data Retrieved Through Authorized Meta APIs</h3>
                <p className="text-xs text-[#737373]">
                  When a prospective buyer voluntarily submits an Instant Form on your authorized Facebook Page or Instagram ad, we retrieve the lead data generated for that submission. This may include: Full Name, Phone Number, Email Address, City/Location, and specific campaign qualifying responses formulated in your Meta Lead Ads form.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#E8E2D5] bg-[#F8F8F6]">
                <h3 className="font-bold text-[#262626] text-sm mb-1">4. Technical & Operational Logs</h3>
                <p className="text-xs text-[#737373]">
                  Webhook reception timestamps, lead ingestion status, error diagnostics, API latency metrics, and audit timestamps. We do not inspect or record user web-browsing activities outside the RSVLeadSync application.
                </p>
              </div>
            </div>
          </section>

          {/* Section C */}
          <section id="how-obtained" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">C.</span>
              <span>How Information Is Obtained</span>
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              Information processed by RSVLeadSync is obtained exclusively through two transparent channels:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-[#525252] pl-2">
              <li>
                <strong>Direct Input:</strong> Provided directly by registered administrators and staff when creating an account, selecting integration settings, or updating lead pipeline stages.
              </li>
              <li>
                <strong>Authorized Meta Graph API Scopes:</strong> Retrieved via official Meta OAuth 2.0 endpoints and real-time webhook subscriptions based solely on explicit permissions granted by your organization administrator (<code className="px-1.5 py-0.5 bg-[#F8F8F6] border border-[#E8E2D5] rounded text-xs">pages_show_list</code>, <code className="px-1.5 py-0.5 bg-[#F8F8F6] border border-[#E8E2D5] rounded text-xs">pages_read_engagement</code>, and <code className="px-1.5 py-0.5 bg-[#F8F8F6] border border-[#E8E2D5] rounded text-xs">leads_retrieval</code>).
              </li>
            </ul>
          </section>

          {/* Section D */}
          <section id="purposes" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">D.</span>
              <span>Purposes of Processing</span>
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              We process personal information and integration identifiers strictly for legitimate operational purposes:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#525252]">
              <li className="p-3 bg-[#F8F8F6] rounded-lg border border-[#E8E2D5]">
                ✓ Providing the requested lead synchronization service between Meta and your CRM
              </li>
              <li className="p-3 bg-[#F8F8F6] rounded-lg border border-[#E8E2D5]">
                ✓ Presenting and organizing incoming leads in pipeline stages for sales follow-up
              </li>
              <li className="p-3 bg-[#F8F8F6] rounded-lg border border-[#E8E2D5]">
                ✓ Maintaining continuous token health and webhook connection validity
              </li>
              <li className="p-3 bg-[#F8F8F6] rounded-lg border border-[#E8E2D5]">
                ✓ Troubleshooting webhook delivery drops, synchronization failures, and API errors
              </li>
              <li className="p-3 bg-[#F8F8F6] rounded-lg border border-[#E8E2D5]">
                ✓ Responding to user support inquiries, technical requests, and security alerts
              </li>
              <li className="p-3 bg-[#F8F8F6] rounded-lg border border-[#E8E2D5]">
                ✓ Preventing unauthorized access, credential abuse, and fraudulent platform activities
              </li>
            </ul>
          </section>

          {/* Section E */}
          <section id="meta-platform-data" className="scroll-mt-24 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">E.</span>
              <span>Meta Platform Data & Developer Policy Adherence</span>
            </h2>
            <div className="p-5 rounded-2xl bg-[#FCF8EF] border border-[#DEC07A] text-xs sm:text-sm text-[#8C671D] space-y-3">
              <p className="font-bold text-[#262626] text-sm">
                Strict Protection of Meta Platform Data:
              </p>
              <p>
                In compliance with Meta Developer Policies and Platform Terms, RSVLeadSync adheres to rigorous data handling restrictions:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-[#525252]">
                <li><strong>No Ownership Claim:</strong> RSVLeadSync does not claim ownership of users' underlying customer or lead information. All lead records remain the property and responsibility of the subscribing business.</li>
                <li><strong>No Commercial Sale or Transfer:</strong> Meta platform data is never sold, licensed, leased, or transferred to third-party data brokers, advertising networks, or analytics firms.</li>
                <li><strong>No Cross-Account Aggregation:</strong> Lead data belonging to one organization is strictly siloed and never combined with data from other organizations or used for cross-tenant profiling.</li>
                <li><strong>Purpose Limitation:</strong> Meta platform data is utilized solely to facilitate synchronization to your designated CRM workspace.</li>
              </ul>
            </div>
          </section>

          {/* Section F */}
          <section id="data-sharing" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">F.</span>
              <span>Data Sharing & Infrastructure Service Providers</span>
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              RSVLeadSync does not share your lead data with external parties except with vetted cloud infrastructure service providers strictly necessary to host and operate the platform:
            </p>
            <div className="p-4 rounded-xl border border-dashed border-[#DEC07A] bg-[#FCF8EF] text-xs text-[#737373] space-y-2">
              <p className="font-bold text-[#262626]">[Owner Confirmation Required Before Live Launch]:</p>
              <p>
                Specify exact production cloud providers utilized for this deployment (for example: MongoDB Atlas for database persistence, AWS / DigitalOcean / Vercel for backend/frontend hosting, and SMTP relay services for alert notifications). All subprocessors operate under standard data protection agreements.
              </p>
            </div>
            <p className="text-sm text-[#525252] leading-relaxed">
              We may also disclose personal data if legally obligated by a binding court order, regulatory mandate, or applicable law, or where reasonably necessary to defend our legal rights.
            </p>
          </section>

          {/* Section G */}
          <section id="retention" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">G.</span>
              <span>Data Retention & Backup Lifecycle</span>
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              We retain lead records and integration access tokens only for as long as your organization maintains an active subscription or until you explicitly request deletion.
            </p>
            <div className="p-4 rounded-xl border border-dashed border-[#DEC07A] bg-[#FCF8EF] text-xs text-[#737373] space-y-2">
              <p className="font-bold text-[#262626]">[Owner Confirmation — Production Retention Schedule]:</p>
              <p>
                Active leads remain accessible in the CRM until deleted by workspace administrators. Inactive accounts and operational access tokens are scheduled for purging within 90 days of account termination. Encrypted database backups are maintained on an automated 30-day rotation cycle before permanent expiration.
              </p>
            </div>
          </section>

          {/* Section H */}
          <section id="security" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">H.</span>
              <span>Data Security Practices</span>
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              We implement industry-standard administrative, physical, and technical safeguards to protect data from unauthorized access, disclosure, or loss:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#525252] pl-2">
              <li><strong>Symmetric Token Encryption:</strong> Meta Page Access Tokens are encrypted at rest using server-side AES-256 with environment-isolated encryption keys.</li>
              <li><strong>Transport Layer Security:</strong> All data in transit between clients, RSVLeadSync servers, and Meta Graph API endpoints is encrypted via modern HTTPS / TLS 1.3.</li>
              <li><strong>Role-Based Access Control (RBAC):</strong> Access to lead records and integration configuration requires authenticated user credentials and verified role permissions.</li>
              <li><strong>Password Protection:</strong> Passwords are hashed using bcrypt with dynamic salt rounds and are never stored in plain text.</li>
            </ul>
            <p className="text-xs text-[#737373] italic">
              Note: While we apply strict security controls, no internet-connected platform can guarantee absolute security. Users are responsible for maintaining the confidentiality of their login credentials.
            </p>
          </section>

          {/* Section I */}
          <section id="user-rights" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">I.</span>
              <span>User Rights & Data Deletion</span>
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              Organizations and prospective leads whose details have been synchronized through RSVLeadSync possess rights regarding their personal data, including the right to request access, correction, export, or deletion.
            </p>
            <div className="p-4 rounded-xl border border-[#E8E2D5] bg-[#F8F8F6] space-y-2">
              <p className="text-xs sm:text-sm font-bold text-[#262626]">
                How to Disconnect or Request Data Deletion:
              </p>
              <p className="text-xs text-[#737373] leading-relaxed">
                You can disconnect your Meta account at any time from within the RSVLeadSync console (navigating to <em>Connect Meta &gt; Disconnect</em>), or directly within your Facebook account under <em>Settings &amp; Privacy &gt; Settings &gt; Business Integrations</em>.
              </p>
              <div className="pt-2">
                <Link
                  to="/data-deletion"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C671D] hover:underline"
                >
                  <span>Review Step-by-Step Data Deletion Instructions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </section>

          {/* Section J */}
          <section id="children" className="scroll-mt-24 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">J.</span>
              <span>Children's Privacy</span>
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              RSVLeadSync is an enterprise business-to-business software platform. It is not directed to, marketed towards, or intended for use by individuals under the age of 18. We do not knowingly collect personal information from minors.
            </p>
          </section>

          {/* Section K */}
          <section id="international" className="scroll-mt-24 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">K.</span>
              <span>International Data Transfers</span>
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              Personal data collected through RSVLeadSync may be transferred to and maintained on cloud servers located outside your jurisdiction. By using the platform or connecting your Meta account, you consent to the processing of data in regions where our hosting infrastructure is deployed, subject to appropriate safeguards.
            </p>
          </section>

          {/* Section L */}
          <section id="updates" className="scroll-mt-24 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">L.</span>
              <span>Policy Updates</span>
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              We may revise this Privacy Policy periodically to reflect enhancements in our software, updates to Meta Developer Policies, or changes in legal regulations. When material modifications occur, we will update the visible Effective Date and provide appropriate notice within the CRM dashboard.
            </p>
          </section>

          {/* Section M & N */}
          <section id="contact-effective" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#E8E2D5]">
            <h2 className="text-xl sm:text-2xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">M.</span>
              <span>Contact Information</span>
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              If you have any questions, inquiries, or privacy concerns regarding this policy, please reach out to our designated privacy officer:
            </p>
            <div className="p-4 rounded-xl border border-[#E8E2D5] bg-[#F8F8F6] text-xs sm:text-sm space-y-1">
              <p className="font-bold text-[#262626]">RSVLeadSync Privacy Office</p>
              <p className="text-[#525252]">Email: <a href="mailto:sakthivelrajendranbusiness@gmail.com" className="text-[#8C671D] font-bold hover:underline">sakthivelrajendranbusiness@gmail.com</a></p>
              <p className="text-[#525252]">General Support: <a href="mailto:sakthivelrajendranbusiness@gmail.com" className="text-[#8C671D] font-bold hover:underline">sakthivelrajendranbusiness@gmail.com</a></p>
              <p className="text-[11px] text-[#737373] mt-2">[Owner Confirmation: Confirm verified operating legal entity name and mailing address upon production deployment]</p>
            </div>

            <div className="pt-4">
              <h3 className="text-base font-bold text-[#262626] flex items-center gap-2">
                <span className="text-[#B88A2E]">N.</span>
                <span>Effective Date</span>
              </h3>
              <p className="text-sm text-[#737373]">
                This Privacy Policy is effective as of <strong>{EFFECTIVE_DATE}</strong>.
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};
