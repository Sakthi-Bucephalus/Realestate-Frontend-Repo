import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Steps, Alert } from 'antd';
import { Building2, ShieldCheck, Mail, KeyRound, CheckCircle2, ArrowRight, RotateCw, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export const BootstrapSetup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState(0); // 0 = Org & MD Details, 1 = Email OTP Verification
  const [loading, setLoading] = useState(false);
  const [mdAlreadyExists, setMdAlreadyExists] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [resending, setResending] = useState(false);

  const [form] = Form.useForm();
  const [otpForm] = Form.useForm();

  // Check if initial setup is already done
  useEffect(() => {
    const check = async () => {
      try {
        const res = await api.get('/auth/check-setup');
        if (!res.data.setupRequired || res.data.mdExists) {
          setMdAlreadyExists(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    check();
  }, []);

  // Cooldown countdown timer
  useEffect(() => {
    let timer;
    if (cooldownSeconds > 0) {
      timer = setInterval(() => {
        setCooldownSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  // Step 1 Submission: Dispatch Initial MD Registration & Send OTP
  const handleRegisterMD = async (values) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register-md', values);
      message.success(res.data.message || 'Verification code sent to your official email!');
      setRegisteredEmail(values.officialEmail);
      setCooldownSeconds(60); // 60s cooldown for resend
      setCurrentStep(1); // Proceed to OTP verification step
    } catch (err) {
      message.error(err.response?.data?.message || 'Managing Director registration failed.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2 Submission: Verify Email OTP & Activate MD Root Account
  const handleVerifyOtp = async (values) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/verify-md-otp', {
        email: registeredEmail,
        otp: values.otp.trim(),
      });

      message.success('Managing Director account successfully verified and activated!');
      localStorage.setItem('estateflow_token', res.data.token);
      localStorage.setItem('estateflow_user', JSON.stringify(res.data.user));

      // Redirect directly to the MD Dashboard
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 800);
    } catch (err) {
      message.error(err.response?.data?.message || 'Incorrect or expired verification code.');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP handler with cooldown protection
  const handleResendOtp = async () => {
    if (cooldownSeconds > 0 || !registeredEmail) return;
    setResending(true);
    try {
      const res = await api.post('/auth/resend-md-otp', { email: registeredEmail });
      message.success(res.data.message || 'Fresh verification code dispatched to your email.');
      setCooldownSeconds(60);
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to resend code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  if (mdAlreadyExists) {
    return (
      <div className="min-h-screen bg-[#F8F8F6] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto bg-white p-8 rounded-xl border border-[#E8E2D5] shadow-card text-center">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-[#8C671D] flex items-center justify-center mx-auto mb-4 border border-[#DEC07A]">
            <Lock size={24} />
          </div>
          <h2 className="text-xl font-bold text-[#262626] mb-2">Public MD Registration Closed</h2>
          <p className="text-xs text-[#737373] mb-6">
            The Managing Director account for this organization has already been initialized and verified.
            Subsequent accounts and Directors must be created by the MD from the User Management module.
          </p>
          <Button
            type="primary"
            onClick={() => navigate('/login')}
            className="w-full h-10 font-bold"
          >
            Go to Secure Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 rounded-xl bg-[#B88A2E] flex items-center justify-center text-white shadow-gold-md mb-3">
            <Building2 size={30} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#262626]">
            LevoraLead — Initial MD Registration
          </h1>
          <p className="text-xs sm:text-sm text-[#737373] mt-1 max-w-lg mx-auto">
            Provision the root Managing Director (MD) account with unrestricted system access and email OTP verification.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-xl border border-[#E8E2D5] shadow-card">
          <Steps
            current={currentStep}
            className="mb-8"
            items={[
              { title: 'MD Account Profile', icon: <ShieldCheck size={18} /> },
              { title: 'Email OTP Verification', icon: <Mail size={18} /> },
            ]}
          />

          {/* STEP 0: Organization & MD Account Credentials */}
          {currentStep === 0 && (
            <Form
              form={form}
              layout="vertical"
              onFinish={handleRegisterMD}
              initialValues={{
                organizationName: 'Levora Realty Group',
                legalName: 'Levora Realty Pvt Ltd',
                officialEmail: 'md@levorarealty.com',
                phone: '+91 98765 43210',
                firstName: 'Vikram',
                lastName: 'Singhania',
              }}
            >
              <div className="space-y-4">
                <div className="border-b border-[#E8E2D5] pb-3 mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C671D] m-0">
                    1. Organization Identity
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Form.Item
                    name="organizationName"
                    label={<span className="font-semibold text-xs text-[#262626]">Organization Business Name</span>}
                    rules={[{ required: true, message: 'Please enter organization name' }]}
                  >
                    <Input placeholder="e.g. Levora Realty Group" className="h-10" />
                  </Form.Item>

                  <Form.Item
                    name="legalName"
                    label={<span className="font-semibold text-xs text-[#262626]">Registered Legal Name</span>}
                  >
                    <Input placeholder="e.g. Levora Realty Pvt Ltd" className="h-10" />
                  </Form.Item>
                </div>

                <div className="border-b border-[#E8E2D5] pb-3 mb-4 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C671D] m-0">
                    2. Managing Director (MD) Root Credentials
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Form.Item
                    name="firstName"
                    label={<span className="font-semibold text-xs text-[#262626]">First Name</span>}
                    rules={[{ required: true, message: 'First name is required' }]}
                  >
                    <Input placeholder="e.g. Vikram" className="h-10" />
                  </Form.Item>

                  <Form.Item
                    name="lastName"
                    label={<span className="font-semibold text-xs text-[#262626]">Last Name</span>}
                  >
                    <Input placeholder="e.g. Singhania" className="h-10" />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Form.Item
                    name="officialEmail"
                    label={<span className="font-semibold text-xs text-[#262626]">Official MD Email (For OTP Verification)</span>}
                    rules={[
                      { required: true, message: 'Official email is required' },
                      { type: 'email', message: 'Enter a valid email address' },
                    ]}
                  >
                    <Input placeholder="md@company.com" className="h-10" prefix={<Mail size={14} className="text-gray-400 mr-1" />} />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label={<span className="font-semibold text-xs text-[#262626]">Direct Contact Phone</span>}
                  >
                    <Input placeholder="+91 98765 00000" className="h-10" />
                  </Form.Item>
                </div>

                <Form.Item
                  name="password"
                  label={<span className="font-semibold text-xs text-[#262626]">Secure MD Root Password</span>}
                  rules={[
                    { required: true, message: 'Password is required' },
                    { min: 8, message: 'Password must be at least 8 characters' },
                  ]}
                  extra={<span className="text-[11px] text-[#737373]">Minimum 8 characters. MD holds unrestricted system access.</span>}
                >
                  <Input.Password placeholder="••••••••" className="h-10" />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full h-10 font-bold mt-4 flex items-center justify-center gap-2"
                >
                  <span>Send Email Verification Code</span>
                  <ArrowRight size={16} />
                </Button>
              </div>
            </Form>
          )}

          {/* STEP 1: Secure Email OTP Verification */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <Alert
                message="Verification Code Dispatched"
                description={
                  <span>
                    A secure 6-digit activation code has been sent to{' '}
                    <strong className="text-[#8C671D]">{registeredEmail}</strong>. Please enter it below to activate the Managing Director account.
                  </span>
                }
                type="info"
                showIcon
                className="bg-[#FCF8EF] border-[#DEC07A]"
              />

              <Form
                form={otpForm}
                layout="vertical"
                onFinish={handleVerifyOtp}
              >
                <Form.Item
                  name="otp"
                  label={<span className="font-semibold text-xs text-[#262626]">6-Digit Email OTP Code</span>}
                  rules={[
                    { required: true, message: 'Please enter the 6-digit OTP' },
                    { len: 6, message: 'Code must be exactly 6 digits' },
                  ]}
                >
                  <Input
                    placeholder="123456"
                    maxLength={6}
                    className="h-12 text-center text-2xl font-mono tracking-widest font-extrabold border-[#DEC07A]"
                    prefix={<KeyRound size={20} className="text-[#B88A2E] mr-2" />}
                  />
                </Form.Item>

                <div className="flex items-center justify-between py-2 text-xs">
                  <span className="text-[#737373]">
                    Code valid for 10 minutes.
                  </span>
                  <button
                    type="button"
                    disabled={cooldownSeconds > 0 || resending}
                    onClick={handleResendOtp}
                    className={`font-semibold flex items-center gap-1 ${
                      cooldownSeconds > 0
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-[#8C671D] hover:underline cursor-pointer'
                    }`}
                  >
                    <RotateCw size={12} className={resending ? 'animate-spin' : ''} />
                    {cooldownSeconds > 0 ? `Resend code in ${cooldownSeconds}s` : 'Resend Code'}
                  </button>
                </div>

                <div className="flex gap-3 pt-3">
                  <Button
                    onClick={() => setCurrentStep(0)}
                    className="h-10 text-xs font-semibold"
                  >
                    &larr; Edit Details
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="flex-1 h-10 font-bold flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={16} />
                    <span>Verify Code & Activate MD Account</span>
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
