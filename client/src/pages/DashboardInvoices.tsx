import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import type { Invoice } from '../types';
import Input from '../components/Input/Input';
import Select from '../components/Select/Select';
import Button from '../components/Button/Button';
import Table from '../components/Table/Table';

export default function DashboardInvoices() {
  const queryClient = useQueryClient();
  const { data: invoices = [] } = useQuery({ queryKey: ['invoices'], queryFn: api.invoices.getAll });
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Invoice | null>(null);
  const [form, setForm] = useState<{
    invoiceNumber: string;
    dueDate: string;
    clientName: string;
    clientEmail: string;
    taxRate: number;
    notes: string;
    status: string;
    lineItems: { description: string; quantity: number; unitPrice: number }[];
  }>({
    invoiceNumber: '',
    dueDate: '',
    clientName: '',
    clientEmail: '',
    taxRate: 0,
    notes: '',
    status: 'Draft',
    lineItems: [{ description: '', quantity: 1, unitPrice: 0 }],
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['invoices'] });

  const resetForm = () => {
    setForm({
      invoiceNumber: '',
      dueDate: '',
      clientName: '',
      clientEmail: '',
      taxRate: 0,
      notes: '',
      status: 'Draft',
      lineItems: [{ description: '', quantity: 1, unitPrice: 0 }],
    });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await api.invoices.update(editing.id!, form);
    } else {
      const { status: _status, ...createData } = form;
      await api.invoices.create(createData);
    }
    resetForm();
    invalidate();
  };

  const handleEdit = (inv: Invoice) => {
    setEditing(inv);
    setForm({
      invoiceNumber: inv.invoiceNumber,
      dueDate: inv.dueDate.split('T')[0],
      clientName: inv.clientName,
      clientEmail: inv.clientEmail,
      taxRate: inv.taxRate,
      notes: inv.notes || '',
      status: inv.status,
      lineItems: inv.lineItems.map((li) => ({
        description: li.description,
        quantity: li.quantity,
        unitPrice: li.unitPrice,
      })),
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this invoice?')) return;
    await api.invoices.delete(id);
    invalidate();
  };

  const addLineItem = () => {
    setForm({
      ...form,
      lineItems: [
        ...form.lineItems,
        { description: '', quantity: 1, unitPrice: 0 },
      ],
    });
  };

  const updateLineItem = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    const items = [...form.lineItems];
    items[index] = { ...items[index], [field]: value };
    setForm({ ...form, lineItems: items });
  };

  const removeLineItem = (index: number) => {
    setForm({
      ...form,
      lineItems: form.lineItems.filter((_, i) => i !== index),
    });
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Sent':
        return 'bg-blue-100 text-blue-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          New Invoice
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 p-6 space-y-4"
        >
          <h3 className="text-lg font-semibold">
            {editing ? 'Edit Invoice' : 'New Invoice'}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Invoice Number (e.g. INV-0001)"
              value={form.invoiceNumber}
              onChange={(e) =>
                setForm({ ...form, invoiceNumber: e.target.value })
              }
              required
            />
            <Input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              required
            />
            <Input
              placeholder="Client Name"
              value={form.clientName}
              onChange={(e) => setForm({ ...form, clientName: e.target.value })}
              required
            />
            <Input
              placeholder="Client Email"
              type="email"
              value={form.clientEmail}
              onChange={(e) =>
                setForm({ ...form, clientEmail: e.target.value })
              }
              required
            />
            <Input
              placeholder="Tax Rate (%)"
              type="number"
              step="0.01"
              value={form.taxRate}
              onChange={(e) =>
                setForm({ ...form, taxRate: parseFloat(e.target.value) || 0 })
              }
            />
            {editing && (
              <Select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                options={['Draft', 'Sent', 'Paid', 'Overdue']}
              />
            )}
          </div>
          <Input
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full"
          />
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-sm">Line Items</h4>
              <button
                type="button"
                onClick={addLineItem}
                className="text-blue-600 text-sm hover:underline"
              >
                + Add Item
              </button>
            </div>
            {form.lineItems.map((item, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <Input
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    updateLineItem(i, 'description', e.target.value)
                  }
                  className="flex-1"
                  required
                />
                <Input
                  placeholder="Qty"
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateLineItem(i, 'quantity', parseInt(e.target.value) || 0)
                  }
                  className="w-20"
                  required
                />
                <Input
                  placeholder="Unit Price"
                  type="number"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) =>
                    updateLineItem(
                      i,
                      'unitPrice',
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  className="w-32"
                  required
                />
                {form.lineItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLineItem(i)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>
          {(() => {
            const subtotal = form.lineItems.reduce(
              (sum, li) => sum + li.quantity * li.unitPrice,
              0,
            );
            const taxAmount = (subtotal * form.taxRate) / 100;
            const total = subtotal + taxAmount;
            return (
              <div className="bg-gray-50 rounded-lg p-4 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                {form.taxRate > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax ({form.taxRate}%)</span>
                    <span>£{taxAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-base border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>
            );
          })()}
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              {editing ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <Table<Invoice>
        data={invoices}
        emptyMessage="No invoices yet"
        columns={[
          { header: 'Invoice #', accessor: 'invoiceNumber', className: 'font-medium text-gray-900' },
          { header: 'Client', accessor: 'clientName' },
          { header: 'Due Date', render: (inv) => new Date(inv.dueDate).toLocaleDateString() },
          { header: 'Total', render: (inv) => `£${inv.total.toFixed(2)}`, className: 'font-semibold text-gray-900' },
          {
            header: 'Status',
            render: (inv) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(inv.status)}`}>
                {inv.status}
              </span>
            ),
          },
          {
            header: 'Actions',
            render: (inv) => (
              <div className="space-x-2">
                <Button onClick={() => handleEdit(inv)} className="text-blue-600 hover:underline text-sm">Edit</Button>
                <Button onClick={() => handleDelete(inv.id!)} className="text-red-600 hover:underline text-sm">Delete</Button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
