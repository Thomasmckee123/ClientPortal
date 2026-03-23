import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import type { Receipt } from '../types';
import Select from '../components/Select/Select';

export default function ReceiptsPage() {
  const queryClient = useQueryClient();
  const { data: receipts = [] } = useQuery({ queryKey: ['receipts'], queryFn: api.receipts.getAll });
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Receipt | null>(null);
  const [form, setForm] = useState<{
    receiptNumber: string;
    clientName: string;
    clientEmail: string;
    paymentMethod: string;
    transactionId: string;
    taxRate: number;
    notes: string;
    invoiceId: string;
    items: { description: string; quantity: number; unitPrice: number }[];
  }>({
    receiptNumber: '',
    clientName: '',
    clientEmail: '',
    paymentMethod: 'Cash',
    transactionId: '',
    taxRate: 0,
    notes: '',
    invoiceId: '',
    items: [{ description: '', quantity: 1, unitPrice: 0 }],
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['receipts'] });

  const resetForm = () => {
    setForm({ receiptNumber: '', clientName: '', clientEmail: '', paymentMethod: 'Cash', transactionId: '', taxRate: 0, notes: '', invoiceId: '', items: [{ description: '', quantity: 1, unitPrice: 0 }] });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...form, transactionId: form.transactionId || null, invoiceId: form.invoiceId || null };
    if (editing) {
      await api.receipts.update(editing.id!, data);
    } else {
      await api.receipts.create(data);
    }
    resetForm();
    invalidate();
  };

  const handleEdit = (r: Receipt) => {
    setEditing(r);
    setForm({
      receiptNumber: r.receiptNumber,
      clientName: r.clientName,
      clientEmail: r.clientEmail,
      paymentMethod: r.paymentMethod,
      transactionId: r.transactionId || '',
      taxRate: r.taxRate,
      notes: r.notes || '',
      invoiceId: r.invoiceId || '',
      items: r.items.map(i => ({ description: i.description, quantity: i.quantity, unitPrice: i.unitPrice })),
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this receipt?')) return;
    await api.receipts.delete(id);
    invalidate();
  };

  const addItem = () => {
    setForm({ ...form, items: [...form.items, { description: '', quantity: 1, unitPrice: 0 }] });
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const items = [...form.items];
    items[index] = { ...items[index], [field]: value };
    setForm({ ...form, items });
  };

  const removeItem = (index: number) => {
    setForm({ ...form, items: form.items.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Receipts</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          New Receipt
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 mb-6 space-y-4">
          <h3 className="text-lg font-semibold">{editing ? 'Edit Receipt' : 'New Receipt'}</h3>
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Receipt Number" value={form.receiptNumber} onChange={e => setForm({ ...form, receiptNumber: e.target.value })} className="border rounded px-3 py-2" required />
            <input placeholder="Client Name" value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} className="border rounded px-3 py-2" required />
            <input placeholder="Client Email" type="email" value={form.clientEmail} onChange={e => setForm({ ...form, clientEmail: e.target.value })} className="border rounded px-3 py-2" required />
            <Select
              value={form.paymentMethod}
              onChange={e => setForm({ ...form, paymentMethod: e.target.value })}
              options={['Cash', 'Card', 'Transfer', 'Cheque']}
            />
            <input placeholder="Transaction ID (optional)" value={form.transactionId} onChange={e => setForm({ ...form, transactionId: e.target.value })} className="border rounded px-3 py-2" />
            <input placeholder="Tax Rate (%)" type="number" step="0.01" value={form.taxRate} onChange={e => setForm({ ...form, taxRate: parseFloat(e.target.value) || 0 })} className="border rounded px-3 py-2" />
            <input placeholder="Invoice ID (optional)" value={form.invoiceId} onChange={e => setForm({ ...form, invoiceId: e.target.value })} className="border rounded px-3 py-2" />
          </div>
          <input placeholder="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="border rounded px-3 py-2 w-full" />

          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Items</h4>
              <button type="button" onClick={addItem} className="text-blue-600 text-sm hover:underline">+ Add Item</button>
            </div>
            {form.items.map((item, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input placeholder="Description" value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} className="border rounded px-3 py-2 flex-1" required />
                <input placeholder="Qty" type="number" value={item.quantity} onChange={e => updateItem(i, 'quantity', parseInt(e.target.value) || 0)} className="border rounded px-3 py-2 w-20" required />
                <input placeholder="Unit Price" type="number" step="0.01" value={item.unitPrice} onChange={e => updateItem(i, 'unitPrice', parseFloat(e.target.value) || 0)} className="border rounded px-3 py-2 w-32" required />
                {form.items.length > 1 && (
                  <button type="button" onClick={() => removeItem(i)} className="text-red-500 hover:text-red-700 px-2">X</button>
                )}
              </div>
            ))}
          </div>

          {(() => {
            const subtotal = form.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
            const taxAmount = subtotal * form.taxRate / 100;
            const total = subtotal + taxAmount;
            return (
              <div className="bg-gray-50 rounded-lg p-4 space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                {form.taxRate > 0 && <div className="flex justify-between"><span className="text-gray-600">Tax ({form.taxRate}%)</span><span>${taxAmount.toFixed(2)}</span></div>}
                <div className="flex justify-between font-semibold text-base border-t pt-2 mt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
            );
          })()}

          <div className="flex gap-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">{editing ? 'Update' : 'Create'}</button>
            <button type="button" onClick={resetForm} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-3 border-b">Receipt #</th>
              <th className="p-3 border-b">Client</th>
              <th className="p-3 border-b">Payment</th>
              <th className="p-3 border-b">Total</th>
              <th className="p-3 border-b">Date</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map(r => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{r.receiptNumber}</td>
                <td className="p-3">{r.clientName}</td>
                <td className="p-3">{r.paymentMethod}</td>
                <td className="p-3">${r.total.toFixed(2)}</td>
                <td className="p-3">{new Date(r.createdDate).toLocaleDateString()}</td>
                <td className="p-3 space-x-2">
                  <button onClick={() => handleEdit(r)} className="text-blue-600 hover:underline text-sm">Edit</button>
                  <button onClick={() => handleDelete(r.id!)} className="text-red-600 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
            {receipts.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-gray-400">No receipts yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
