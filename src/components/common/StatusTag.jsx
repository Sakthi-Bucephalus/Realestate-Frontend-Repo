import React from 'react';
import { Tag } from 'antd';

export const StatusTag = ({ status, type = 'default' }) => {
  if (!status) return null;

  switch (status.toLowerCase()) {
    // New Lead
    case 'new':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-sm">
          <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          New
        </span>
      );

    // Hot Lead
    case 'hot':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-orange-700 border border-orange-300">
          <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-orange-500"></span>
          Hot
        </span>
      );

    // Warm Lead
    case 'warm':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
          <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-amber-500"></span>
          Warm
        </span>
      );

    // Cold Lead
    case 'cold':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
          <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-slate-400"></span>
          Cold
        </span>
      );

    // In Progress
    case 'in progress':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200">
          <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-indigo-500"></span>
          In Progress
        </span>
      );

    // Interested / Reserved / Negotiation
    case 'interested':
    case 'reserved':
    case 'contacted':
    case 'pending approval':
    case 'pending':
    case 'negotiation':
    case 'site visit scheduled':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FCF8EF] text-[#8C671D] border border-[#DEC07A]">
          <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-[#B88A2E]"></span>
          {status}
        </span>
      );

    // Not Interested
    case 'not interested':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-300">
          <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-gray-400"></span>
          Not Interested
        </span>
      );

    // Sold / Converted / Confirmed / Active
    case 'sold':
    case 'converted':
    case 'available':
    case 'active':
    case 'completed':
    case 'confirmed':
    case 'ready to book':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-emerald-500"></span>
          {status}
        </span>
      );

    // Cancelled / Lost / Inactive / Failed
    case 'cancelled':
    case 'lost':
    case 'inactive':
    case 'failed':
    case 'no show':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
          <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-rose-500"></span>
          {status}
        </span>
      );

    // Priorities
    case 'urgent':
      return <Tag color="error" className="font-semibold">{status}</Tag>;
    case 'high':
      return <Tag color="warning" className="font-semibold">{status}</Tag>;
    case 'medium':
      return <Tag color="gold" className="font-semibold">{status}</Tag>;
    case 'low':
      return <Tag color="default">{status}</Tag>;

    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
          {status}
        </span>
      );
  }
};
