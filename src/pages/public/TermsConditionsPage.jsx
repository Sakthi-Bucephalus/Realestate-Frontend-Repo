import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Shield,
  Calendar,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { DocumentTitle } from '../../components/public/DocumentTitle';

export const TermsConditionsPage = () => {
  const EFFECTIVE_DATE = 'October 26, 2026';

  return (
    <div className="bg-white">
      <DocumentTitle
        title="Terms & Conditions"
        description="Review the Terms & Conditions governing the use of the RSVLeadSync lead synchronization platform, Meta Lead Ads integration, and user obligations."
      />

      {/* Header */}
      <section className="pt-12 pb-14 sm:pt-16 sm:pb-16 bg-gradient-to-b from-[#FCF8EF]/60 via-white to-white border-b border-[#E8E2D5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCF8EF] border border-[#DEC07A] text-xs font-semibold text-[#8C671D] mb-4">
            <FileText className="w-3.5 h-3.5 text-[#B88A2E]" />
            <span>Service Agreement & Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#262626] tracking-tight mb-3">
            Terms & Conditions
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#737373]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B88A2E]" />
              <span>Effective Date: <strong>{EFFECTIVE_DATE}</strong></span>
            </span>
            <span>•</span>
            <span>Last Updated: <strong>{EFFECTIVE_DATE}</strong></span>
            <span>•</span>
            <span>Platform: RSVLeadSync</span>
          </div>
        </div>
      </section>

      {/* Terms Body */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-[#262626] leading-relaxed">
          {/* Section 1 */}
          <section id="acceptance" className="scroll-mt-24 space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">1.</span> Acceptance of Terms
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              By accessing, browsing, registering for, or using RSVLeadSync (“the Service”), you (“User”, “Customer”, or “Organization”) agree to be bound by these Terms & Conditions. If you do not agree with any part of these Terms, you must immediately cease accessing and using the Service.
            </p>
          </section>

          {/* Section 2 */}
          <section id="service-description" className="scroll-mt-24 space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">2.</span> Service Description
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              RSVLeadSync provides an enterprise software platform designed to synchronize prospective customer inquiry records retrieved from authorized Meta Lead Ads (Facebook and Instagram) into an organized customer relationship management (CRM) pipeline. RSVLeadSync is an independent software application and is not endorsed by, certified by, or officially partnered with Meta Platforms, Inc.
            </p>
          </section>

          {/* Section 3 */}
          <section id="eligibility" className="scroll-mt-24 space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">3.</span> Eligibility & Account Security
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              To use RSVLeadSync, you must be at least 18 years old and possess the legal authority to enter into binding contracts on behalf of your organization. You agree to provide accurate, current, and complete registration information and to maintain the confidentiality of your account credentials. You are solely responsible for all activities conducted under your workspace account.
            </p>
          </section>

          {/* Section 4 */}
          <section id="meta-authorization" className="scroll-mt-24 space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">4.</span> Meta Account Authorization & Asset Authority
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              When connecting a Meta account to RSVLeadSync, you warrant and represent that you are an authorized administrator or marketing manager of the connected Facebook Pages, ad accounts, and Instant Lead Forms. You may not connect advertising assets for which you do not possess verified administrative authority.
            </p>
          </section>

          {/* Section 5 */}
          <section id="permitted-use" className="scroll-mt-24 space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">5.</span> Permitted Use & Platform Policies
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              You agree to use RSVLeadSync strictly for lawful business purposes in accordance with these Terms, Meta Developer Policies, Meta Platform Terms, and all applicable national and international laws, regulations, and consumer protection mandates.
            </p>
          </section>

          {/* Section 6 */}
          <section id="lead-data-responsibilities" className="scroll-mt-24 space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">6.</span> Lead Data Responsibilities & Consumer Privacy Compliance
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              Your organization acts as the data controller for all prospective customer leads retrieved through the integration. You are exclusively responsible for:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#525252] pl-2">
              <li>Providing clear, compliant privacy notices within your Meta Instant Lead Forms;</li>
              <li>Securing lawful grounds and explicit consumer consent for marketing outreach;</li>
              <li>Complying with applicable telecommunications, anti-spam, and data privacy regulations (such as GDPR, CAN-SPAM, TCPA, and relevant consumer protection acts);</li>
              <li>Honoring opt-out, unsubscribe, and data deletion requests submitted by consumers.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section id="prohibited-activities" className="scroll-mt-24 space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">7.</span> Prohibited Activities
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              Users are strictly prohibited from engaging in any of the following activities:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#525252] pl-2">
              <li>Reverse engineering, decompiling, or attempting to extract the source code of RSVLeadSync;</li>
              <li>Circumventing, tampering with, or testing the vulnerability of platform authentication or rate-limiting safeguards;</li>
              <li>Using the platform to distribute unsolicited bulk spam, fraudulent schemes, or misleading advertising;</li>
              <li>Selling, renting, or transferring Meta platform data or access tokens to unauthorized third parties or data brokers;</li>
              <li>Attempting to access data belonging to other tenant accounts or organizations.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section id="third-party-services" className="scroll-mt-24 space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">8.</span> Third-Party Services & Meta Availability
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              RSVLeadSync depends on Meta Graph APIs and webhooks provided by Meta Platforms, Inc. Meta services are subject to their own terms, policies, maintenance cycles, and rate limits. RSVLeadSync is not liable for disruptions, rate-limiting, permission revocations, or downtime originating from Meta’s infrastructure.
            </p>
          </section>

          {/* Section 9 */}
          <section id="availability" className="scroll-mt-24 space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">9.</span> Service Modifications & Availability
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              We continually improve the Service and may alter, update, or discontinue features with reasonable notice where feasible. While we strive to maintain high service availability, we do not warrant that operation will be completely error-free or uninterrupted.
            </p>
          </section>

          {/* Section 10 */}
          <section id="intellectual-property" className="scroll-mt-24 space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">10.</span> Intellectual Property Rights
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              RSVLeadSync, including its software, interfaces, designs, logos, and documentation, is the exclusive intellectual property of the platform operators. Customer retains full ownership of its proprietary customer and lead data synchronized through the application.
            </p>
          </section>

          {/* Section 11 */}
          <section id="suspension" className="scroll-mt-24 space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">11.</span> Suspension & Termination
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              We reserve the right to suspend or terminate account access if a User breaches these Terms, violates Meta Developer Policies, engages in fraudulent conduct, or fails to maintain an authorized relationship with connected advertising assets.
            </p>
          </section>

          {/* Section 12 */}
          <section id="data-deletion-link" className="scroll-mt-24 space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">12.</span> Data Deletion
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              You may terminate your integration and request permanent deletion of synchronized data at any time. Detailed instructions for submitting a deletion request are set forth in our dedicated{' '}
              <Link to="/data-deletion" className="text-[#8C671D] font-bold underline">
                User Data Deletion Instructions
              </Link>.
            </p>
          </section>

          {/* Section 13 */}
          <section id="disclaimers" className="scroll-mt-24 space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">13.</span> Disclaimers of Warranties
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. RSVLEADSYNC EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT GUARANTEE THAT ADVERTISING CAMPAIGNS WILL PRODUCE ANY SPECIFIC CONVERSION RATES, SALES VOLUMES, OR LEAD QUALITY.
            </p>
          </section>

          {/* Section 14 */}
          <section id="liability" className="scroll-mt-24 space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">14.</span> Limitation of Liability
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL RSVLEADSYNC OR ITS AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, BUSINESS INTERRUPTION, OR ADVERTISING EXPENSES, ARISING OUT OF OR IN CONNECTION WITH THE USE OF THE SERVICE.
            </p>
          </section>

          {/* Section 15 */}
          <section id="indemnity" className="scroll-mt-24 space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">15.</span> Indemnification
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              You agree to defend, indemnify, and hold harmless RSVLeadSync, its officers, directors, and employees against any third-party claims, liabilities, damages, or costs (including reasonable legal fees) resulting from your breach of these Terms, unauthorized connection of advertising assets, or violation of consumer protection or privacy laws.
            </p>
          </section>

          {/* Section 16 */}
          <section id="governing-law" className="scroll-mt-24 space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">16.</span> Governing Law & Dispute Resolution
            </h2>
            <div className="p-4 rounded-xl border border-dashed border-[#DEC07A] bg-[#FCF8EF] text-xs text-[#737373] space-y-2">
              <p className="font-bold text-[#262626]">[Owner Confirmation — Legal Jurisdiction]:</p>
              <p>
                These Terms shall be governed by and construed in accordance with the laws applicable to the operating entity's registered business jurisdiction (e.g., India / High Court of Mumbai or state of enterprise incorporation), without regard to conflict of law principles. Parties agree to resolve disputes through good-faith negotiation prior to formal arbitration.
              </p>
            </div>
          </section>

          {/* Section 17 */}
          <section id="changes" className="scroll-mt-24 space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">17.</span> Changes to Terms
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              We reserve the right to amend these Terms at any time. Continued use of the platform after the publication of revised Terms indicates acceptance of the modifications.
            </p>
          </section>

          {/* Section 18 & 19 */}
          <section id="contact-terms" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#E8E2D5]">
            <h2 className="text-lg sm:text-xl font-bold text-[#262626] flex items-center gap-2">
              <span className="text-[#B88A2E]">18.</span> Contact Information
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              For questions regarding these Terms & Conditions, please contact us at:
            </p>
            <div className="p-4 rounded-xl border border-[#E8E2D5] bg-[#F8F8F6] text-xs sm:text-sm space-y-1">
              <p className="font-bold text-[#262626]">RSVLeadSync Legal Inquiries</p>
              <p className="text-[#525252]">Email: <a href="mailto:sakthivelrajendranbusiness@gmail.com" className="text-[#8C671D] font-bold hover:underline">sakthivelrajendranbusiness@gmail.com</a></p>
            </div>

            <div className="pt-4">
              <h3 className="text-base font-bold text-[#262626] flex items-center gap-2">
                <span className="text-[#B88A2E]">19.</span> Effective Date
              </h3>
              <p className="text-sm text-[#737373]">
                These Terms & Conditions are effective as of <strong>{EFFECTIVE_DATE}</strong>.
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};
