import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  Button,
  Input,
  Select,
  Modal,
  Form,
  Space,
  Popconfirm,
  message,
  Alert,
  Tooltip,
} from 'antd';
import {
  Plus,
  Search,
  Filter,
  Download,
  Kanban,
  List,
  Eye,
  Trash2,
  Clock,
  Phone,
  AlertCircle,
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusTag } from '../../components/common/StatusTag';
import { LeadDetailModal } from './LeadDetailModal';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export const LeadsList = () => {
  const queryClient = useQueryClient();
  const { user, hasPermission } = useAuth();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [overdueFilter, setOverdueFilter] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'kanban'

  // Modals
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [duplicateWarning, setDuplicateWarning] = useState(null);

  const [createForm] = Form.useForm();

  // Fetch Leads query
  const { data, isLoading } = useQuery({
    queryKey: ['leads', page, pageSize, search, statusFilter, priorityFilter, overdueFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit: pageSize,
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter }),
        ...(priorityFilter && { priority: priorityFilter }),
        ...(overdueFilter && { overdue: 'true' }),
      });
      const res = await api.get(`/leads?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  // Fetch Kanban data if kanban mode active
  const { data: kanbanData, isLoading: kanbanLoading } = useQuery({
    queryKey: ['leads-kanban'],
    queryFn: async () => {
      const res = await api.get('/leads/kanban');
      return res.data.data;
    },
    enabled: viewMode === 'kanban',
  });

  // Create lead mutation
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
      queryClient.invalidateQueries(['dashboard-stats']);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Failed to create lead');
    },
  });

  // Delete lead mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/leads/${id}`),
    onSuccess: () => {
      message.success('Lead deleted');
      queryClient.invalidateQueries(['leads']);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Delete failed');
    },
  });

  const handleOpenDetail = (lead) => {
    setSelectedLead(lead);
    setDetailModalVisible(true);
  };

  const handleExport = () => {
    window.open('/api/reports/export/leads', '_blank');
  };

  const columns = [
    {
      title: 'Lead ID',
      dataIndex: 'leadCode',
      key: 'leadCode',
      width: 130,
      render: (code, record) => (
        <span
          onClick={() => handleOpenDetail(record)}
          className="font-bold text-[#8C671D] hover:underline cursor-pointer"
        >
          {code}
        </span>
      ),
    },
    {
      title: 'Contact Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div>
          <span className="font-bold text-[#262626] block">{name}</span>
          <span className="text-[11px] text-[#737373] flex items-center gap-1">
            <Phone size={11} /> {record.phone}
          </span>
        </div>
      ),
    },
    {
      title: 'Preference',
      dataIndex: 'preferredPropertyType',
      key: 'preferredPropertyType',
      render: (type, record) => (
        <div>
          <span className="text-xs font-semibold text-[#262626] block">{type}</span>
          <span className="text-[11px] text-[#737373] block truncate max-w-[150px]">
            {record.preferredLocation || 'Any Location'}
          </span>
        </div>
      ),
    },
    {
      title: 'Budget',
      key: 'budget',
      render: (_, record) => (
        <span className="text-xs font-bold text-[#8C671D]">
          ₹{((record.budgetMin || 0) / 100000).toFixed(1)}L - ₹{((record.budgetMax || 0) / 100000).toFixed(1)}L
        </span>
      ),
    },
    {
      title: 'Stage',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status) => <StatusTag status={status} />,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 90,
      render: (priority) => <StatusTag status={priority} />,
    },
    {
      title: 'Next Follow-up',
      dataIndex: 'nextFollowUpDate',
      key: 'nextFollowUpDate',
      render: (date) => {
        if (!date) return <span className="text-gray-400 text-xs">—</span>;
        const isPast = new Date(date) < new Date();
        return (
          <span
            className={`text-xs font-semibold flex items-center gap-1 ${
              isPast ? 'text-rose-600 font-bold' : 'text-gray-700'
            }`}
          >
            <Clock size={12} /> {new Date(date).toLocaleDateString()}
          </span>
        );
      },
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      render: (agent) =>
        agent ? (
          <span className="text-xs font-medium text-gray-700">
            {agent.firstName} {agent.lastName}
          </span>
        ) : (
          <span className="text-xs text-gray-400">Unassigned</span>
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View 360 Detail">
            <Button
              type="text"
              size="small"
              icon={<Eye size={15} className="text-[#8C671D]" />}
              onClick={() => handleOpenDetail(record)}
            />
          </Tooltip>

          {hasPermission('leads.delete') && (
            <Popconfirm
              title="Delete lead permanently?"
              onConfirm={() => deleteMutation.mutate(record._id)}
              okText="Delete"
              okType="danger"
            >
              <Button
                type="text"
                size="small"
                danger
                icon={<Trash2 size={15} />}
              />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Leads & CRM Pipeline"
        subtitle="Manage prospective property buyers, stage progression, and scheduled follow-ups."
        extra={
          <div className="flex items-center gap-2">
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
                onClick={handleExport}
                icon={<Download size={15} />}
                className="font-semibold text-xs h-9 border-[#E8E2D5]"
              >
                Export CSV
              </Button>
            )}

            {hasPermission('leads.create') && (
              <Button
                type="primary"
                icon={<Plus size={16} />}
                onClick={() => {
                  setDuplicateWarning(null);
                  createForm.resetFields();
                  setCreateModalVisible(true);
                }}
                className="font-semibold text-xs h-9"
              >
                Add Lead
              </Button>
            )}
          </div>
        }
      />

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#E8E2D5] shadow-subtle flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center justify-between">
        <div className="flex flex-1 flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 w-full">
          <Input
            placeholder="Search leads by name, phone, email, location..."
            prefix={<Search size={16} className="text-gray-400 mr-1" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 lg:w-72 h-9"
            allowClear
          />

          <div className="flex flex-wrap gap-2">
            <Select
              placeholder="All Stages"
              value={statusFilter || undefined}
              onChange={(val) => setStatusFilter(val || '')}
              className="flex-1 sm:w-36 h-9"
              allowClear
            >
              <Select.Option value="New">New</Select.Option>
              <Select.Option value="Contacted">Contacted</Select.Option>
              <Select.Option value="Interested">Interested</Select.Option>
              <Select.Option value="Site Visit Scheduled">Site Visit Scheduled</Select.Option>
              <Select.Option value="Negotiation">Negotiation</Select.Option>
              <Select.Option value="Converted">Converted</Select.Option>
              <Select.Option value="Lost">Lost</Select.Option>
            </Select>

            <Select
              placeholder="All Priorities"
              value={priorityFilter || undefined}
              onChange={(val) => setPriorityFilter(val || '')}
              className="flex-1 sm:w-32 h-9"
              allowClear
            >
              <Select.Option value="Urgent">Urgent</Select.Option>
              <Select.Option value="High">High</Select.Option>
              <Select.Option value="Medium">Medium</Select.Option>
              <Select.Option value="Low">Low</Select.Option>
            </Select>
          </div>

          <button
            onClick={() => setOverdueFilter(!overdueFilter)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors flex items-center justify-center gap-1.5 ${
              overdueFilter
                ? 'bg-rose-50 text-rose-700 border-rose-300'
                : 'bg-white text-gray-600 border-[#E8E2D5] hover:bg-gray-50'
            }`}
          >
            <AlertCircle size={14} className={overdueFilter ? 'text-rose-600' : 'text-gray-400'} />
            Overdue Follow-ups
          </button>
        </div>
      </div>

      {/* Main Content: Table or Kanban */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-xl border border-[#E8E2D5] shadow-card overflow-hidden">
          <Table
            columns={columns}
            dataSource={data?.data || []}
            rowKey="_id"
            loading={isLoading}
            scroll={{ x: 880 }}
            pagination={{
              current: page,
              pageSize,
              total: data?.pagination?.total || 0,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '30', '50'],
              onChange: (p, ps) => {
                setPage(p);
                setPageSize(ps);
              },
            }}
            className="enterprise-table"
          />
        </div>
      ) : (
        /* Kanban Pipeline Board */
        <div className="flex gap-4 overflow-x-auto pb-6">
          {Object.entries(kanbanData || {}).map(([stageName, stageLeads]) => (
            <div
              key={stageName}
              className="flex-shrink-0 w-72 bg-[#F8F8F6] rounded-xl border border-[#E8E2D5] flex flex-col max-h-[75vh]"
            >
              <div className="p-3 border-b border-[#E8E2D5] bg-[#FCF8EF] rounded-t-xl flex justify-between items-center">
                <span className="font-bold text-xs uppercase tracking-wide text-[#8C671D]">
                  {stageName}
                </span>
                <span className="w-5 h-5 rounded-full bg-white text-[#8C671D] text-[11px] font-extrabold flex items-center justify-center border border-[#DEC07A]">
                  {stageLeads.length}
                </span>
              </div>

              <div className="p-2 space-y-2.5 overflow-y-auto flex-1">
                {stageLeads.map((lead) => (
                  <div
                    key={lead._id}
                    onClick={() => handleOpenDetail(lead)}
                    className="p-3 bg-white rounded-lg border border-[#E8E2D5] hover:border-[#CCA34A] hover:shadow-gold-sm transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <span className="font-bold text-xs text-[#262626] line-clamp-1">
                        {lead.name}
                      </span>
                      <StatusTag status={lead.priority} />
                    </div>
                    <p className="text-[11px] text-[#737373] m-0 mb-1">
                      {lead.preferredPropertyType} • ₹{((lead.budgetMax || 0) / 100000).toFixed(1)}L
                    </p>
                    {lead.nextFollowUpDate && (
                      <span className="text-[10px] text-amber-800 font-semibold flex items-center gap-1 mt-2">
                        <Clock size={11} /> {new Date(lead.nextFollowUpDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="text-center py-8 text-xs text-gray-400">
                    No leads in this stage
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lead Detail Modal */}
      <LeadDetailModal
        lead={selectedLead}
        visible={detailModalVisible}
        onClose={() => setDetailModalVisible(false)}
        onRefresh={() => {
          queryClient.invalidateQueries(['leads']);
          queryClient.invalidateQueries(['leads-kanban']);
          if (selectedLead?._id) {
            api.get(`/leads/${selectedLead._id}`).then((r) => setSelectedLead(r.data.data));
          }
        }}
      />

      {/* Create Lead Modal */}
      <Modal
        title={<span className="font-bold text-base text-[#262626]">Add New Enquiry / Lead</span>}
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        width={650}
        destroyOnClose
      >
        {duplicateWarning && (
          <Alert
            message="Duplicate Warning"
            description={duplicateWarning}
            type="warning"
            showIcon
            className="mb-4"
          />
        )}

        <Form
          form={createForm}
          layout="vertical"
          onFinish={(values) => createMutation.mutate(values)}
          initialValues={{
            source: 'Website',
            priority: 'Medium',
            preferredPropertyType: 'Residential Plot',
          }}
          className="mt-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <Form.Item
              name="name"
              label={<span className="font-semibold text-xs">Customer Name</span>}
              rules={[{ required: true, message: 'Please enter customer name' }]}
            >
              <Input placeholder="e.g. Anand Sharma" className="h-9" />
            </Form.Item>

            <Form.Item
              name="phone"
              label={<span className="font-semibold text-xs">Phone Number</span>}
              rules={[{ required: true, message: 'Phone number is required' }]}
            >
              <Input placeholder="+91 98765 43210" className="h-9" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Form.Item name="email" label={<span className="font-semibold text-xs">Email</span>}>
              <Input placeholder="anand@example.com" className="h-9" />
            </Form.Item>

            <Form.Item
              name="preferredPropertyType"
              label={<span className="font-semibold text-xs">Property Preference</span>}
            >
              <Select className="h-9">
                <Select.Option value="Residential Plot">Residential Plot</Select.Option>
                <Select.Option value="Villa / House">Villa / House</Select.Option>
                <Select.Option value="Apartment">Apartment</Select.Option>
                <Select.Option value="Commercial">Commercial</Select.Option>
                <Select.Option value="Agricultural Land">Agricultural Land</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Form.Item
              name="preferredLocation"
              label={<span className="font-semibold text-xs">Preferred Locality</span>}
            >
              <Input placeholder="e.g. Airport Road" className="h-9" />
            </Form.Item>

            <Form.Item
              name="budgetMin"
              label={<span className="font-semibold text-xs">Min Budget (₹)</span>}
            >
              <Input type="number" placeholder="2500000" className="h-9" />
            </Form.Item>

            <Form.Item
              name="budgetMax"
              label={<span className="font-semibold text-xs">Max Budget (₹)</span>}
            >
              <Input type="number" placeholder="4500000" className="h-9" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Form.Item name="source" label={<span className="font-semibold text-xs">Lead Source</span>}>
              <Select className="h-9">
                <Select.Option value="Website">Website</Select.Option>
                <Select.Option value="Referral">Referral</Select.Option>
                <Select.Option value="Social Media">Social Media</Select.Option>
                <Select.Option value="Advertisement">Advertisement</Select.Option>
                <Select.Option value="Channel Partner">Channel Partner</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="priority" label={<span className="font-semibold text-xs">Priority</span>}>
              <Select className="h-9">
                <Select.Option value="Urgent">Urgent</Select.Option>
                <Select.Option value="High">High</Select.Option>
                <Select.Option value="Medium">Medium</Select.Option>
                <Select.Option value="Low">Low</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item name="notes" label={<span className="font-semibold text-xs">Initial Notes</span>}>
            <Input.TextArea rows={2} placeholder="Requirements or context" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={createMutation.isPending}
            className="w-full h-10 font-bold"
          >
            Create Lead Record
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
