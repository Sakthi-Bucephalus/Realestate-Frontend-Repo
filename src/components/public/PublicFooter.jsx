import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Mail, Shield, ExternalLink, ArrowUpRight, HelpCircle } from 'lucide-react';

export const PublicFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-white border-t border-[#333333] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-[#2E2E2E]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 inline-flex focus:outline-none focus:ring-2 focus:ring-[#B88A2E] rounded-md p-0.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#B88A2E] to-[#8C671D] flex items-center justify-center text-white shadow-gold-sm">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                RSV<span className="text-[#CCA34A]">LeadSync</span>
              </span>
            </Link>

            <p className="text-sm text-[#A3A3A3] leading-relaxed max-w-sm">
              Connect your authorized Meta Pages, synchronize lead information securely, and manage your incoming leads from one organized workspace.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#262626] border border-[#3A3A3A] text-xs text-[#DEC07A]">
                <Shield className="w-3.5 h-3.5 text-[#B88A2E]" />
                <span>Authorized Meta Graph API Ingestion</span>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#262626] border border-[#3A3A3A] text-xs text-[#DEC07A]">
                <Shield className="w-3.5 h-3.5 text-[#B88A2E]" />
                <span>Email: sakthivelrajendranbusiness@gmail.com</span>         
                <br/>
                        <span>Phone: 9080539196</span>

              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-xs font-bold text-[#E5E5E5] uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#A3A3A3]">
              <li>
                <Link to="/features" className="hover:text-[#CCA34A] transition-colors">
                  Product Features
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-[#CCA34A] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#CCA34A] transition-colors flex items-center gap-1">
                  <span>Workspace Sign In</span>
                  <ArrowUpRight className="w-3 h-3 text-[#737373]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h3 className="text-xs font-bold text-[#E5E5E5] uppercase tracking-wider mb-4">
              Company & Support
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#A3A3A3]">
              <li>
                <Link to="/about" className="hover:text-[#CCA34A] transition-colors">
                  About RSVLeadSync
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#CCA34A] transition-colors">
                  Contact & Support
                </Link>
              </li>
            
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h3 className="text-xs font-bold text-[#E5E5E5] uppercase tracking-wider mb-4">
              Legal & Compliance
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#A3A3A3]">
              <li>
                <Link to="/privacy-policy" className="hover:text-[#CCA34A] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-[#CCA34A] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/data-deletion" className="hover:text-[#CCA34A] transition-colors font-semibold text-[#DEC07A]">
                  Data Deletion Instructions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="py-6 border-b border-[#2E2E2E]">
          <div className="bg-[#242424] rounded-xl p-4 border border-[#333333] text-xs text-[#A3A3A3] leading-relaxed space-y-2">
            <p className="font-semibold text-[#D4D4D4]">
              Independent Integration Notice:
            </p>
            <p>
              RSVLeadSync is an independent software platform that integrates with supported Meta services, subject to applicable permissions and availability. RSVLeadSync is not owned, developed, endorsed, certified, or officially partnered with Meta Platforms, Inc.
            </p>
            <p className="text-[11px] text-[#737373]">
              Meta, Facebook, and Instagram are registered trademarks of Meta Platforms, Inc. All other trademarks and logos are the property of their respective owners.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737373]">
          <p>© {currentYear} RSVLeadSync. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-[#A3A3A3] transition-colors">
              Privacy
            </Link>
            <span className="text-[#3A3A3A]">•</span>
            <Link to="/terms-and-conditions" className="hover:text-[#A3A3A3] transition-colors">
              Terms
            </Link>
            <span className="text-[#3A3A3A]">•</span>
            <Link to="/data-deletion" className="hover:text-[#A3A3A3] transition-colors">
              Data Deletion
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
