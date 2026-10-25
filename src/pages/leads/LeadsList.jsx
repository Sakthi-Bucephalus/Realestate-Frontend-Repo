import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  Button,
  Input,
  Select,
  DatePicker,
  Modal,
  Form,
  Space,
  Popconfirm,
  message,
  Alert,
  Tooltip,
  Badge,
} from 'antd';
import {
  Plus,
  Search,
  Filter,
  Download,
  Kanban,
  List,
  Eye,
  Edit,
  Trash2,
  Clock,
  Phone,
  PhoneCall,
  AlertCircle,
  Share2,
  RefreshCw,
  Sparkles,
  Flame,
  Thermometer,
  Snowflake,
  CheckCircle2,
  UserCheck,
  Calendar,
  X,
  ExternalLink,
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { StatusTag } from '../../components/common/StatusTag';
import { LeadDetailModal } from './LeadDetailModal';
import { LeadEditModal } from './LeadEditModal';
import { CallActionModal } from './CallActionModal';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { RangePicker } = DatePicker;

export const LeadsList = () => {
  const queryClient = useQueryClient();
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();

  // Pagination state (default: 50 per specification)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  // Search & Filter state
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [assignedFilter, setAssignedFilter] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('');
  const [overdueFilter, setOverdueFilter] = useState(false);
  const [newLeadsOnly, setNewLeadsOnly] = useState(false);
  const [dateRange, setDateRange] = useState(null);
  const [followUpDateRange, setFollowUpDateRange] = useState(null);

  // View state
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'kanban'
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Modals state
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [callModalVisible, setCallModalVisible] = useState(false);
  const [activeLead, setActiveLead] = useState(null);
  const [duplicateWarning, setDuplicateWarning] = useState(null);

  const [createForm] = Form.useForm();
  const sseRef = useRef(null);

  // Debounce search input (350ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 350);
    return () => clearTimeout(handler);
  }, [search]);

  // 1. Fetch Meta Connection status for header badge
  const { data: metaConnectionData } = useQuery({
    queryKey: ['meta-connection-pill'],
    queryFn: async () => {
      const res = await api.get('/meta/connection');
      return res.data.data;
    },
    staleTime: 60000,
  });

  // 2. Fetch Employees for assignment filter and edit form
  const { data: employeesData } = useQuery({
    queryKey: ['employees-lookup'],
    queryFn: async () => {
      const res = await api.get('/employees?limit=100');
      return res.data.data || [];
    },
    staleTime: 120000,
  });
  const employees = employeesData || [];

  // 3. Fetch 10 Data-Driven Summary Counts
  const { data: summaryStats, refetch: refetchStats } = useQuery({
    queryKey: ['leads-summary-stats'],
    queryFn: async () => {
      const res = await api.get('/leads/summary/stats');
      return res.data.data;
    },
    refetchInterval: 30000,
  });

  // 4. Fetch Paginated & Filtered Leads
  const { data, isLoading, isFetching, refetch: refetchLeads } = useQuery({
    queryKey: [
      'leads',
      page,
      pageSize,
      debouncedSearch,
      statusFilter,
      priorityFilter,
      sourceFilter,
      assignedFilter,
      campaignFilter,
      overdueFilter,
      newLeadsOnly,
      dateRange,
      followUpDateRange,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit: pageSize,
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(statusFilter && { status: statusFilter }),
        ...(priorityFilter && { priority: priorityFilter }),
        ...(sourceFilter && { source: sourceFilter }),
        ...(assignedFilter && { assignedTo: assignedFilter }),
        ...(campaignFilter && { campaign: campaignFilter }),
        ...(overdueFilter && { overdue: 'true' }),
        ...(newLeadsOnly && { isNewLead: 'true' }),
        ...(dateRange && dateRange[0] && { startDate: dateRange[0].toISOString() }),
        ...(dateRange && dateRange[1] && { endDate: dateRange[1].toISOString() }),
        ...(followUpDateRange && followUpDateRange[0] && { followUpStart: followUpDateRange[0].toISOString() }),
        ...(followUpDateRange && followUpDateRange[1] && { followUpEnd: followUpDateRange[1].toISOString() }),
      });
      const res = await api.get(`/leads?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  // 5. Fetch Kanban Board Leads (if kanban mode active)
  const { data: kanbanData, isLoading: kanbanLoading } = useQuery({
    queryKey: ['leads-kanban'],
    queryFn: async () => {
      const res = await api.get('/leads/kanban');
      return res.data.data;
    },
    enabled: viewMode === 'kanban',
  });

  // 6. Real-Time Server-Sent Events (SSE) Listener
  useEffect(() => {
    const token = localStorage.getItem('estateflow_token');
    if (!token) return;

    const streamUrl = `/api/leads/stream?token=${encodeURIComponent(token)}`;

    try {
      const eventSource = new EventSource(streamUrl);
      sseRef.current = eventSource;

      eventSource.addEventListener('new_lead', (e) => {
        try {
          const payload = JSON.parse(e.data);
          message.success({
            content: (
              <span className="font-semibold text-xs">
                New Meta Lead: <strong>{payload.lead?.name || 'Customer'}</strong> ({payload.lead?.metaFormName || 'Ad Form'})
              </span>
            ),
            duration: 5,
          });
          queryClient.invalidateQueries(['leads']);
          queryClient.invalidateQueries(['leads-summary-stats']);
        } catch (err) {
          console.error('[SSE] Parse error:', err);
        }
      });

      eventSource.addEventListener('lead_status_changed', () => {
        queryClient.invalidateQueries(['leads']);
        queryClient.invalidateQueries(['leads-summary-stats']);
      });

      eventSource.addEventListener('leads_synced', (e) => {
        try {
          const payload = JSON.parse(e.data);
          message.info(`Meta Sync Complete: ${payload.newlyCreated} new leads imported.`);
          queryClient.invalidateQueries(['leads']);
          queryClient.invalidateQueries(['leads-summary-stats']);
        } catch {}
      });

      return () => {
        eventSource.close();
      };
    } catch (err) {
      console.warn('[SSE] Could not establish connection:', err);
    }
  }, [queryClient]);

  // Mutations
  const createMutation = useMutation({
    mutationFn: (newLead) => api.post('/leads', newLead),
    onSuccess: (res) => {
      message.success('Lead created successfully');
      if (res.data.duplicateWarning) {
        setDuplicateWarning(res.data.duplicateWarning);
      } else {
        setCreateModalVisible(false);
        createForm.resetFields();
      }
      queryClient.invalidateQueries(['leads']);
      queryClient.invalidateQueries(['leads-summary-stats']);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Failed to create lead');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/leads/${id}`),
    onSuccess: () => {
      message.success('Lead deleted');
      queryClient.invalidateQueries(['leads']);
      queryClient.invalidateQueries(['leads-summary-stats']);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Delete failed');
    },
  });

  // Fast inline status update from table row
  const handleQuickStatusChange = async (leadId, newStatus) => {
    try {
      await api.patch(`/leads/${leadId}/status`, { status: newStatus });
      message.success(`Status updated to ${newStatus}`);
      queryClient.invalidateQueries(['leads']);
      queryClient.invalidateQueries(['leads-summary-stats']);
    } catch (err) {
      message.error(err.response?.data?.message || 'Status update failed');
    }
  };

  // Action handlers
  const handleOpenDetail = (lead) => {
    setActiveLead(lead);
    setDetailModalVisible(true);
  };

  const handleOpenEdit = (lead) => {
    setActiveLead(lead);
    setEditModalVisible(true);
  };

  const handleOpenCall = (lead) => {
    setActiveLead(lead);
    setCallModalVisible(true);
  };

  const handleExportCSV = () => {
    const params = new URLSearchParams({
      ...(debouncedSearch && { search: debouncedSearch }),
      ...(statusFilter && { status: statusFilter }),
      ...(priorityFilter && { priority: priorityFilter }),
      ...(sourceFilter && { source: sourceFilter }),
      ...(campaignFilter && { campaign: campaignFilter }),
      ...(assignedFilter && { assignedTo: assignedFilter }),
      ...(dateRange && dateRange[0] && { startDate: dateRange[0].toISOString() }),
      ...(dateRange && dateRange[1] && { endDate: dateRange[1].toISOString() }),
    });
    window.open(`/api/leads/export/csv?${params.toString()}`, '_blank');
  };

  const handleClearFilters = () => {
    setSearch('');
    setDebouncedSearch('');
    setStatusFilter('');
    setPriorityFilter('');
    setSourceFilter('');
    setAssignedFilter('');
    setCampaignFilter('');
    setOverdueFilter(false);
    setNewLeadsOnly(false);
    setDateRange(null);
    setFollowUpDateRange(null);
    setPage(1);
  };

  // Status card quick filter toggler
  const handleCardClick = (statusKey) => {
    if (statusKey === 'all') {
      setStatusFilter('');
      setNewLeadsOnly(false);
      setOverdueFilter(false);
    } else if (statusKey === 'new_leads') {
      setNewLeadsOnly(true);
      setStatusFilter('');
      setOverdueFilter(false);
    } else if (statusKey === 'due_followups') {
      setOverdueFilter(true);
      setStatusFilter('');
      setNewLeadsOnly(false);
    } else {
      setStatusFilter(statusFilter === statusKey ? '' : statusKey);
      setNewLeadsOnly(false);
      setOverdueFilter(false);
    }
    setPage(1);
  };

  const leads = data?.data || [];
  const totalLeads = data?.pagination?.total || 0;
  const isMetaConnected = metaConnectionData?.status === 'CONNECTED';

  // Table columns definition
  const columns = [
    {
      title: 'Lead Name & ID',
      dataIndex: 'name',
      key: 'name',
      width: 220,
      render: (name, record) => {
        const isMeta = record.source === 'Meta Lead Ads' || !!record.metaLeadId;
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                onClick={() => handleOpenDetail(record)}
                className="font-bold text-[#262626] hover:text-[#8C671D] hover:underline cursor-pointer block leading-tight text-xs"
              >
                {name}
              </span>
              {record.isNewLead && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 animate-pulse uppercase tracking-wider">
                  NEW LEAD
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-[#737373]">
              <span className="font-mono text-[#8C671D] font-semibold">{record.leadCode}</span>
              {isMeta && (
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-0.5">
                  <Share2 size={9} /> Meta
                </span>
              )}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      width: 170,
      render: (phone, record) => (
        <div className="flex items-center justify-between gap-1">
          <span className="text-xs font-semibold text-[#262626] font-mono">{phone}</span>
          <Tooltip title="Call & Log Contact">
            <Button
              type="text"
              size="small"
              icon={<PhoneCall size={14} className="text-[#8C671D]" />}
              onClick={() => handleOpenCall(record)}
              className="hover:bg-[#FCF8EF] p-1 h-7 w-7 flex items-center justify-center shrink-0"
            />
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 170,
      render: (email) => (
        <span className="text-xs text-[#737373] truncate block max-w-[150px]" title={email}>
          {email || '—'}
        </span>
      ),
    },
    {
      title: 'Lead Source',
      dataIndex: 'source',
      key: 'source',
      width: 130,
      render: (source) => (
        <span className="text-xs font-semibold text-[#262626]">{source || 'Direct'}</span>
      ),
    },
    {
      title: 'Campaign / Ad',
      key: 'campaign',
      width: 180,
      render: (_, record) => {
        const campaign = record.metaCampaignName || '';
        const form = record.metaFormName || '';
        const ad = record.metaAdName || '';
        if (!campaign && !form && !ad) {
          return <span className="text-gray-400 text-xs">—</span>;
        }
        return (
          <div className="truncate max-w-[170px]" title={`${campaign} • ${form} ${ad ? `• ${ad}` : ''}`}>
            <span className="text-xs font-semibold text-[#262626] block truncate">
              {campaign || form || 'Meta Ad'}
            </span>
            {form && <span className="text-[10px] text-[#737373] block truncate">{form}</span>}
          </div>
        );
      },
    },
    {
      title: 'Created Date',
      key: 'createdDate',
      width: 130,
      render: (_, record) => {
        const date = record.metaCreatedAt || record.createdAt;
        if (!date) return <span className="text-gray-400 text-xs">—</span>;
        return (
          <div title={new Date(date).toLocaleString()}>
            <span className="text-xs text-[#262626] block font-medium">
              {new Date(date).toLocaleDateString()}
            </span>
            <span className="text-[10px] text-gray-500 block">
              {dayjs(date).fromNow()}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Lead Status',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status, record) => (
        <Select
          size="small"
          value={status}
          onChange={(newVal) => handleQuickStatusChange(record._id, newVal)}
          className="w-32 text-xs"
          bordered={false}
          dropdownMatchSelectWidth={false}
        >
          <Select.Option value="New"><StatusTag status="New" /></Select.Option>
          <Select.Option value="Hot"><StatusTag status="Hot" /></Select.Option>
          <Select.Option value="Warm"><StatusTag status="Warm" /></Select.Option>
          <Select.Option value="Cold"><StatusTag status="Cold" /></Select.Option>
          <Select.Option value="Interested"><StatusTag status="Interested" /></Select.Option>
          <Select.Option value="In Progress"><StatusTag status="In Progress" /></Select.Option>
          <Select.Option value="Not Interested"><StatusTag status="Not Interested" /></Select.Option>
          <Select.Option value="Converted"><StatusTag status="Converted" /></Select.Option>
          <Select.Option value="Lost"><StatusTag status="Lost" /></Select.Option>
        </Select>
      ),
    },
    {
      title: 'Assigned Agent',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      width: 130,
      render: (agent) =>
        agent ? (
          <span className="text-xs font-medium text-gray-700 truncate block">
            {agent.firstName} {agent.lastName}
          </span>
        ) : (
          <span className="text-xs text-gray-400 italic">Unassigned</span>
        ),
    },
    {
      title: 'Last Contacted',
      dataIndex: 'lastContactDate',
      key: 'lastContactDate',
      width: 110,
      render: (date) =>
        date ? (
          <span className="text-xs text-gray-600">{new Date(date).toLocaleDateString()}</span>
        ) : (
          <span className="text-gray-400 text-xs">—</span>
        ),
    },
    {
      title: 'Next Follow-up',
      dataIndex: 'nextFollowUpDate',
      key: 'nextFollowUpDate',
      width: 130,
      render: (date) => {
        if (!date) return <span className="text-gray-400 text-xs">—</span>;
        const isPast = new Date(date) < new Date();
        return (
          <span
            className={`text-xs font-semibold flex items-center gap-1 ${
              isPast ? 'text-rose-600 font-bold' : 'text-gray-700'
            }`}
            title={new Date(date).toLocaleString()}
          >
            <Clock size={11} /> {new Date(date).toLocaleDateString()}
          </span>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 130,
      render: (_, record) => (
        <Space size={2}>
          <Tooltip title="Place Call">
            <Button
              type="text"
              size="small"
              icon={<Phone size={14} className="text-[#8C671D]" />}
              onClick={() => handleOpenCall(record)}
            />
          </Tooltip>

          <Tooltip title="View 360 Detail">
            <Button
              type="text"
              size="small"
              icon={<Eye size={14} className="text-gray-600 hover:text-[#8C671D]" />}
              onClick={() => handleOpenDetail(record)}
            />
          </Tooltip>

          {hasPermission('leads.edit') && (
            <Tooltip title="Edit Lead">
              <Button
                type="text"
                size="small"
                icon={<Edit size={14} className="text-gray-600 hover:text-blue-600" />}
                onClick={() => handleOpenEdit(record)}
              />
            </Tooltip>
          )}

          {hasPermission('leads.delete') && (
            <Popconfirm
              title="Delete lead permanently?"
              onConfirm={() => deleteMutation.mutate(record._id)}
              okText="Delete"
              okType="danger"
            >
              <Tooltip title="Delete Lead">
                <Button type="text" size="small" danger icon={<Trash2 size={14} />} />
              </Tooltip>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      {/* Page Header with Meta Integration pill & CTAs */}
      <PageHeader
        title="Track Your Leads"
        subtitle="Manage prospective property buyers, real-time Meta Lead Ads pipeline, stage progression, and scheduled follow-ups."
        extra={
          <div className="flex flex-wrap items-center gap-2">
            {/* Meta Integration Status Pill */}
            <button
              onClick={() => navigate('/connect-meta')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1.5 transition-colors ${
                isMetaConnected
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-[#FCF8EF] text-[#8C671D] border-[#DEC07A] hover:bg-[#F5EBD3]'
              }`}
            >
              <Share2 size={13} className={isMetaConnected ? 'text-emerald-600' : 'text-[#8C671D]'} />
              <span>{isMetaConnected ? 'Meta Ads Connected' : 'Connect Meta'}</span>
              <ExternalLink size={12} className="opacity-70" />
            </button>

            {/* View Mode Toggle */}
            <div className="flex rounded-lg border border-[#E8E2D5] bg-white p-0.5">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'table'
                    ? 'bg-[#FCF8EF] text-[#8C671D]'
                    : 'text-[#737373] hover:text-[#262626]'
                }`}
              >
                <List size={14} /> Table
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'kanban'
                    ? 'bg-[#FCF8EF] text-[#8C671D]'
                    : 'text-[#737373] hover:text-[#262626]'
                }`}
              >
                <Kanban size={14} /> Kanban
              </button>
            </div>

            {hasPermission('leads.export') && (
              <Button
                onClick={handleExportCSV}
                icon={<Download size={14} />}
                className="font-semibold text-xs h-9 border-[#E8E2D5]"
              >
                Export CSV
              </Button>
            )}

            {hasPermission('leads.create') && (
              <Button
                type="primary"
                icon={<Plus size={15} />}
                onClick={() => {
                  setDuplicateWarning(null);
                  createForm.resetFields();
                  setCreateModalVisible(true);
                }}
                className="font-bold text-xs h-9 bg-[#B88A2E] hover:bg-[#8C671D]"
              >
                Add Lead
              </Button>
            )}
          </div>
        }
      />

      {/* 10 Data-Driven Summary Cards at the Top */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <StatCard
          title="Total Leads"
          value={summaryStats?.total || 0}
          icon={List}
          onClick={() => handleCardClick('all')}
        />

        <StatCard
          title="New Leads"
          value={summaryStats?.new || 0}
          icon={Sparkles}
          alert={(summaryStats?.new || 0) > 0}
          description="Click to filter new"
          onClick={() => handleCardClick('new_leads')}
        />

        <StatCard
          title="Hot Leads"
          value={summaryStats?.hot || 0}
          icon={Flame}
          description="High intent buyers"
          onClick={() => handleCardClick('Hot')}
        />

        <StatCard
          title="Warm Leads"
          value={summaryStats?.warm || 0}
          icon={Thermometer}
          description="Active consideration"
          onClick={() => handleCardClick('Warm')}
        />

        <StatCard
          title="Cold Leads"
          value={summaryStats?.cold || 0}
          icon={Snowflake}
          onClick={() => handleCardClick('Cold')}
        />

        <StatCard
          title="Interested"
          value={summaryStats?.interested || 0}
          icon={UserCheck}
          onClick={() => handleCardClick('Interested')}
        />

        <StatCard
          title="In Progress"
          value={summaryStats?.inProgress || 0}
          icon={RefreshCw}
          onClick={() => handleCardClick('In Progress')}
        />

        <StatCard
          title="Not Interested"
          value={summaryStats?.notInterested || 0}
          icon={X}
          onClick={() => handleCardClick('Not Interested')}
        />

        <StatCard
          title="Follow-ups Due"
          value={summaryStats?.dueFollowUps || 0}
          icon={Clock}
          alert={(summaryStats?.dueFollowUps || 0) > 0}
          onClick={() => handleCardClick('due_followups')}
        />

        <StatCard
          title="Converted"
          value={summaryStats?.converted || 0}
          icon={CheckCircle2}
          onClick={() => handleCardClick('Converted')}
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#E8E2D5] shadow-subtle space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <Input
            placeholder="Search by name, phone, email, lead ID, campaign..."
            prefix={<Search size={15} className="text-gray-400 mr-1" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 lg:w-72 h-9 text-xs"
            allowClear
          />

          <Select
            placeholder="Lead Status"
            value={statusFilter || undefined}
            onChange={(val) => { setStatusFilter(val || ''); setPage(1); }}
            className="w-36 h-9 text-xs"
            allowClear
          >
            <Select.Option value="New">New</Select.Option>
            <Select.Option value="Hot">Hot</Select.Option>
            <Select.Option value="Warm">Warm</Select.Option>
            <Select.Option value="Cold">Cold</Select.Option>
            <Select.Option value="Interested">Interested</Select.Option>
            <Select.Option value="In Progress">In Progress</Select.Option>
            <Select.Option value="Not Interested">Not Interested</Select.Option>
            <Select.Option value="Converted">Converted</Select.Option>
            <Select.Option value="Lost">Lost</Select.Option>
          </Select>

          <Select
            placeholder="Lead Source"
            value={sourceFilter || undefined}
            onChange={(val) => { setSourceFilter(val || ''); setPage(1); }}
            className="w-36 h-9 text-xs"
            allowClear
          >
            <Select.Option value="Meta Lead Ads">Meta Lead Ads</Select.Option>
            <Select.Option value="Website">Website</Select.Option>
            <Select.Option value="Referral">Referral</Select.Option>
            <Select.Option value="Walk-in">Walk-in</Select.Option>
            <Select.Option value="Social Media">Social Media</Select.Option>
            <Select.Option value="Advertisement">Advertisement</Select.Option>
          </Select>

          <Select
            placeholder="Assigned Agent"
            value={assignedFilter || undefined}
            onChange={(val) => { setAssignedFilter(val || ''); setPage(1); }}
            className="w-40 h-9 text-xs"
            allowClear
          >
            {employees.map((emp) => (
              <Select.Option key={emp._id} value={emp._id}>
                {emp.firstName} {emp.lastName}
              </Select.Option>
            ))}
          </Select>

          <Input
            placeholder="Filter by Campaign..."
            value={campaignFilter}
            onChange={(e) => { setCampaignFilter(e.target.value); setPage(1); }}
            className="w-36 h-9 text-xs"
            allowClear
          />

          <RangePicker
            value={dateRange}
            onChange={(dates) => { setDateRange(dates); setPage(1); }}
            className="h-9 text-xs"
            placeholder={['Created From', 'Created To']}
          />

          <button
            onClick={() => { setOverdueFilter(!overdueFilter); setPage(1); }}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
              overdueFilter
                ? 'bg-rose-50 text-rose-700 border-rose-300'
                : 'bg-white text-gray-600 border-[#E8E2D5] hover:bg-gray-50'
            }`}
          >
            <Clock size={13} /> Overdue Only
          </button>

          <button
            onClick={() => { setNewLeadsOnly(!newLeadsOnly); setPage(1); }}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
              newLeadsOnly
                ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                : 'bg-white text-gray-600 border-[#E8E2D5] hover:bg-gray-50'
            }`}
          >
            <Sparkles size={13} /> New Leads Only
          </button>

          {(search || statusFilter || priorityFilter || sourceFilter || assignedFilter || campaignFilter || overdueFilter || newLeadsOnly || dateRange) && (
            <Button
              onClick={handleClearFilters}
              size="small"
              className="text-xs text-[#8C671D] border-[#DEC07A]"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Main Data Table */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-xl border border-[#E8E2D5] shadow-card overflow-hidden">
          <Table
            columns={columns}
            dataSource={leads}
            rowKey="_id"
            loading={isLoading}
            pagination={{
              current: page,
              pageSize,
              total: totalLeads,
              pageSizeOptions: ['10', '25', '50'],
              showSizeChanger: true,
              showTotal: (total, range) => (
                <span className="text-xs text-gray-500">
                  Showing {range[0]}-{range[1]} of {total} leads
                </span>
              ),
              onChange: (p, ps) => {
                setPage(p);
                setPageSize(ps);
              },
            }}
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
            }}
            scroll={{ x: 1350 }}
            className="enterprise-table"
          />
        </div>
      ) : (
        /* Kanban View Mode */
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {Object.entries(kanbanData || {}).map(([stage, stageLeads]) => (
            <div key={stage} className="bg-[#F8F8F6] rounded-xl border border-[#E8E2D5] p-3 space-y-3 min-w-[240px]">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D5]">
                <span className="font-bold text-xs uppercase tracking-wider text-[#262626]">
                  {stage}
                </span>
                <Badge count={stageLeads.length} overflowCount={99} color="#B88A2E" />
              </div>

              <div className="space-y-2 max-h-[calc(100vh-320px)] overflow-y-auto">
                {stageLeads.length === 0 ? (
                  <p className="text-[11px] text-gray-400 italic text-center py-4">No leads in stage</p>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead._id}
                      onClick={() => handleOpenDetail(lead)}
                      className="bg-white p-3 rounded-lg border border-[#E8E2D5] shadow-subtle hover:border-[#B88A2E] cursor-pointer space-y-2 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#262626] truncate">{lead.name}</span>
                        {lead.isNewLead && (
                          <span className="text-[9px] font-bold px-1 rounded bg-amber-100 text-amber-900 border border-amber-300">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 m-0 font-mono">{lead.phone}</p>
                      <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[10px] text-gray-400">
                        <span>{lead.source}</span>
                        <span>{dayjs(lead.createdAt).fromNow()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 360 Detail Drawer/Modal */}
      <LeadDetailModal
        lead={activeLead}
        visible={detailModalVisible}
        onClose={() => {
          setDetailModalVisible(false);
          setActiveLead(null);
        }}
        onRefresh={() => {
          refetchLeads();
          refetchStats();
        }}
      />

      {/* Edit Lead Modal */}
      <LeadEditModal
        lead={activeLead}
        visible={editModalVisible}
        employees={employees}
        onClose={() => {
          setEditModalVisible(false);
          setActiveLead(null);
        }}
        onSuccess={() => {
          refetchLeads();
          refetchStats();
        }}
      />

      {/* Quick Phone Call & Follow-up Logger Modal */}
      <CallActionModal
        lead={activeLead}
        visible={callModalVisible}
        onClose={() => {
          setCallModalVisible(false);
          setActiveLead(null);
        }}
        onSuccess={() => {
          refetchLeads();
          refetchStats();
        }}
      />

      {/* Create Lead Modal */}
      <Modal
        title="Create New Lead"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={createForm}
          layout="vertical"
          onFinish={(v) => createMutation.mutate(v)}
          className="mt-3 space-y-2"
        >
          {duplicateWarning && (
            <Alert message={duplicateWarning} type="warning" showIcon className="mb-3" />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item name="name" label="Contact Name" rules={[{ required: true }]}>
              <Input className="h-9" />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
              <Input className="h-9" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item name="email" label="Email Address">
              <Input type="email" className="h-9" />
            </Form.Item>
            <Form.Item name="source" label="Source" initialValue="Website">
              <Select className="h-9">
                <Select.Option value="Website">Website</Select.Option>
                <Select.Option value="Meta Lead Ads">Meta Lead Ads</Select.Option>
                <Select.Option value="Referral">Referral</Select.Option>
                <Select.Option value="Walk-in">Walk-in</Select.Option>
                <Select.Option value="Social Media">Social Media</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item name="preferredPropertyType" label="Property Type" initialValue="Residential Plot">
              <Select className="h-9">
                <Select.Option value="Residential Plot">Residential Plot</Select.Option>
                <Select.Option value="Villa / House">Villa / House</Select.Option>
                <Select.Option value="Apartment">Apartment</Select.Option>
                <Select.Option value="Commercial">Commercial</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="preferredLocation" label="Preferred Location">
              <Input className="h-9" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item name="budgetMin" label="Min Budget (₹)">
              <Input type="number" placeholder="0" className="h-9" />
            </Form.Item>
            <Form.Item name="budgetMax" label="Max Budget (₹)">
              <Input type="number" placeholder="0" className="h-9" />
            </Form.Item>
          </div>

          <Form.Item name="notes" label="Notes">
            <Input.TextArea rows={2} />
          </Form.Item>

          <div className="flex justify-end gap-2 pt-2">
            <Button onClick={() => setCreateModalVisible(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={createMutation.isPending}
              className="bg-[#B88A2E] hover:bg-[#8C671D] font-bold"
            >
              Save Lead
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
