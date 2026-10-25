import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, Timeline, Tag, message, Divider } from 'antd';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Share2,
  FileQuestion,
  PhoneCall,
  Megaphone,
} from 'lucide-react';
import dayjs from 'dayjs';
import { StatusTag } from '../../components/common/StatusTag';
import api from '../../services/api';

export const LeadDetailModal = ({ lead, visible, onClose, onRefresh }) => {
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'meta' | 'calls' | 'followup'
  const [followUpForm] = Form.useForm();
  const [completeForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Automatically mark lead as reviewed on modal open to clear NEW LEAD badge
  useEffect(() => {
    if (visible && lead && lead._id && lead.isNewLead) {
      api.patch(`/leads/${lead._id}/review`)
        .then(() => {
          if (onRefresh) onRefresh();
        })
        .catch(() => {});
    }
  }, [visible, lead?._id]);

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
      if (onRefresh) onRefresh();
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
      if (onRefresh) onRefresh();
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
      if (onRefresh) onRefresh();
      onClose();
    } catch (err) {
      message.error(err.response?.data?.message || 'Conversion failed');
    } finally {
      setLoading(false);
    }
  };

  const isMetaLead = lead.source === 'Meta Lead Ads' || !!lead.metaLeadId;

  return (
    <Modal
      title={
        <div className="flex flex-wrap items-center justify-between gap-2 pr-6">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base text-[#262626]">{lead.name}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#FCF8EF] text-[#8C671D] border border-[#DEC07A]">
              {lead.leadCode}
            </span>
            {isMetaLead && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                <Share2 size={10} /> Meta Ads
              </span>
            )}
            {lead.isNewLead && (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
                NEW LEAD
              </span>
            )}
          </div>
          <StatusTag status={lead.status} />
        </div>
      }
      open={visible}
      onCancel={onClose}
      width="95%"
      style={{ maxWidth: 750 }}
      footer={null}
      destroyOnClose
    >
      {/* Sub-navigation tabs */}
      <div className="flex border-b border-[#E8E2D5] mb-5 mt-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('details')}
          className={`py-2 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'details'
              ? 'border-[#B88A2E] text-[#8C671D]'
              : 'border-transparent text-[#737373] hover:text-[#262626]'
          }`}
        >
          Overview & Timeline
        </button>

        {isMetaLead && (
          <button
            onClick={() => setActiveTab('meta')}
            className={`py-2 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeTab === 'meta'
                ? 'border-[#B88A2E] text-[#8C671D]'
                : 'border-transparent text-[#737373] hover:text-[#262626]'
            }`}
          >
            <Megaphone size={12} /> Meta Ads & Answers ({(lead.formAnswers || []).length})
          </button>
        )}

        <button
          onClick={() => setActiveTab('calls')}
          className={`py-2 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1 ${
            activeTab === 'calls'
              ? 'border-[#B88A2E] text-[#8C671D]'
              : 'border-transparent text-[#737373] hover:text-[#262626]'
          }`}
        >
          <PhoneCall size={12} /> Call Logs ({(lead.callLogs || []).length})
        </button>

        <button
          onClick={() => setActiveTab('followup')}
          className={`py-2 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
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

      {/* Meta Ads & Form Answers Tab */}
      {activeTab === 'meta' && (
        <div className="space-y-4">
          <div className="bg-[#FCF8EF] p-4 rounded-lg border border-[#F5EBD3] text-xs">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#8C671D] mb-3 flex items-center gap-1.5">
              <Megaphone size={14} /> Meta Campaign & Attribution
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-[#737373] font-semibold block">Facebook Page:</span>
                <span className="font-bold text-[#262626]">{lead.metaPageName || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[#737373] font-semibold block">Lead Form:</span>
                <span className="font-bold text-[#262626]">{lead.metaFormName || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[#737373] font-semibold block">Campaign Name:</span>
                <span className="font-bold text-[#262626]">{lead.metaCampaignName || 'Organic / Direct'}</span>
              </div>
              <div>
                <span className="text-[#737373] font-semibold block">Ad Name:</span>
                <span className="font-bold text-[#262626]">{lead.metaAdName || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[#737373] font-semibold block">Meta Lead ID:</span>
                <span className="font-mono text-xs text-gray-700">{lead.metaLeadId || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[#737373] font-semibold block">Form Submission Time (Meta):</span>
                <span className="font-bold text-[#262626]">
                  {lead.metaCreatedAt ? new Date(lead.metaCreatedAt).toLocaleString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#262626] mb-2 flex items-center gap-1.5">
              <FileQuestion size={14} className="text-[#8C671D]" /> User Submitted Answers
            </h4>

            {(!lead.formAnswers || lead.formAnswers.length === 0) ? (
              <p className="text-xs text-gray-500 italic p-3 bg-gray-50 rounded border border-gray-200">
                No custom questions were included in this Meta lead form.
              </p>
            ) : (
              <div className="space-y-2">
                {lead.formAnswers.map((ans, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-lg border border-[#E8E2D5] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                  >
                    <span className="font-bold text-[#737373] capitalize">
                      {ans.label || ans.fieldName}:
                    </span>
                    <span className="font-extrabold text-[#262626] text-right">
                      {ans.value || '—'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Call Logs Tab */}
      {activeTab === 'calls' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D5]">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#262626] m-0">
              Call Activity Records
            </h4>
          </div>

          {(!lead.callLogs || lead.callLogs.length === 0) ? (
            <div className="text-center py-8 text-xs text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
              No calls have been logged for this lead yet. Use the dial action in the leads table to place and record calls.
            </div>
          ) : (
            <div className="space-y-2.5">
              {lead.callLogs.map((c, i) => (
                <div
                  key={i}
                  className="p-3 bg-white rounded-lg border border-[#E8E2D5] space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#262626] flex items-center gap-1.5">
                      <PhoneCall size={13} className="text-[#8C671D]" />
                      Outcome: <span className="text-[#8C671D]">{c.outcome}</span>
                    </span>
                    <span className="text-[11px] text-gray-500">
                      {new Date(c.dialedAt).toLocaleString()}
                    </span>
                  </div>
                  {c.duration > 0 && (
                    <p className="text-[11px] text-gray-600 m-0">
                      Duration: ~{Math.round(c.duration / 60) || 1} min ({c.duration}s)
                    </p>
                  )}
                  {c.notes && (
                    <p className="text-xs text-gray-700 bg-[#F8F8F6] p-2 rounded border border-gray-200 m-0 mt-1">
                      {c.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Follow-up Tab */}
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
                    <Select.Option value="Hot">Hot</Select.Option>
                    <Select.Option value="Warm">Warm</Select.Option>
                    <Select.Option value="Cold">Cold</Select.Option>
                    <Select.Option value="Interested">Interested</Select.Option>
                    <Select.Option value="In Progress">In Progress</Select.Option>
                    <Select.Option value="Not Interested">Not Interested</Select.Option>
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
