import { useState } from 'react';
import InvoicesPage from './pages/InvoicesPage';
import ReceiptsPage from './pages/ReceiptsPage';
import ClientsPage from './pages/ClientsPage';
import UsersPage from './pages/UsersPage';
import AccountsPage from './pages/AccountsPage';

const tabs = ['Invoices', 'Receipts', 'Clients', 'Users', 'Accounts'] as const;
type Tab = typeof tabs[number];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Invoices');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            <h1 className="text-xl font-bold text-gray-900 mr-10">Client Portal</h1>
            <div className="flex space-x-1">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'Invoices' && <InvoicesPage />}
        {activeTab === 'Receipts' && <ReceiptsPage />}
        {activeTab === 'Clients' && <ClientsPage />}
        {activeTab === 'Users' && <UsersPage />}
        {activeTab === 'Accounts' && <AccountsPage />}
      </main>
    </div>
  );
}

export default App;
