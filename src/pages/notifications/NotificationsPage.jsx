import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, Button, Space, message, Tag } from 'antd';
import { Bell, CheckCircle, Clock, AlertTriangle, RotateCcw } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export const NotificationsPage = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [unreadOnly, setUnreadOnly] = useState(false);

  // Fetch in-app notifications
  const { data: notifData, isLoading } = useQuery({
    queryKey: ['notifications', unreadOnly],
    queryFn: async () => {
      const res = await api.get(`/notifications?limit=50&unreadOnly=${unreadOnly}`);
      return res.data;
    },
  });

  // Fetch durable background email jobs (for Owner / Admin visibility)
  const { data: jobData } = useQuery({
    queryKey: ['notification-jobs'],
    queryFn: async () => {
      const res = await api.get('/notifications/jobs');
      return res.data.data;
    },
    enabled: ['owner', 'admin'].includes(user?.role),
  });

  const markAllMutation = useMutation({
    mutationFn: () => api.post('/notifications/mark-all-read'),
    onSuccess: () => {
      message.success('All notifications marked as read');
      queryClient.invalidateQueries(['notifications']);
      queryClient.invalidateQueries(['notifications-unread']);
    },
  });

  const retryJobMutation = useMutation({
    mutationFn: (id) => api.post(`/notifications/jobs/${id}/retry`),
    onSuccess: () => {
      message.success('Job scheduled for retry');
      queryClient.invalidateQueries(['notification-jobs']);
    },
  });

  const columns = [
    {
      title: 'Title & Alert',
      key: 'title',
      render: (_, r) => (
        <div>
          <span className={`text-xs block ${!r.isRead ? 'font-black text-[#8C671D]' : 'font-bold text-[#262626]'}`}>
            {r.title}
          </span>
          <span className="text-[11px] text-[#737373] mt-0.5 block">{r.message}</span>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 180,
      render: (t) => (
        <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-[#FCF8EF] text-[#8C671D] border border-[#F5EBD3]">
          {t?.replace('_', ' ')}
        </span>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (d) => <span className="text-xs text-gray-500">{new Date(d).toLocaleString()}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'isRead',
      key: 'isRead',
      width: 100,
      render: (read) =>
        read ? (
          <span className="text-xs text-gray-400">Read</span>
        ) : (
          <span className="text-xs font-bold text-[#B88A2E]">Unread</span>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notification Center & Background Jobs"
        subtitle="Operational reminders, system alerts, and durable email delivery queue."
        extra={
          <div className="flex gap-2">
            <button
              onClick={() => setUnreadOnly(!unreadOnly)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${
                unreadOnly
                  ? 'bg-[#FCF8EF] text-[#8C671D] border-[#B88A2E]'
                  : 'bg-white text-gray-700 border-[#E8E2D5]'
              }`}
            >
              {unreadOnly ? 'Showing Unread' : 'Show Unread Only'}
            </button>

            <Button
              onClick={() => markAllMutation.mutate()}
              loading={markAllMutation.isPending}
              icon={<CheckCircle size={14} />}
              className="font-semibold text-xs h-9 border-[#DEC07A] text-[#8C671D]"
            >
              Mark All Read
            </Button>
          </div>
        }
      />

      {/* Notifications Table */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] shadow-card overflow-hidden">
        <Table
          columns={columns}
          dataSource={notifData?.data || []}
          rowKey="_id"
          loading={isLoading}
          scroll={{ x: 700 }}
          pagination={{ pageSize: 15 }}
          className="enterprise-table"
        />
      </div>

      {/* Durable Email Job Delivery History (Owner/Admin only) */}
      {['owner', 'admin'].includes(user?.role) && (
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-[#E8E2D5] shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h3 className="text-sm font-bold text-[#262626] m-0 flex items-center gap-2">
              <Clock size={16} className="text-[#B88A2E]" /> Durable Background Notification Job Queue
            </h3>
            <span className="text-xs text-[#737373]">
              Monitored for exponential backoff retries & duplicate prevention
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {(jobData || []).map((job) => (
              <div key={job._id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold text-[#262626] block">{job.subject}</span>
                  <span className="text-[11px] text-[#737373]">
                    To: {job.recipientEmail} • Attempts: {job.attemptCount}/{job.maxAttempts} • Next:{' '}
                    {new Date(job.nextRunAt).toLocaleTimeString()}
                  </span>
                  {job.lastError && (
                    <span className="text-[11px] text-rose-600 block mt-0.5">Error: {job.lastError}</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Tag
                    color={
                      job.status === 'SENT'
                        ? 'success'
                        : job.status === 'FAILED'
                        ? 'error'
                        : job.status === 'RETRYING'
                        ? 'warning'
                        : 'processing'
                    }
                  >
                    {job.status}
                  </Tag>

                  {['FAILED', 'RETRYING'].includes(job.status) && (
                    <Button
                      size="small"
                      icon={<RotateCcw size={12} />}
                      onClick={() => retryJobMutation.mutate(job._id)}
                      className="text-[11px]"
                    >
                      Retry Now
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {(!jobData || jobData.length === 0) && (
              <p className="text-xs text-gray-400 py-3">No background jobs in queue.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
