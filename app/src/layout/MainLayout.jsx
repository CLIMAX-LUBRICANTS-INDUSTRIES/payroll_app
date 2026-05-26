import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function MainLayout() {
    return (
        <div className="min-h-screen bg-[url(./assets/bg3.jpg)] bg-cover bg-center">
            <main className="flex-1 overflow-y-auto">
                <div className="container mx-auto p-6 mt-10">
                    <Sidebar />
                    <div className="ml-76">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MainLayout;