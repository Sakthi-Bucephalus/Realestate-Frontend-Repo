import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, Button, Input, Select, Modal, Form, Space, message, Tag, Switch } from 'antd';
import { Plus, UserCheck, Shield, Search, Lock, UserX, CheckCircle, Mail, Phone } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export const EmployeesList = () => {
  const queryClient = useQueryClient();
  const { user, hasPermission } = useAuth();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [nextStatus, setNextStatus] = useState(false);

  const [createForm] = Form.useForm();
  const [statusForm] = Form.useForm();

  // Fetch employees
  const { data, isLoading } = useQuery({
    queryKey: ['employees', page, pageSize, search, roleFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit: pageSize,
        ...(search && { search }),
        ...(roleFilter && { role: roleFilter }),
      });
      const res = await api.get(`/employees?${params.toString()}`);
      return res.data;
    },
  });

  // Create employee mutation
  const createMutation = useMutation({
    mutationFn: (newEmp) => api.post('/employees', newEmp),
    onSuccess: () => {
      message.success('Employee account created successfully');
      setCreateModalVisible(false);
      createForm.resetFields();
      queryClient.invalidateQueries(['employees']);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Failed to create employee');
    },
  });

  // Toggle status mutation
  const statusMutation = useMutation({
    mutationFn: ({ id, isActive, reason }) =>
      api.patch(`/employees/${id}/status`, { isActive, reason }),
    onSuccess: (res) => {
      message.success(res.data.message || 'Account status updated');
      setStatusModalVisible(false);
      statusForm.resetFields();
      queryClient.invalidateQueries(['employees']);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Failed to update status');
    },
  });

  const handleToggleClick = (record, checked) => {
    setSelectedUser(record);
    setNextStatus(checked);
    statusForm.setFieldsValue({
      reason: checked ? 'Account reactivated' : 'Deactivated by administrator',
    });
    setStatusModalVisible(true);
  };

  const columns = [
    {
      title: 'Employee ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
      width: 120,
      render: (id) => <span className="font-mono text-xs font-bold text-[#8C671D]">{id}</span>,
    },
    {
      title: 'Name & Contact',
      key: 'name',
      render: (_, record) => (
        <div>
          <span className="font-bold text-[#262626] block">
            {record.firstName} {record.lastName}
          </span>
          <span className="text-[11px] text-[#737373] flex items-center gap-1.5">
            <Mail size={11} /> {record.email} • <Phone size={11} /> {record.phone || 'N/A'}
          </span>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role) => {
        const colors = {
          owner: 'bg-[#FCF8EF] text-[#8C671D] border-[#DEC07A]',
          admin: 'bg-blue-50 text-blue-700 border-blue-200',
          hr: 'bg-purple-50 text-purple-700 border-purple-200',
          employee: 'bg-gray-50 text-gray-700 border-gray-200',
        };
        return (
          <span
            className={`inline-block px-2.5 py-0.5 rounded text-xs font-extrabold uppercase border ${
              colors[role] || 'bg-gray-100 text-gray-700'
            }`}
          >
            {role}
          </span>
        );
      },
    },
    {
      title: 'Department & Designation',
      key: 'department',
      render: (_, record) => (
        <div>
          <span className="text-xs font-semibold text-[#262626] block">{record.department}</span>
          <span className="text-[11px] text-[#737373]">{record.designation}</span>
        </div>
      ),
    },
    {
      title: 'Active Leads',
      key: 'leads',
      render: (_, record) => (
        <span className="text-xs font-bold text-[#8C671D]">
          {record.stats?.assignedLeads || 0} leads
        </span>
      ),
    },
    {
      title: 'Status',
      key: 'isActive',
      width: 120,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Switch
            checked={record.isActive}
            onChange={(checked) => handleToggleClick(record, checked)}
            disabled={
              // Prevent non-owners from toggling owners or self-toggle
              (record.role === 'owner' && user.role !== 'owner') ||
              String(record._id) === String(user.id)
            }
            className={record.isActive ? 'bg-emerald-500' : 'bg-gray-300'}
          />
          <span className={`text-xs font-semibold ${record.isActive ? 'text-emerald-700' : 'text-gray-400'}`}>
            {record.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Employee Directory & HR"
        subtitle="Manage user accounts, roles, departments, designations, and account lifecycle activation states."
        extra={
          ['owner', 'admin', 'hr'].includes(user?.role) && (
            <Button
              type="primary"
              icon={<Plus size={16} />}
              onClick={() => {
                createForm.resetFields();
                setCreateModalVisible(true);
              }}
              className="font-semibold text-xs h-9"
            >
              Onboard Employee
            </Button>
          )
        }
      />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E8E2D5] shadow-subtle flex flex-wrap gap-3 items-center justify-between">
        <Input
          placeholder="Search employees by name, email, role..."
          prefix={<Search size={16} className="text-gray-400 mr-1" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 h-9"
          allowClear
        />

        <Select
          placeholder="All Roles"
          value={roleFilter || undefined}
          onChange={(v) => setRoleFilter(v || '')}
          className="w-full sm:w-40 h-9"
          allowClear
        >
          <Select.Option value="owner">Owner</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="hr">HR</Select.Option>
          <Select.Option value="employee">Employee</Select.Option>
        </Select>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] shadow-card overflow-hidden">
        <Table
          columns={columns}
          dataSource={data?.data || []}
          rowKey="_id"
          loading={isLoading}
          scroll={{ x: 800 }}
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

      {/* Onboard Employee Modal */}
      <Modal
        title={<span className="font-bold text-base text-[#262626]">Onboard New Employee / User</span>}
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        width="95%"
        style={{ maxWidth: 580 }}
        destroyOnClose
      >
        <Form
          form={createForm}
          layout="vertical"
          onFinish={(values) => createMutation.mutate(values)}
          initialValues={{
            role: 'employee',
            department: 'Sales & CRM',
            designation: 'Real Estate Executive',
          }}
          className="mt-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item
              name="firstName"
              label={<span className="font-semibold text-xs">First Name</span>}
              rules={[{ required: true, message: 'First name is required' }]}
            >
              <Input placeholder="e.g. Rahul" className="h-9" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label={<span className="font-semibold text-xs">Last Name</span>}
            >
              <Input placeholder="Desai" className="h-9" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item
              name="email"
              label={<span className="font-semibold text-xs">Email Address</span>}
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Enter a valid email' },
              ]}
            >
              <Input placeholder="rahul@estateflow.com" className="h-9" />
            </Form.Item>

            <Form.Item
              name="phone"
              label={<span className="font-semibold text-xs">Phone</span>}
            >
              <Input placeholder="+91 98765 43210" className="h-9" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item
              name="role"
              label={<span className="font-semibold text-xs">System Role</span>}
              rules={[{ required: true }]}
            >
              <Select className="h-9">
                {user.role === 'owner' && <Select.Option value="admin">Admin</Select.Option>}
                {user.role === 'owner' && <Select.Option value="hr">HR</Select.Option>}
                <Select.Option value="employee">Employee</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="department"
              label={<span className="font-semibold text-xs">Department</span>}
            >
              <Select className="h-9">
                <Select.Option value="Sales & CRM">Sales & CRM</Select.Option>
                <Select.Option value="Marketing">Marketing</Select.Option>
                <Select.Option value="Operations">Operations</Select.Option>
                <Select.Option value="Accounts & Finance">Accounts & Finance</Select.Option>
                <Select.Option value="Legal">Legal</Select.Option>
                <Select.Option value="Human Resources">Human Resources</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="password"
            label={<span className="font-semibold text-xs">Temporary Password</span>}
            rules={[
              { required: true, message: 'Password is required' },
              { min: 8, message: 'Min 8 characters' },
            ]}
          >
            <Input.Password placeholder="••••••••" className="h-9" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={createMutation.isPending}
            className="w-full h-10 font-bold"
          >
            Create Account & Provision Access
          </Button>
        </Form>
      </Modal>

      {/* Account Lifecycle Confirmation Modal */}
      <Modal
        title={
          <span className="font-bold text-base text-[#262626]">
            {nextStatus ? 'Reactivate Account' : 'Deactivate User Account'}
          </span>
        }
        open={statusModalVisible}
        onCancel={() => setStatusModalVisible(false)}
        footer={null}
        width="95%"
        style={{ maxWidth: 500 }}
        destroyOnClose
      >
        <Form
          form={statusForm}
          layout="vertical"
          onFinish={(values) => {
            statusMutation.mutate({
              id: selectedUser._id,
              isActive: nextStatus,
              reason: values.reason,
            });
          }}
          className="mt-4"
        >
          <p className="text-xs text-[#737373] mb-4">
            {nextStatus
              ? `Reactivating ${selectedUser?.firstName}'s account will restore their access to their assigned modules.`
              : `Deactivating ${selectedUser?.firstName}'s account will immediately revoke all active sessions. Historical leads and booking records created by this account will remain preserved.`}
          </p>

          <Form.Item
            name="reason"
            label={<span className="font-semibold text-xs">Reason for Status Change</span>}
            rules={[{ required: true, message: 'Please provide a reason' }]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>

          <Button
            type="primary"
            danger={!nextStatus}
            htmlType="submit"
            loading={statusMutation.isPending}
            className="w-full h-10 font-bold"
          >
            Confirm {nextStatus ? 'Reactivation' : 'Deactivation'}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
