import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Payroll from './pages/Payroll';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Staffs from './pages/Staffs';
import MainLayout from './layout/MainLayout';
import NotFound from './pages/NotFound';
import Login from './pages/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. COMPLETELY ISOLATED ROUTES (No Sidebar/Header Shell) */}
        <Route path="/login" element={<Login />} />

        {/* 2. ROOT REDIRECT (Bounces visitors straight to the login gate) */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 3. PROTECTED APP SKELETON ROUTES (Renders inside MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/staffs" element={<Staffs />} />
          <Route path="/reports" element={<Reports />} />
        </Route>

        {/* 4. CATCH ALL ERROR ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
