import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, Button, Input, Select, Modal, Form, DatePicker, Space, message, Tag, Switch } from 'antd';
import { Plus, Calendar, Clock, MapPin, CheckCircle, XCircle, Car, Eye } from 'lucide-react';
import dayjs from 'dayjs';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusTag } from '../../components/common/StatusTag';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export const SiteVisitsPage = () => {
  const queryClient = useQueryClient();
  const { hasPermission } = useAuth();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [statusFilter, setStatusFilter] = useState('');
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [outcomeModalVisible, setOutcomeModalVisible] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(null);

  const [scheduleForm] = Form.useForm();
  const [outcomeForm] = Form.useForm();

  // Fetch site visits
  const { data, isLoading } = useQuery({
    queryKey: ['site-visits', page, pageSize, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit: pageSize,
        ...(statusFilter && { status: statusFilter }),
      });
      const res = await api.get(`/site-visits?${params.toString()}`);
      return res.data;
    },
  });

  // Fetch properties for schedule modal dropdown
  const { data: propertiesData } = useQuery({
    queryKey: ['available-properties-dropdown'],
    queryFn: async () => {
      const res = await api.get('/properties?limit=50&status=Available');
      return res.data.data;
    },
  });

  // Schedule visit mutation
  const scheduleMutation = useMutation({
    mutationFn: (newVisit) => api.post('/site-visits', newVisit),
    onSuccess: () => {
      message.success('Site visit scheduled successfully');
      setScheduleModalVisible(false);
      scheduleForm.resetFields();
      queryClient.invalidateQueries(['site-visits']);
      queryClient.invalidateQueries(['dashboard-stats']);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Failed to schedule visit');
    },
  });

  // Update outcome mutation
  const outcomeMutation = useMutation({
    mutationFn: ({ id, data }) => api.put(`/site-visits/${id}`, data),
    onSuccess: () => {
      message.success('Visit outcome recorded');
      setOutcomeModalVisible(false);
      outcomeForm.resetFields();
      queryClient.invalidateQueries(['site-visits']);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Failed to record outcome');
    },
  });

  const handleOpenOutcome = (record) => {
    setSelectedVisit(record);
    outcomeForm.setFieldsValue({
      status: record.status === 'Scheduled' ? 'Completed' : record.status,
      outcome: record.outcome !== 'Pending Visit' ? record.outcome : 'Ready to Book',
      feedbackNotes: record.feedbackNotes,
    });
    setOutcomeModalVisible(true);
  };

  const columns = [
    {
      title: 'Visit Code',
      dataIndex: 'visitCode',
      key: 'visitCode',
      width: 140,
      render: (code) => <span className="font-bold text-[#8C671D]">{code}</span>,
    },
    {
      title: 'Visitor & Contact',
      key: 'visitor',
      render: (_, record) => (
        <div>
          <span className="font-bold text-[#262626] block">{record.visitorName}</span>
          <span className="text-[11px] text-[#737373]">{record.visitorPhone}</span>
        </div>
      ),
    },
    {
      title: 'Property / Unit',
      key: 'property',
      render: (_, record) => (
        <div>
          <span className="text-xs font-semibold text-[#262626] block">
            {record.propertyId?.title || 'Selected Property'}
          </span>
          <span className="text-[11px] text-[#737373]">
            Unit #{record.propertyId?.unitNumber} • {record.meetingPoint}
          </span>
        </div>
      ),
    },
    {
      title: 'Scheduled Time',
      dataIndex: 'scheduledTime',
      key: 'scheduledTime',
      render: (time) => {
        const d = new Date(time);
        const isPast = d < new Date();
        return (
          <span className={`text-xs font-semibold ${isPast ? 'text-gray-500' : 'text-[#8C671D]'}`}>
            {d.toLocaleDateString()} {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        );
      },
    },
    {
      title: 'Assigned Agent',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      render: (agent) => (
        <span className="text-xs font-medium text-[#262626]">
          {agent?.firstName} {agent?.lastName}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <StatusTag status={status} />,
    },
    {
      title: 'Outcome',
      dataIndex: 'outcome',
      key: 'outcome',
      render: (outcome) => (
        <span className="text-xs text-gray-700 font-medium">
          {outcome || 'Pending'}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          size="small"
          onClick={() => handleOpenOutcome(record)}
          className="text-xs font-semibold border-[#DEC07A] text-[#8C671D] hover:bg-[#FCF8EF]"
        >
          Record Outcome
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Site Visit Management"
        subtitle="Coordinate physical property site visits, appointments, and client inspection feedback."
        extra={
          hasPermission('site_visits.create') && (
            <Button
              type="primary"
              icon={<Plus size={16} />}
              onClick={() => {
                scheduleForm.resetFields();
                setScheduleModalVisible(true);
              }}
              className="font-semibold text-xs h-9"
            >
              Schedule Site Visit
            </Button>
          )
        }
      />

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E8E2D5] shadow-subtle flex gap-3 items-center">
        <Select
          placeholder="All Visit Statuses"
          value={statusFilter || undefined}
          onChange={(v) => setStatusFilter(v || '')}
          className="w-full sm:w-44 h-9"
          allowClear
        >
          <Select.Option value="Scheduled">Scheduled</Select.Option>
          <Select.Option value="Completed">Completed</Select.Option>
          <Select.Option value="Cancelled">Cancelled</Select.Option>
          <Select.Option value="Rescheduled">Rescheduled</Select.Option>
          <Select.Option value="No Show">No Show</Select.Option>
        </Select>
      </div>

      {/* Visits Table */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] shadow-card overflow-hidden">
        <Table
          columns={columns}
          dataSource={data?.data || []}
          rowKey="_id"
          loading={isLoading}
          scroll={{ x: 850 }}
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

      {/* Schedule Visit Modal */}
      <Modal
        title={<span className="font-bold text-base text-[#262626]">Schedule New Property Site Visit</span>}
        open={scheduleModalVisible}
        onCancel={() => setScheduleModalVisible(false)}
        footer={null}
        width="95%"
        style={{ maxWidth: 600 }}
        destroyOnClose
      >
        <Form
          form={scheduleForm}
          layout="vertical"
          onFinish={(values) => {
            scheduleMutation.mutate({
              ...values,
              scheduledTime: values.scheduledTime.toISOString(),
            });
          }}
          className="mt-4"
        >
          <Form.Item
            name="propertyId"
            label={<span className="font-semibold text-xs">Select Property / Plot</span>}
            rules={[{ required: true, message: 'Please select property' }]}
          >
            <Select placeholder="Choose available unit" className="h-9">
              {(propertiesData || []).map((p) => (
                <Select.Option key={p._id} value={p._id}>
                  {p.title} (Unit #{p.unitNumber} - ₹{(p.pricing?.basePrice / 100000).toFixed(1)}L)
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item
              name="visitorName"
              label={<span className="font-semibold text-xs">Client Full Name</span>}
              rules={[{ required: true, message: 'Visitor name is required' }]}
            >
              <Input placeholder="e.g. Ramesh V" className="h-9" />
            </Form.Item>

            <Form.Item
              name="visitorPhone"
              label={<span className="font-semibold text-xs">Client Phone</span>}
              rules={[{ required: true, message: 'Phone is required' }]}
            >
              <Input placeholder="+91 98765 43210" className="h-9" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item
              name="scheduledTime"
              label={<span className="font-semibold text-xs">Date & Time</span>}
              rules={[{ required: true, message: 'Please select scheduled time' }]}
            >
              <DatePicker showTime className="w-full h-9" />
            </Form.Item>

            <Form.Item
              name="meetingPoint"
              label={<span className="font-semibold text-xs">Meeting Point</span>}
              initialValue="Site Office Gate 1"
            >
              <Input placeholder="e.g. Site Office" className="h-9" />
            </Form.Item>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={scheduleMutation.isPending}
            className="w-full h-10 font-bold mt-2"
          >
            Confirm & Schedule Appointment
          </Button>
        </Form>
      </Modal>

      {/* Record Outcome Modal */}
      <Modal
        title={<span className="font-bold text-base text-[#262626]">Record Visit Outcome & Feedback</span>}
        open={outcomeModalVisible}
        onCancel={() => setOutcomeModalVisible(false)}
        footer={null}
        width="95%"
        style={{ maxWidth: 600 }}
        destroyOnClose
      >
        <Form
          form={outcomeForm}
          layout="vertical"
          onFinish={(values) => {
            outcomeMutation.mutate({
              id: selectedVisit._id,
              data: {
                ...values,
                nextFollowUpDate: values.nextFollowUpDate ? values.nextFollowUpDate.toISOString() : null,
              },
            });
          }}
          className="mt-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item
              name="status"
              label={<span className="font-semibold text-xs">Visit Status</span>}
              rules={[{ required: true }]}
            >
              <Select className="h-9">
                <Select.Option value="Completed">Completed</Select.Option>
                <Select.Option value="Scheduled">Scheduled</Select.Option>
                <Select.Option value="Cancelled">Cancelled</Select.Option>
                <Select.Option value="No Show">No Show</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="outcome"
              label={<span className="font-semibold text-xs">Client Reaction / Outcome</span>}
              rules={[{ required: true }]}
            >
              <Select className="h-9">
                <Select.Option value="Ready to Book">Ready to Book</Select.Option>
                <Select.Option value="Negotiating Price">Negotiating Price</Select.Option>
                <Select.Option value="Needs Follow-up">Needs Follow-up</Select.Option>
                <Select.Option value="Budget Mismatch">Budget Mismatch</Select.Option>
                <Select.Option value="Location Not Preferred">Location Not Preferred</Select.Option>
                <Select.Option value="Did Not Turn Up">Did Not Turn Up</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="feedbackNotes"
            label={<span className="font-semibold text-xs">Detailed Client Feedback Notes</span>}
          >
            <Input.TextArea rows={3} placeholder="Client liked the corner orientation, requested payment plan..." />
          </Form.Item>

          <Form.Item
            name="nextFollowUpDate"
            label={<span className="font-semibold text-xs">Schedule Post-Visit Follow-Up</span>}
          >
            <DatePicker showTime className="w-full h-9" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={outcomeMutation.isPending}
            className="w-full h-10 font-bold"
          >
            Save Outcome & Update CRM
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
