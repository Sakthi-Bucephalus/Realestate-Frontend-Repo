import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Users2,
  Calendar,
  AlertCircle,
  Clock,
  Building2,
  DollarSign,
  TrendingUp,
  Plus,
  ArrowRight,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { Button, Progress } from 'antd';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: statsData, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const res = await api.get('/dashboard/stats');
      return res.data.data;
    },
    staleTime: 60000,
  });

  const kpis = statsData?.kpis || {};
  const inventory = statsData?.inventory || { available: 0, reserved: 0, sold: 0, total: 0 };
  const stageBreakdown = statsData?.stageBreakdown || {};
  const salesTrends = statsData?.salesTrends || [];

  const currencySymbol = user?.currency?.symbol || '₹';

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome, ${user?.firstName || 'User'}`}
        subtitle="Here is an overview of your real estate business operations and performance today."
        extra={
          <div className="flex gap-2">
            <Button
              type="primary"
              icon={<Plus size={16} />}
              onClick={() => navigate('/leads')}
              className="font-semibold text-xs h-9"
            >
              Add Lead
            </Button>
            <Button
              onClick={() => navigate('/properties')}
              className="font-semibold text-xs h-9 border-[#DEC07A] text-[#8C671D] hover:bg-[#FCF8EF]"
            >
              Inventory
            </Button>
          </div>
        }
      />

      {/* Row 1: Urgent Attention Cards (Overdue & Due Today Follow-ups, Upcoming Visits) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Follow-ups Due Today"
          value={kpis.dueTodayFollowUps || 0}
          icon={Clock}
          description="Action required today"
          loading={isLoading}
          onClick={() => navigate('/leads?dueToday=true')}
        />
        <StatCard
          title="Overdue Follow-ups"
          value={kpis.overdueFollowUps || 0}
          icon={AlertCircle}
          description="Delayed communications"
          alert={(kpis.overdueFollowUps || 0) > 0}
          loading={isLoading}
          onClick={() => navigate('/leads?overdue=true')}
        />
        <StatCard
          title="Upcoming Site Visits"
          value={kpis.upcomingVisits || 0}
          icon={Calendar}
          description="Next 7 days schedule"
          loading={isLoading}
          onClick={() => navigate('/site-visits')}
        />
        <StatCard
          title="Conversion Rate"
          value={`${kpis.conversionRate || 0}%`}
          icon={TrendingUp}
          description={`${kpis.convertedLeads || 0} leads converted`}
          loading={isLoading}
        />
      </div>

      {/* Row 2: Financial & Deal KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Leads"
          value={kpis.totalLeads || 0}
          icon={Users2}
          description={`+${kpis.newLeadsMonth || 0} enquiries this month`}
          loading={isLoading}
          onClick={() => navigate('/leads')}
        />
        <StatCard
          title="Total Deal Value"
          prefix={currencySymbol}
          value={kpis.totalSalesValue || 0}
          icon={Briefcase}
          description={`${kpis.totalBookings || 0} active deal contracts`}
          loading={isLoading}
          onClick={() => navigate('/bookings')}
        />
        <StatCard
          title="Total Collections"
          prefix={currencySymbol}
          value={kpis.totalCollected || 0}
          icon={DollarSign}
          description={`${currencySymbol}${(kpis.collectedThisMonth || 0).toLocaleString()} this month`}
          loading={isLoading}
          onClick={() => navigate('/payments')}
        />
        <StatCard
          title="Outstanding Receivables"
          prefix={currencySymbol}
          value={kpis.outstandingBalance || 0}
          icon={AlertCircle}
          description="Balance due from buyers"
          loading={isLoading}
          onClick={() => navigate('/payments')}
        />
      </div>

      {/* Row 3: Inventory Breakdown & Pipeline Stage Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Summary */}
        <div className="bg-white p-6 rounded-xl border border-[#E8E2D5] shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[#262626] m-0 flex items-center gap-2">
              <Building2 className="text-[#B88A2E] w-5 h-5" /> Property & Plot Inventory
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#FCF8EF] text-[#8C671D] border border-[#F5EBD3]">
              {inventory.total} Total Units
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-emerald-700">Available Units</span>
                <span>{inventory.available} / {inventory.total}</span>
              </div>
              <Progress
                percent={inventory.total > 0 ? Math.round((inventory.available / inventory.total) * 100) : 0}
                strokeColor="#10B981"
                showInfo={false}
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#8C671D]">Reserved Units (In Booking)</span>
                <span>{inventory.reserved} / {inventory.total}</span>
              </div>
              <Progress
                percent={inventory.total > 0 ? Math.round((inventory.reserved / inventory.total) * 100) : 0}
                strokeColor="#B88A2E"
                showInfo={false}
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-blue-700">Sold Units</span>
                <span>{inventory.sold} / {inventory.total}</span>
              </div>
              <Progress
                percent={inventory.total > 0 ? Math.round((inventory.sold / inventory.total) * 100) : 0}
                strokeColor="#3B82F6"
                showInfo={false}
              />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#F5EBD3] flex justify-between items-center text-xs">
            <span className="text-[#737373]">Need to manage plots or units?</span>
            <button
              onClick={() => navigate('/properties')}
              className="text-[#8C671D] font-bold hover:underline flex items-center gap-1"
            >
              Open Inventory &rarr;
            </button>
          </div>
        </div>

        {/* Lead Stages Pipeline Funnel */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-[#E8E2D5] shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[#262626] m-0 flex items-center gap-2">
              <Users2 className="text-[#B88A2E] w-5 h-5" /> CRM Lead Pipeline Distribution
            </h3>
            <button
              onClick={() => navigate('/leads?view=kanban')}
              className="text-xs font-bold text-[#8C671D] hover:underline"
            >
              Switch to Kanban Board &rarr;
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-2.5 mt-4">
            {[
              { label: 'New', count: stageBreakdown['New'] || 0, bg: 'bg-gray-50', text: 'text-gray-700' },
              { label: 'Contacted', count: stageBreakdown['Contacted'] || 0, bg: 'bg-blue-50', text: 'text-blue-700' },
              { label: 'Interested', count: stageBreakdown['Interested'] || 0, bg: 'bg-amber-50', text: 'text-amber-800' },
              { label: 'Site Visits', count: stageBreakdown['Site Visit Scheduled'] || 0, bg: 'bg-[#FCF8EF]', text: 'text-[#8C671D]' },
              { label: 'Negotiation', count: stageBreakdown['Negotiation'] || 0, bg: 'bg-purple-50', text: 'text-purple-700' },
              { label: 'Converted', count: stageBreakdown['Converted'] || 0, bg: 'bg-emerald-50', text: 'text-emerald-700' },
              { label: 'Lost', count: stageBreakdown['Lost'] || 0, bg: 'bg-rose-50', text: 'text-rose-700' },
            ].map((stage) => (
              <div
                key={stage.label}
                className={`p-2.5 sm:p-3.5 rounded-lg border border-[#E8E2D5] ${stage.bg} text-center`}
              >
                <span className="text-[10px] sm:text-xs font-semibold block text-[#737373] uppercase tracking-wider truncate">
                  {stage.label}
                </span>
                <span className={`text-lg sm:text-xl font-extrabold mt-1 block ${stage.text}`}>
                  {stage.count}
                </span>
              </div>
            ))}
          </div>

          {/* 6-Month Sales Velocity Table / Visual */}
          <div className="mt-6 pt-4 border-t border-[#F5EBD3]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#737373] block mb-3">
              Booking Velocity (Last 6 Months):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center">
              {salesTrends.map((trend, idx) => (
                <div key={idx} className="bg-[#F8F8F6] p-2 rounded border border-[#E8E2D5]">
                  <p className="text-[11px] text-[#737373] font-semibold m-0">{trend.label}</p>
                  <p className="text-sm font-bold text-[#8C671D] m-0 mt-0.5">{trend.bookings} deals</p>
                  <p className="text-[10px] text-gray-500 m-0">
                    {currencySymbol}{(trend.revenue / 100000).toFixed(1)}L
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
