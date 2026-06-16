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
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/staffs" element={<Staffs />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
