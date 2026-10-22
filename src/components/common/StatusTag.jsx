import React from 'react';
import { Tag } from 'antd';

export const StatusTag = ({ status, type = 'default' }) => {
  if (!status) return null;

  let color = 'default';
  let customClass = 'border font-medium text-xs rounded px-2 py-0.5';

  switch (status.toLowerCase()) {
    // Available / Active / Completed / Confirmed
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

    // Reserved / Interested / Scheduled / Pending
    case 'reserved':
    case 'interested':
    case 'scheduled':
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

    // Sold / Converted
    case 'sold':
    case 'converted':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
          <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-blue-500"></span>
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
