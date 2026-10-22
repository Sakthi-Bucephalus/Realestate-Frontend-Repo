import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Steps } from 'antd';
import { Building2, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export const BootstrapSetup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Check if setup is already done
    const check = async () => {
      try {
        const res = await api.get('/auth/check-setup');
        if (!res.data.setupRequired) {
          message.info('System is already bootstrapped. Please sign in with your credentials.');
          navigate('/login');
        }
      } catch (err) {
        console.error(err);
      }
    };
    check();
  }, [navigate]);

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/bootstrap', values);
      message.success('EstateFlow initialized successfully! Logged in as Owner.');
      localStorage.setItem('estateflow_token', res.data.token);
      localStorage.setItem('estateflow_user', JSON.stringify(res.data.user));
      window.location.href = '/dashboard';
    } catch (err) {
      message.error(err.response?.data?.message || 'Bootstrap initialization failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 rounded-xl bg-[#B88A2E] flex items-center justify-center text-white shadow-gold-md mb-3">
            <Building2 size={32} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#262626]">
            Welcome to EstateFlow Setup Wizard
          </h1>
          <p className="text-sm text-[#737373] mt-1">
            Initialize your organization profile and provision your privileged Owner root account.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-xl border border-[#E8E2D5] shadow-card">
          <Steps
            current={currentStep}
            className="mb-8"
            items={[
              { title: 'Organization Profile', icon: <Building2 size={18} /> },
              { title: 'Owner Root Credentials', icon: <ShieldCheck size={18} /> },
            ]}
          />

          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{
              organizationName: 'Prime Developers & Realty',
              officialEmail: 'owner@primerealty.com',
              firstName: 'Vikram',
              lastName: 'Singhania',
              phone: '+91 98765 43210',
            }}
          >
            {currentStep === 0 && (
              <div className="space-y-4">
                <Form.Item
                  name="organizationName"
                  label={<span className="font-semibold text-xs">Organization Business Name</span>}
                  rules={[{ required: true, message: 'Please enter business name' }]}
                >
                  <Input placeholder="e.g. Royal Crest Developers" className="h-10" />
                </Form.Item>

                <Form.Item
                  name="legalName"
                  label={<span className="font-semibold text-xs">Registered Legal Entity Name</span>}
                >
                  <Input placeholder="e.g. Royal Crest Realty Pvt Ltd" className="h-10" />
                </Form.Item>

                <Form.Item
                  name="officialEmail"
                  label={<span className="font-semibold text-xs">Primary Official Email</span>}
                  rules={[
                    { required: true, message: 'Official email is required' },
                    { type: 'email', message: 'Enter a valid email' },
                  ]}
                >
                  <Input placeholder="contact@royalcrest.com" className="h-10" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label={<span className="font-semibold text-xs">Headquarters Phone</span>}
                >
                  <Input placeholder="+91 98765 00000" className="h-10" />
                </Form.Item>

                <Button
                  type="primary"
                  onClick={() => setCurrentStep(1)}
                  className="w-full h-10 font-bold mt-4"
                >
                  Proceed to Owner Account Setup &rarr;
                </Button>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Form.Item
                    name="firstName"
                    label={<span className="font-semibold text-xs">First Name</span>}
                    rules={[{ required: true, message: 'First name is required' }]}
                  >
                    <Input placeholder="Vikram" className="h-10" />
                  </Form.Item>

                  <Form.Item
                    name="lastName"
                    label={<span className="font-semibold text-xs">Last Name</span>}
                  >
                    <Input placeholder="Singhania" className="h-10" />
                  </Form.Item>
                </div>

                <Form.Item
                  name="password"
                  label={<span className="font-semibold text-xs">Secure Root Password</span>}
                  rules={[
                    { required: true, message: 'Password is required' },
                    { min: 8, message: 'Password must be at least 8 characters' },
                  ]}
                >
                  <Input.Password placeholder="••••••••" className="h-10" />
                </Form.Item>

                <div className="flex gap-3 mt-6">
                  <Button onClick={() => setCurrentStep(0)} className="h-10">
                    &larr; Back
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="flex-1 h-10 font-bold"
                  >
                    Complete Bootstrap & Launch EstateFlow
                  </Button>
                </div>
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
