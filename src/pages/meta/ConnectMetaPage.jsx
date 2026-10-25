import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Card,
  Button,
  Switch,
  Tag,
  Alert,
  Modal,
  Spin,
  message,
  Tooltip,
  Divider,
  Tabs,
  Input,
  Select,
} from 'antd';
import {
  Share2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Radio,
  FileText,
  Sliders,
  HelpCircle,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import api from '../../services/api';

export const ConnectMetaPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [syncFormId, setSyncFormId] = useState('');
  const [syncLimit, setSyncLimit] = useState(50);
  const [copiedKey, setCopiedKey] = useState('');
  const [callbackProcessing, setCallbackProcessing] = useState(false);

  // 1. Fetch Connection Status
  const { data: connectionData, isLoading, refetch: refetchConnection } = useQuery({
    queryKey: ['meta-connection-full'],
    queryFn: async () => {
      const res = await api.get('/meta/connection');
      return res.data.data;
    },
  });

  const connection = connectionData || {};
  const isConnected = connection.status === 'CONNECTED';
  const isNeedsReauth = connection.status === 'NEEDS_REAUTHORIZATION' || connection.status === 'EXPIRED';

  // 2. Handle incoming OAuth callback query params (?code=...&state=...)
  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error_description') || searchParams.get('error');

    if (error) {
      message.error(`Meta authorization error: ${error}`);
      return;
    }

    if (code && !callbackProcessing) {
      setCallbackProcessing(true);
      api.post('/meta/connect/callback', {
        code,
        state,
        redirectUri: window.location.origin + '/connect-meta/callback',
      })
        .then((res) => {
          message.success(res.data.message || 'Meta account connected successfully!');
          queryClient.invalidateQueries(['meta-connection-full']);
          queryClient.invalidateQueries(['meta-connection-pill']);
          // Clean up URL search params
          navigate('/connect-meta', { replace: true });
        })
        .catch((err) => {
          message.error(err.response?.data?.message || 'Failed to complete Meta authentication callback');
        })
        .finally(() => {
          setCallbackProcessing(false);
        });
    }
  }, [searchParams]);

  // 3. Initiate Meta OAuth Flow
  const handleInitiateOAuth = async () => {
    try {
      const res = await api.get('/meta/connect/url');
      if (res.data?.authUrl) {
        window.location.href = res.data.authUrl;
      }
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to initialize Meta OAuth login');
    }
  };

  // 4. Test Token & Connection Health
  const healthMutation = useMutation({
    mutationFn: () => api.get('/meta/health'),
    onSuccess: (res) => {
      if (res.data.data?.isValid) {
        message.success(res.data.data.message || 'Meta connection is healthy and tokens are valid');
      } else {
        message.warning(res.data.data.message || 'Token verification failed. Please reconnect.');
      }
      refetchConnection();
    },
    onError: (err) => message.error(err.response?.data?.message || 'Health check failed'),
  });

  // 5. Refresh Pages and Lead Forms
  const refreshMutation = useMutation({
    mutationFn: () => api.get('/meta/pages'),
    onSuccess: () => {
      message.success('Pages and forms refreshed from Facebook Graph API');
      refetchConnection();
    },
    onError: (err) => message.error(err.response?.data?.message || 'Refresh failed'),
  });

  // 6. Subscribe specific Page to Webhook
  const subscribePageMutation = useMutation({
    mutationFn: (pageId) => api.post('/meta/subscribe-page', { pageId }),
    onSuccess: (res) => {
      message.success(res.data.message || 'Page subscribed to leadgen webhook');
      refetchConnection();
    },
    onError: (err) => message.error(err.response?.data?.message || 'Subscription failed'),
  });

  // 7. Update Selected Resources
  const updateResourcesMutation = useMutation({
    mutationFn: (updatedPages) => api.post('/meta/select-resources', { pages: updatedPages }),
    onSuccess: () => {
      message.success('Settings updated');
      refetchConnection();
    },
    onError: (err) => message.error(err.response?.data?.message || 'Update failed'),
  });

  // 8. Manual Sync / Lead Reconciliation
  const syncMutation = useMutation({
    mutationFn: ({ formId, limit }) => api.post('/meta/sync', { formId, limit }),
    onSuccess: (res) => {
      message.success(res.data.message || 'Leads synchronized from Meta');
      queryClient.invalidateQueries(['leads']);
      queryClient.invalidateQueries(['leads-summary-stats']);
      refetchConnection();
    },
    onError: (err) => message.error(err.response?.data?.message || 'Sync failed'),
  });

  // 9. Disconnect
  const disconnectMutation = useMutation({
    mutationFn: () => api.post('/meta/disconnect'),
    onSuccess: () => {
      message.success('Meta account disconnected');
      refetchConnection();
      queryClient.invalidateQueries(['meta-connection-pill']);
    },
    onError: (err) => message.error(err.response?.data?.message || 'Disconnect failed'),
  });

  const handleTogglePage = (pageId, checked) => {
    const updated = (connection.selectedPages || []).map((p) =>
      p.pageId === pageId ? { ...p, isSelected: checked } : p
    );
    updateResourcesMutation.mutate(updated);
  };

  const handleToggleForm = (pageId, formId, checked) => {
    const updated = (connection.selectedPages || []).map((p) => {
      if (p.pageId === pageId) {
        return {
          ...p,
          forms: (p.forms || []).map((f) => (f.formId === formId ? { ...f, isSelected: checked } : f)),
        };
      }
      return p;
    });
    updateResourcesMutation.mutate(updated);
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    message.success('Copied to clipboard');
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const webhookPublicUrl = `${window.location.origin}/api/meta/webhook`;
  const defaultVerifyToken = 'estateflow_meta_webhook_verify_token_secure_2026';

  if (isLoading || callbackProcessing) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-3">
        <Spin size="large" />
        <p className="text-xs font-semibold text-[#8C671D]">
          {callbackProcessing ? 'Completing Meta OAuth Authorization...' : 'Loading Meta Integration...'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <PageHeader
        title="Connect Meta"
        subtitle="Self-service Meta account connection, Facebook Page & Lead Form selection, and real-time webhook tracking."
        extra={
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate('/leads')}
              icon={<ArrowRight size={14} />}
              className="text-xs font-semibold border-[#DEC07A] text-[#8C671D] hover:bg-[#FCF8EF]"
            >
              Track Your Leads
            </Button>
          </div>
        }
      />

      {/* Main Connection Status Card */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] p-5 sm:p-6 shadow-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D5]">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] flex items-center justify-center shrink-0">
              <Share2 size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-[#262626] m-0">
                  Meta Lead Ads Integration
                </h2>
                {isConnected ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">
                    <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-emerald-500"></span>
                    Connected
                  </span>
                ) : isNeedsReauth ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-300">
                    <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-rose-500"></span>
                    Needs Reauthorization
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-300">
                    Not Connected
                  </span>
                )}
              </div>
              <p className="text-xs text-[#737373] mt-0.5 m-0">
                Synchronize Facebook and Instagram ad leads directly into EstateFlow without manual exports.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isConnected ? (
              <>
                <Button
                  onClick={() => healthMutation.mutate()}
                  loading={healthMutation.isPending}
                  icon={<ShieldCheck size={14} />}
                  className="text-xs font-semibold"
                >
                  Verify Health
                </Button>

                <Button
                  onClick={() => refreshMutation.mutate()}
                  loading={refreshMutation.isPending}
                  icon={<RefreshCw size={14} />}
                  className="text-xs font-semibold"
                >
                  Refresh Pages
                </Button>

                <Button
                  danger
                  onClick={() => disconnectMutation.mutate()}
                  loading={disconnectMutation.isPending}
                  icon={<LogOut size={14} />}
                  className="text-xs font-semibold"
                >
                  Disconnect
                </Button>
              </>
            ) : (
              <button
                onClick={handleInitiateOAuth}
                className="px-5 py-2.5 rounded-lg bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
              >
                <Share2 size={16} /> Connect Facebook Account
              </button>
            )}
          </div>
        </div>

        {/* Connected Account Overview Details */}
        {isConnected ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#FCF8EF] p-4 rounded-xl border border-[#F5EBD3] text-xs">
            <div>
              <span className="text-[#737373] font-semibold block">Connected Account:</span>
              <span className="font-extrabold text-[#262626] text-sm">
                {connection.facebookUserName}
              </span>
              <span className="text-[11px] text-gray-500 block">ID: {connection.facebookUserId}</span>
            </div>

            <div>
              <span className="text-[#737373] font-semibold block">Connection Health:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                <CheckCircle2 size={14} /> {connection.healthStatus || 'HEALTHY'}
              </span>
              <span className="text-[10px] text-gray-500 block truncate">
                {connection.healthDetails || 'Verified'}
              </span>
            </div>

            <div>
              <span className="text-[#737373] font-semibold block">Last Synchronization:</span>
              <span className="font-bold text-[#262626]">
                {connection.lastSyncAt ? new Date(connection.lastSyncAt).toLocaleString() : 'Awaiting webhooks'}
              </span>
              <span className="text-[10px] text-emerald-700 block truncate">
                {connection.lastSyncMessage || 'Real-time webhook enabled'}
              </span>
            </div>

            <div>
              <span className="text-[#737373] font-semibold block">Total Leads Imported:</span>
              <span className="font-extrabold text-[#8C671D] text-base">
                {(connection.totalLeadsImported || 0).toLocaleString()}
              </span>
              <span className="text-[10px] text-gray-500 block">Graph API: {connection.metaGraphVersion || 'v21.0'}</span>
            </div>
          </div>
        ) : (
          <Alert
            message="No Meta account connected"
            description="Click 'Connect Facebook Account' above to authorize EstateFlow via Facebook Login for Business. Once authorized, you can select which Facebook Pages and Lead Forms to synchronize."
            type="info"
            showIcon
          />
        )}
      </div>

      {/* Pages and Lead Forms Configuration Card */}
      {isConnected && (
        <div className="bg-white rounded-xl border border-[#E8E2D5] p-5 sm:p-6 shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8E2D5]">
            <div>
              <h3 className="text-sm font-bold text-[#262626] m-0">
                Facebook Pages & Lead Forms
              </h3>
              <p className="text-xs text-[#737373] m-0 mt-0.5">
                Select which Facebook Pages and Lead Forms should automatically push leads into the CRM.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#8C671D] bg-[#FCF8EF] px-2.5 py-1 rounded-md border border-[#DEC07A]">
              {(connection.selectedPages || []).length} Pages Detected
            </span>
          </div>

          {(connection.selectedPages || []).length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
              No Facebook Pages found for your account. Please ensure your Facebook account has admin access to at least one Facebook Page with Lead Ads.
            </div>
          ) : (
            <div className="space-y-4">
              {connection.selectedPages.map((page) => (
                <div
                  key={page.pageId}
                  className="rounded-xl border border-[#E8E2D5] bg-[#F8F8F6] p-4 space-y-3"
                >
                  {/* Page Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-white border border-[#E8E2D5] flex items-center justify-center font-bold text-sm text-[#1877F2] shrink-0">
                        FB
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#262626] m-0">{page.pageName}</h4>
                        <span className="text-[11px] text-[#737373]">
                          Page ID: <code className="text-[#8C671D]">{page.pageId}</code> • Category: {page.pageCategory || 'Business'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {page.isSubscribedToWebhook ? (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                          <CheckCircle2 size={12} /> Webhook Subscribed
                        </span>
                      ) : (
                        <Button
                          size="small"
                          onClick={() => subscribePageMutation.mutate(page.pageId)}
                          loading={subscribePageMutation.isPending}
                          className="text-xs font-bold border-[#B88A2E] text-[#8C671D]"
                        >
                          Subscribe Webhook
                        </Button>
                      )}

                      <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                        <span className="text-xs text-gray-600 font-medium">Track Page:</span>
                        <Switch
                          checked={page.isSelected}
                          onChange={(checked) => handleTogglePage(page.pageId, checked)}
                          className={page.isSelected ? 'bg-[#B88A2E]' : 'bg-gray-300'}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Forms under this Page */}
                  <div className="bg-white rounded-lg border border-[#E8E2D5] p-3 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#737373] block">
                      Lead Forms ({(page.forms || []).length})
                    </span>

                    {(!page.forms || page.forms.length === 0) ? (
                      <p className="text-xs text-gray-400 italic m-0">No lead forms found on this page.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {page.forms.map((form) => (
                          <div
                            key={form.formId}
                            className="p-2.5 rounded-lg border border-[#E8E2D5] bg-[#F8F8F6] flex items-center justify-between text-xs"
                          >
                            <div className="truncate pr-2">
                              <span className="font-bold text-[#262626] block truncate">
                                {form.formName}
                              </span>
                              <span className="text-[10px] text-gray-500 font-mono">
                                Form ID: {form.formId}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[10px] font-semibold text-gray-600">
                                {form.leadsCount || 0} leads
                              </span>
                              <Switch
                                size="small"
                                checked={form.isSelected}
                                onChange={(chk) => handleToggleForm(page.pageId, form.formId, chk)}
                                className={form.isSelected ? 'bg-[#B88A2E]' : 'bg-gray-300'}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Manual Sync & Historical Lead Recovery Card */}
      {isConnected && (
        <div className="bg-white rounded-xl border border-[#E8E2D5] p-5 sm:p-6 shadow-card space-y-4">
          <div>
            <h3 className="text-sm font-bold text-[#262626] m-0 flex items-center gap-2">
              <Zap size={16} className="text-[#B88A2E]" /> Lead Recovery & Manual Sync
            </h3>
            <p className="text-xs text-[#737373] m-0 mt-0.5">
              Pull missed or historical leads from a specific Meta Lead Form to reconcile existing records.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Select
              placeholder="Select Meta Lead Form to sync..."
              value={syncFormId || undefined}
              onChange={setSyncFormId}
              className="flex-1 h-9 text-xs"
            >
              {(connection.selectedPages || []).flatMap((p) =>
                (p.forms || []).map((f) => (
                  <Select.Option key={f.formId} value={f.formId}>
                    {p.pageName} &rarr; {f.formName} ({f.formId})
                  </Select.Option>
                ))
              )}
            </Select>

            <Select
              value={syncLimit}
              onChange={setSyncLimit}
              className="w-32 h-9 text-xs"
            >
              <Select.Option value={25}>Last 25 Leads</Select.Option>
              <Select.Option value={50}>Last 50 Leads</Select.Option>
              <Select.Option value={100}>Last 100 Leads</Select.Option>
            </Select>

            <Button
              type="primary"
              disabled={!syncFormId}
              loading={syncMutation.isPending}
              onClick={() => syncMutation.mutate({ formId: syncFormId, limit: syncLimit })}
              className="font-bold text-xs h-9 bg-[#B88A2E] hover:bg-[#8C671D]"
            >
              Import Leads Now
            </Button>
          </div>
        </div>
      )}

      {/* Meta Developer Setup & Webhook URL Configuration Card */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] p-5 sm:p-6 shadow-card space-y-4">
        <div>
          <h3 className="text-sm font-bold text-[#262626] m-0 flex items-center gap-2">
            <Sliders size={16} className="text-[#8C671D]" /> Meta App Configuration & Webhook Endpoints
          </h3>
          <p className="text-xs text-[#737373] m-0 mt-0.5">
            Use these official URLs and verification tokens when configuring Webhooks in your Meta Developer App (developers.facebook.com).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-lg bg-[#FCF8EF] border border-[#DEC07A] space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#737373] block">
              Callback URL (Webhook Endpoint)
            </span>
            <div className="flex items-center justify-between gap-2">
              <code className="text-xs font-mono font-bold text-[#262626] truncate">
                {webhookPublicUrl}
              </code>
              <button
                onClick={() => handleCopy(webhookPublicUrl, 'webhook')}
                className="p-1 rounded hover:bg-white text-gray-600"
                title="Copy Webhook URL"
              >
                {copiedKey === 'webhook' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#FCF8EF] border border-[#DEC07A] space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#737373] block">
              Verify Token
            </span>
            <div className="flex items-center justify-between gap-2">
              <code className="text-xs font-mono font-bold text-[#262626] truncate">
                {defaultVerifyToken}
              </code>
              <button
                onClick={() => handleCopy(defaultVerifyToken, 'token')}
                className="p-1 rounded hover:bg-white text-gray-600"
                title="Copy Verify Token"
              >
                {copiedKey === 'token' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 text-xs space-y-2">
          <span className="font-bold text-gray-800 block">Step-by-Step Meta Developer Portal Setup:</span>
          <ol className="list-decimal pl-4 space-y-1 text-gray-600">
            <li>Go to <a href="https://developers.facebook.com/apps" target="_blank" rel="noreferrer" className="text-[#8C671D] underline font-semibold">developers.facebook.com</a> and select or create your Business App.</li>
            <li>Add the <strong>Facebook Login for Business</strong> and <strong>Webhooks</strong> products.</li>
            <li>In Webhooks, select <strong>Page</strong> object and click <em>Subscribe to this object</em>.</li>
            <li>Paste the <strong>Callback URL</strong> and <strong>Verify Token</strong> displayed above.</li>
            <li>Subscribe to the <strong>leadgen</strong> field under Page Webhook fields.</li>
            <li>Under Facebook Login Settings, add your OAuth redirect URL (e.g. <code>{window.location.origin}/connect-meta/callback</code>).</li>
            <li>Ensure required permissions are approved or in development mode: <code>leads_retrieval</code>, <code>pages_show_list</code>, <code>pages_read_engagement</code>, <code>pages_manage_metadata</code>.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
