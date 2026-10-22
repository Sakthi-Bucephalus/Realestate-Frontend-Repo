import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, Button, Input, Select, Modal, Form, Space, message, Tag, Popconfirm } from 'antd';
import { Plus, Briefcase, CheckCircle, XCircle, Search, Download, Eye, DollarSign } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusTag } from '../../components/common/StatusTag';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export const BookingsList = () => {
  const queryClient = useQueryClient();
  const { hasPermission } = useAuth();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [createForm] = Form.useForm();
  const [cancelForm] = Form.useForm();

  // Fetch bookings
  const { data, isLoading } = useQuery({
    queryKey: ['bookings', page, pageSize, search, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit: pageSize,
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter }),
      });
      const res = await api.get(`/bookings?${params.toString()}`);
      return res.data;
    },
  });

  // Fetch Available properties & customers for booking creation
  const { data: availableProps } = useQuery({
    queryKey: ['available-properties-for-booking'],
    queryFn: async () => {
      const res = await api.get('/properties?limit=50&status=Available');
      return res.data.data;
    },
    enabled: createModalVisible,
  });

  const { data: customersList } = useQuery({
    queryKey: ['customers-for-booking'],
    queryFn: async () => {
      const res = await api.get('/customers?limit=50');
      return res.data.data;
    },
    enabled: createModalVisible,
  });

  // Create booking mutation
  const createMutation = useMutation({
    mutationFn: (newBooking) => api.post('/bookings', newBooking),
    onSuccess: () => {
      message.success('Booking created & property reserved successfully');
      setCreateModalVisible(false);
      createForm.resetFields();
      queryClient.invalidateQueries(['bookings']);
      queryClient.invalidateQueries(['properties']);
      queryClient.invalidateQueries(['dashboard-stats']);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Failed to create booking');
    },
  });

  // Confirm booking mutation
  const confirmMutation = useMutation({
    mutationFn: (id) => api.post(`/bookings/${id}/confirm`),
    onSuccess: () => {
      message.success('Deal confirmed and unit marked as Sold!');
      queryClient.invalidateQueries(['bookings']);
      queryClient.invalidateQueries(['properties']);
      queryClient.invalidateQueries(['dashboard-stats']);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Confirmation failed');
    },
  });

  // Cancel booking mutation
  const cancelMutation = useMutation({
    mutationFn: ({ id, data }) => api.post(`/bookings/${id}/cancel`, data),
    onSuccess: () => {
      message.success('Booking cancelled and property released back to Available');
      setCancelModalVisible(false);
      cancelForm.resetFields();
      queryClient.invalidateQueries(['bookings']);
      queryClient.invalidateQueries(['properties']);
      queryClient.invalidateQueries(['dashboard-stats']);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Cancellation failed');
    },
  });

  const handleExport = () => {
    window.open('/api/reports/export/bookings', '_blank');
  };

  const columns = [
    {
      title: 'Booking Ref',
      dataIndex: 'bookingReference',
      key: 'bookingReference',
      width: 140,
      render: (ref) => <span className="font-bold text-[#8C671D]">{ref}</span>,
    },
    {
      title: 'Customer',
      dataIndex: 'customerId',
      key: 'customerId',
      render: (cust) => (
        <div>
          <span className="font-bold text-[#262626] block">{cust?.name}</span>
          <span className="text-[11px] text-[#737373]">{cust?.phone}</span>
        </div>
      ),
    },
    {
      title: 'Property / Unit',
      dataIndex: 'propertyId',
      key: 'propertyId',
      render: (prop) => (
        <div>
          <span className="text-xs font-semibold text-[#262626] block">{prop?.title}</span>
          <span className="text-[11px] text-[#737373]">
            Unit #{prop?.unitNumber} • {prop?.propertyType}
          </span>
        </div>
      ),
    },
    {
      title: 'Agreed Price',
      dataIndex: 'agreedPrice',
      key: 'agreedPrice',
      render: (price) => (
        <span className="text-xs font-bold text-[#262626]">
          ₹{(price || 0).toLocaleString()}
        </span>
      ),
    },
    {
      title: 'Paid Amount',
      dataIndex: 'totalPaid',
      key: 'totalPaid',
      render: (paid) => (
        <span className="text-xs font-bold text-emerald-700">
          ₹{(paid || 0).toLocaleString()}
        </span>
      ),
    },
    {
      title: 'Balance Due',
      dataIndex: 'balanceDue',
      key: 'balanceDue',
      render: (balance) => (
        <span className={`text-xs font-bold ${balance > 0 ? 'text-amber-800' : 'text-gray-400'}`}>
          ₹{(balance || 0).toLocaleString()}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status) => <StatusTag status={status} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 160,
      render: (_, record) => (
        <Space size="small">
          {record.status === 'Pending Approval' && hasPermission('bookings.edit') && (
            <Popconfirm
              title="Confirm this deal? Property unit will be permanently marked as Sold."
              onConfirm={() => confirmMutation.mutate(record._id)}
              okText="Confirm Deal"
            >
              <Button size="small" type="primary" className="text-xs font-semibold">
                Confirm
              </Button>
            </Popconfirm>
          )}

          {['Pending Approval', 'Confirmed'].includes(record.status) && hasPermission('bookings.edit') && (
            <Button
              size="small"
              danger
              onClick={() => {
                setSelectedBooking(record);
                setCancelModalVisible(true);
              }}
              className="text-xs font-semibold"
            >
              Cancel
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Bookings & Deal Management"
        subtitle="Manage formal property sales agreements, reservation deposits, and contract status."
        extra={
          <div className="flex gap-2">
            {hasPermission('bookings.export') && (
              <Button
                onClick={handleExport}
                icon={<Download size={15} />}
                className="font-semibold text-xs h-9 border-[#E8E2D5]"
              >
                Export CSV
              </Button>
            )}
            {hasPermission('bookings.create') && (
              <Button
                type="primary"
                icon={<Plus size={16} />}
                onClick={() => {
                  createForm.resetFields();
                  setCreateModalVisible(true);
                }}
                className="font-semibold text-xs h-9"
              >
                New Booking Deal
              </Button>
            )}
          </div>
        }
      />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E8E2D5] shadow-subtle flex flex-wrap gap-3 items-center justify-between">
        <Input
          placeholder="Search by booking reference..."
          prefix={<Search size={16} className="text-gray-400 mr-1" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 h-9"
          allowClear
        />

        <Select
          placeholder="All Deal Statuses"
          value={statusFilter || undefined}
          onChange={(v) => setStatusFilter(v || '')}
          className="w-full sm:w-44 h-9"
          allowClear
        >
          <Select.Option value="Draft">Draft</Select.Option>
          <Select.Option value="Pending Approval">Pending Approval</Select.Option>
          <Select.Option value="Confirmed">Confirmed</Select.Option>
          <Select.Option value="Cancelled">Cancelled</Select.Option>
          <Select.Option value="Completed">Completed</Select.Option>
        </Select>
      </div>

      {/* Bookings Table */}
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

      {/* Create Booking Modal */}
      <Modal
        title={<span className="font-bold text-base text-[#262626]">Initiate New Deal Booking</span>}
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        width="95%"
        style={{ maxWidth: 620 }}
        destroyOnClose
      >
        <Form
          form={createForm}
          layout="vertical"
          onFinish={(values) => createMutation.mutate(values)}
          className="mt-4"
        >
          <Form.Item
            name="customerId"
            label={<span className="font-semibold text-xs">Buyer / Customer Profile</span>}
            rules={[{ required: true, message: 'Please select customer' }]}
          >
            <Select placeholder="Choose customer" className="h-9">
              {(customersList || []).map((c) => (
                <Select.Option key={c._id} value={c._id}>
                  {c.name} ({c.customerCode} - {c.phone})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="propertyId"
            label={<span className="font-semibold text-xs">Available Property Unit / Plot</span>}
            rules={[{ required: true, message: 'Please select available property' }]}
          >
            <Select
              placeholder="Choose available unit"
              className="h-9"
              onChange={(propId) => {
                const prop = availableProps?.find((p) => p._id === propId);
                if (prop) {
                  createForm.setFieldsValue({
                    agreedPrice: prop.pricing?.basePrice,
                    bookingAmount: prop.pricing?.bookingTokenAmount || 50000,
                  });
                }
              }}
            >
              {(availableProps || []).map((p) => (
                <Select.Option key={p._id} value={p._id}>
                  {p.title} (Unit #{p.unitNumber} - ₹{(p.pricing?.basePrice || 0).toLocaleString()})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item
              name="agreedPrice"
              label={<span className="font-semibold text-xs">Agreed Total Purchase Price (₹)</span>}
              rules={[{ required: true, message: 'Agreed price is required' }]}
            >
              <Input type="number" placeholder="5000000" className="h-9" />
            </Form.Item>

            <Form.Item
              name="bookingAmount"
              label={<span className="font-semibold text-xs">Booking Token Advance (₹)</span>}
              rules={[{ required: true, message: 'Token advance is required' }]}
            >
              <Input type="number" placeholder="100000" className="h-9" />
            </Form.Item>
          </div>

          <Form.Item
            name="paymentTerms"
            label={<span className="font-semibold text-xs">Agreed Payment Schedule & Terms</span>}
            initialValue="20% on booking, 60% during construction, 20% on registry handover"
          >
            <Input.TextArea rows={2} />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={createMutation.isPending}
            className="w-full h-10 font-bold"
          >
            Confirm Reservation & Lock Unit
          </Button>
        </Form>
      </Modal>

      {/* Cancel Booking Modal */}
      <Modal
        title={<span className="font-bold text-base text-rose-700">Cancel Booking Deal</span>}
        open={cancelModalVisible}
        onCancel={() => setCancelModalVisible(false)}
        footer={null}
        width="95%"
        style={{ maxWidth: 520 }}
        destroyOnClose
      >
        <Form
          form={cancelForm}
          layout="vertical"
          onFinish={(values) => {
            cancelMutation.mutate({
              id: selectedBooking._id,
              data: values,
            });
          }}
          className="mt-4"
        >
          <p className="text-xs text-[#737373] mb-4">
            Cancelling booking <strong>{selectedBooking?.bookingReference}</strong> will automatically release property{' '}
            <strong>{selectedBooking?.propertyId?.title}</strong> back to Available inventory.
          </p>

          <Form.Item
            name="reason"
            label={<span className="font-semibold text-xs">Official Cancellation Reason</span>}
            rules={[{ required: true, message: 'Please specify cancellation reason' }]}
          >
            <Input.TextArea rows={3} placeholder="Buyer loan rejected / buyer backed out..." />
          </Form.Item>

          <Form.Item
            name="refundAmount"
            label={<span className="font-semibold text-xs">Refund Amount (₹)</span>}
            initialValue={0}
          >
            <Input type="number" className="h-9" />
          </Form.Item>

          <Button
            type="primary"
            danger
            htmlType="submit"
            loading={cancelMutation.isPending}
            className="w-full h-10 font-bold"
          >
            Confirm Deal Cancellation & Release Unit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
