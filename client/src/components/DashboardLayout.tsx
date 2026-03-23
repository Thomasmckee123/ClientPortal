import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', end: true },
  { to: '/dashboard/clients', label: 'Clients', end: false },
  { to: '/dashboard/invoices', label: 'Invoices', end: false },
  { to: '/dashboard/messages', label: 'Messages', end: false },
  { to: '/dashboard/billing', label: 'Billing', end: false },
  { to: '/dashboard/settings', label: 'Settings', end: false },
];

export default function DashboardLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div
          className="h-16 flex items-center px-6 border-b border-gray-200 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <h1 className="text-xl font-bold text-blue-600">ClientPortal</h1>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => navigate('/login')}
            className="w-full text-left text-sm text-gray-500 hover:text-gray-700"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div />
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">owner@example.com</span>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
              O
            </div>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
