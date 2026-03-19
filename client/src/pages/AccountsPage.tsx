import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Account } from '../types';

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Account | null>(null);
  const [form, setForm] = useState({ accountType: '' });

  const load = async () => {
    const data = await api.accounts.getAll();
    setAccounts(data);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ accountType: '' });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await api.accounts.update(editing.id!, form);
    } else {
      await api.accounts.create(form);
    }
    resetForm();
    load();
  };

  const handleEdit = (a: Account) => {
    setEditing(a);
    setForm({ accountType: a.accountType });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this account?')) return;
    await api.accounts.delete(id);
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Accounts</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          New Account
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 mb-6 space-y-4">
          <h3 className="text-lg font-semibold">{editing ? 'Edit Account' : 'New Account'}</h3>
          <input placeholder="Account Type" value={form.accountType} onChange={e => setForm({ ...form, accountType: e.target.value })} className="border rounded px-3 py-2 w-full" required />
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
              <th className="p-3 border-b">Account Type</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(a => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{a.accountType}</td>
                <td className="p-3 space-x-2">
                  <button onClick={() => handleEdit(a)} className="text-blue-600 hover:underline text-sm">Edit</button>
                  <button onClick={() => handleDelete(a.id!)} className="text-red-600 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
            {accounts.length === 0 && <tr><td colSpan={2} className="p-6 text-center text-gray-400">No accounts yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
