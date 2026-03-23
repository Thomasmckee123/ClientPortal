import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardLayout from './components/DashboardLayout';
import DashboardInvoices from './pages/DashboardInvoices';
import DashboardMessages from './pages/DashboardMessages';
import DashboardClients from './pages/DashboardClients';
import DashboardBilling from './pages/DashboardBilling';
import DashboardSettings from './pages/DashboardSettings';
import PortalView from './pages/PortalView';
import Dashboard from './pages/Dashboard/components/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="invoices" element={<DashboardInvoices />} />
        <Route path="messages" element={<DashboardMessages />} />
        <Route path="clients" element={<DashboardClients />} />
        <Route path="billing" element={<DashboardBilling />} />
        <Route path="settings" element={<DashboardSettings />} />
      </Route>
      <Route path="/p/:slug" element={<PortalView />} />
    </Routes>
  );
}

export default App;
