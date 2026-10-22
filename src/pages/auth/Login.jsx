import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Modal } from 'antd';
import { Lock, Mail, Building2, KeyRound, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const [form] = Form.useForm();
  const [resetForm] = Form.useForm();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      message.success('Sign in successful');
      navigate('/dashboard');
    } catch (err) {
      message.error(err.response?.data?.message || err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  // Demo account quick filler
  const fillDemoAccount = (role) => {
    const creds = {
      owner: { email: 'owner@estateflow.com', password: 'Password@123' },
      admin: { email: 'admin@estateflow.com', password: 'Password@123' },
      hr: { email: 'hr@estateflow.com', password: 'Password@123' },
      employee: { email: 'agent@estateflow.com', password: 'Password@123' },
    };
    if (creds[role]) {
      form.setFieldsValue(creds[role]);
    }
  };

  // Step 1: Request OTP for password reset
  const handleRequestOtp = async (values) => {
    setResetLoading(true);
    try {
      const res = await api.post('/auth/request-otp', { email: values.email });
      message.success(res.data.message || 'Verification code sent to your email.');
      setResetEmail(values.email);
      setResetStep(2);
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to send OTP code.');
    } finally {
      setResetLoading(false);
    }
  };

  // Step 2: Set New Password with OTP
  const handleResetPassword = async (values) => {
    setResetLoading(true);
    try {
      await api.post('/auth/reset-password', {
        email: resetEmail,
        otp: values.otp,
        newPassword: values.newPassword,
      });
      message.success('Password successfully reset! You can now log in.');
      setResetModalVisible(false);
      setResetStep(1);
      form.setFieldsValue({ email: resetEmail, password: values.newPassword });
    } catch (err) {
      message.error(err.response?.data?.message || 'Password reset failed');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8 selection:bg-[#F5EBD3]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Luxury Gold Emblem */}
        <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#B88A2E] flex items-center justify-center text-white shadow-gold-md mb-3">
          <Building2 className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#262626] tracking-tight m-0">
          ESTATEFLOW
        </h1>
        <p className="mt-1 text-[11px] sm:text-xs uppercase tracking-widest text-[#8C671D] font-bold">
          Enterprise Real Estate Management
        </p>
      </div>

      <div className="mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 sm:py-8 px-4 sm:px-10 shadow-card rounded-xl border border-[#E8E2D5]">
          <h2 className="text-base sm:text-lg font-bold text-[#262626] mb-5 text-center m-0">
            Sign In to Your Workspace
          </h2>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-1"
          >
            <Form.Item
              name="email"
              label={<span className="text-xs font-semibold text-[#262626]">Official Email</span>}
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email address' },
              ]}
            >
              <Input
                prefix={<Mail size={16} className="text-[#8C671D] mr-1" />}
                placeholder="name@estateflow.com"
                className="h-10 rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <div className="w-full flex justify-between items-center">
                  <span className="text-xs font-semibold text-[#262626]">Password</span>
                  <button
                    type="button"
                    onClick={() => {
                      setResetStep(1);
                      setResetModalVisible(true);
                    }}
                    className="text-xs text-[#B88A2E] hover:underline font-semibold"
                  >
                    Forgot password?
                  </button>
                </div>
              }
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password
                prefix={<Lock size={16} className="text-[#8C671D] mr-1" />}
                placeholder="••••••••"
                className="h-10 rounded-md"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-11 text-xs sm:text-sm font-bold tracking-wide rounded-md mt-2"
            >
              Sign In
            </Button>
          </Form>

          {/* Quick Demo Role Switcher for Convenience */}
          <div className="mt-6 pt-5 border-t border-[#F5EBD3]">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#737373] text-center mb-2">
              Instant Demo Credentials:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemoAccount('owner')}
                className="px-2 py-1.5 rounded text-[11px] sm:text-xs font-semibold bg-[#FCF8EF] text-[#8C671D] border border-[#DEC07A] hover:bg-[#F5EBD3] transition-colors truncate"
              >
                Owner
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('admin')}
                className="px-2 py-1.5 rounded text-[11px] sm:text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors truncate"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('hr')}
                className="px-2 py-1.5 rounded text-[11px] sm:text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors truncate"
              >
                HR
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('employee')}
                className="px-2 py-1.5 rounded text-[11px] sm:text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors truncate"
              >
                Employee
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-[#737373] mt-5">
          Need a fresh instance setup?{' '}
          <a href="/setup" className="font-semibold text-[#8C671D] hover:underline">
            First-time Bootstrap Wizard
          </a>
        </p>
      </div>

      {/* Forgot Password Modal with OTP Verification */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-[#8C671D]">
            <KeyRound size={20} />
            <span className="font-bold text-sm sm:text-base">Reset Password via Email OTP</span>
          </div>
        }
        open={resetModalVisible}
        onCancel={() => setResetModalVisible(false)}
        footer={null}
        width="95%"
        style={{ maxWidth: 480 }}
        destroyOnClose
      >
        {resetStep === 1 ? (
          <Form layout="vertical" onFinish={handleRequestOtp} className="mt-3">
            <p className="text-xs text-[#737373] mb-4">
              Enter your registered official email address. We will send a secure 6-digit OTP verification code valid for 5 minutes.
            </p>
            <Form.Item
              name="email"
              label={<span className="text-xs font-semibold">Registered Email Address</span>}
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Enter a valid email' },
              ]}
            >
              <Input placeholder="name@estateflow.com" className="h-10" />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={resetLoading}
              className="w-full h-10 mt-2 font-bold"
            >
              Send Verification Code
            </Button>
          </Form>
        ) : (
          <Form layout="vertical" onFinish={handleResetPassword} className="mt-3">
            <p className="text-xs text-[#737373] mb-3">
              Verification code sent to <strong>{resetEmail}</strong>. Please enter the OTP code and set your new password.
            </p>
            <Form.Item
              name="otp"
              label={<span className="text-xs font-semibold">6-Digit Verification Code</span>}
              rules={[{ required: true, message: 'Please enter the 6-digit OTP code' }]}
            >
              <Input
                placeholder="123456"
                maxLength={6}
                className="h-11 tracking-widest text-center text-lg font-bold"
              />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label={<span className="text-xs font-semibold">New Password</span>}
              rules={[
                { required: true, message: 'Please enter new password' },
                { min: 8, message: 'Password must be at least 8 characters long' },
              ]}
            >
              <Input.Password placeholder="Min 8 characters" className="h-10" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={resetLoading}
              className="w-full h-10 mt-2 font-bold"
            >
              Set New Password
            </Button>
          </Form>
        )}
      </Modal>
    </div>
  );
};
