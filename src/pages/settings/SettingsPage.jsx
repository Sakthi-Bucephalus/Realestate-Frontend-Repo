import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Tabs,
  Form,
  Input,
  Button,
  Switch,
  Table,
  message,
  Alert,
  Tag,
  Checkbox,
  Select,
  Divider,
} from 'antd';
import {
  Building2,
  Mail,
  Sliders,
  ShieldAlert,
  Send,
  Save,
  Lock,
  KeyRound,
  CheckCircle2,
  Shield,
  Layers,
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const { Option } = Select;

const ALL_ROLES_LIST = [
  { value: 'managing_director', label: 'Managing Director (MD)' },
  { value: 'director', label: 'Director' },
  { value: 'business_manager', label: 'Business Manager' },
  { value: 'zonal_manager', label: 'Zonal Manager' },
  { value: 'sales_manager', label: 'Sales Manager' },
  { value: 'mediator', label: 'Mediator' },
  { value: 'referrals', label: 'Referrals' },
  { value: 'admin', label: 'Administrator (Legacy)' },
  { value: 'hr', label: 'HR Manager (Legacy)' },
  { value: 'employee', label: 'Sales Executive (Legacy)' },
];

const GRANULAR_ACTIONS = [
  { key: 'view', label: 'View' },
  { key: 'create', label: 'Create' },
  { key: 'edit', label: 'Edit' },
  { key: 'delete', label: 'Delete' },
  { key: 'export', label: 'Export' },
  { key: 'assign', label: 'Assign' },
  { key: 'approve', label: 'Approve' },
];

export const SettingsPage = () => {
  const queryClient = useQueryClient();
  const { user, isMD, refreshUser } = useAuth();

  const [testEmailLoading, setTestEmailLoading] = useState(false);
  const [profileForm] = Form.useForm();
  const [smtpForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  // Role Matrix state
  const [selectedRole, setSelectedRole] = useState('director');
  const [selectedModules, setSelectedModules] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // Fetch Organization Settings
  const { data: orgData, isLoading: orgLoading } = useQuery({
    queryKey: ['org-settings'],
    queryFn: async () => {
      const res = await api.get('/settings/profile');
      return res.data.data;
    },
    onSuccess: (data) => {
      profileForm.setFieldsValue({
        name: data.name,
        legalName: data.legalName,
        phone: data.phone,
        website: data.website,
        timezone: data.timezone,
        currencyCode: data.currency?.code,
        currencySymbol: data.currency?.symbol,
        street: data.address?.street,
        city: data.address?.city,
        state: data.address?.state,
      });

      if (data.smtpConfig) {
        smtpForm.setFieldsValue({
          host: data.smtpConfig.host,
          port: data.smtpConfig.port,
          secure: data.smtpConfig.secure,
          user: data.smtpConfig.user,
          fromEmail: data.smtpConfig.fromEmail,
        });
      }
    },
  });

  // Fetch Module Access Control Matrix
  const { data: moduleAccessData, refetch: refetchModuleAccess } = useQuery({
    queryKey: ['module-access-control'],
    queryFn: async () => {
      const res = await api.get('/settings/module-access');
      return res.data.data;
    },
    enabled: isMD || ['director', 'admin'].includes(user?.role),
  });

  // Keep role matrix selections synced when data or selectedRole changes
  React.useEffect(() => {
    if (moduleAccessData?.rolePermissions && selectedRole) {
      const perms = moduleAccessData.rolePermissions[selectedRole] || {
        allowedModules: [],
        allowedPermissions: [],
      };
      setSelectedModules(perms.allowedModules || []);
      setSelectedPermissions(perms.allowedPermissions || []);
    }
  }, [moduleAccessData, selectedRole]);

  // Fetch Audit Logs
  const { data: auditLogsData } = useQuery({
    queryKey: ['audit-logs'],
    queryFn: async () => {
      const res = await api.get('/settings/audit-logs?limit=40');
      return res.data.data;
    },
    enabled: isMD || ['director', 'admin'].includes(user?.role),
  });

  // Update Org Profile Mutation
  const updateProfileMutation = useMutation({
    mutationFn: (values) =>
      api.put('/settings/profile', {
        name: values.name,
        legalName: values.legalName,
        phone: values.phone,
        website: values.website,
        timezone: values.timezone,
        currency: { code: values.currencyCode, symbol: values.currencySymbol },
        address: { street: values.street, city: values.city, state: values.state },
      }),
    onSuccess: () => {
      message.success('Organization profile updated');
      queryClient.invalidateQueries(['org-settings']);
      refreshUser();
    },
    onError: (err) => message.error(err.response?.data?.message || 'Update failed'),
  });

  // Change Password Mutation
  const changePasswordMutation = useMutation({
    mutationFn: (values) =>
      api.put('/auth/change-password', {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      }),
    onSuccess: (res) => {
      message.success(res.data.message || 'Password successfully updated!');
      passwordForm.resetFields();
    },
    onError: (err) =>
      message.error(err.response?.data?.message || 'Password update failed'),
  });

  // Save SMTP Mutation
  const saveSmtpMutation = useMutation({
    mutationFn: (values) => api.post('/settings/smtp', values),
    onSuccess: () => {
      message.success('SMTP configuration saved successfully');
      queryClient.invalidateQueries(['org-settings']);
    },
    onError: (err) => message.error(err.response?.data?.message || 'SMTP save failed'),
  });

  // Toggle Organization Enabled Module Mutation
  const toggleModuleMutation = useMutation({
    mutationFn: (newModules) => api.patch('/settings/modules/toggle', { enabledModules: newModules }),
    onSuccess: () => {
      message.success('Module access updated organization-wide');
      refetchModuleAccess();
      refreshUser();
    },
    onError: (err) => message.error(err.response?.data?.message || 'Module update failed'),
  });

  // Update Role Permission Matrix Mutation
  const updateRolePermissionsMutation = useMutation({
    mutationFn: (payload) => api.put('/settings/module-access/role', payload),
    onSuccess: () => {
      message.success(`Permissions updated for role: ${selectedRole}`);
      refetchModuleAccess();
      refreshUser();
    },
    onError: (err) =>
      message.error(err.response?.data?.message || 'Failed to update role permissions'),
  });

  // Test SMTP Email Connection
  const handleTestSmtp = async () => {
    setTestEmailLoading(true);
    try {
      const res = await api.post('/settings/smtp/test', {
        testRecipient: user.email,
      });
      message.success(res.data.message || 'Test email dispatched successfully!');
      queryClient.invalidateQueries(['org-settings']);
    } catch (err) {
      message.error(err.response?.data?.message || 'SMTP test failed');
    } finally {
      setTestEmailLoading(false);
    }
  };

  const handleToggleModule = (modKey, checked) => {
    const current = moduleAccessData?.organizationEnabledModules || [];
    let updated = [];
    if (checked) {
      updated = Array.from(new Set([...current, modKey]));
    } else {
      updated = current.filter((m) => m !== modKey);
    }
    toggleModuleMutation.mutate(updated);
  };

  const handleRoleModuleCheckbox = (modKey, checked) => {
    if (checked) {
      setSelectedModules((prev) => Array.from(new Set([...prev, modKey])));
    } else {
      setSelectedModules((prev) => prev.filter((m) => m !== modKey));
      // Also remove permissions associated with this module
      setSelectedPermissions((prev) => prev.filter((p) => !p.startsWith(`${modKey}.`)));
    }
  };

  const handleRoleActionCheckbox = (permKey, checked) => {
    if (checked) {
      setSelectedPermissions((prev) => Array.from(new Set([...prev, permKey])));
    } else {
      setSelectedPermissions((prev) => prev.filter((p) => p !== permKey));
    }
  };

  const handleSaveRoleMatrix = () => {
    if (selectedRole === 'managing_director' || selectedRole === 'owner') {
      message.info('Managing Director role has unrestricted system access by definition.');
      return;
    }
    updateRolePermissionsMutation.mutate({
      role: selectedRole,
      allowedModules: selectedModules,
      allowedPermissions: selectedPermissions,
    });
  };

  const auditColumns = [
    {
      title: 'Action Event',
      dataIndex: 'action',
      key: 'action',
      render: (act) => <Tag color="gold" className="font-bold text-xs">{act}</Tag>,
    },
    {
      title: 'Performed By',
      dataIndex: 'performedByName',
      key: 'performedByName',
      render: (name) => <span className="font-semibold text-xs text-[#262626]">{name}</span>,
    },
    {
      title: 'Entity',
      key: 'entity',
      render: (_, r) => (
        <span className="text-xs text-[#737373]">
          {r.entityType} ({r.entityId || 'N/A'})
        </span>
      ),
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      render: (details) => {
        if (!details || Object.keys(details).length === 0) return <span className="text-gray-400 text-xs">-</span>;
        return (
          <span className="text-[11px] font-mono text-gray-600 block max-w-xs truncate">
            {JSON.stringify(details)}
          </span>
        );
      },
    },
    {
      title: 'Timestamp',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (d) => <span className="text-xs text-gray-500">{new Date(d).toLocaleString()}</span>,
    },
  ];

  const tabItems = [
    {
      key: 'profile',
      label: (
        <span className="flex items-center gap-1.5 text-xs font-bold">
          <Building2 size={15} /> Organization Profile
        </span>
      ),
      children: (
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-[#E8E2D5] shadow-card max-w-2xl">
          <Form form={profileForm} layout="vertical" onFinish={(v) => updateProfileMutation.mutate(v)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Form.Item name="name" label={<span className="font-semibold text-xs">Organization Name</span>} rules={[{ required: true }]}>
                <Input className="h-9" />
              </Form.Item>
              <Form.Item name="legalName" label={<span className="font-semibold text-xs">Legal Entity Name</span>}>
                <Input className="h-9" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Form.Item name="phone" label={<span className="font-semibold text-xs">Official Phone</span>}>
                <Input className="h-9" />
              </Form.Item>
              <Form.Item name="website" label={<span className="font-semibold text-xs">Website URL</span>}>
                <Input className="h-9" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Form.Item name="street" label={<span className="font-semibold text-xs">Street Address</span>}>
                <Input className="h-9" />
              </Form.Item>
              <Form.Item name="city" label={<span className="font-semibold text-xs">City</span>}>
                <Input className="h-9" />
              </Form.Item>
              <Form.Item name="state" label={<span className="font-semibold text-xs">State</span>}>
                <Input className="h-9" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Form.Item name="timezone" label={<span className="font-semibold text-xs">Timezone</span>}>
                <Input className="h-9" />
              </Form.Item>
              <Form.Item name="currencyCode" label={<span className="font-semibold text-xs">Currency Code</span>}>
                <Input placeholder="INR" className="h-9" />
              </Form.Item>
              <Form.Item name="currencySymbol" label={<span className="font-semibold text-xs">Currency Symbol</span>}>
                <Input placeholder="₹" className="h-9" />
              </Form.Item>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={updateProfileMutation.isPending}
              icon={<Save size={15} />}
              className="font-bold w-full sm:w-auto"
              disabled={!isMD && user?.role !== 'admin'}
            >
              Save Profile Changes
            </Button>
          </Form>
        </div>
      ),
    },
    {
      key: 'security',
      label: (
        <span className="flex items-center gap-1.5 text-xs font-bold">
          <KeyRound size={15} /> Account Security & Password
        </span>
      ),
      children: (
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-[#E8E2D5] shadow-card max-w-xl space-y-5">
          <div>
            <h3 className="text-sm font-bold text-[#262626] m-0 mb-1 flex items-center gap-2">
              <Lock size={16} className="text-[#B88A2E]" /> Change Account Password
            </h3>
            <p className="text-xs text-[#737373] m-0">
              Update your account credentials securely. Your password is encrypted with bcrypt and sessions refreshed.
            </p>
          </div>

          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={(values) => changePasswordMutation.mutate(values)}
            className="space-y-1"
          >
            <Form.Item
              name="currentPassword"
              label={<span className="font-semibold text-xs">Current Password</span>}
              rules={[{ required: true, message: 'Please enter your current password' }]}
            >
              <Input.Password placeholder="••••••••" className="h-10" />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label={<span className="font-semibold text-xs">New Secure Password</span>}
              rules={[
                { required: true, message: 'Please enter your new password' },
                { min: 8, message: 'Password must be at least 8 characters long' },
              ]}
            >
              <Input.Password placeholder="Min 8 characters" className="h-10" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={<span className="font-semibold text-xs">Confirm New Password</span>}
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Please confirm your new password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Re-enter new password" className="h-10" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={changePasswordMutation.isPending}
              icon={<Save size={15} />}
              className="font-bold w-full sm:w-auto mt-2"
            >
              Update Password
            </Button>
          </Form>
        </div>
      ),
    },
    {
      key: 'smtp',
      label: (
        <span className="flex items-center gap-1.5 text-xs font-bold">
          <Mail size={15} /> SMTP Email Configuration
        </span>
      ),
      children: (
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-[#E8E2D5] shadow-card max-w-2xl space-y-5">
          <Alert
            message="Secure SMTP Configuration Status"
            description={
              orgData?.smtpConfig?.isConfigured
                ? `Active. Last verification dispatch: ${orgData.smtpConfig.lastTestedAt ? new Date(orgData.smtpConfig.lastTestedAt).toLocaleString() : 'Not tested yet'}`
                : 'SMTP credentials can be configured below or through server environment variables (EMAIL_USER / EMAIL_APP_PASSWORD).'
            }
            type={orgData?.smtpConfig?.isConfigured ? 'success' : 'info'}
            showIcon
          />

          <Form form={smtpForm} layout="vertical" onFinish={(v) => saveSmtpMutation.mutate(v)}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Form.Item name="host" label={<span className="font-semibold text-xs">SMTP Host</span>} className="sm:col-span-2">
                <Input placeholder="smtp.gmail.com" className="h-9" />
              </Form.Item>
              <Form.Item name="port" label={<span className="font-semibold text-xs">Port</span>}>
                <Input placeholder="587" className="h-9" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Form.Item name="user" label={<span className="font-semibold text-xs">Username / Email</span>}>
                <Input placeholder="you@domain.com" className="h-9" />
              </Form.Item>
              <Form.Item name="pass" label={<span className="font-semibold text-xs">Password / App Key</span>}>
                <Input.Password placeholder="••••••••" className="h-9" />
              </Form.Item>
            </div>

            <Form.Item name="fromEmail" label={<span className="font-semibold text-xs">Sender Address (From)</span>}>
              <Input placeholder='"LevoraLead Real Estate" <noreply@levoralead.com>' className="h-9" />
            </Form.Item>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="primary"
                htmlType="submit"
                loading={saveSmtpMutation.isPending}
                icon={<Save size={15} />}
                className="font-bold w-full sm:w-auto"
                disabled={!isMD}
              >
                Save SMTP Settings
              </Button>
              <Button
                onClick={handleTestSmtp}
                loading={testEmailLoading}
                icon={<Send size={15} />}
                className="font-semibold border-[#DEC07A] text-[#8C671D] w-full sm:w-auto"
                disabled={!isMD}
              >
                Dispatch Test Verification Email
              </Button>
            </div>
          </Form>
        </div>
      ),
    },
    {
      key: 'modules',
      label: (
        <span className="flex items-center gap-1.5 text-xs font-bold">
          <Sliders size={15} /> Module Access & Role Permissions
        </span>
      ),
      children: (
        <div className="space-y-6">
          {/* Part 1: Organization-Wide Module Switcher */}
          <div className="bg-white p-5 rounded-xl border border-[#E8E2D5] shadow-card">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-[#262626] m-0 mb-1 flex items-center gap-2">
                <Layers size={16} className="text-[#8C671D]" /> Organization-wide Module Switcher
              </h3>
              <p className="text-xs text-[#737373] m-0">
                Toggling a module off disables it across the organization for subordinate users. Managing Director retains unrestricted universal access.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {(moduleAccessData?.allAvailableModules || []).map((modKey) => {
                const isEnabled = (moduleAccessData?.organizationEnabledModules || []).includes(modKey);
                const isCore = ['dashboard', 'settings'].includes(modKey);

                return (
                  <div
                    key={modKey}
                    className="p-3 rounded-lg border border-[#E8E2D5] bg-[#F8F8F6] flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-xs capitalize text-[#262626] block">
                        {modKey.replace('_', ' ')}
                      </span>
                      {isCore && <span className="text-[10px] text-gray-400">Protected Core</span>}
                    </div>
                    <Switch
                      checked={isEnabled}
                      disabled={isCore || !isMD}
                      onChange={(checked) => handleToggleModule(modKey, checked)}
                      className={isEnabled ? 'bg-[#B88A2E]' : 'bg-gray-300'}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Part 2: Role Permission Matrix for 7 Roles */}
          <div className="bg-white p-5 rounded-xl border border-[#E8E2D5] shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-[#F5EBD3] pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#262626] m-0 mb-1 flex items-center gap-2">
                  <Shield size={16} className="text-[#8C671D]" /> Role Permission Matrix
                </h3>
                <p className="text-xs text-[#737373] m-0">
                  Configure module accessibility and granular operation permissions for each organizational role.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#262626]">Select Role:</span>
                <Select
                  value={selectedRole}
                  onChange={(val) => setSelectedRole(val)}
                  className="w-56 h-9 font-semibold"
                >
                  {ALL_ROLES_LIST.map((r) => (
                    <Option key={r.value} value={r.value}>
                      {r.label}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Managing Director protected message */}
            {(selectedRole === 'managing_director' || selectedRole === 'owner') ? (
              <Alert
                message="Managing Director (MD) Protected Authority"
                description="The Managing Director holds universal, unrestricted access across all application modules, business data, and administrative operations. No permission checkboxes can restrict or disable MD access."
                type="success"
                showIcon
                icon={<CheckCircle2 size={20} className="text-[#8C671D]" />}
                className="bg-[#FCF8EF] border-[#DEC07A]"
              />
            ) : (
              <div className="space-y-4">
                <div className="divide-y divide-gray-100">
                  {(moduleAccessData?.allAvailableModules || []).map((modKey) => {
                    const isModAllowed = selectedModules.includes(modKey);

                    return (
                      <div key={modKey} className="py-3">
                        <div className="flex items-center justify-between mb-2">
                          <Checkbox
                            checked={isModAllowed}
                            onChange={(e) => handleRoleModuleCheckbox(modKey, e.target.checked)}
                            disabled={!isMD}
                            className="font-bold text-xs text-[#262626] capitalize"
                          >
                            Module: {modKey.replace('_', ' ')}
                          </Checkbox>
                        </div>

                        {/* Granular Action Checkboxes */}
                        {isModAllowed && (
                          <div className="pl-6 flex flex-wrap gap-4 pt-1">
                            {GRANULAR_ACTIONS.map((action) => {
                              const permKey = `${modKey}.${action.key}`;
                              const hasPerm = selectedPermissions.includes(permKey);

                              return (
                                <Checkbox
                                  key={permKey}
                                  checked={hasPerm}
                                  onChange={(e) => handleRoleActionCheckbox(permKey, e.target.checked)}
                                  disabled={!isMD}
                                  className="text-xs text-[#737373]"
                                >
                                  {action.label}
                                </Checkbox>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {isMD && (
                  <div className="pt-3 border-t border-[#F5EBD3] flex justify-end">
                    <Button
                      type="primary"
                      onClick={handleSaveRoleMatrix}
                      loading={updateRolePermissionsMutation.isPending}
                      icon={<Save size={15} />}
                      className="font-bold"
                    >
                      Save Role Matrix ({selectedRole})
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'audit',
      label: (
        <span className="flex items-center gap-1.5 text-xs font-bold">
          <ShieldAlert size={15} /> Security & Audit Logs
        </span>
      ),
      children: (
        <div className="bg-white rounded-xl border border-[#E8E2D5] shadow-card overflow-hidden">
          <div className="p-4 border-b border-[#E8E2D5] bg-[#FCF8EF] flex items-center justify-between">
            <span className="font-bold text-xs uppercase tracking-wider text-[#8C671D]">
              System Audit Trail ({auditLogsData?.length || 0} Events)
            </span>
            <span className="text-[11px] text-[#737373]">
              Immutable audit records protected against deletion
            </span>
          </div>
          <Table
            columns={auditColumns}
            dataSource={auditLogsData || []}
            rowKey="_id"
            pagination={{ pageSize: 15 }}
            scroll={{ x: 750 }}
            className="enterprise-table"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings & System Governance"
        subtitle="Configure organization parameters, SMTP delivery, dynamic module permissions, and audit security events."
      />

      <Tabs items={tabItems} className="gold-tabs" />
    </div>
  );
};
