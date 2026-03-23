import { useQuery } from '@tanstack/react-query';
import Card from '../../components/Card/Card';
import { api } from '../../api';

const statCards = [
  { id: 1, name: 'Active Portals', icon: '🖥' },
  { id: 2, name: 'Clients', icon: '👤' },
  { id: 3, name: 'Revenue this month', icon: '💷' },
  { id: 4, name: 'Unpaid Invoices', icon: '📄' },
];

const OwnerDashboard = () => {
  const { data: clients = [] } = useQuery({ queryKey: ['clients'], queryFn: api.clients.getAll });
  useQuery({ queryKey: ['invoices'], queryFn: api.invoices.getAll });

  const statValues: Record<number, string | number> = {
    1: clients.length,
    2: clients.length,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your client portal
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((item) => (
          <Card
            key={item.id}
            className="p-6 bg-white hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">{item.name}</p>
              <span className="text-xl">{item.icon}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {statValues[item.id]}
            </p>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Clients</h2>
        {clients.length === 0 ? (
          <p className="text-sm text-gray-500">No clients yet.</p>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Name
                  </th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {client.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">
                      £{client.balance?.toLocaleString() ?? '0'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
