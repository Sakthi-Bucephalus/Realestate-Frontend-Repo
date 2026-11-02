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
  message,
  Tag,
  Switch,
  Tooltip,
  Checkbox,
  Card,
  Divider,
} from 'antd';
import {
  Plus,
  UserCheck,
  Shield,
  Search,
  Lock,
  UserX,
  CheckCircle,
  Mail,
  Phone,
  Edit,
  KeyRound,
  Sliders,
  MapPin,
  Users,
  Building,
  AlertTriangle,
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const { Option } = Select;

// All 7 Organizational Roles + Legacy Aliases
export const ORGANIZATIONAL_ROLES = [
  { value: 'managing_director', label: 'Managing Director (MD)' },
  { value: 'director', label: 'Director' },
  { value: 'business_manager', label: 'Business Manager' },
  { value: 'zonal_manager', label: 'Zonal Manager' },
  { value: 'sales_manager', label: 'Sales Manager' },
  { value: 'mediator', label: 'Mediator' },
  { value: 'referrals', label: 'Referrals' },
  // Legacy
  { value: 'admin', label: 'Administrator' },
  { value: 'hr', label: 'HR Manager' },
  { value: 'employee', label: 'Sales Executive' },
];

export const ROLE_BADGE_STYLES = {
  managing_director: 'bg-[#FCF8EF] text-[#8C671D] border-[#DEC07A]',
  owner: 'bg-[#FCF8EF] text-[#8C671D] border-[#DEC07A]',
  director: 'bg-purple-50 text-purple-700 border-purple-200',
  business_manager: 'bg-blue-50 text-blue-700 border-blue-200',
  zonal_manager: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  sales_manager: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  mediator: 'bg-amber-50 text-amber-700 border-amber-200',
  referrals: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  admin: 'bg-sky-50 text-sky-700 border-sky-200',
  hr: 'bg-pink-50 text-pink-700 border-pink-200',
  employee: 'bg-gray-50 text-gray-700 border-gray-200',
};

export const EmployeesList = () => {
  const queryClient = useQueryClient();
  const { user, isMD, hasPermission } = useAuth();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [zoneFilter, setZoneFilter] = useState('');

  // Modals
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [delegationModalVisible, setDelegationModalVisible] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [statusForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [delegationForm] = Form.useForm();

  // Fetch users & employees
  const { data, isLoading } = useQuery({
    queryKey: ['employees', page, pageSize, search, roleFilter, statusFilter, zoneFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit: pageSize,
        ...(search && { search }),
        ...(roleFilter && { role: roleFilter }),
        ...(statusFilter && { accountStatus: statusFilter }),
        ...(zoneFilter && { zone: zoneFilter }),
      });
      const res = await api.get(`/employees?${params.toString()}`);
      return res.data;
    },
  });

  const usersList = data?.data || [];

  // Create user mutation
  const createMutation = useMutation({
    mutationFn: (newEmp) => api.post('/employees', newEmp),
    onSuccess: () => {
      message.success('User account created successfully');
      setCreateModalVisible(false);
      createForm.resetFields();
      queryClient.invalidateQueries(['employees']);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Failed to create user account');
    },
  });

  // Update user mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, updates }) => api.put(`/employees/${id}`, updates),
    onSuccess: () => {
      message.success('User details updated successfully');
      setEditModalVisible(false);
      editForm.resetFields();
      queryClient.invalidateQueries(['employees']);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Failed to update user');
    },
  });

  // Toggle status mutation
  const statusMutation = useMutation({
    mutationFn: ({ id, accountStatus, reason }) =>
      api.patch(`/employees/${id}/status`, { accountStatus, reason }),
    onSuccess: (res) => {
      message.success(res.data.message || 'Account status updated');
      setStatusModalVisible(false);
      statusForm.resetFields();
      queryClient.invalidateQueries(['employees']);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Failed to update account status');
    },
  });

  // Admin password reset mutation
  const resetPasswordMutation = useMutation({
    mutationFn: ({ id, newPassword }) =>
      api.post(`/employees/${id}/reset-password`, { newPassword }),
    onSuccess: () => {
      message.success('Password successfully reset. User sessions invalidated.');
      setPasswordModalVisible(false);
      passwordForm.resetFields();
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Failed to reset password');
    },
  });

  // Director delegation mutation
  const delegationMutation = useMutation({
    mutationFn: ({ id, delegatedPermissions }) =>
      api.put(`/employees/${id}/delegate`, delegatedPermissions),
    onSuccess: () => {
      message.success('Director delegated permissions successfully updated');
      setDelegationModalVisible(false);
      queryClient.invalidateQueries(['employees']);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Failed to update delegation');
    },
  });

  const handleEditClick = (record) => {
    setSelectedUser(record);
    editForm.setFieldsValue({
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email,
      phone: record.phone,
      role: record.role,
      department: record.department,
      designation: record.designation,
      employeeId: record.employeeId,
      zone: record.zone,
      team: record.team,
      reportingTo: record.reportingTo?._id || record.reportingTo,
      accountStatus: record.accountStatus || (record.isActive ? 'active' : 'deactivated'),
    });
    setEditModalVisible(true);
  };

  const handleStatusClick = (record) => {
    setSelectedUser(record);
    statusForm.setFieldsValue({
      accountStatus: record.accountStatus || (record.isActive ? 'active' : 'deactivated'),
      reason: record.statusChangeReason || '',
    });
    setStatusModalVisible(true);
  };

  const handlePasswordClick = (record) => {
    setSelectedUser(record);
    passwordForm.resetFields();
    setPasswordModalVisible(true);
  };

  const handleDelegationClick = (record) => {
    setSelectedUser(record);
    const delegation = record.delegatedPermissions || {};
    delegationForm.setFieldsValue({
      canManageRoles: delegation.canManageRoles || [],
      allowedModules: delegation.allowedModules || [],
      managedZones: delegation.managedZones ? delegation.managedZones.join(', ') : '',
      managedTeams: delegation.managedTeams ? delegation.managedTeams.join(', ') : '',
      canApproveBookings: !!delegation.canApproveBookings,
      canApprovePayments: !!delegation.canApprovePayments,
      canExportData: !!delegation.canExportData,
    });
    setDelegationModalVisible(true);
  };

  const isUserMD = (role) => role === 'managing_director' || role === 'owner' || role === 'md';

  const columns = [
    {
      title: 'Employee ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
      width: 110,
      render: (id) => <span className="font-mono text-xs font-bold text-[#8C671D]">{id}</span>,
    },
    {
      title: 'Name & Contact',
      key: 'name',
      render: (_, record) => {
        const isRoot = isUserMD(record.role);
        return (
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#262626]">
                {record.firstName} {record.lastName}
              </span>
              {isRoot && (
                <Tag color="gold" className="text-[10px] font-extrabold uppercase m-0 border-[#DEC07A]">
                  MD Root
                </Tag>
              )}
            </div>
            <span className="text-[11px] text-[#737373] flex items-center gap-1.5 mt-0.5">
              <Mail size={11} /> {record.email} {record.phone ? `• ${record.phone}` : ''}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 150,
      render: (role) => {
        const found = ORGANIZATIONAL_ROLES.find((r) => r.value === role);
        const label = found ? found.label : (role ? role.replace(/_/g, ' ') : 'User');
        const badgeStyle = ROLE_BADGE_STYLES[role] || 'bg-gray-100 text-gray-700';

        return (
          <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase border ${badgeStyle}`}>
            {label}
          </span>
        );
      },
    },
    {
      title: 'Hierarchy (Zone & Team)',
      key: 'hierarchy',
      render: (_, record) => (
        <div className="text-xs">
          {record.zone ? (
            <div className="flex items-center gap-1 text-[#262626] font-medium">
              <MapPin size={11} className="text-[#8C671D]" /> Zone: {record.zone}
            </div>
          ) : (
            <span className="text-gray-400">All Zones</span>
          )}
          {record.team && (
            <div className="flex items-center gap-1 text-[#737373] text-[11px]">
              <Users size={11} /> Team: {record.team}
            </div>
          )}
          {record.reportingTo && (
            <div className="text-[10px] text-gray-500">
              Reports to: {record.reportingTo?.firstName} {record.reportingTo?.lastName}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Active Work',
      key: 'leads',
      render: (_, record) => (
        <div className="text-xs">
          <span className="font-bold text-[#8C671D] block">
            {record.stats?.assignedLeads || 0} leads
          </span>
          <span className="text-[11px] text-gray-500">
            {record.stats?.assignedVisits || 0} visits
          </span>
        </div>
      ),
    },
    {
      title: 'Account Status',
      key: 'accountStatus',
      width: 130,
      render: (_, record) => {
        const status = record.accountStatus || (record.isActive ? 'active' : 'deactivated');
        const statusConfig = {
          active: { color: 'green', text: 'Active' },
          suspended: { color: 'orange', text: 'Suspended' },
          deactivated: { color: 'red', text: 'Deactivated' },
          pending_verification: { color: 'blue', text: 'Pending OTP' },
          pending_approval: { color: 'purple', text: 'Pending Approval' },
        };
        const config = statusConfig[status] || { color: 'default', text: status };

        return (
          <Tag color={config.color} className="font-bold text-xs uppercase">
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 140,
      render: (_, record) => {
        const isRootMD = isUserMD(record.role);
        const canManageTarget = isMD || (user?.role === 'director' && !isRootMD);

        return (
          <Space size="small">
            {/* Edit User */}
            <Tooltip title="Edit User & Hierarchy">
              <Button
                type="text"
                size="small"
                icon={<Edit size={14} className="text-blue-600" />}
                onClick={() => handleEditClick(record)}
                disabled={isRootMD && !isMD}
              />
            </Tooltip>

            {/* Reset Password */}
            <Tooltip title="Reset Password">
              <Button
                type="text"
                size="small"
                icon={<KeyRound size={14} className="text-amber-600" />}
                onClick={() => handlePasswordClick(record)}
                disabled={isRootMD && !isMD}
              />
            </Tooltip>

            {/* Director Delegation (MD Only for Directors) */}
            {isMD && record.role === 'director' && (
              <Tooltip title="Delegate Administrative Permissions">
                <Button
                  type="text"
                  size="small"
                  icon={<Sliders size={14} className="text-purple-600" />}
                  onClick={() => handleDelegationClick(record)}
                />
              </Tooltip>
            )}

            {/* Account Lifecycle Status */}
            <Tooltip title={isRootMD ? 'MD account is protected' : 'Manage Account Status'}>
              <Button
                type="text"
                size="small"
                icon={record.isActive ? <UserX size={14} className="text-rose-500" /> : <UserCheck size={14} className="text-emerald-600" />}
                onClick={() => handleStatusClick(record)}
                disabled={isRootMD}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="User & Role Management"
        subtitle="Manage the 7 organizational roles, hierarchy assignments, Director delegations, and account lifecycles."
        extra={
          (isMD || ['director', 'admin', 'hr'].includes(user?.role)) && (
            <Button
              type="primary"
              icon={<Plus size={16} />}
              onClick={() => {
                createForm.resetFields();
                setCreateModalVisible(true);
              }}
              className="font-semibold text-xs h-9"
            >
              Onboard User
            </Button>
          )
        }
      />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E8E2D5] shadow-subtle flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center flex-1">
          <Input
            placeholder="Search users by name, email, employee ID, zone, team..."
            prefix={<Search size={16} className="text-gray-400 mr-1" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 h-9"
            allowClear
          />

          <Select
            placeholder="All Roles"
            value={roleFilter || undefined}
            onChange={(val) => setRoleFilter(val || '')}
            className="w-full sm:w-48 h-9"
            allowClear
          >
            {ORGANIZATIONAL_ROLES.map((r) => (
              <Option key={r.value} value={r.value}>
                {r.label}
              </Option>
            ))}
          </Select>

          <Select
            placeholder="All Account Statuses"
            value={statusFilter || undefined}
            onChange={(val) => setStatusFilter(val || '')}
            className="w-full sm:w-40 h-9"
            allowClear
          >
            <Option value="active">Active</Option>
            <Option value="suspended">Suspended</Option>
            <Option value="deactivated">Deactivated</Option>
            <Option value="pending_verification">Pending OTP</Option>
          </Select>

          <Input
            placeholder="Filter Zone..."
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            className="w-full sm:w-36 h-9"
            allowClear
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] shadow-card overflow-hidden">
        <Table
          dataSource={usersList}
          columns={columns}
          rowKey="_id"
          loading={isLoading}
          pagination={{
            current: page,
            pageSize,
            total: data?.pagination?.total || 0,
            onChange: (p, ps) => {
              setPage(p);
              setPageSize(ps);
            },
            showSizeChanger: true,
          }}
          scroll={{ x: 900 }}
        />
      </div>

      {/* 1. CREATE USER MODAL */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-[#8C671D]" />
            <span className="font-bold text-base text-[#262626]">Onboard New User Account</span>
          </div>
        }
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        width={680}
      >
        <Form
          form={createForm}
          layout="vertical"
          onFinish={(values) => createMutation.mutate(values)}
          initialValues={{
            role: 'sales_manager',
            department: 'Sales',
            designation: 'Sales Executive',
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <Form.Item
              name="firstName"
              label={<span className="font-semibold text-xs">First Name</span>}
              rules={[{ required: true, message: 'First name is required' }]}
            >
              <Input placeholder="John" className="h-9" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label={<span className="font-semibold text-xs">Last Name</span>}
            >
              <Input placeholder="Doe" className="h-9" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item
              name="email"
              label={<span className="font-semibold text-xs">Email Address</span>}
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Enter a valid email' },
              ]}
            >
              <Input placeholder="john@company.com" className="h-9" />
            </Form.Item>

            <Form.Item
              name="phone"
              label={<span className="font-semibold text-xs">Phone Number</span>}
            >
              <Input placeholder="+91 98765 00000" className="h-9" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item
              name="role"
              label={<span className="font-semibold text-xs">Organizational Role</span>}
              rules={[{ required: true, message: 'Role is required' }]}
            >
              <Select className="h-9">
                {ORGANIZATIONAL_ROLES.filter((r) => {
                  // Non-MD can only select delegated roles
                  if (!isMD) {
                    return r.value !== 'managing_director' && r.value !== 'owner';
                  }
                  return true;
                }).map((r) => (
                  <Option key={r.value} value={r.value}>
                    {r.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="font-semibold text-xs">Initial Password</span>}
              rules={[
                { required: true, message: 'Password is required' },
                { min: 8, message: 'Minimum 8 characters' },
              ]}
            >
              <Input.Password placeholder="••••••••" className="h-9" />
            </Form.Item>
          </div>

          <Divider orientation="left" className="text-xs text-[#8C671D] font-bold">
            Hierarchy & Organization Scope
          </Divider>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Form.Item
              name="zone"
              label={<span className="font-semibold text-xs">Assigned Zone</span>}
            >
              <Input placeholder="e.g. North Zone" className="h-9" />
            </Form.Item>

            <Form.Item
              name="team"
              label={<span className="font-semibold text-xs">Assigned Team</span>}
            >
              <Input placeholder="e.g. Alpha Team" className="h-9" />
            </Form.Item>

            <Form.Item
              name="reportingTo"
              label={<span className="font-semibold text-xs">Reporting Manager</span>}
            >
              <Select placeholder="Select manager" allowClear className="h-9">
                {usersList
                  .filter((u) => u.role !== 'mediator' && u.role !== 'referrals')
                  .map((u) => (
                    <Option key={u._id} value={u._id}>
                      {u.firstName} {u.lastName} ({u.role})
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button onClick={() => setCreateModalVisible(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={createMutation.isPending}
              className="font-bold"
            >
              Create Account
            </Button>
          </div>
        </Form>
      </Modal>

      {/* 2. EDIT USER MODAL */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <Edit size={18} className="text-[#8C671D]" />
            <span className="font-bold text-base text-[#262626]">
              Edit User Details: {selectedUser?.firstName} {selectedUser?.lastName}
            </span>
          </div>
        }
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        width={650}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={(updates) =>
            updateMutation.mutate({ id: selectedUser._id, updates })
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <Form.Item
              name="firstName"
              label={<span className="font-semibold text-xs">First Name</span>}
              rules={[{ required: true }]}
            >
              <Input className="h-9" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label={<span className="font-semibold text-xs">Last Name</span>}
            >
              <Input className="h-9" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item
              name="phone"
              label={<span className="font-semibold text-xs">Phone</span>}
            >
              <Input className="h-9" />
            </Form.Item>

            <Form.Item
              name="role"
              label={<span className="font-semibold text-xs">Role Assignment</span>}
              rules={[{ required: true }]}
            >
              <Select className="h-9" disabled={isUserMD(selectedUser?.role) && !isMD}>
                {ORGANIZATIONAL_ROLES.filter((r) => {
                  if (!isMD && (r.value === 'managing_director' || r.value === 'owner')) {
                    return false;
                  }
                  return true;
                }).map((r) => (
                  <Option key={r.value} value={r.value}>
                    {r.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Form.Item
              name="zone"
              label={<span className="font-semibold text-xs">Zone</span>}
            >
              <Input placeholder="Zone" className="h-9" />
            </Form.Item>

            <Form.Item
              name="team"
              label={<span className="font-semibold text-xs">Team</span>}
            >
              <Input placeholder="Team" className="h-9" />
            </Form.Item>

            <Form.Item
              name="reportingTo"
              label={<span className="font-semibold text-xs">Reporting Manager</span>}
            >
              <Select allowClear className="h-9">
                {usersList
                  .filter((u) => u._id !== selectedUser?._id)
                  .map((u) => (
                    <Option key={u._id} value={u._id}>
                      {u.firstName} {u.lastName} ({u.role})
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button onClick={() => setEditModalVisible(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={updateMutation.isPending}
              className="font-bold"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal>

      {/* 3. ACCOUNT STATUS LIFECYCLE MODAL */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <UserX size={18} className="text-amber-600" />
            <span className="font-bold text-base text-[#262626]">
              Manage Account Lifecycle State
            </span>
          </div>
        }
        open={statusModalVisible}
        onCancel={() => setStatusModalVisible(false)}
        footer={null}
        width={450}
      >
        <Form
          form={statusForm}
          layout="vertical"
          onFinish={(values) =>
            statusMutation.mutate({
              id: selectedUser._id,
              accountStatus: values.accountStatus,
              reason: values.reason,
            })
          }
        >
          <div className="py-2">
            <p className="text-xs text-[#737373] mb-3">
              Change the operational lifecycle status of{' '}
              <strong className="text-[#262626]">
                {selectedUser?.firstName} {selectedUser?.lastName}
              </strong>{' '}
              ({selectedUser?.email}). Suspending or deactivating revokes current active sessions.
            </p>

            <Form.Item
              name="accountStatus"
              label={<span className="font-semibold text-xs">Target Account State</span>}
              rules={[{ required: true }]}
            >
              <Select className="h-10">
                <Option value="active">Active (Full access permitted)</Option>
                <Option value="suspended">Suspended (Temporarily blocked)</Option>
                <Option value="deactivated">Deactivated (Terminated/disabled)</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="reason"
              label={<span className="font-semibold text-xs">Reason Note (Audit Trail)</span>}
              rules={[{ required: true, message: 'Please specify reason for status change' }]}
            >
              <Input.TextArea rows={3} placeholder="Provide explanation for suspension/reactivation..." />
            </Form.Item>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button onClick={() => setStatusModalVisible(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={statusMutation.isPending}
              className="font-bold"
            >
              Update Status
            </Button>
          </div>
        </Form>
      </Modal>

      {/* 4. ADMIN PASSWORD RESET MODAL */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <KeyRound size={18} className="text-amber-600" />
            <span className="font-bold text-base text-[#262626]">
              Admin Password Reset
            </span>
          </div>
        }
        open={passwordModalVisible}
        onCancel={() => setPasswordModalVisible(false)}
        footer={null}
        width={420}
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={(values) =>
            resetPasswordMutation.mutate({
              id: selectedUser._id,
              newPassword: values.newPassword,
            })
          }
        >
          <div className="py-2">
            <p className="text-xs text-[#737373] mb-4">
              Set a new secure password for{' '}
              <strong className="text-[#262626]">{selectedUser?.email}</strong>. Existing
              login tokens will be immediately invalidated.
            </p>

            <Form.Item
              name="newPassword"
              label={<span className="font-semibold text-xs">New Secure Password</span>}
              rules={[
                { required: true, message: 'Password is required' },
                { min: 8, message: 'Minimum 8 characters' },
              ]}
            >
              <Input.Password placeholder="••••••••" className="h-10" />
            </Form.Item>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button onClick={() => setPasswordModalVisible(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={resetPasswordMutation.isPending}
              className="font-bold"
            >
              Reset Password
            </Button>
          </div>
        </Form>
      </Modal>

      {/* 5. DIRECTOR DELEGATION MODAL (MD ONLY) */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-purple-600" />
            <span className="font-bold text-base text-[#262626]">
              Director Delegation: {selectedUser?.firstName} {selectedUser?.lastName}
            </span>
          </div>
        }
        open={delegationModalVisible}
        onCancel={() => setDelegationModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={delegationForm}
          layout="vertical"
          onFinish={(values) => {
            const delegatedPermissions = {
              canManageRoles: values.canManageRoles || [],
              allowedModules: values.allowedModules || [],
              managedZones: values.managedZones
                ? values.managedZones.split(',').map((s) => s.trim()).filter(Boolean)
                : [],
              managedTeams: values.managedTeams
                ? values.managedTeams.split(',').map((s) => s.trim()).filter(Boolean)
                : [],
              canApproveBookings: !!values.canApproveBookings,
              canApprovePayments: !!values.canApprovePayments,
              canExportData: !!values.canExportData,
            };
            delegationMutation.mutate({
              id: selectedUser._id,
              delegatedPermissions,
            });
          }}
        >
          <div className="py-2 space-y-4">
            <p className="text-xs text-[#737373]">
              The Managing Director can delegate specific organizational boundaries and administrative capabilities to this Director.
              A Director can never be delegated access to modify or appoint Managing Directors.
            </p>

            <Form.Item
              name="canManageRoles"
              label={<span className="font-semibold text-xs">Subordinate Roles Director May Manage</span>}
            >
              <Select mode="multiple" placeholder="Select roles Director can manage..." className="w-full">
                <Option value="business_manager">Business Manager</Option>
                <Option value="zonal_manager">Zonal Manager</Option>
                <Option value="sales_manager">Sales Manager</Option>
                <Option value="mediator">Mediator</Option>
                <Option value="referrals">Referrals</Option>
                <Option value="employee">Sales Executive</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="managedZones"
              label={<span className="font-semibold text-xs">Managed Zones (Comma-separated)</span>}
              extra={<span className="text-[11px] text-gray-500">Leave blank for all zones</span>}
            >
              <Input placeholder="e.g. North Zone, West Zone" className="h-9" />
            </Form.Item>

            <Form.Item
              name="managedTeams"
              label={<span className="font-semibold text-xs">Managed Teams (Comma-separated)</span>}
              extra={<span className="text-[11px] text-gray-500">Leave blank for all teams</span>}
            >
              <Input placeholder="e.g. Team Alpha, Team Beta" className="h-9" />
            </Form.Item>

            <Divider className="my-2" />

            <div className="space-y-2">
              <Form.Item orientation="horizontal" name="canApproveBookings" valuePropName="checked" className="m-0">
                <Checkbox className="text-xs font-semibold">Can Approve Bookings & Deals</Checkbox>
              </Form.Item>
              <Form.Item orientation="horizontal" name="canApprovePayments" valuePropName="checked" className="m-0">
                <Checkbox className="text-xs font-semibold">Can Approve Payment Ledger Records</Checkbox>
              </Form.Item>
              <Form.Item orientation="horizontal" name="canExportData" valuePropName="checked" className="m-0">
                <Checkbox className="text-xs font-semibold">Can Export Organizational Reports & Data (CSV)</Checkbox>
              </Form.Item>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button onClick={() => setDelegationModalVisible(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={delegationMutation.isPending}
              className="font-bold"
            >
              Save Delegation Matrix
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
