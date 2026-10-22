import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, Button, DatePicker, Select, Progress } from 'antd';
import { Download, BarChart3, TrendingUp, Users2, Building2, Receipt, Briefcase } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export const ReportsPage = () => {
  const { user, hasPermission } = useAuth();
  const [dateRange, setDateRange] = useState([]);

  const { data: reportData, isLoading } = useQuery({
    queryKey: ['reports-summary', dateRange],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (dateRange && dateRange[0] && dateRange[1]) {
        params.append('startDate', dateRange[0].toISOString());
        params.append('endDate', dateRange[1].toISOString());
      }
      const res = await api.get(`/reports/summary?${params.toString()}`);
      return res.data.data;
    },
  });

  const currencySymbol = user?.currency?.symbol || '₹';

  const leadsBySource = reportData?.leadsBySource || [];
  const propertyByType = reportData?.propertyByType || [];
  const agentPerformance = reportData?.agentPerformance || [];
  const paymentSummary = reportData?.paymentSummary || [];

  const handleExport = (type) => {
    window.open(`/api/reports/export/${type}`, '_blank');
  };

  const agentColumns = [
    {
      title: 'Consultant / Agent',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div>
          <span className="font-bold text-[#262626] block">{name}</span>
          <span className="text-[11px] text-[#737373]">{record.department}</span>
        </div>
      ),
    },
    {
      title: 'Assigned Leads',
      dataIndex: 'totalLeads',
      key: 'totalLeads',
      render: (leads) => <span className="font-bold text-[#262626]">{leads}</span>,
    },
    {
      title: 'Confirmed Bookings',
      dataIndex: 'totalBookings',
      key: 'totalBookings',
      render: (bookings) => (
        <span className="font-extrabold text-[#8C671D]">{bookings}</span>
      ),
    },
    {
      title: 'Conversion Efficiency',
      key: 'efficiency',
      render: (_, record) => {
        const rate = record.totalLeads > 0 ? Math.round((record.totalBookings / record.totalLeads) * 100) : 0;
        return (
          <div className="w-36">
            <div className="flex justify-between text-[11px] font-bold text-[#8C671D] mb-0.5">
              <span>{rate}%</span>
            </div>
            <Progress percent={rate} strokeColor="#B88A2E" size="small" showInfo={false} />
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Business Reports & Executive Analytics"
        subtitle="Audited performance analytics across sales pipelines, inventory valuation, and cash receipts."
        extra={
          hasPermission('reports.export') && (
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => handleExport('leads')}
                icon={<Download size={14} />}
                className="font-semibold text-xs h-9 border-[#E8E2D5]"
              >
                Export Leads
              </Button>
              <Button
                onClick={() => handleExport('bookings')}
                icon={<Download size={14} />}
                className="font-semibold text-xs h-9 border-[#E8E2D5]"
              >
                Export Bookings
              </Button>
              <Button
                onClick={() => handleExport('payments')}
                icon={<Download size={14} />}
                className="font-semibold text-xs h-9 border-[#E8E2D5]"
              >
                Export Ledger
              </Button>
            </div>
          )
        }
      />

      {/* Grid: Lead Acquisition Source Funnel & Property Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads by Source */}
        <div className="bg-white p-5 rounded-xl border border-[#E8E2D5] shadow-card">
          <h3 className="text-sm font-bold text-[#262626] m-0 mb-4 flex items-center gap-2">
            <Users2 className="text-[#B88A2E] w-4 h-4" /> Lead Enquiries by Acquisition Channel
          </h3>
          <div className="space-y-3">
            {leadsBySource.map((s) => (
              <div key={s._id} className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#262626]">{s._id || 'Direct'}</span>
                <span className="font-extrabold text-[#8C671D] px-2 py-0.5 rounded bg-[#FCF8EF] border border-[#F5EBD3]">
                  {s.count} enquiries
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Property Valuation Breakdown */}
        <div className="bg-white p-5 rounded-xl border border-[#E8E2D5] shadow-card">
          <h3 className="text-sm font-bold text-[#262626] m-0 mb-4 flex items-center gap-2">
            <Building2 className="text-[#B88A2E] w-4 h-4" /> Inventory Valuation by Asset Class
          </h3>
          <div className="space-y-3">
            {propertyByType.map((p) => (
              <div key={p._id} className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#262626] block">{p._id}</span>
                  <span className="text-[11px] text-[#737373]">{p.count} units in layout</span>
                </div>
                <span className="font-black text-[#8C671D]">
                  {currencySymbol}{(p.totalValue || 0).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sales Team Performance Leaderboard */}
      <div className="bg-white p-6 rounded-xl border border-[#E8E2D5] shadow-card overflow-hidden">
        <h3 className="text-sm font-bold text-[#262626] m-0 mb-4 flex items-center gap-2">
          <TrendingUp className="text-[#B88A2E] w-4 h-4" /> Sales Team Conversion Leaderboard
        </h3>
        <Table
          columns={agentColumns}
          dataSource={agentPerformance}
          rowKey="_id"
          pagination={false}
          scroll={{ x: 650 }}
          className="enterprise-table"
        />
      </div>
    </div>
  );
};
