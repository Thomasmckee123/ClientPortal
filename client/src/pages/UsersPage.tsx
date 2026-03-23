import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import type { User } from '../types';

export default function UsersPage() {
  const queryClient = useQueryClient();
  const { data: users = [] } = useQuery({ queryKey: ['users'], queryFn: api.users.getAll });
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState({ email: '', accountId: 0, password: '' });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['users'] });

  const resetForm = () => {
    setForm({ email: '', accountId: 0, password: '' });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await api.users.update(editing.id!, form);
    } else {
      await api.users.create(form);
    }
    resetForm();
    invalidate();
  };

  const handleEdit = (u: User) => {
    setEditing(u);
    setForm({ email: u.email, accountId: u.accountId, password: '' });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this user?')) return;
    await api.users.delete(id);
    invalidate();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Users</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          New User
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 mb-6 space-y-4">
          <h3 className="text-lg font-semibold">{editing ? 'Edit User' : 'New User'}</h3>
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="border rounded px-3 py-2" required />
            <input placeholder="Account ID" type="number" value={form.accountId} onChange={e => setForm({ ...form, accountId: parseInt(e.target.value) || 0 })} className="border rounded px-3 py-2" required />
            <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="border rounded px-3 py-2" required />
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
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Account ID</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.accountId}</td>
                <td className="p-3 space-x-2">
                  <button onClick={() => handleEdit(u)} className="text-blue-600 hover:underline text-sm">Edit</button>
                  <button onClick={() => handleDelete(u.id!)} className="text-red-600 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan={3} className="p-6 text-center text-gray-400">No users yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
