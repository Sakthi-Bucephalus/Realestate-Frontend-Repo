import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, message } from 'antd';
import { Edit3, Save, ShieldAlert } from 'lucide-react';
import dayjs from 'dayjs';
import api from '../../services/api';

const { TextArea } = Input;

export const LeadEditModal = ({ lead, visible, onClose, onSuccess, employees = [] }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (visible && lead) {
      form.setFieldsValue({
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        preferredPropertyType: lead.preferredPropertyType || 'Residential Plot',
        preferredLocation: lead.preferredLocation || '',
        budgetMin: lead.budgetMin || 0,
        budgetMax: lead.budgetMax || 0,
        priority: lead.priority || 'Medium',
        status: lead.status || 'New',
        assignedTo: lead.assignedTo?._id || lead.assignedTo || undefined,
        notes: lead.notes || '',
        nextFollowUpDate: lead.nextFollowUpDate ? dayjs(lead.nextFollowUpDate) : undefined,
        nextFollowUpRemarks: lead.nextFollowUpRemarks || '',
      });
    }
  }, [visible, lead, form]);

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      await api.put(`/leads/${lead._id}`, {
        name: values.name,
        phone: values.phone,
        email: values.email,
        preferredPropertyType: values.preferredPropertyType,
        preferredLocation: values.preferredLocation,
        budgetMin: Number(values.budgetMin) || 0,
        budgetMax: Number(values.budgetMax) || 0,
        priority: values.priority,
        status: values.status,
        assignedTo: values.assignedTo,
        notes: values.notes,
        nextFollowUpDate: values.nextFollowUpDate ? values.nextFollowUpDate.toISOString() : null,
        nextFollowUpRemarks: values.nextFollowUpRemarks,
      });

      message.success('Lead updated successfully');
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to update lead');
    } finally {
      setLoading(false);
    }
  };

  if (!lead) return null;

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FCF8EF] text-[#8C671D] border border-[#DEC07A] flex items-center justify-center">
            <Edit3 size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#262626] m-0">Edit Lead Record</h3>
            <span className="text-[11px] text-[#737373] font-normal">{lead.leadCode}</span>
          </div>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={650}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleFinish} className="mt-4 space-y-3">
        {lead.metaLeadId && (
          <div className="p-2.5 rounded bg-blue-50 border border-blue-200 text-xs text-blue-800 flex items-center gap-2">
            <ShieldAlert size={14} className="shrink-0" />
            <span>
              Meta Ads Lead (ID: <strong className="font-mono">{lead.metaLeadId}</strong>). Meta source identifiers and form submissions are protected from tampering.
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Form.Item
            name="name"
            label={<span className="text-xs font-semibold">Contact Full Name</span>}
            rules={[{ required: true, message: 'Name is required' }]}
          >
            <Input className="h-9 text-xs" />
          </Form.Item>

          <Form.Item
            name="phone"
            label={<span className="text-xs font-semibold">Phone Number</span>}
            rules={[{ required: true, message: 'Phone is required' }]}
          >
            <Input className="h-9 text-xs" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Form.Item name="email" label={<span className="text-xs font-semibold">Email Address</span>}>
            <Input type="email" className="h-9 text-xs" />
          </Form.Item>

          <Form.Item name="assignedTo" label={<span className="text-xs font-semibold">Assigned Executive</span>}>
            <Select placeholder="Select team member" allowClear className="h-9">
              {employees.map((emp) => (
                <Select.Option key={emp._id} value={emp._id}>
                  {emp.firstName} {emp.lastName} ({emp.department || 'Sales'})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Form.Item
            name="status"
            label={<span className="text-xs font-semibold">Lead Status Stage</span>}
            rules={[{ required: true }]}
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
            name="priority"
            label={<span className="text-xs font-semibold">Lead Priority</span>}
            rules={[{ required: true }]}
          >
            <Select className="h-9">
              <Select.Option value="Urgent">Urgent</Select.Option>
              <Select.Option value="High">High</Select.Option>
              <Select.Option value="Medium">Medium</Select.Option>
              <Select.Option value="Low">Low</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Form.Item name="preferredPropertyType" label={<span className="text-xs font-semibold">Property Type</span>}>
            <Select className="h-9">
              <Select.Option value="Residential Plot">Residential Plot</Select.Option>
              <Select.Option value="Villa / House">Villa / House</Select.Option>
              <Select.Option value="Apartment">Apartment</Select.Option>
              <Select.Option value="Commercial">Commercial</Select.Option>
              <Select.Option value="Agricultural Land">Agricultural Land</Select.Option>
              <Select.Option value="Industrial">Industrial</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="preferredLocation" label={<span className="text-xs font-semibold">Preferred Location</span>}>
            <Input placeholder="e.g. Whitefield, Bangalore" className="h-9 text-xs" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Form.Item name="budgetMin" label={<span className="text-xs font-semibold">Min Budget (₹)</span>}>
            <Input type="number" placeholder="e.g. 2500000" className="h-9 text-xs" />
          </Form.Item>

          <Form.Item name="budgetMax" label={<span className="text-xs font-semibold">Max Budget (₹)</span>}>
            <Input type="number" placeholder="e.g. 4500000" className="h-9 text-xs" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Form.Item name="nextFollowUpDate" label={<span className="text-xs font-semibold">Next Follow-Up Date</span>}>
            <DatePicker showTime className="w-full h-9" placeholder="Date & Time" />
          </Form.Item>

          <Form.Item name="nextFollowUpRemarks" label={<span className="text-xs font-semibold">Follow-Up Agenda</span>}>
            <Input placeholder="e.g. Send layout master plan" className="h-9 text-xs" />
          </Form.Item>
        </div>

        <Form.Item name="notes" label={<span className="text-xs font-semibold">Internal Notes</span>}>
          <TextArea rows={2} placeholder="Add ongoing interaction notes..." className="text-xs" />
        </Form.Item>

        <div className="flex justify-end gap-2 pt-2 border-t border-[#E8E2D5]">
          <Button onClick={onClose} className="text-xs">
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<Save size={14} />}
            className="text-xs font-bold bg-[#B88A2E] hover:bg-[#8C671D]"
          >
            Update Lead
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
