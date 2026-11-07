import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { BrandLogo } from './landing/BrandLogo';

export const PublicNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (!isHomePage) return;

      const sections = ['home', 'platform', 'integration', 'how-it-works', 'features', 'faq'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Platform', id: 'platform' },
    { name: 'Integration', id: 'integration' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Features', id: 'features' },
    { name: 'FAQ', id: 'faq' },
  ];

  const handleNavClick = (e, id) => {
    if (isHomePage) {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(id);
      } else if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
      }
    } else {
      // If on another route, navigate to home with hash
      e.preventDefault();
      navigate(`/#${id}`);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none py-3 sm:py-4 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        {/* Floating Midnight Navy Pill Container - Constant Solid Background (No Transparency) */}
        <div
          className="pointer-events-auto w-full rounded-full border border-[#202C3D] bg-[#111827] shadow-[0_12px_40px_rgba(0,0,0,0.45)] px-4 sm:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-3 sm:gap-4"
        >
          {/* Left: Brand Logo with responsive 70px height on desktop */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#D6B46A] rounded-full px-1 shrink-0"
            aria-label="LevoraLead Home"
          >
            <BrandLogo size="navbar" light={true} />
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-[#202C3D] px-2.5 py-1 rounded-full border border-[#202C3D]">
            {navLinks.map((link) => {
              const isActive = isHomePage && activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 ${
                    isActive
                      ? 'bg-[#D6B46A] text-[#111827] shadow-sm font-extrabold'
                      : 'text-[#A7B0C0] hover:text-white hover:bg-[#111827]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <Link
              to="/login"
              className="text-xs sm:text-sm font-semibold text-[#A7B0C0] hover:text-[#D6B46A] px-2.5 sm:px-3 py-1.5 rounded-full transition-colors hidden sm:inline-block"
            >
              Login
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#D6B46A] hover:bg-[#C5A257] active:scale-[0.98] text-[#111827] text-xs sm:text-sm font-extrabold shadow-[0_2px_15px_rgba(214,180,106,0.35)] transition-all duration-200"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#111827]" />
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-full text-[#A7B0C0] hover:text-white hover:bg-[#202C3D] focus:outline-none focus:ring-2 focus:ring-[#D6B46A]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Midnight Navy) */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto max-w-sm mx-auto mt-2 rounded-2xl bg-[#111827] border border-[#202C3D] shadow-2xl p-4 lg:hidden animate-in fade-in slide-in-from-top-3 duration-200 text-white">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  handleNavClick(e, link.id);
                  setMobileMenuOpen(false);
                }}
                className="px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#A7B0C0] hover:bg-[#202C3D] hover:text-[#D6B46A] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-[#202C3D] flex flex-col gap-2">
            <Link
              to="/login"
              className="w-full text-center py-2.5 rounded-xl border border-[#202C3D] text-xs font-bold text-white hover:bg-[#202C3D] transition-colors"
            >
              Login to Workspace
            </Link>
            <Link
              to="/login"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#D6B46A] text-[#111827] text-xs font-extrabold shadow-sm hover:bg-[#C5A257] transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
