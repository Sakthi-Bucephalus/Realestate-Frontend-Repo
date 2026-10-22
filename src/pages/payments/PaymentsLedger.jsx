import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, Button, Input, Select, Modal, Form, Space, message, Tag, Popconfirm } from 'antd';
import { Plus, Receipt, Printer, RotateCcw, Download, Search, CheckCircle } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusTag } from '../../components/common/StatusTag';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export const PaymentsLedger = () => {
  const queryClient = useQueryClient();
  const { user, hasPermission } = useAuth();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [methodFilter, setMethodFilter] = useState('');
  const [recordModalVisible, setRecordModalVisible] = useState(false);
  const [reverseModalVisible, setReverseModalVisible] = useState(false);
  const [receiptModalVisible, setReceiptModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [recordForm] = Form.useForm();
  const [reverseForm] = Form.useForm();

  // Fetch payments
  const { data, isLoading } = useQuery({
    queryKey: ['payments', page, pageSize, methodFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit: pageSize,
        ...(methodFilter && { paymentMethod: methodFilter }),
      });
      const res = await api.get(`/payments?${params.toString()}`);
      return res.data;
    },
  });

  // Fetch active bookings for payment recording
  const { data: bookingsData } = useQuery({
    queryKey: ['confirmed-bookings-dropdown'],
    queryFn: async () => {
      const res = await api.get('/bookings?limit=50&status=Confirmed');
      return res.data.data;
    },
    enabled: recordModalVisible,
  });

  // Record payment mutation
  const recordMutation = useMutation({
    mutationFn: (newPayment) => api.post('/payments', newPayment),
    onSuccess: () => {
      message.success('Payment recorded and ledger updated successfully');
      setRecordModalVisible(false);
      recordForm.resetFields();
      queryClient.invalidateQueries(['payments']);
      queryClient.invalidateQueries(['bookings']);
      queryClient.invalidateQueries(['dashboard-stats']);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Failed to record payment');
    },
  });

  // Reverse payment mutation
  const reverseMutation = useMutation({
    mutationFn: ({ id, reason }) => api.post(`/payments/${id}/reverse`, { reason }),
    onSuccess: () => {
      message.success('Payment reversal recorded in ledger');
      setReverseModalVisible(false);
      reverseForm.resetFields();
      queryClient.invalidateQueries(['payments']);
      queryClient.invalidateQueries(['bookings']);
      queryClient.invalidateQueries(['dashboard-stats']);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Failed to reverse payment');
    },
  });

  const handlePrintReceipt = (payment) => {
    setSelectedPayment(payment);
    setReceiptModalVisible(true);
  };

  const handleExport = () => {
    window.open('/api/reports/export/payments', '_blank');
  };

  const columns = [
    {
      title: 'Payment Ref',
      dataIndex: 'paymentReference',
      key: 'paymentReference',
      width: 140,
      render: (ref, record) => (
        <span
          onClick={() => handlePrintReceipt(record)}
          className="font-bold text-[#8C671D] hover:underline cursor-pointer"
        >
          {ref}
        </span>
      ),
    },
    {
      title: 'Booking Ref',
      dataIndex: 'bookingId',
      key: 'bookingId',
      render: (booking) => (
        <span className="text-xs font-semibold text-[#262626]">
          {booking?.bookingReference || '—'}
        </span>
      ),
    },
    {
      title: 'Customer',
      dataIndex: 'customerId',
      key: 'customerId',
      render: (customer) => (
        <div>
          <span className="font-bold text-[#262626] block">{customer?.name}</span>
          <span className="text-[11px] text-[#737373]">{customer?.phone}</span>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => (
        <span
          className={`text-xs font-black ${
            record.isReversed ? 'text-gray-400 line-through' : 'text-emerald-700'
          }`}
        >
          ₹{(amount || 0).toLocaleString()}
        </span>
      ),
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (method) => <span className="text-xs text-[#262626]">{method}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (date) => (
        <span className="text-xs text-[#737373]">
          {new Date(date).toLocaleDateString()}
        </span>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) =>
        record.isReversed ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            Reversed
          </span>
        ) : (
          <StatusTag status={record.status} />
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 130,
      render: (_, record) => (
        <Space size="small">
          <Button
            size="small"
            icon={<Printer size={14} />}
            onClick={() => handlePrintReceipt(record)}
            className="text-xs text-[#8C671D] border-[#DEC07A]"
          >
            Receipt
          </Button>

          {!record.isReversed && hasPermission('payments.edit') && (
            <Button
              size="small"
              danger
              icon={<RotateCcw size={13} />}
              onClick={() => {
                setSelectedPayment(record);
                setReverseModalVisible(true);
              }}
              className="text-xs"
            >
              Reverse
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Payment Tracking & Ledger"
        subtitle="Immutable financial transaction ledger, receipt generation, and buyer payment records."
        extra={
          <div className="flex gap-2">
            {hasPermission('payments.export') && (
              <Button
                onClick={handleExport}
                icon={<Download size={15} />}
                className="font-semibold text-xs h-9 border-[#E8E2D5]"
              >
                Export CSV
              </Button>
            )}
            {hasPermission('payments.create') && (
              <Button
                type="primary"
                icon={<Plus size={16} />}
                onClick={() => {
                  recordForm.resetFields();
                  setRecordModalVisible(true);
                }}
                className="font-semibold text-xs h-9"
              >
                Record Payment
              </Button>
            )}
          </div>
        }
      />

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E8E2D5] shadow-subtle flex gap-3 items-center">
        <Select
          placeholder="Filter by Payment Method"
          value={methodFilter || undefined}
          onChange={(v) => setMethodFilter(v || '')}
          className="w-full sm:w-64 h-9"
          allowClear
        >
          <Select.Option value="Bank Transfer (NEFT/RTGS/IMPS)">Bank Transfer (NEFT/RTGS)</Select.Option>
          <Select.Option value="UPI">UPI</Select.Option>
          <Select.Option value="Cheque">Cheque</Select.Option>
          <Select.Option value="Cash">Cash</Select.Option>
          <Select.Option value="Demand Draft">Demand Draft</Select.Option>
        </Select>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] shadow-card overflow-hidden">
        <Table
          columns={columns}
          dataSource={data?.data || []}
          rowKey="_id"
          loading={isLoading}
          scroll={{ x: 850 }}
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

      {/* Record Payment Modal */}
      <Modal
        title={<span className="font-bold text-base text-[#262626]">Record Client Payment in Ledger</span>}
        open={recordModalVisible}
        onCancel={() => setRecordModalVisible(false)}
        footer={null}
        width="95%"
        style={{ maxWidth: 620 }}
        destroyOnClose
      >
        <Form
          form={recordForm}
          layout="vertical"
          onFinish={(values) => recordMutation.mutate(values)}
          initialValues={{
            paymentMethod: 'Bank Transfer (NEFT/RTGS/IMPS)',
            paymentType: 'Installment',
          }}
          className="mt-4"
        >
          <Form.Item
            name="bookingId"
            label={<span className="font-semibold text-xs">Select Deal Booking Contract</span>}
            rules={[{ required: true, message: 'Please select booking' }]}
          >
            <Select placeholder="Choose confirmed booking" className="h-9">
              {(bookingsData || []).map((b) => (
                <Select.Option key={b._id} value={b._id}>
                  {b.bookingReference} — {b.customerId?.name} (Balance: ₹
                  {(b.balanceDue || 0).toLocaleString()})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item
              name="amount"
              label={<span className="font-semibold text-xs">Payment Amount (₹)</span>}
              rules={[{ required: true, message: 'Amount is required' }]}
            >
              <Input type="number" placeholder="250000" className="h-9" />
            </Form.Item>

            <Form.Item
              name="paymentType"
              label={<span className="font-semibold text-xs">Payment Stage</span>}
            >
              <Select className="h-9">
                <Select.Option value="Booking Advance">Booking Advance</Select.Option>
                <Select.Option value="Installment">Installment</Select.Option>
                <Select.Option value="Part Payment">Part Payment</Select.Option>
                <Select.Option value="Final Settlement">Final Settlement</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item
              name="paymentMethod"
              label={<span className="font-semibold text-xs">Payment Method</span>}
              rules={[{ required: true }]}
            >
              <Select className="h-9">
                <Select.Option value="Bank Transfer (NEFT/RTGS/IMPS)">Bank Transfer (NEFT/RTGS)</Select.Option>
                <Select.Option value="UPI">UPI</Select.Option>
                <Select.Option value="Cheque">Cheque</Select.Option>
                <Select.Option value="Cash">Cash</Select.Option>
                <Select.Option value="Demand Draft">Demand Draft</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="transactionReference"
              label={<span className="font-semibold text-xs">Transaction / Cheque Ref #</span>}
            >
              <Input placeholder="UTR / Cheque #" className="h-9" />
            </Form.Item>
          </div>

          <Form.Item name="notes" label={<span className="font-semibold text-xs">Ledger Entry Notes</span>}>
            <Input.TextArea rows={2} placeholder="Account details or remarks" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={recordMutation.isPending}
            className="w-full h-10 font-bold"
          >
            Record Payment Entry
          </Button>
        </Form>
      </Modal>

      {/* Reverse Payment Modal */}
      <Modal
        title={<span className="font-bold text-base text-rose-700">Reverse Financial Ledger Entry</span>}
        open={reverseModalVisible}
        onCancel={() => setReverseModalVisible(false)}
        footer={null}
        width="95%"
        style={{ maxWidth: 520 }}
        destroyOnClose
      >
        <Form
          form={reverseForm}
          layout="vertical"
          onFinish={(values) => {
            reverseMutation.mutate({
              id: selectedPayment._id,
              reason: values.reason,
            });
          }}
          className="mt-4"
        >
          <p className="text-xs text-[#737373] mb-4">
            You are reversing payment <strong>{selectedPayment?.paymentReference}</strong> of ₹
            {(selectedPayment?.amount || 0).toLocaleString()}. An immutable reversal entry will be recorded in compliance with audit rules.
          </p>

          <Form.Item
            name="reason"
            label={<span className="font-semibold text-xs">Official Reversal Justification</span>}
            rules={[{ required: true, message: 'Reversal reason is mandatory' }]}
          >
            <Input.TextArea rows={3} placeholder="Cheque bounce / clerical entry error / bank refund..." />
          </Form.Item>

          <Button
            type="primary"
            danger
            htmlType="submit"
            loading={reverseMutation.isPending}
            className="w-full h-10 font-bold"
          >
            Execute Ledger Reversal
          </Button>
        </Form>
      </Modal>

      {/* Luxury Printable Payment Receipt Modal */}
      <Modal
        open={receiptModalVisible}
        onCancel={() => setReceiptModalVisible(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button onClick={() => window.print()} icon={<Printer size={14} />} className="font-bold">
              Print Official Receipt
            </Button>
            <Button onClick={() => setReceiptModalVisible(false)}>Close</Button>
          </div>
        }
        width="95%"
        style={{ maxWidth: 650 }}
        destroyOnClose
      >
        {selectedPayment && (
          <div className="p-4 sm:p-6 bg-white text-[#262626] font-sans print:p-0">
            {/* Receipt Header */}
            <div className="border-b-2 border-[#B88A2E] pb-4 mb-6 flex flex-col sm:flex-row justify-between items-start gap-2">
              <div>
                <h2 className="text-xl font-extrabold text-[#8C671D] m-0">
                  {user?.organizationName || 'ROYAL CREST REALTY'}
                </h2>
                <p className="text-[11px] text-[#737373] m-0 uppercase tracking-widest mt-0.5">
                  Official Acknowledgment Receipt
                </p>
              </div>
              <div className="sm:text-right">
                <span className="font-mono text-xs font-bold text-[#8C671D] block">
                  {selectedPayment.receiptNumber || selectedPayment.paymentReference}
                </span>
                <span className="text-[11px] text-[#737373] block">
                  Date: {new Date(selectedPayment.paymentDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Receipt Body */}
            <div className="space-y-4 text-xs">
              <div className="bg-[#FCF8EF] p-4 rounded-lg border border-[#F5EBD3]">
                <p className="text-[#737373] m-0 mb-1">Received with thanks from:</p>
                <p className="text-base font-bold text-[#262626] m-0">
                  {selectedPayment.customerId?.name}
                </p>
                <p className="text-xs text-[#737373] m-0">{selectedPayment.customerId?.phone}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-[#E8E2D5] py-3">
                <div>
                  <span className="text-[#737373] block font-semibold">Payment Type:</span>
                  <span className="font-bold text-[#262626]">{selectedPayment.paymentType}</span>
                </div>
                <div>
                  <span className="text-[#737373] block font-semibold">Payment Method:</span>
                  <span className="font-bold text-[#262626]">{selectedPayment.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-[#737373] block font-semibold">Reference / UTR #:</span>
                  <span className="font-mono text-[#262626]">{selectedPayment.transactionReference || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[#737373] block font-semibold">Booking Reference:</span>
                  <span className="font-bold text-[#8C671D]">{selectedPayment.bookingId?.bookingReference}</span>
                </div>
              </div>

              {/* Total Amount Box */}
              <div className="bg-[#FCF8EF] p-4 rounded-lg border-2 border-[#B88A2E] text-center my-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C671D] block">
                  Amount Received
                </span>
                <span className="text-3xl font-extrabold text-[#262626] mt-1 block">
                  ₹{(selectedPayment.amount || 0).toLocaleString()}
                </span>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-[11px] text-[#737373]">
                <div>
                  <p className="m-0 font-bold">EstateFlow Financial System</p>
                  <p className="m-0">Computer-generated receipt. Requires no physical signature.</p>
                </div>
                <div className="sm:text-right">
                  <div className="w-32 border-b border-gray-400 mb-1"></div>
                  <span>Authorized Signatory</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
