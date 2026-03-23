import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import type { Client } from '../types';

export default function ClientsPage() {
  const queryClient = useQueryClient();
  const { data: clients = [] } = useQuery({ queryKey: ['clients'], queryFn: api.clients.getAll });
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState({ userId: 0, name: '', balance: 0, userTypeId: 0 });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['clients'] });

  const resetForm = () => {
    setForm({ userId: 0, name: '', balance: 0, userTypeId: 0 });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await api.clients.update(editing.id!, form);
    } else {
      await api.clients.create(form);
    }
    resetForm();
    invalidate();
  };

  const handleEdit = (c: Client) => {
    setEditing(c);
    setForm({ userId: c.userId, name: c.name, balance: c.balance, userTypeId: c.userTypeId });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this client?')) return;
    await api.clients.delete(id);
    invalidate();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Clients</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          New Client
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 mb-6 space-y-4">
          <h3 className="text-lg font-semibold">{editing ? 'Edit Client' : 'New Client'}</h3>
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border rounded px-3 py-2" required />
            <input placeholder="User ID" type="number" value={form.userId} onChange={e => setForm({ ...form, userId: parseInt(e.target.value) || 0 })} className="border rounded px-3 py-2" required />
            <input placeholder="Balance" type="number" step="0.01" value={form.balance} onChange={e => setForm({ ...form, balance: parseFloat(e.target.value) || 0 })} className="border rounded px-3 py-2" required />
            <input placeholder="User Type ID" type="number" value={form.userTypeId} onChange={e => setForm({ ...form, userTypeId: parseInt(e.target.value) || 0 })} className="border rounded px-3 py-2" required />
          </div>
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
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">User ID</th>
              <th className="p-3 border-b">Balance</th>
              <th className="p-3 border-b">User Type</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(c => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.userId}</td>
                <td className="p-3">${c.balance.toFixed(2)}</td>
                <td className="p-3">{c.userTypeId}</td>
                <td className="p-3 space-x-2">
                  <button onClick={() => handleEdit(c)} className="text-blue-600 hover:underline text-sm">Edit</button>
                  <button onClick={() => handleDelete(c.id!)} className="text-red-600 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
            {clients.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-gray-400">No clients yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
