import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Shield, Layers, Radio, Sparkles } from 'lucide-react';

export const PublicNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-subtle border-b border-[#E8E2D5]'
          : 'bg-white border-b border-[#E8E2D5]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Wordmark */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#B88A2E] rounded-lg p-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#B88A2E] to-[#8C671D] flex items-center justify-center text-white shadow-gold-sm group-hover:shadow-gold-md transition-all duration-200">
              <Layers className="w-5 h-5 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#262626]">
                  RSV<span className="text-[#B88A2E]">LeadSync</span>
                </span>
                <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FCF8EF] text-[#8C671D] border border-[#DEC07A]">
                  Meta Sync
                </span>
              </div>
              <span className="text-[10px] text-[#737373] tracking-wide hidden sm:block">
                Turn Every Lead Into an Opportunity
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-xs lg:text-sm font-semibold transition-colors duration-150 ${
                    isActive
                      ? 'text-[#8C671D] bg-[#FCF8EF] font-bold border-b-2 border-[#B88A2E]'
                      : 'text-[#525252] hover:text-[#262626] hover:bg-[#F8F8F6]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Auth CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-3.5 py-2 text-xs lg:text-sm font-semibold text-[#262626] hover:text-[#8C671D] transition-colors rounded-md hover:bg-[#F8F8F6]"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#B88A2E] text-white text-xs lg:text-sm font-bold shadow-gold-sm hover:bg-[#8C671D] active:scale-[0.99] transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/login"
              className="px-3 py-1.5 text-xs font-semibold text-[#8C671D] bg-[#FCF8EF] border border-[#DEC07A] rounded-md"
            >
              Sign In
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#262626] hover:bg-[#F8F8F6] focus:outline-none focus:ring-2 focus:ring-[#B88A2E]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E2D5] bg-white px-4 pt-3 pb-6 shadow-lg animate-in fade-in duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[#8C671D] bg-[#FCF8EF] font-bold border-l-4 border-[#B88A2E]'
                      : 'text-[#262626] hover:bg-[#F8F8F6]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-4 mt-3 border-t border-[#E8E2D5] flex flex-col gap-2">
            <Link
              to="/login"
              className="w-full text-center py-2.5 rounded-lg border border-[#E8E2D5] text-sm font-bold text-[#262626] hover:bg-[#F8F8F6] transition-colors"
            >
              Sign In to Workspace
            </Link>
            <Link
              to="/login"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#B88A2E] text-white text-sm font-bold shadow-gold-sm hover:bg-[#8C671D] transition-colors"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F8F8F6] text-center">
            <p className="text-[11px] text-[#737373]">
              Authorized Meta Lead Ads Integration Platform
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
