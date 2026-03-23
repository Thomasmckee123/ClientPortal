import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Portal, Invoice } from '../../../types';
import { api } from '../../../api';
import Button from '../../../components/Button/Button';

export default function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: portals = [] } = useQuery({ queryKey: ['portals'], queryFn: api.portals.getAll });
  const { data: invoices = [] } = useQuery({ queryKey: ['invoices'], queryFn: api.invoices.getAll });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    clientName: '',
    clientEmail: '',
    brandColor: '#3B82F6',
  });

  const activePortals = portals.filter((p) => p.status === 'Active');
  const unpaidInvoices = invoices.filter((i) => i.status !== 'Paid');
  const revenueThisMonth = invoices
    .filter((i) => {
      const d = new Date(i.createdDate);
      const now = new Date();
      return (
        i.status === 'Paid' &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, i) => sum + i.total, 0);

  const stats = [
    { label: 'Active Portals', value: activePortals.length },
    {
      label: 'Total Clients',
      value: new Set(portals.map((p) => p.clientEmail)).size,
    },
    { label: 'Unpaid Invoices', value: unpaidInvoices.length },
    { label: 'Revenue This Month', value: `£${revenueThisMonth.toFixed(2)}` },
  ];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    await api.portals.create({
      ...form,
      slug,
      ownerId: '000000000000000000000000',
      status: 'Active',
    });
    setForm({
      name: '',
      clientName: '',
      clientEmail: '',
      brandColor: '#3B82F6',
    });
    setShowCreateForm(false);
    queryClient.invalidateQueries({ queryKey: ['portals'] });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Overview of your client portals
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>+ New Portal</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Create Portal Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Create New Portal
          </h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Portal Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Acme Corp Website"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name
                </label>
                <input
                  value={form.clientName}
                  onChange={(e) =>
                    setForm({ ...form, clientName: e.target.value })
                  }
                  placeholder="Jane Doe"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Email
                </label>
                <input
                  type="email"
                  value={form.clientEmail}
                  onChange={(e) =>
                    setForm({ ...form, clientEmail: e.target.value })
                  }
                  placeholder="client@example.com"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={form.brandColor}
                    onChange={(e) =>
                      setForm({ ...form, brandColor: e.target.value })
                    }
                    className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    value={form.brandColor}
                    onChange={(e) =>
                      setForm({ ...form, brandColor: e.target.value })
                    }
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Create Portal</Button>
              <Button variant="secondary" onClick={() => setShowCreateForm(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {/* Portal Cards */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Your Portals
        </h2>
        {portals.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-400 text-sm">
              No portals yet. Click &quot;+ New Portal&quot; to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portals.map((portal) => {
              const portalInvoices = invoices.filter(
                (i) => i.portalId === portal.id,
              );
              const unpaid = portalInvoices.filter(
                (i) => i.status !== 'Paid',
              ).length;
              return (
                <div
                  key={portal.id}
                  onClick={() => navigate(`/p/${portal.slug}`)}
                  className="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="w-3 h-3 rounded-full mt-1"
                      style={{
                        backgroundColor: portal.brandColor || '#3B82F6',
                      }}
                    />
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        portal.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {portal.status}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mt-3">
                    {portal.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {portal.clientName}
                  </p>
                  <p className="text-xs text-gray-400">{portal.clientEmail}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-400">
                    <span>
                      {portalInvoices.length} invoice
                      {portalInvoices.length !== 1 ? 's' : ''}
                    </span>
                    {unpaid > 0 && (
                      <span className="text-amber-600 font-medium">
                        {unpaid} unpaid
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
