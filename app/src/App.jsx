import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Payroll from './pages/Payroll';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Staffs from './pages/Staffs';
import MainLayout from './layout/MainLayout';
import NotFound from './pages/NotFound';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Navigate to='/payroll' />} />

          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/staffs' element={<Staffs />} />
          <Route path='/payroll' element={<Payroll />} />
          <Route path='/reports' element={<Reports />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
