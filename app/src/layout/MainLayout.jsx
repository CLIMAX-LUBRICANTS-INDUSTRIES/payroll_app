import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { PayrollProcessor } from "../hooks/payrollprocessor";

function MainLayout() {
    const payroll = PayrollProcessor();

    return (
        <div className="min-h-screen bg-[url(./assets/bg3.jpg)] bg-cover bg-center bg-fixed">
            <main className="flex-1 overflow-y-auto">
                <div className="container mx-auto p-6 mt-8">
                    <Sidebar />
                    <div className="ml-66">
                        <Outlet context={payroll}/>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MainLayout;