import React, { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, Timeline, Tag, message, Divider } from 'antd';
import { User, Phone, Mail, MapPin, Calendar, Clock, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import dayjs from 'dayjs';
import { StatusTag } from '../../components/common/StatusTag';
import api from '../../services/api';

export const LeadDetailModal = ({ lead, visible, onClose, onRefresh }) => {
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'followup' | 'convert'
  const [followUpForm] = Form.useForm();
  const [completeForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  if (!lead) return null;

  // Add new follow-up
  const handleScheduleFollowUp = async (values) => {
    setLoading(true);
    try {
      await api.post(`/leads/${lead._id}/follow-up`, {
        scheduledAt: values.scheduledAt.toISOString(),
        remarks: values.remarks,
      });
      message.success('Follow-up scheduled successfully');
      followUpForm.resetFields();
      onRefresh();
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to schedule follow-up');
    } finally {
      setLoading(false);
    }
  };

  // Complete a follow-up
  const handleCompleteFollowUp = async (values) => {
    setLoading(true);
    try {
      await api.post(`/leads/${lead._id}/complete-follow-up`, {
        followUpId: values.followUpId,
        outcome: values.outcome,
        status: values.status,
        nextFollowUpDate: values.nextFollowUpDate ? values.nextFollowUpDate.toISOString() : null,
        nextFollowUpRemarks: values.nextFollowUpRemarks,
      });
      message.success('Follow-up completed and outcome logged');
      completeForm.resetFields();
      onRefresh();
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to log outcome');
    } finally {
      setLoading(false);
    }
  };

  // Convert to customer
  const handleConvert = async () => {
    setLoading(true);
    try {
      const res = await api.post(`/leads/${lead._id}/convert`);
      message.success(res.data.message || 'Lead converted to customer successfully!');
      onRefresh();
      onClose();
    } catch (err) {
      message.error(err.response?.data?.message || 'Conversion failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex flex-wrap items-center justify-between gap-2 pr-6">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base text-[#262626]">{lead.name}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#FCF8EF] text-[#8C671D] border border-[#DEC07A]">
              {lead.leadCode}
            </span>
          </div>
          <StatusTag status={lead.status} />
        </div>
      }
      open={visible}
      onCancel={onClose}
      width="95%"
      style={{ maxWidth: 700 }}
      footer={null}
      destroyOnClose
    >
      {/* Sub-navigation tabs */}
      <div className="flex border-b border-[#E8E2D5] mb-5 mt-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('details')}
          className={`py-2 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'details'
              ? 'border-[#B88A2E] text-[#8C671D]'
              : 'border-transparent text-[#737373] hover:text-[#262626]'
          }`}
        >
          Lead Overview & Timeline
        </button>
        <button
          onClick={() => setActiveTab('followup')}
          className={`py-2 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'followup'
              ? 'border-[#B88A2E] text-[#8C671D]'
              : 'border-transparent text-[#737373] hover:text-[#262626]'
          }`}
        >
          Schedule / Complete Follow-up
        </button>
      </div>

      {activeTab === 'details' && (
        <div className="space-y-5">
          {/* Contact & Preference Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#FCF8EF] p-4 rounded-lg border border-[#F5EBD3] text-xs">
            <div>
              <p className="text-[#737373] mb-1 font-semibold flex items-center gap-1.5">
                <Phone size={13} className="text-[#8C671D]" /> Phone:
              </p>
              <p className="font-bold text-[#262626] m-0">{lead.phone}</p>
            </div>
            <div>
              <p className="text-[#737373] mb-1 font-semibold flex items-center gap-1.5">
                <Mail size={13} className="text-[#8C671D]" /> Email:
              </p>
              <p className="font-bold text-[#262626] m-0">{lead.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-[#737373] mb-1 font-semibold flex items-center gap-1.5">
                <MapPin size={13} className="text-[#8C671D]" /> Preferred Location:
              </p>
              <p className="font-bold text-[#262626] m-0">{lead.preferredLocation || 'Any'}</p>
            </div>
            <div>
              <p className="text-[#737373] mb-1 font-semibold">Budget Range:</p>
              <p className="font-bold text-[#8C671D] m-0">
                ₹{((lead.budgetMin || 0) / 100000).toFixed(1)}L - ₹{((lead.budgetMax || 0) / 100000).toFixed(1)}L
              </p>
            </div>
          </div>

          {/* Follow-up due alert box */}
          {lead.nextFollowUpDate && (
            <div className="p-3 bg-amber-50 rounded-md border border-amber-200 text-xs flex items-start gap-2">
              <Clock size={16} className="text-amber-700 mt-0.5" />
              <div>
                <span className="font-bold text-amber-900 block">
                  Next Follow-up Due: {new Date(lead.nextFollowUpDate).toLocaleString()}
                </span>
                <span className="text-amber-800">{lead.nextFollowUpRemarks || 'No remarks entered.'}</span>
              </div>
            </div>
          )}

          {/* Convert to Customer CTA if not converted */}
          {lead.status !== 'Converted' && (
            <div className="p-3 bg-emerald-50 rounded-md border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-bold text-xs text-emerald-900 m-0">Ready to book or register as a buyer?</p>
                <p className="text-[11px] text-emerald-700 m-0">Convert this lead into a permanent Customer profile.</p>
              </div>
              <Button
                type="primary"
                onClick={handleConvert}
                loading={loading}
                className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 text-xs font-bold"
              >
                Convert to Customer &rarr;
              </Button>
            </div>
          )}

          {/* Interaction History Timeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#737373] mb-3">
              Interaction & Status History
            </h4>
            <Timeline
              className="mt-2 text-xs"
              items={(lead.history || []).map((h, i) => ({
                color: '#B88A2E',
                children: (
                  <div>
                    <span className="font-bold text-[#262626]">{h.action}</span>
                    <span className="text-[#737373] ml-2 text-[11px]">
                      {new Date(h.timestamp).toLocaleString()}
                    </span>
                    {h.note && <p className="text-[#737373] m-0 mt-0.5">{h.note}</p>}
                  </div>
                ),
              }))}
            />
          </div>
        </div>
      )}

      {activeTab === 'followup' && (
        <div className="space-y-6">
          {/* Schedule Follow-up Form */}
          <div className="bg-[#F8F8F6] p-4 rounded-lg border border-[#E8E2D5]">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#8C671D] mb-3">
              Schedule Next Follow-Up
            </h4>
            <Form form={followUpForm} layout="vertical" onFinish={handleScheduleFollowUp}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Form.Item
                  name="scheduledAt"
                  label="Date & Time"
                  rules={[{ required: true, message: 'Select date & time' }]}
                >
                  <DatePicker showTime className="w-full h-9" />
                </Form.Item>
                <Form.Item name="remarks" label="Remarks / Agenda">
                  <Input placeholder="e.g. Discuss revised pricing" className="h-9" />
                </Form.Item>
              </div>
              <Button type="primary" htmlType="submit" loading={loading} className="font-bold text-xs">
                Schedule Task
              </Button>
            </Form>
          </div>

          {/* Complete Follow-up Form */}
          <div className="bg-white p-4 rounded-lg border border-[#E8E2D5]">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#262626] mb-3">
              Log Follow-Up Call Outcome
            </h4>
            <Form form={completeForm} layout="vertical" onFinish={handleCompleteFollowUp}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Form.Item
                  name="outcome"
                  label="Outcome / Result"
                  rules={[{ required: true, message: 'Please specify outcome' }]}
                >
                  <Select placeholder="Select outcome">
                    <Select.Option value="Interested - Site Visit Scheduled">Interested - Site Visit Scheduled</Select.Option>
                    <Select.Option value="Negotiating Price">Negotiating Price</Select.Option>
                    <Select.Option value="Follow-up Call Required">Follow-up Call Required</Select.Option>
                    <Select.Option value="Budget Mismatch">Budget Mismatch</Select.Option>
                    <Select.Option value="Not Interested / Lost">Not Interested / Lost</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item name="status" label="Update Lead Stage">
                  <Select placeholder="Optionally change stage">
                    <Select.Option value="Contacted">Contacted</Select.Option>
                    <Select.Option value="Interested">Interested</Select.Option>
                    <Select.Option value="Site Visit Scheduled">Site Visit Scheduled</Select.Option>
                    <Select.Option value="Negotiation">Negotiation</Select.Option>
                    <Select.Option value="Lost">Lost</Select.Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Form.Item name="nextFollowUpDate" label="Next Follow-up Date (Optional)">
                  <DatePicker showTime className="w-full h-9" />
                </Form.Item>
                <Form.Item name="nextFollowUpRemarks" label="Next Action Remarks">
                  <Input placeholder="Action item for next call" className="h-9" />
                </Form.Item>
              </div>

              <Button type="primary" htmlType="submit" loading={loading} className="font-bold text-xs">
                Log Outcome & Save
              </Button>
            </Form>
          </div>
        </div>
      )}
    </Modal>
  );
};
