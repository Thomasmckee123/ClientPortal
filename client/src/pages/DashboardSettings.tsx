import { useState } from 'react';
import Select from '../components/Select/Select';

export default function DashboardSettings() {
  const [form, setForm] = useState({
    name: 'Owner Name',
    email: 'owner@example.com',
    company: '',
    timezone: 'Europe/London',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: call api to update settings
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account settings
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white rounded-xl border border-gray-200 p-6 space-y-6"
      >
        <h2 className="text-lg font-semibold text-gray-900">Profile</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company / Business Name
            </label>
            <input
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Your Business Ltd"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timezone
            </label>
            <Select
              value={form.timezone}
              onChange={(e) => setForm({ ...form, timezone: e.target.value })}
              options={[
                { value: 'Europe/London', label: 'Europe/London (GMT)' },
                { value: 'America/New_York', label: 'America/New_York (EST)' },
                { value: 'America/Los_Angeles', label: 'America/Los_Angeles (PST)' },
                { value: 'Asia/Tokyo', label: 'Asia/Tokyo (JST)' },
              ]}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
          {saved && (
            <span className="text-sm text-green-600 font-medium">
              Settings saved!
            </span>
          )}
        </div>
      </form>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Danger Zone</h2>
        <p className="text-sm text-gray-500">
          Permanently delete your account and all associated data.
        </p>
        <button className="border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}
