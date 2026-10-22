import React from 'react';
import { Skeleton } from 'antd';

export const StatCard = ({
  title,
  value,
  prefix = '',
  suffix = '',
  icon: Icon,
  description,
  trend,
  trendPositive = true,
  loading = false,
  onClick,
  alert = false,
}) => {
  if (loading) {
    return (
      <div className="bg-white p-5 rounded-lg border border-[#E8E2D5] shadow-subtle">
        <Skeleton active paragraph={{ rows: 1 }} />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg p-5 border transition-all duration-200 ${
        alert
          ? 'border-rose-300 bg-rose-50/20'
          : 'border-[#E8E2D5] hover:border-[#CCA34A] hover:shadow-gold-sm'
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#737373] mb-1">
            {title}
          </p>
          <div className="flex items-baseline space-x-1 overflow-hidden">
            {prefix && <span className="text-base sm:text-lg font-bold text-[#8C671D] shrink-0">{prefix}</span>}
            <span className="text-xl sm:text-2xl font-extrabold text-[#262626] tracking-tight truncate">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            {suffix && <span className="text-xs font-semibold text-[#737373] shrink-0">{suffix}</span>}
          </div>
        </div>

        {Icon && (
          <div className={`p-2.5 rounded-lg shrink-0 ${alert ? 'bg-rose-100 text-rose-700' : 'bg-[#FCF8EF] text-[#8C671D]'}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(description || trend) && (
        <div className="mt-3 pt-3 border-t border-[#F5EBD3] flex flex-wrap items-center justify-between gap-1 text-xs">
          {description && <span className="text-[#737373]">{description}</span>}
          {trend && (
            <span className={`font-semibold ${trendPositive ? 'text-emerald-700' : 'text-rose-700'}`}>
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
