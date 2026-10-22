import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, Button, Input, Modal, Form, Drawer, Space, message, Tag } from 'antd';
import { Plus, Search, Contact, Phone, Mail, MapPin, Briefcase, Calendar, Receipt, Eye } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusTag } from '../../components/common/StatusTag';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export const CustomersList = () => {
  const queryClient = useQueryClient();
  const { hasPermission } = useAuth();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [profileDrawerVisible, setProfileDrawerVisible] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const [createForm] = Form.useForm();

  // Fetch customers
  const { data, isLoading } = useQuery({
    queryKey: ['customers', page, pageSize, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit: pageSize,
        ...(search && { search }),
      });
      const res = await api.get(`/customers?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  // Fetch customer 360 profile
  const { data: customerProfile, isLoading: profileLoading } = useQuery({
    queryKey: ['customer-profile', selectedCustomerId],
    queryFn: async () => {
      if (!selectedCustomerId) return null;
      const res = await api.get(`/customers/${selectedCustomerId}`);
      return res.data.data;
    },
    enabled: !!selectedCustomerId,
  });

  // Create customer mutation
  const createMutation = useMutation({
    mutationFn: (newCust) => api.post('/customers', newCust),
    onSuccess: () => {
      message.success('Customer profile created successfully');
      setCreateModalVisible(false);
      createForm.resetFields();
      queryClient.invalidateQueries(['customers']);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Failed to create customer');
    },
  });

  const handleOpenProfile = (id) => {
    setSelectedCustomerId(id);
    setProfileDrawerVisible(true);
  };

  const columns = [
    {
      title: 'Customer Code',
      dataIndex: 'customerCode',
      key: 'customerCode',
      width: 140,
      render: (code, record) => (
        <span
          onClick={() => handleOpenProfile(record._id)}
          className="font-bold text-[#8C671D] hover:underline cursor-pointer"
        >
          {code}
        </span>
      ),
    },
    {
      title: 'Customer Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div>
          <span className="font-bold text-[#262626] block">{name}</span>
          <span className="text-[11px] text-[#737373]">{record.address?.city || 'India'}</span>
        </div>
      ),
    },
    {
      title: 'Phone & Alternative',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone, record) => (
        <div>
          <span className="text-xs font-semibold text-[#262626] block">{phone}</span>
          {record.alternativePhone && (
            <span className="text-[11px] text-[#737373] block">{record.alternativePhone}</span>
          )}
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => <span className="text-xs text-gray-700">{email || '—'}</span>,
    },
    {
      title: 'Assigned Executive',
      dataIndex: 'assignedExecutive',
      key: 'assignedExecutive',
      render: (exec) =>
        exec ? (
          <span className="text-xs font-medium text-[#262626]">
            {exec.firstName} {exec.lastName}
          </span>
        ) : (
          <span className="text-xs text-gray-400">Unassigned</span>
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      render: (_, record) => (
        <Button
          type="text"
          size="small"
          icon={<Eye size={15} className="text-[#8C671D]" />}
          onClick={() => handleOpenProfile(record._id)}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Customer Directory"
        subtitle="Centralized management of buyers, property preferences, and transaction ledger histories."
        extra={
          hasPermission('customers.create') && (
            <Button
              type="primary"
              icon={<Plus size={16} />}
              onClick={() => {
                createForm.resetFields();
                setCreateModalVisible(true);
              }}
              className="font-semibold text-xs h-9"
            >
              Add Customer
            </Button>
          )
        }
      />

      {/* Search Input */}
      <div className="bg-white p-4 rounded-xl border border-[#E8E2D5] shadow-subtle flex items-center justify-between">
        <Input
          placeholder="Search by customer name, phone, code..."
          prefix={<Search size={16} className="text-gray-400 mr-1" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 h-9"
          allowClear
        />
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] shadow-card overflow-hidden">
        <Table
          columns={columns}
          dataSource={data?.data || []}
          rowKey="_id"
          loading={isLoading}
          scroll={{ x: 750 }}
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

      {/* Customer 360 Profile Drawer */}
      <Drawer
        title={
          <div className="flex items-center gap-2">
            <Contact size={20} className="text-[#8C671D]" />
            <span className="font-bold text-base text-[#262626]">
              {customerProfile?.name} ({customerProfile?.customerCode})
            </span>
          </div>
        }
        placement="right"
        width={typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : 600}
        onClose={() => setProfileDrawerVisible(false)}
        open={profileDrawerVisible}
      >
        {customerProfile && (
          <div className="space-y-6">
            {/* Quick Details Card */}
            <div className="bg-[#FCF8EF] p-4 rounded-lg border border-[#F5EBD3] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#737373] block mb-0.5">Primary Contact:</span>
                <span className="font-bold text-[#262626]">{customerProfile.phone}</span>
              </div>
              <div>
                <span className="text-[#737373] block mb-0.5">Email Address:</span>
                <span className="font-bold text-[#262626]">{customerProfile.email || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[#737373] block mb-0.5">Address:</span>
                <span className="font-medium text-[#262626]">
                  {customerProfile.address?.street}, {customerProfile.address?.city}
                </span>
              </div>
              <div>
                <span className="text-[#737373] block mb-0.5">Identity Verification:</span>
                <span className="font-bold text-[#8C671D]">
                  {customerProfile.identityProof?.idType}: {customerProfile.identityProof?.idNumber || 'Not provided'}
                </span>
              </div>
            </div>

            {/* Linked Deals & Bookings */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#737373] mb-3 flex items-center gap-1.5">
                <Briefcase size={14} className="text-[#B88A2E]" /> Associated Bookings & Deals (
                {customerProfile.bookings?.length || 0})
              </h4>
              <div className="space-y-2">
                {(customerProfile.bookings || []).map((b) => (
                  <div
                    key={b._id}
                    className="p-3 bg-white rounded-lg border border-[#E8E2D5] flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#8C671D] block">{b.bookingReference}</span>
                      <span className="text-[#737373]">
                        {b.propertyId?.title || 'Property Unit'} • Agreed Price: ₹
                        {(b.agreedPrice || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="sm:text-right">
                      <StatusTag status={b.status} />
                      <span className="text-[11px] text-gray-500 block mt-1">
                        Paid: ₹{(b.totalPaid || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
                {(!customerProfile.bookings || customerProfile.bookings.length === 0) && (
                  <p className="text-xs text-gray-400">No deal contracts recorded yet.</p>
                )}
              </div>
            </div>

            {/* Linked Payments Ledger */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#737373] mb-3 flex items-center gap-1.5">
                <Receipt size={14} className="text-[#B88A2E]" /> Financial Payments Ledger (
                {customerProfile.payments?.length || 0})
              </h4>
              <div className="space-y-2">
                {(customerProfile.payments || []).map((p) => (
                  <div
                    key={p._id}
                    className="p-3 bg-white rounded-lg border border-[#E8E2D5] flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#262626] block">
                        ₹{p.amount.toLocaleString()} — {p.paymentType}
                      </span>
                      <span className="text-[11px] text-[#737373]">
                        Ref: {p.paymentReference} • {p.paymentMethod} • {new Date(p.paymentDate).toLocaleDateString()}
                      </span>
                    </div>
                    <StatusTag status={p.status} />
                  </div>
                ))}
                {(!customerProfile.payments || customerProfile.payments.length === 0) && (
                  <p className="text-xs text-gray-400">No payment receipts logged yet.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Add Customer Modal */}
      <Modal
        title={<span className="font-bold text-base text-[#262626]">Add Customer Profile</span>}
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        width="95%"
        style={{ maxWidth: 600 }}
        destroyOnClose
      >
        <Form
          form={createForm}
          layout="vertical"
          onFinish={(values) => createMutation.mutate(values)}
          className="mt-4"
        >
          <Form.Item
            name="name"
            label={<span className="font-semibold text-xs">Customer Full Name</span>}
            rules={[{ required: true, message: 'Please enter customer name' }]}
          >
            <Input placeholder="e.g. Meera Krishnan" className="h-9" />
          </Form.Item>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item
              name="phone"
              label={<span className="font-semibold text-xs">Primary Phone</span>}
              rules={[{ required: true, message: 'Phone number is required' }]}
            >
              <Input placeholder="+91 98765 43210" className="h-9" />
            </Form.Item>
            <Form.Item
              name="alternativePhone"
              label={<span className="font-semibold text-xs">Alternative Phone</span>}
            >
              <Input placeholder="+91 98765 00000" className="h-9" />
            </Form.Item>
          </div>

          <Form.Item name="email" label={<span className="font-semibold text-xs">Email Address</span>}>
            <Input placeholder="meera@example.com" className="h-9" />
          </Form.Item>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item name={['address', 'city']} label={<span className="font-semibold text-xs">City</span>}>
              <Input placeholder="e.g. Bengaluru" className="h-9" />
            </Form.Item>
            <Form.Item
              name={['identityProof', 'idNumber']}
              label={<span className="font-semibold text-xs">PAN / Tax ID</span>}
            >
              <Input placeholder="ABCDE1234F" className="h-9" />
            </Form.Item>
          </div>

          <Form.Item name="notes" label={<span className="font-semibold text-xs">Customer Notes</span>}>
            <Input.TextArea rows={2} placeholder="Background, preference notes" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={createMutation.isPending}
            className="w-full h-10 font-bold"
          >
            Create Customer
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
