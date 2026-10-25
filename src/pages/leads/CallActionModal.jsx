import React, { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, message, Divider } from 'antd';
import { Phone, PhoneCall, Copy, Check, Calendar, Clock, FileText } from 'lucide-react';
import api from '../../services/api';

const { TextArea } = Input;

export const CallActionModal = ({ lead, visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!lead) return null;

  const cleanPhone = (lead.phone || '').replace(/[^0-9+]/g, '');

  const handleCopyPhone = () => {
    if (lead.phone) {
      navigator.clipboard.writeText(lead.phone);
      setCopied(true);
      message.success('Phone number copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      await api.post(`/leads/${lead._id}/call`, {
        duration: values.duration ? parseInt(values.duration, 10) * 60 : 0, // convert mins to secs
        outcome: values.outcome,
        notes: values.notes,
        newStatus: values.newStatus || undefined,
        nextFollowUpDate: values.nextFollowUpDate ? values.nextFollowUpDate.toISOString() : undefined,
        nextFollowUpRemarks: values.nextFollowUpRemarks,
      });

      message.success('Call log and follow-up saved successfully');
      form.resetFields();
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to record call');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FCF8EF] text-[#8C671D] border border-[#DEC07A] flex items-center justify-center">
            <PhoneCall size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#262626] m-0">Call & Log Contact</h3>
            <p className="text-[11px] text-[#737373] m-0 font-normal">
              {lead.name} • <span className="font-semibold text-[#8C671D]">{lead.leadCode}</span>
            </p>
          </div>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={520}
      destroyOnClose
    >
      <div className="mt-3 space-y-4">
        {/* Contact Banner & Quick Dialer Action */}
        <div className="p-3.5 rounded-lg bg-[#FCF8EF] border border-[#E8E2D5] flex items-center justify-between gap-3">
          <div className="truncate">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#737373] block">
              Phone Number
            </span>
            <span className="text-sm sm:text-base font-extrabold text-[#262626] tracking-wide block truncate">
              {lead.phone || 'No phone recorded'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleCopyPhone}
              className="p-2 rounded-md bg-white border border-[#E8E2D5] text-gray-600 hover:text-[#8C671D] hover:bg-gray-50 transition-colors"
              title="Copy Phone Number"
            >
              {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
            </button>

            {cleanPhone ? (
              <a
                href={`tel:${cleanPhone}`}
                className="px-3.5 py-1.5 rounded-md bg-[#B88A2E] hover:bg-[#8C671D] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-gold-sm"
              >
                <Phone size={14} /> Dial Now
              </a>
            ) : (
              <Button disabled size="small" icon={<Phone size={14} />}>
                No Number
              </Button>
            )}
          </div>
        </div>

        {/* Call Log Entry Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            outcome: 'Connected',
            duration: 2,
            newStatus: lead.status === 'New' ? 'Hot' : lead.status,
          }}
          className="space-y-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item
              name="outcome"
              label={<span className="text-xs font-semibold">Call Outcome</span>}
              rules={[{ required: true }]}
            >
              <Select className="h-9">
                <Select.Option value="Connected">Connected</Select.Option>
                <Select.Option value="Follow-up Scheduled">Follow-up Scheduled</Select.Option>
                <Select.Option value="Busy">Busy</Select.Option>
                <Select.Option value="No Answer">No Answer</Select.Option>
                <Select.Option value="Left Voicemail">Left Voicemail</Select.Option>
                <Select.Option value="Wrong Number">Wrong Number</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="duration"
              label={<span className="text-xs font-semibold">Duration (Minutes)</span>}
            >
              <Input type="number" min={0} placeholder="e.g. 3" className="h-9" />
            </Form.Item>
          </div>

          <Form.Item
            name="newStatus"
            label={<span className="text-xs font-semibold">Update Lead Stage</span>}
          >
            <Select className="h-9">
              <Select.Option value="New">New</Select.Option>
              <Select.Option value="Hot">Hot</Select.Option>
              <Select.Option value="Warm">Warm</Select.Option>
              <Select.Option value="Cold">Cold</Select.Option>
              <Select.Option value="Interested">Interested</Select.Option>
              <Select.Option value="In Progress">In Progress</Select.Option>
              <Select.Option value="Not Interested">Not Interested</Select.Option>
              <Select.Option value="Converted">Converted</Select.Option>
              <Select.Option value="Lost">Lost</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="notes"
            label={<span className="text-xs font-semibold">Call Discussion Notes</span>}
          >
            <TextArea
              rows={2}
              placeholder="Client interested in villa plot, requested site visit over the weekend..."
              className="text-xs"
            />
          </Form.Item>

          <Divider className="my-2 text-xs text-gray-400">Schedule Next Follow-Up (Optional)</Divider>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item
              name="nextFollowUpDate"
              label={<span className="text-xs font-semibold">Next Follow-Up Time</span>}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                className="w-full h-9"
                placeholder="Pick date & time"
              />
            </Form.Item>

            <Form.Item
              name="nextFollowUpRemarks"
              label={<span className="text-xs font-semibold">Follow-Up Agenda</span>}
            >
              <Input placeholder="e.g. Confirm site visit cab" className="h-9" />
            </Form.Item>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button onClick={onClose} className="text-xs">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="text-xs font-bold bg-[#B88A2E] hover:bg-[#8C671D]"
            >
              Save Call Record
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};
