import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, Button, Input, Select, Modal, Form, Space, message, Tag, Drawer, Tooltip } from 'antd';
import { Plus, Search, Building2, MapPin, Compass, DollarSign, Layers, Eye, Download } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusTag } from '../../components/common/StatusTag';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export const PropertiesList = () => {
  const queryClient = useQueryClient();
  const { hasPermission } = useAuth();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [detailDrawerVisible, setDetailDrawerVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [createForm] = Form.useForm();

  // Fetch properties
  const { data, isLoading } = useQuery({
    queryKey: ['properties', page, pageSize, search, typeFilter, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit: pageSize,
        ...(search && { search }),
        ...(typeFilter && { propertyType: typeFilter }),
        ...(statusFilter && { status: statusFilter }),
      });
      const res = await api.get(`/properties?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  // Create property mutation
  const createMutation = useMutation({
    mutationFn: (newProp) => api.post('/properties', newProp),
    onSuccess: () => {
      message.success('Property successfully added to inventory');
      setCreateModalVisible(false);
      createForm.resetFields();
      queryClient.invalidateQueries(['properties']);
      queryClient.invalidateQueries(['dashboard-stats']);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || 'Failed to add property');
    },
  });

  const handleOpenDetail = (record) => {
    setSelectedProperty(record);
    setDetailDrawerVisible(true);
  };

  const handleExport = () => {
    window.open('/api/reports/export/properties', '_blank');
  };

  const columns = [
    {
      title: 'Property Code',
      dataIndex: 'propertyCode',
      key: 'propertyCode',
      width: 140,
      render: (code, record) => (
        <span
          onClick={() => handleOpenDetail(record)}
          className="font-bold text-[#8C671D] hover:underline cursor-pointer"
        >
          {code}
        </span>
      ),
    },
    {
      title: 'Title & Unit',
      key: 'title',
      render: (_, record) => (
        <div>
          <span className="font-bold text-[#262626] block">{record.title}</span>
          <span className="text-[11px] text-[#737373]">
            Unit #{record.unitNumber} • {record.projectName || 'Standalone'}
          </span>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'propertyType',
      key: 'propertyType',
      width: 150,
      render: (type) => <span className="text-xs font-semibold text-[#262626]">{type}</span>,
    },
    {
      title: 'Area & Facing',
      key: 'area',
      width: 140,
      render: (_, record) => (
        <div>
          <span className="text-xs font-bold text-[#262626] block">
            {record.area?.value?.toLocaleString()} {record.area?.unit}
          </span>
          <span className="text-[11px] text-[#737373]">{record.facing} Facing</span>
        </div>
      ),
    },
    {
      title: 'Base Price',
      dataIndex: ['pricing', 'basePrice'],
      key: 'basePrice',
      width: 150,
      render: (price) => (
        <span className="text-xs font-extrabold text-[#8C671D]">
          ₹{(price || 0).toLocaleString()}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status) => <StatusTag status={status} />,
    },
    {
      title: 'Location',
      key: 'location',
      render: (_, record) => (
        <span className="text-xs text-[#737373] truncate max-w-[150px] block">
          {record.location?.locality}, {record.location?.city}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      render: (_, record) => (
        <Button
          type="text"
          size="small"
          icon={<Eye size={15} className="text-[#8C671D]" />}
          onClick={() => handleOpenDetail(record)}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Property & Plot Inventory"
        subtitle="Track residential plots, villas, commercial suites, and land inventory availability."
        extra={
          <div className="flex gap-2">
            {hasPermission('properties.export') && (
              <Button
                onClick={handleExport}
                icon={<Download size={15} />}
                className="font-semibold text-xs h-9 border-[#E8E2D5]"
              >
                Export CSV
              </Button>
            )}
            {hasPermission('properties.create') && (
              <Button
                type="primary"
                icon={<Plus size={16} />}
                onClick={() => {
                  createForm.resetFields();
                  setCreateModalVisible(true);
                }}
                className="font-semibold text-xs h-9"
              >
                Add Property / Plot
              </Button>
            )}
          </div>
        }
      />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E8E2D5] shadow-subtle flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 flex-1">
          <Input
            placeholder="Search by title, unit #, project, code..."
            prefix={<Search size={16} className="text-gray-400 mr-1" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 h-9"
            allowClear
          />

          <Select
            placeholder="All Property Types"
            value={typeFilter || undefined}
            onChange={(v) => setTypeFilter(v || '')}
            className="w-full sm:w-44 h-9"
            allowClear
          >
            <Select.Option value="Residential Plot">Residential Plot</Select.Option>
            <Select.Option value="Villa / House">Villa / House</Select.Option>
            <Select.Option value="Apartment">Apartment</Select.Option>
            <Select.Option value="Commercial">Commercial</Select.Option>
            <Select.Option value="Agricultural Land">Agricultural Land</Select.Option>
          </Select>

          <Select
            placeholder="All Statuses"
            value={statusFilter || undefined}
            onChange={(v) => setStatusFilter(v || '')}
            className="w-full sm:w-36 h-9"
            allowClear
          >
            <Select.Option value="Available">Available</Select.Option>
            <Select.Option value="Reserved">Reserved</Select.Option>
            <Select.Option value="Sold">Sold</Select.Option>
            <Select.Option value="Inactive">Inactive</Select.Option>
          </Select>
        </div>
      </div>

      {/* Property Table */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] shadow-card overflow-hidden">
        <Table
          columns={columns}
          dataSource={data?.data || []}
          rowKey="_id"
          loading={isLoading}
          scroll={{ x: 800 }}
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

      {/* Property Detail Drawer */}
      <Drawer
        title={
          <div className="flex items-center gap-2">
            <Building2 size={20} className="text-[#8C671D]" />
            <span className="font-bold text-base text-[#262626]">
              {selectedProperty?.title} ({selectedProperty?.propertyCode})
            </span>
          </div>
        }
        placement="right"
        width={typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : 600}
        onClose={() => setDetailDrawerVisible(false)}
        open={detailDrawerVisible}
      >
        {selectedProperty && (
          <div className="space-y-6 text-xs">
            {/* Status & Pricing Banner */}
            <div className="bg-[#FCF8EF] p-4 rounded-lg border border-[#F5EBD3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[#737373] block mb-1">Asking Price:</span>
                <span className="text-xl font-black text-[#8C671D]">
                  ₹{(selectedProperty.pricing?.basePrice || 0).toLocaleString()}
                </span>
                <span className="text-[11px] text-[#737373] block mt-0.5">
                  Token: ₹{(selectedProperty.pricing?.bookingTokenAmount || 0).toLocaleString()}
                </span>
              </div>
              <StatusTag status={selectedProperty.status} />
            </div>

            {/* Specifications Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#F8F8F6] p-4 rounded-lg border border-[#E8E2D5]">
              <div>
                <span className="text-[#737373] block mb-0.5 font-semibold">Unit Number:</span>
                <span className="font-bold text-[#262626]">{selectedProperty.unitNumber}</span>
              </div>
              <div>
                <span className="text-[#737373] block mb-0.5 font-semibold">Project Name:</span>
                <span className="font-bold text-[#262626]">{selectedProperty.projectName || 'Standalone'}</span>
              </div>
              <div>
                <span className="text-[#737373] block mb-0.5 font-semibold">Area Measurement:</span>
                <span className="font-bold text-[#262626]">
                  {selectedProperty.area?.value?.toLocaleString()} {selectedProperty.area?.unit}
                </span>
              </div>
              <div>
                <span className="text-[#737373] block mb-0.5 font-semibold">Facing:</span>
                <span className="font-bold text-[#262626]">{selectedProperty.facing} Facing</span>
              </div>
              <div>
                <span className="text-[#737373] block mb-0.5 font-semibold">Locality / Landmark:</span>
                <span className="font-medium text-[#262626]">
                  {selectedProperty.location?.locality}, {selectedProperty.location?.landmark}
                </span>
              </div>
              <div>
                <span className="text-[#737373] block mb-0.5 font-semibold">City & State:</span>
                <span className="font-medium text-[#262626]">
                  {selectedProperty.location?.city}, {selectedProperty.location?.state}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#737373] mb-2">Description</h4>
              <p className="text-[#737373] leading-relaxed m-0 bg-white p-3 rounded border border-[#E8E2D5]">
                {selectedProperty.description || 'No detailed description entered for this unit.'}
              </p>
            </div>

            {/* Amenities */}
            {selectedProperty.amenities?.length > 0 && (
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#737373] mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProperty.amenities.map((am, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-[#FCF8EF] text-[#8C671D] border border-[#F5EBD3] font-semibold text-[11px]"
                    >
                      {am}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* Add Property Modal */}
      <Modal
        title={<span className="font-bold text-base text-[#262626]">Add Property / Plot to Inventory</span>}
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        width="95%"
        style={{ maxWidth: 680 }}
        destroyOnClose
      >
        <Form
          form={createForm}
          layout="vertical"
          onFinish={(values) => createMutation.mutate(values)}
          initialValues={{
            propertyType: 'Residential Plot',
            listingType: 'Sale',
            facing: 'East',
            area: { unit: 'sq.ft' },
            pricing: { bookingTokenAmount: 50000 },
          }}
          className="mt-4"
        >
          <Form.Item
            name="title"
            label={<span className="font-semibold text-xs">Property Title</span>}
            rules={[{ required: true, message: 'Please enter title' }]}
          >
            <Input placeholder="e.g. Silver Oak Greens — Villa Plot 105" className="h-9" />
          </Form.Item>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Form.Item
              name="propertyType"
              label={<span className="font-semibold text-xs">Property Type</span>}
              rules={[{ required: true }]}
            >
              <Select className="h-9">
                <Select.Option value="Residential Plot">Residential Plot</Select.Option>
                <Select.Option value="Villa / House">Villa / House</Select.Option>
                <Select.Option value="Apartment">Apartment</Select.Option>
                <Select.Option value="Commercial">Commercial</Select.Option>
                <Select.Option value="Agricultural Land">Agricultural Land</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="unitNumber"
              label={<span className="font-semibold text-xs">Unit / Plot #</span>}
              rules={[{ required: true, message: 'Unit # is required' }]}
            >
              <Input placeholder="Plot-105" className="h-9" />
            </Form.Item>

            <Form.Item
              name="projectName"
              label={<span className="font-semibold text-xs">Project / Layout Name</span>}
            >
              <Input placeholder="Silver Oak Greens" className="h-9" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Form.Item
              name={['area', 'value']}
              label={<span className="font-semibold text-xs">Area Size</span>}
              rules={[{ required: true, message: 'Area size required' }]}
            >
              <Input type="number" placeholder="1500" className="h-9" />
            </Form.Item>

            <Form.Item
              name={['area', 'unit']}
              label={<span className="font-semibold text-xs">Unit</span>}
            >
              <Select className="h-9">
                <Select.Option value="sq.ft">sq.ft</Select.Option>
                <Select.Option value="sq.yd">sq.yd</Select.Option>
                <Select.Option value="acres">acres</Select.Option>
                <Select.Option value="cents">cents</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="facing"
              label={<span className="font-semibold text-xs">Facing</span>}
            >
              <Select className="h-9">
                <Select.Option value="East">East</Select.Option>
                <Select.Option value="West">West</Select.Option>
                <Select.Option value="North">North</Select.Option>
                <Select.Option value="South">South</Select.Option>
                <Select.Option value="North-East">North-East</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item
              name={['pricing', 'basePrice']}
              label={<span className="font-semibold text-xs">Base Asking Price (₹)</span>}
              rules={[{ required: true, message: 'Price is required' }]}
            >
              <Input type="number" placeholder="4500000" className="h-9" />
            </Form.Item>

            <Form.Item
              name={['pricing', 'bookingTokenAmount']}
              label={<span className="font-semibold text-xs">Token Advance Amount (₹)</span>}
            >
              <Input type="number" placeholder="50000" className="h-9" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Form.Item
              name={['location', 'locality']}
              label={<span className="font-semibold text-xs">Locality / Area</span>}
            >
              <Input placeholder="Airport Road" className="h-9" />
            </Form.Item>

            <Form.Item
              name={['location', 'city']}
              label={<span className="font-semibold text-xs">City</span>}
            >
              <Input placeholder="Bengaluru" className="h-9" />
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label={<span className="font-semibold text-xs">Description & Features</span>}
          >
            <Input.TextArea rows={2} placeholder="Key selling points, connectivity, utilities..." />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={createMutation.isPending}
            className="w-full h-10 font-bold"
          >
            Add to Inventory
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
