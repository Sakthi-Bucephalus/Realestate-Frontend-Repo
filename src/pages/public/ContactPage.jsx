import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Shield,
  Clock,
  HelpCircle,
  FileText,
  Trash2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Lock,
} from 'lucide-react';
import { DocumentTitle } from '../../components/public/DocumentTitle';

export const ContactPage = () => {
  // Configurable support contact details:
  // In production, confirm and update these placeholders with the organization's verified operational contacts.
  const SUPPORT_EMAIL = 'sakthivelrajendranbusiness@gmail.com';
  const PRIVACY_EMAIL = 'sakthivelrajendranbusiness@gmail.com';

  return (
    <div className="bg-white">
      <DocumentTitle
        title="Contact & Support"
        description="Get in touch with the RSVLeadSync team for product support, technical integration guidance, privacy concerns, or data deletion requests."
      />

      {/* Header */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-20 bg-gradient-to-b from-[#FCF8EF]/60 via-white to-white border-b border-[#E8E2D5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCF8EF] border border-[#DEC07A] text-xs font-semibold text-[#8C671D] mb-4">
            <Mail className="w-3.5 h-3.5 text-[#B88A2E]" />
            <span>Support & Assistance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#262626] tracking-tight mb-4">
            Contact & Support
          </h1>
          <p className="text-base sm:text-lg text-[#525252] leading-relaxed max-w-2xl mx-auto">
            Have questions about Meta Lead Ads synchronization, integration configuration, or privacy rights? We are here to help.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Columns: Support Channels & Instructions */}
            <div className="lg:col-span-2 space-y-8">
              {/* Primary Support Email Card */}
              <div className="p-6 sm:p-8 rounded-2xl border border-[#E8E2D5] bg-[#F8F8F6] shadow-subtle">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FCF8EF] border border-[#DEC07A] text-[#8C671D] flex items-center justify-center shrink-0 shadow-gold-sm">
                    <Mail className="w-6 h-6 text-[#B88A2E]" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#262626]">
                      Direct Support Inquiries
                    </h2>
                    <p className="text-xs sm:text-sm text-[#737373] mt-1 mb-4 leading-relaxed">
                      For technical assistance, setup guidance, webhook issues, or general account inquiries, contact our support team directly via email:
                    </p>

                    <div className="inline-flex items-center gap-2 p-3 bg-white rounded-xl border border-[#E8E2D5] text-sm sm:text-base font-bold text-[#8C671D]">
                      <Mail className="w-4 h-4 text-[#B88A2E]" />
                      <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:underline">
                        {SUPPORT_EMAIL}
                      </a>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-xs text-[#737373]">
                      <Clock className="w-4 h-4 text-[#B88A2E]" />
                      <span>Response window: typically within 1 to 2 business days (Monday – Friday).</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy Concerns & Data Deletion Inquiries */}
              <div className="p-6 sm:p-8 rounded-2xl border border-[#E8E2D5] bg-white shadow-subtle">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FCF8EF] border border-[#DEC07A] text-[#8C671D] flex items-center justify-center shrink-0 shadow-gold-sm">
                    <Shield className="w-6 h-6 text-[#B88A2E]" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#262626]">
                      Privacy Concerns & Deletion Requests
                    </h3>
                    <p className="text-xs sm:text-sm text-[#737373] mt-1 mb-4 leading-relaxed">
                      If you have questions regarding personal data processing, wish to exercise your statutory privacy rights, or request the deletion of lead records retrieved through your Meta integration:
                    </p>

                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 p-3 bg-[#F8F8F6] rounded-xl border border-[#E8E2D5] text-sm font-bold text-[#262626]">
                        <Lock className="w-4 h-4 text-[#B88A2E]" />
                        <a href={`mailto:${PRIVACY_EMAIL}`} className="hover:underline">
                          {PRIVACY_EMAIL}
                        </a>
                      </div>

                      <div className="text-xs text-[#737373] space-y-1.5 pt-2">
                        <p className="font-semibold text-[#262626]">How to submit a deletion request:</p>
                        <ol className="list-decimal list-inside space-y-1 pl-1">
                          <li>Send an email with the subject line: <strong>"Data Deletion Request — [Your Organization Name]"</strong>.</li>
                          <li>Provide your registered account email and connected Facebook Page name/ID.</li>
                          <li><strong>Important:</strong> Never email passwords, secret keys, or Meta access tokens.</li>
                        </ol>
                      </div>

                      <div className="pt-2">
                        <Link
                          to="/data-deletion"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C671D] hover:underline"
                        >
                          <span>Review Full User Data Deletion Instructions</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Communication Transparency Notice */}
              <div className="p-4 rounded-xl bg-[#FCF8EF] border border-[#DEC07A] text-xs text-[#8C671D] flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-[#B88A2E] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold mb-0.5">Direct Communication Policy:</strong>
                  To ensure message delivery integrity and prevent spam interception, all inquiries are handled directly via verified email protocols rather than unauthenticated web forms.
                </div>
              </div>
            </div>

            {/* Right Column: Quick Links & Pre-Launch Notice */}
            <div className="space-y-6">
              {/* Quick Legal Links */}
              <div className="p-6 rounded-2xl border border-[#E8E2D5] bg-[#F8F8F6]">
                <h3 className="text-xs font-bold text-[#8C671D] uppercase tracking-wider mb-4">
                  Legal & Governance Documents
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm">
                  <li>
                    <Link
                      to="/privacy-policy"
                      className="p-3 bg-white rounded-xl border border-[#E8E2D5] hover:border-[#DEC07A] flex items-center justify-between text-[#262626] font-semibold transition-all group"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#B88A2E]" />
                        <span>Privacy Policy</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#B88A2E] transition-colors" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms-and-conditions"
                      className="p-3 bg-white rounded-xl border border-[#E8E2D5] hover:border-[#DEC07A] flex items-center justify-between text-[#262626] font-semibold transition-all group"
                    >
                      <span className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-[#B88A2E]" />
                        <span>Terms & Conditions</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#B88A2E] transition-colors" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/data-deletion"
                      className="p-3 bg-white rounded-xl border border-[#E8E2D5] hover:border-[#DEC07A] flex items-center justify-between text-[#262626] font-semibold transition-all group"
                    >
                      <span className="flex items-center gap-2">
                        <Trash2 className="w-4 h-4 text-[#B88A2E]" />
                        <span>Data Deletion Instructions</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#B88A2E] transition-colors" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Owner Configuration Note */}
              <div className="p-5 rounded-2xl border border-dashed border-[#DEC07A] bg-[#FCF8EF] text-xs text-[#8C671D] space-y-2">
                <p className="font-bold text-[#262626] flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#B88A2E]" />
                  <span>Deployment Notice for System Owner:</span>
                </p>
                <p className="leading-relaxed">
                  Before live public deployment and Meta App Review submission, ensure the support contact inbox ({SUPPORT_EMAIL}) is active, monitored by support staff, and configured with your organization's verified domain email routing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
