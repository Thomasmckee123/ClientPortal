import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import type { Portal } from '../types';
import Button from '../components/Button/Button';

export default function DashboardClients() {
  const navigate = useNavigate();
  const { data: portals = [] } = useQuery({ queryKey: ['portals'], queryFn: api.portals.getAll });

  // Derive unique clients from portals
  const clients = Array.from(
    portals
      .reduce((map, p) => {
        if (!map.has(p.clientEmail)) {
          map.set(p.clientEmail, {
            name: p.clientName,
            email: p.clientEmail,
            portals: [p],
          });
        } else {
          map.get(p.clientEmail)!.portals.push(p);
        }
        return map;
      }, new Map<string, { name: string; email: string; portals: Portal[] }>())
      .values(),
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Clients</h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left border-b border-gray-200">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Portals
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.email} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {client.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {client.email}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1 flex-wrap">
                    {client.portals.map((p) => (
                      <span
                        key={p.id}
                        className="inline-block bg-indigo-50 text-indigo-700 text-xs px-2 py-0.5 rounded-full"
                      >
                        {p.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Button variant="ghost" className="text-indigo-600" onClick={() => navigate(`/p/${client.portals[0].slug}`)}>
                    View Portal
                  </Button>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-gray-400 text-sm"
                >
                  No clients yet. Create a portal to add your first client.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
