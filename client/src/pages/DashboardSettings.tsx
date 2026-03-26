import { useState } from 'react';
import Select from '../components/Select/Select';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import { useAuth } from '../context/AuthContext';

export default function DashboardSettings() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || 'Owner Name',
    email: user?.email || 'owner@example.com',
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
          <Input
            id="settings-name"
            label="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full"
          />
          <Input
            id="settings-email"
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full"
          />
          <Input
            id="settings-company"
            label="Company / Business Name"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Your Business Ltd"
            className="w-full"
          />
          <div>
            <label htmlFor="settings-timezone" className="block text-sm font-medium text-gray-700 mb-1">
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
          <Button type="submit">
            Save Changes
          </Button>
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
        <Button variant="danger">
          Delete Account
        </Button>
      </div>
    </div>
  );
}
