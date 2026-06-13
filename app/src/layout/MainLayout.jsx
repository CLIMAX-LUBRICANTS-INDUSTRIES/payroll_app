import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { PayrollProcessor } from "../hooks/payrollprocessor";

function MainLayout() {
    const payroll = PayrollProcessor();

    return (
        <main className="flex w-screen h-screen overflow-hidden bg-slate-100 font-sans antialiased text-slate-800">
            <Sidebar />
            <Outlet context={payroll}/> 
        </main>
    );
}

export default MainLayout;