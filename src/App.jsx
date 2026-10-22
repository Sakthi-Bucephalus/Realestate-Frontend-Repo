import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { Login } from './pages/auth/Login';
import { BootstrapSetup } from './pages/auth/BootstrapSetup';
import { Dashboard } from './pages/dashboard/Dashboard';
import { LeadsList } from './pages/leads/LeadsList';
import { CustomersList } from './pages/customers/CustomersList';
import { PropertiesList } from './pages/properties/PropertiesList';
import { SiteVisitsPage } from './pages/site-visits/SiteVisitsPage';
import { BookingsList } from './pages/bookings/BookingsList';
import { PaymentsLedger } from './pages/payments/PaymentsLedger';
import { EmployeesList } from './pages/employees/EmployeesList';
import { ReportsPage } from './pages/reports/ReportsPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { SettingsPage } from './pages/settings/SettingsPage';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F8F6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#B88A2E] animate-pulse flex items-center justify-center text-white font-extrabold text-sm">
            EF
          </div>
          <span className="text-xs font-bold text-[#8C671D] uppercase tracking-widest">
            Loading EstateFlow...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Module Permission Guard
const ModuleGuard = ({ module, children }) => {
  const { hasModule } = useAuth();

  if (!hasModule(module)) {
    return (
      <div className="p-12 text-center bg-white rounded-xl border border-[#E8E2D5] shadow-card max-w-lg mx-auto mt-12">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3 font-bold text-xl">
          !
        </div>
        <h3 className="text-base font-bold text-[#262626] m-0 mb-1">
          Access Restricted
        </h3>
        <p className="text-xs text-[#737373] m-0 mb-4">
          The <span className="capitalize font-semibold">{module.replace('_', ' ')}</span> module is either disabled for your organization or restricted for your role.
        </p>
        <a
          href="/dashboard"
          className="inline-block px-4 py-2 rounded-md bg-[#B88A2E] text-white text-xs font-bold hover:bg-[#8C671D] transition-colors"
        >
          Return to Dashboard
        </a>
      </div>
    );
  }

  return children;
};

export const App = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/setup" element={<BootstrapSetup />} />

      {/* Protected App Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route
          path="dashboard"
          element={
            <ModuleGuard module="dashboard">
              <Dashboard />
            </ModuleGuard>
          }
        />

        <Route
          path="leads"
          element={
            <ModuleGuard module="leads">
              <LeadsList />
            </ModuleGuard>
          }
        />

        <Route
          path="customers"
          element={
            <ModuleGuard module="customers">
              <CustomersList />
            </ModuleGuard>
          }
        />

        <Route
          path="properties"
          element={
            <ModuleGuard module="properties">
              <PropertiesList />
            </ModuleGuard>
          }
        />

        <Route
          path="site-visits"
          element={
            <ModuleGuard module="site_visits">
              <SiteVisitsPage />
            </ModuleGuard>
          }
        />

        <Route
          path="bookings"
          element={
            <ModuleGuard module="bookings">
              <BookingsList />
            </ModuleGuard>
          }
        />

        <Route
          path="payments"
          element={
            <ModuleGuard module="payments">
              <PaymentsLedger />
            </ModuleGuard>
          }
        />

        <Route
          path="employees"
          element={
            <ModuleGuard module="employees">
              <EmployeesList />
            </ModuleGuard>
          }
        />

        <Route
          path="reports"
          element={
            <ModuleGuard module="reports">
              <ReportsPage />
            </ModuleGuard>
          }
        />

        <Route
          path="notifications"
          element={
            <ModuleGuard module="notifications">
              <NotificationsPage />
            </ModuleGuard>
          }
        />

        <Route
          path="settings"
          element={
            <ModuleGuard module="settings">
              <SettingsPage />
            </ModuleGuard>
          }
        />
      </Route>

      {/* Fallback 404 */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
