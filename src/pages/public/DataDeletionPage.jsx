import React from 'react';
import { Link } from 'react-router-dom';
import {
  Trash2,
  Shield,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Mail,
  ExternalLink,
  Lock,
  ArrowRight,
  FileText,
  Clock,
  Layers,
  Info,
} from 'lucide-react';
import { DocumentTitle } from '../../components/public/DocumentTitle';

export const DataDeletionPage = () => {
  const SUPPORT_EMAIL = 'sakthivelrajendranbusiness@gmail.com';
  const PRIVACY_EMAIL = 'sakthivelrajendranbusiness@gmail.com';

  return (
    <div className="bg-white">
      <DocumentTitle
        title="User Data Deletion Instructions"
        description="Step-by-step instructions on how to request the deletion of your personal information, customer leads, and Meta integration access tokens from RSVLeadSync."
      />

      {/* Header */}
      <section className="pt-12 pb-14 sm:pt-16 sm:pb-16 bg-gradient-to-b from-[#FCF8EF]/60 via-white to-white border-b border-[#E8E2D5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCF8EF] border border-[#DEC07A] text-xs font-semibold text-[#8C671D] mb-4">
            <Trash2 className="w-3.5 h-3.5 text-[#B88A2E]" />
            <span>Privacy Rights & Data Governance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#262626] tracking-tight mb-4">
            User Data Deletion Instructions
          </h1>
          <p className="text-base sm:text-lg text-[#525252] leading-relaxed max-w-3xl">
            RSVLeadSync respects users' privacy and provides a transparent, verifiable process for requesting the deletion of personal information associated with an account or an authorized integration.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-[#262626] leading-relaxed">
          {/* Introductory Callout */}
          <div className="p-6 rounded-2xl bg-[#F8F8F6] border border-[#E8E2D5] space-y-3">
            <p className="text-sm text-[#525252] leading-relaxed">
              If you connected a Meta account or synchronized lead information through RSVLeadSync, you may request deletion using the available account controls or the verified support contact provided on this page.
            </p>
            <p className="text-xs text-[#737373] leading-relaxed">
              This page outlines the exact steps required to revoke Meta platform permissions and submit a permanent data deletion request for records stored inside your RSVLeadSync CRM instance.
            </p>
          </div>

          {/* Section A: How to Request Deletion */}
          <section id="how-to-request" className="scroll-mt-24 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#FCF8EF] text-[#8C671D] font-bold text-sm flex items-center justify-center border border-[#DEC07A]">
                A
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#262626]">
                How to Request Deletion
              </h2>
            </div>

            <p className="text-sm text-[#525252] leading-relaxed">
              To ensure data protection and prevent unauthorized tampering with active business pipelines, follow these steps to submit a deletion request:
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-[#525252]">
              <div className="p-4 rounded-xl border border-[#E8E2D5] bg-white flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FCF8EF] text-[#8C671D] font-bold flex items-center justify-center shrink-0 text-xs border border-[#DEC07A]">
                  1
                </span>
                <div>
                  <h3 className="font-bold text-[#262626]">Check Workspace Status</h3>
                  <p className="text-xs text-[#737373] mt-0.5">
                    If you have active administrator credentials to your RSVLeadSync instance, sign in and navigate to the "Connect Meta" module to review connected Pages and active lead generation forms.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#E8E2D5] bg-white flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FCF8EF] text-[#8C671D] font-bold flex items-center justify-center shrink-0 text-xs border border-[#DEC07A]">
                  2
                </span>
                <div>
                  <h3 className="font-bold text-[#262626]">Disconnect Meta Integration</h3>
                  <p className="text-xs text-[#737373] mt-0.5">
                    Click "Disconnect" in the Connect Meta dashboard. This immediately halts incoming webhooks, unsubscribes your Facebook Pages, and invalidates stored Page Access Tokens.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#E8E2D5] bg-white flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FCF8EF] text-[#8C671D] font-bold flex items-center justify-center shrink-0 text-xs border border-[#DEC07A]">
                  3
                </span>
                <div>
                  <h3 className="font-bold text-[#262626]">Submit a Formal Deletion Request via Email</h3>
                  <p className="text-xs text-[#737373] mt-0.5">
                    Send an email from your authorized administrator email address to our dedicated data privacy desk:
                  </p>
                  <div className="mt-2 inline-flex items-center gap-2 p-2 bg-[#F8F8F6] rounded-lg border border-[#E8E2D5] font-bold text-[#8C671D] text-xs">
                    <Mail className="w-3.5 h-3.5" />
                    <a href={`mailto:${PRIVACY_EMAIL}?subject=User%20Data%20Deletion%20Request`} className="hover:underline">
                      {PRIVACY_EMAIL}
                    </a>
                  </div>
                  <div className="mt-2 text-xs text-[#737373] space-y-1">
                    <p className="font-semibold text-[#262626]">Please include the following information:</p>
                    <ul className="list-disc list-inside pl-1 space-y-0.5">
                      <li>Subject Line: <strong>User Data Deletion Request — [Your Organization Name]</strong></li>
                      <li>Registered Organization Name and primary account email</li>
                      <li>Name and Page ID of the connected Facebook Page(s)</li>
                      <li>Specific scope of deletion (e.g., "Delete all synchronized Meta leads and associated token records")</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/60 text-rose-800 text-xs">
                <strong className="block font-bold mb-1">Crucial Security Reminder:</strong>
                Never include your workspace password, raw API secret keys, or Meta access tokens in your email communication. Our team will never ask for your account password.
              </div>

              <div className="p-4 rounded-xl border border-[#E8E2D5] bg-[#F8F8F6] text-xs text-[#737373]">
                <strong className="text-[#262626]">Identity Verification:</strong> To protect commercial organizations from malicious data wiping attempts, we may request identity verification or confirmation from the account owner before permanently executing deletion.
              </div>
            </div>
          </section>

          {/* Section B: Meta Integration Disconnection */}
          <section id="meta-disconnection" className="scroll-mt-24 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#FCF8EF] text-[#8C671D] font-bold text-sm flex items-center justify-center border border-[#DEC07A]">
                B
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#262626]">
                Meta Platform Integration Disconnection
              </h2>
            </div>

            <p className="text-sm text-[#525252] leading-relaxed">
              You can revoke RSVLeadSync's access directly within Meta at any time without accessing RSVLeadSync:
            </p>

            <div className="p-5 rounded-2xl bg-[#F8F8F6] border border-[#E8E2D5] space-y-3 text-xs sm:text-sm text-[#525252]">
              <h3 className="font-bold text-[#262626]">Step-by-step Facebook Revocation:</h3>
              <ol className="list-decimal list-inside space-y-2 pl-2">
                <li>Log in to the Facebook profile that authorized the integration.</li>
                <li>Click your profile picture in the top right and select <strong>Settings &amp; Privacy &gt; Settings</strong>.</li>
                <li>In the left sidebar, click <strong>Business Integrations</strong> (or <strong>Apps and Websites</strong>).</li>
                <li>Locate <strong>RSVLeadSync</strong> in the list of active integrations.</li>
                <li>Click <strong>Remove</strong> and confirm revocation.</li>
              </ol>
            </div>

            <div className="p-4 rounded-xl bg-[#FCF8EF] border border-[#DEC07A] text-xs text-[#8C671D]">
              <strong className="font-bold text-[#262626]">Important Distinction: </strong>
              Revoking permissions inside Facebook prevents future lead events from reaching RSVLeadSync. However, to permanently remove previously synchronized lead records from the central CRM database, you must also follow the deletion request procedure in Section A.
            </div>
          </section>

          {/* Section C: What Happens After a Request */}
          <section id="what-happens" className="scroll-mt-24 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#FCF8EF] text-[#8C671D] font-bold text-sm flex items-center justify-center border border-[#DEC07A]">
                C
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#262626]">
                What Happens After a Request
              </h2>
            </div>

            <p className="text-sm text-[#525252] leading-relaxed">
              When a verified deletion request is received, our operations and engineering team execute the following protocol:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl border border-[#E8E2D5] bg-white">
                <h3 className="font-bold text-[#262626] mb-1">1. Verification & Acknowledgment</h3>
                <p className="text-xs text-[#737373]">
                  We verify request authenticity and send an email acknowledgment within 2 to 3 business days of receipt.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#E8E2D5] bg-white">
                <h3 className="font-bold text-[#262626] mb-1">2. Removal of Lead Data</h3>
                <p className="text-xs text-[#737373]">
                  All synchronized prospect records, custom form answers, and contact details associated with the specified integration are permanently scrubbed from active databases.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#E8E2D5] bg-white">
                <h3 className="font-bold text-[#262626] mb-1">3. Token Purging</h3>
                <p className="text-xs text-[#737373]">
                  Encrypted Meta Page Access Tokens, webhook subscription IDs, and connection credentials are removed from our key store.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#E8E2D5] bg-white">
                <h3 className="font-bold text-[#262626] mb-1">4. Written Confirmation</h3>
                <p className="text-xs text-[#737373]">
                  Once the records are purged, a final written confirmation email is dispatched to the organization's verified contact.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-dashed border-[#DEC07A] bg-[#FCF8EF] text-xs text-[#737373] space-y-1.5">
              <p className="font-bold text-[#262626]">[Owner Confirmation — Production Timelines]:</p>
              <p>
                Standard operational deletion is typically finalized within 30 days of verified confirmation. Encrypted rolling system backups overwrite deleted records in their normal rotation cycle (up to 30 days). Transactional billing logs required by applicable tax or corporate law may be retained for the statutory retention period.
              </p>
            </div>
          </section>

          {/* Section D: Data Deletion Request Status & Automated Callback Status */}
          <section id="status-tracking" className="scroll-mt-24 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#FCF8EF] text-[#8C671D] font-bold text-sm flex items-center justify-center border border-[#DEC07A]">
                D
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#262626]">
                Data Deletion Request Status & Meta Callback Workflow
              </h2>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8F8F6] border border-[#E8E2D5] space-y-3">
              <h3 className="text-sm font-bold text-[#262626]">
                How to Follow Up on Request Status:
              </h3>
              <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">
                You can inquire about the status of any ongoing deletion request at any time by replying to your confirmation email or contacting <a href={`mailto:${PRIVACY_EMAIL}`} className="text-[#8C671D] font-bold hover:underline">{PRIVACY_EMAIL}</a> with your reference details.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D5] space-y-3">
              <div className="flex items-start gap-2.5">
                <Info className="w-5 h-5 text-[#B88A2E] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#262626]">
                    Meta Data Deletion Callback Webhook Architecture Notice:
                  </h3>
                  <p className="text-xs text-[#737373] mt-1 leading-relaxed">
                    Under Meta Platform specifications, applications may implement an automated URL endpoint that receives a signed request whenever a Facebook user removes the application.
                  </p>
                  <p className="text-xs text-[#737373] mt-2 leading-relaxed">
                    <strong>Current Implementation Disclosure:</strong> In this release, data deletion requests are verified and processed manually by our operations staff through the documented email channel. An automated HTTP POST callback endpoint returning a confirmation code and status tracking URL is scheduled for implementation and comprehensive sandbox testing by engineering before production launch.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section E: Related Links */}
          <section id="related-links" className="scroll-mt-24 space-y-4 pt-6 border-t border-[#E8E2D5]">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#FCF8EF] text-[#8C671D] font-bold text-sm flex items-center justify-center border border-[#DEC07A]">
                E
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#262626]">
                Related Policies & Documentation
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <Link
                to="/privacy-policy"
                className="p-4 rounded-xl border border-[#E8E2D5] bg-[#F8F8F6] hover:border-[#DEC07A] font-semibold text-[#262626] flex items-center justify-between transition-all"
              >
                <span>Privacy Policy</span>
                <ArrowRight className="w-4 h-4 text-[#B88A2E]" />
              </Link>
              <Link
                to="/terms-and-conditions"
                className="p-4 rounded-xl border border-[#E8E2D5] bg-[#F8F8F6] hover:border-[#DEC07A] font-semibold text-[#262626] flex items-center justify-between transition-all"
              >
                <span>Terms & Conditions</span>
                <ArrowRight className="w-4 h-4 text-[#B88A2E]" />
              </Link>
              <Link
                to="/contact"
                className="p-4 rounded-xl border border-[#E8E2D5] bg-[#F8F8F6] hover:border-[#DEC07A] font-semibold text-[#262626] flex items-center justify-between transition-all"
              >
                <span>Contact & Support</span>
                <ArrowRight className="w-4 h-4 text-[#B88A2E]" />
              </Link>
            </div>
          </section>

          {/* Section F: Contact */}
          <section id="contact-deletion" className="scroll-mt-24 space-y-3 pt-6 border-t border-[#E8E2D5]">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#FCF8EF] text-[#8C671D] font-bold text-sm flex items-center justify-center border border-[#DEC07A]">
                F
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#262626]">
                Support & Verification Contact
              </h2>
            </div>
            <p className="text-sm text-[#525252] leading-relaxed">
              This data deletion page is publicly accessible without login. To submit a request or follow up on an existing inquiry:
            </p>
            <div className="p-4 rounded-xl border border-[#E8E2D5] bg-[#F8F8F6] text-xs sm:text-sm space-y-1">
              <p className="font-bold text-[#262626]">RSVLeadSync Data Protection Desk</p>
              <p className="text-[#525252]">Email: <a href={`mailto:${PRIVACY_EMAIL}`} className="text-[#8C671D] font-bold hover:underline">{PRIVACY_EMAIL}</a></p>
              <p className="text-[#525252]">Support: <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#8C671D] font-bold hover:underline">{SUPPORT_EMAIL}</a></p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};
