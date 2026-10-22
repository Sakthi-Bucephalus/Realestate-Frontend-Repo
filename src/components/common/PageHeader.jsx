import React from 'react';

export const PageHeader = ({ title, subtitle, extra, icon: Icon }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 mb-6 border-b border-[#E8E2D5] gap-4">
      <div className="flex items-center space-x-3">
        {Icon && (
          <div className="p-2.5 rounded-lg bg-[#FCF8EF] text-[#8C671D] border border-[#F5EBD3]">
            <Icon className="w-6 h-6" />
          </div>
        )}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#262626] tracking-tight m-0">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-[#737373] mt-1 m-0">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {extra && <div className="flex flex-wrap items-center gap-2">{extra}</div>}
    </div>
  );
};
