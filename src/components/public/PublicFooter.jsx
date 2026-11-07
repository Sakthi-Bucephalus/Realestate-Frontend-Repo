import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Phone, Shield, ArrowUpRight, ShieldCheck, Layers } from 'lucide-react';
import { BrandLogo, FacebookOfficialIcon, MetaOfficialIcon } from './landing/BrandLogo';

export const PublicFooter = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(`/#${id}`);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="bg-[#111827] text-white border-t border-[#202C3D] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-[#202C3D]">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              onClick={(e) => handleScrollTo(e, 'home')}
              className="inline-flex items-center focus:outline-none focus:ring-2 focus:ring-[#D6B46A] rounded-lg p-0.5 -ml-1"
              aria-label="LevoraLead Home"
            >
              <BrandLogo size="navbar" light={true} showTagline={true} />
            </Link>

            <p className="text-xs sm:text-sm text-[#A7B0C0] leading-relaxed max-w-sm">
              Connect your authorized Meta Lead Ads campaigns, synchronize high-intent buyer enquiries, and manage your complete real estate operations from one unified platform.
            </p>

            {/* Official Meta Integration & Contact Badge */}
            <div className="space-y-2 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#202C3D] border border-[#202C3D] text-xs text-[#D6B46A]">
                <MetaOfficialIcon className="w-4 h-4" />
                <span className="font-semibold">Meta Platform Integration</span>
              </div>

              <div className="p-3 rounded-xl bg-[#202C3D]/80 border border-[#202C3D] text-xs text-[#A7B0C0] space-y-1">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#D6B46A]" />
                  <a
                    href="mailto:sakthivelrajendranbusiness@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    sakthivelrajendranbusiness@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D6B46A]" />
                  <a href="tel:9080539196" className="hover:text-white transition-colors">
                    +91 9080539196
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#A7B0C0]">
              <li>
                <a
                  href="#platform"
                  onClick={(e) => handleScrollTo(e, 'platform')}
                  className="hover:text-[#D6B46A] transition-colors"
                >
                  Leads & CRM
                </a>
              </li>
              <li>
                <a
                  href="#integration"
                  onClick={(e) => handleScrollTo(e, 'integration')}
                  className="hover:text-[#D6B46A] transition-colors"
                >
                  Meta Integration
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleScrollTo(e, 'how-it-works')}
                  className="hover:text-[#D6B46A] transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  onClick={(e) => handleScrollTo(e, 'features')}
                  className="hover:text-[#D6B46A] transition-colors"
                >
                  Enterprise Features
                </a>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-[#D6B46A] transition-colors flex items-center gap-1 font-semibold text-white"
                >
                  <span>Sign In to Workspace</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D6B46A]" />
                </Link>
              </li>
            </ul>
          </div>


          {/* Legal & Compliance (PRESERVED ROUTES) */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Legal & Compliance
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#A7B0C0]">
              <li>
                <Link to="/privacy-policy" className="hover:text-[#D6B46A] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-[#D6B46A] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/data-deletion"
                  className="hover:text-[#D6B46A] transition-colors font-semibold text-[#D6B46A]"
                >
                  Data Deletion Instructions
                </Link>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleScrollTo(e, 'faq')} className="hover:text-[#D6B46A] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>
        </div>

        
        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A7B0C0]">
          <p>© {currentYear} LevoraLead. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#202C3D]">•</span>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-[#202C3D]">•</span>
            <Link to="/data-deletion" className="hover:text-white transition-colors">
              Data Deletion
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
