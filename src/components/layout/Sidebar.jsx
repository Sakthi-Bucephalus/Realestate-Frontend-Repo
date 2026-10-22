import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users2,
  Contact,
  Building2,
  CalendarCheck2,
  Briefcase,
  Receipt,
  UserCheck,
  BarChart3,
  Bell,
  Sliders,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from 'lucide-react';

export const Sidebar = ({ mobileOpen, setMobileOpen, collapsed, setCollapsed }) => {
  const { user, hasModule, logout } = useAuth();
  const location = useLocation();

  // Navigation modules mapped to icons & permissions
  const navItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      module: 'dashboard',
    },
    {
      key: 'leads',
      label: 'Leads & CRM',
      path: '/leads',
      icon: Users2,
      module: 'leads',
    },
    {
      key: 'customers',
      label: 'Customers',
      path: '/customers',
      icon: Contact,
      module: 'customers',
    },
    {
      key: 'properties',
      label: 'Properties & Plots',
      path: '/properties',
      icon: Building2,
      module: 'properties',
    },
    {
      key: 'site_visits',
      label: 'Site Visits',
      path: '/site-visits',
      icon: CalendarCheck2,
      module: 'site_visits',
    },
    {
      key: 'bookings',
      label: 'Bookings & Deals',
      path: '/bookings',
      icon: Briefcase,
      module: 'bookings',
    },
    {
      key: 'payments',
      label: 'Payment Ledger',
      path: '/payments',
      icon: Receipt,
      module: 'payments',
    },
    {
      key: 'employees',
      label: 'Employees & HR',
      path: '/employees',
      icon: UserCheck,
      module: 'employees',
    },
    {
      key: 'reports',
      label: 'Reports & Analytics',
      path: '/reports',
      icon: BarChart3,
      module: 'reports',
    },
    {
      key: 'notifications',
      label: 'Notifications',
      path: '/notifications',
      icon: Bell,
      module: 'notifications',
    },
    {
      key: 'settings',
      label: 'Settings & Access',
      path: '/settings',
      icon: Sliders,
      module: 'settings',
    },
  ];

  // Filter items by active module and user permission
  const accessibleItems = navItems.filter((item) => hasModule(item.module));

  const handleNavClick = () => {
    // Automatically close drawer on mobile when navigating
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-[#E8E2D5] flex flex-col justify-between transition-all duration-300 ${
          mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'
        } ${collapsed ? 'md:w-20' : 'md:w-64'}`}
      >
        {/* Brand Header */}
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b border-[#E8E2D5] bg-[#FCF8EF]">
            {/* Desktop Full or Mobile Open Logo */}
            {(!collapsed || mobileOpen) && (
              <div className="flex items-center space-x-2.5 overflow-hidden">
                <div className="w-9 h-9 rounded-lg bg-[#B88A2E] flex items-center justify-center text-white shadow-gold-sm font-extrabold text-lg flex-shrink-0">
                  EF
                </div>
                <div className="leading-tight truncate">
                  <span className="font-extrabold tracking-tight text-[#8C671D] text-base block truncate">
                    ESTATEFLOW
                  </span>
                  <span className="text-[10px] text-[#737373] tracking-widest uppercase block font-semibold truncate">
                    Enterprise Real Estate
                  </span>
                </div>
              </div>
            )}

            {/* Desktop Collapsed Logo */}
            {collapsed && !mobileOpen && (
              <div className="mx-auto w-10 h-10 rounded-lg bg-[#B88A2E] flex items-center justify-center text-white font-extrabold text-lg shadow-gold-sm">
                EF
              </div>
            )}

            {/* Desktop Collapse Toggle Button */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex p-1.5 rounded-md hover:bg-[#F5EBD3] text-[#8C671D] transition-colors"
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1.5 rounded-md hover:bg-[#F5EBD3] text-[#8C671D] transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            {accessibleItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.key}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#FCF8EF] text-[#8C671D] border-r-4 border-[#B88A2E] shadow-gold-sm'
                      : 'text-[#737373] hover:text-[#262626] hover:bg-[#F8F8F6]'
                  } ${collapsed && !mobileOpen ? 'justify-center' : 'space-x-3'}`}
                  title={collapsed && !mobileOpen ? item.label : undefined}
                >
                  <Icon
                    size={20}
                    className={`flex-shrink-0 ${isActive ? 'text-[#B88A2E]' : 'text-[#737373]'}`}
                  />
                  {(!collapsed || mobileOpen) && <span className="truncate">{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout Footer */}
        <div className="p-3 border-t border-[#E8E2D5] bg-[#F8F8F6]">
          {!collapsed || mobileOpen ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-[#DEC07A] text-[#8C671D] flex items-center justify-center font-bold text-xs uppercase flex-shrink-0">
                  {user?.firstName?.charAt(0) || 'U'}
                </div>
                <div className="truncate text-xs">
                  <p className="font-bold text-[#262626] truncate m-0">
                    {user?.fullName || `${user?.firstName} ${user?.lastName}`}
                  </p>
                  <p className="text-[11px] text-[#B88A2E] font-semibold uppercase tracking-wider truncate m-0">
                    {user?.role}
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-1.5 rounded-md hover:bg-rose-50 text-gray-500 hover:text-rose-600 transition-colors flex-shrink-0"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={logout}
              className="w-full flex items-center justify-center p-2 rounded-md hover:bg-rose-50 text-gray-500 hover:text-rose-600 transition-colors"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
