import { LayoutDashboard, LogOut, PieChart, ReceiptText, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import logo from '/logo.png';

function Sidebar() {
    const navItems = [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard'},
        { id: 'payroll', name: 'Payroll', icon: ReceiptText, path: '/payroll'},
        { id: 'staffs', name: 'Staffs', icon: Users, path: '/staffs'},
        { id: 'reports', name: 'Reports', icon: PieChart, path: '/reports'},
    ];

    const baseLinkStyle = "flex items-center gap-1.5 px-8 py-3 w-full text-sm transition-all";
    const activeStyle = "bg-emerald-300 hover:bg-emerald-400 text-emerald-800 font-semibold rounded-xl shadow-emerald-50 shadow-sm";
    const inactiveStyle = "hover:text-gray-900 font-semibold font-medium text-slate-800";

    return (
        <aside className='w-65 h-full p-5 flex-stack gap-6 select-none shrink-0'>
            {/*logo*/}
            <div className='flex justify-center py-3'>
                <a href='https://www.climaxlubs.com'>
                    <img
                        src={logo} 
                        className='h-12' 
                        alt='logo'
                    />
                </a>
            </div>

            {/*general*/}
            <div className='flex-stack gap-3.5'>
                <hr className="border-t border-slate-200 mb-4.5" />
                <h1 className='text-[10px] font-semibold text-slate-400 tracking-wider uppercase'>Organization</h1>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink 
                            key={item.id}
                            to={item.path}
                            className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeStyle : inactiveStyle}`}
                        >
                            <Icon size={15} strokeWidth={2.5}/>
                            <span>{item.name}</span>
                        </NavLink>
                    )
                })}
            </div>
            
            <div className='border-t border-slate-200 mt-auto pt-4 flex-stack items-center gap-3 px-8 py-3 cursor-pointer'>
                <div className="font-medium text-red-600 flex items-center gap-1.5">
                    <LogOut size={15}/>
                    <h1 className='text-xs'>Log Out</h1>
                </div>
                <h1 className='text-center text-slate-400 text-sm'>©  <span className='text-xs tracking-tight'>2026 Climax Lubricants Industries</span></h1>
            </div>
        </aside>
    )
}

export default Sidebar;