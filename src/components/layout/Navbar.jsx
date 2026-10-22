import React from 'react';
import { Dropdown, Badge, Avatar } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { Bell, Menu, Shield, LogOut, CheckCircle, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export const Navbar = ({ setMobileOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch unread notifications
  const { data: notifData, refetch } = useQuery({
    queryKey: ['notifications-unread'],
    queryFn: async () => {
      const res = await api.get('/notifications?limit=5');
      return res.data;
    },
    refetchInterval: 30000,
  });

  const unreadCount = notifData?.unreadCount || 0;
  const notifications = notifData?.data || [];

  const handleMarkAllRead = async () => {
    try {
      await api.post('/notifications/mark-all-read');
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const notificationMenu = (
    <div className="w-72 sm:w-80 bg-white rounded-lg shadow-gold-lg border border-[#E8E2D5] overflow-hidden">
      <div className="px-3.5 py-2.5 bg-[#FCF8EF] border-b border-[#E8E2D5] flex items-center justify-between">
        <span className="font-bold text-xs uppercase tracking-wider text-[#8C671D]">
          Notifications ({unreadCount})
        </span>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="text-[11px] text-[#B88A2E] hover:underline font-semibold flex items-center gap-1"
          >
            <CheckCircle size={12} /> Mark all read
          </button>
        )}
      </div>

      <div className="max-h-64 sm:max-h-72 overflow-y-auto divide-y divide-gray-100">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-xs text-gray-500">
            No notifications right now
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              onClick={() => {
                if (n.linkUrl) navigate(n.linkUrl);
              }}
              className={`p-3 text-xs hover:bg-[#FCF8EF] cursor-pointer transition-colors ${
                !n.isRead ? 'bg-[#FCF8EF]/50 font-medium' : ''
              }`}
            >
              <p className="font-bold text-[#262626] m-0 mb-0.5 truncate">{n.title}</p>
              <p className="text-[#737373] m-0 line-clamp-2 text-[11px]">{n.message}</p>
            </div>
          ))
        )}
      </div>

      <div className="p-2 border-t border-[#E8E2D5] bg-[#F8F8F6] text-center">
        <button
          onClick={() => navigate('/notifications')}
          className="text-xs font-semibold text-[#8C671D] hover:underline"
        >
          View all notifications &rarr;
        </button>
      </div>
    </div>
  );

  const profileMenuItems = [
    {
      key: 'org',
      label: (
        <div className="px-2 py-1">
          <p className="font-bold text-xs text-[#262626] m-0 truncate max-w-[200px]">
            {user?.organizationName || 'EstateFlow'}
          </p>
          <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#FCF8EF] text-[#8C671D] border border-[#DEC07A]">
            {user?.role}
          </span>
        </div>
      ),
    },
    { type: 'divider' },
    {
      key: 'settings',
      label: (
        <span className="flex items-center gap-2 text-xs font-medium">
          <Shield size={14} className="text-[#B88A2E]" /> Organization Settings
        </span>
      ),
      onClick: () => navigate('/settings'),
    },
    {
      key: 'logout',
      danger: true,
      label: (
        <span className="flex items-center gap-2 text-xs font-medium text-rose-600">
          <LogOut size={14} /> Sign Out
        </span>
      ),
      onClick: logout,
    },
  ];

  return (
    <header className="h-16 bg-white border-b border-[#E8E2D5] flex items-center justify-between px-3 sm:px-6 sticky top-0 z-20 shadow-subtle">
      {/* Left: Mobile Drawer Trigger + Brand Logo/Name */}
      <div className="flex items-center space-x-2.5 sm:space-x-3 overflow-hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 rounded-lg text-[#8C671D] hover:bg-[#FCF8EF] transition-colors"
          title="Open Menu"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center space-x-2 overflow-hidden">
          <div className="md:hidden w-7 h-7 rounded-md bg-[#B88A2E] flex items-center justify-center text-white font-extrabold text-xs flex-shrink-0">
            EF
          </div>
          <div className="truncate">
            <h2 className="text-xs sm:text-sm font-bold text-[#262626] m-0 truncate">
              {user?.organizationName || 'EstateFlow Real Estate'}
            </h2>
            <span className="hidden sm:block text-[11px] text-[#737373] truncate">
              {user?.department} • {user?.designation}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
        {/* Notifications Dropdown */}
        <Dropdown
          dropdownRender={() => notificationMenu}
          trigger={['click']}
          placement="bottomRight"
        >
          <button className="relative p-2 rounded-full hover:bg-[#FCF8EF] text-[#737373] hover:text-[#8C671D] transition-colors">
            <Badge count={unreadCount} overflowCount={9} color="#B88A2E">
              <Bell size={18} className="sm:w-5 sm:h-5" />
            </Badge>
          </button>
        </Dropdown>

        {/* User Profile Pill */}
        <Dropdown menu={{ items: profileMenuItems }} trigger={['click']} placement="bottomRight">
          <button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-[#FCF8EF] border border-transparent hover:border-[#E8E2D5] transition-all">
            <Avatar className="bg-[#B88A2E] text-white font-bold text-xs w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
              {user?.firstName?.charAt(0) || 'U'}
            </Avatar>
            <span className="hidden md:block text-xs font-bold text-[#262626] max-w-[120px] truncate">
              {user?.firstName}
            </span>
          </button>
        </Dropdown>
      </div>
    </header>
  );
};
