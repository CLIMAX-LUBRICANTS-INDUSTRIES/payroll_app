import { LayoutDashboard, PieChart, ReceiptText, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import logo from '/logo.png';

function Sidebar() {
    const baseLinkStyle = "flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-150";
    const activeStyle = "bg-clx-green text-white font-bold shadow-md scale-105 tracking-wide";
    const inactiveStyle = "text-gray-700 hover:text-gray-900 hover:scale-105 font-semibold tracking-wide";

    return (
        <aside>
            <div className='fixed w-64 h-[90vh] p-6 bg-white flex-stack rounded-sm z-20 gap-6'>
                {/*logo*/}
                <div className='flex justify-center'>
                    <img 
                        src={logo} 
                        className='h-12' 
                        alt='logo'/>
                </div>

                {/*general*/}
                <div className='flex-stack gap-4'>
                    <h1 className='text-[10px] font-medium tracking-widest text-black/30 cursor-pointer'>GENERAL</h1>
                    <NavLink 
                        to={'/dashboard'} 
                        className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeStyle : inactiveStyle}`}>
                        <LayoutDashboard size={16} />
                        <h1>Dashboard</h1>
                    </NavLink>
                </div>
                
                <hr className='border-t border-black/30' />

                {/*organization*/}
                <div className='flex-stack gap-4'>
                    <h1 className='text-[10px] font-medium tracking-widest text-black/30'>ORGANIZATION</h1>
                    {/*payroll*/}                   
                    <NavLink
                        to={'/payroll'}
                        className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeStyle : inactiveStyle}`}>
                            <ReceiptText size={16} />
                            <h1>Payroll</h1>
                    </NavLink>
                        
                    {/*reports*/}
                    <NavLink
                        to={'/reports'}
                        className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeStyle : inactiveStyle}`}>
                            <PieChart size={16} />
                            <h1>Reports</h1>
                    </NavLink>

                    {/*staffs*/}
                    <NavLink
                        to={'/staffs'}
                        className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeStyle : inactiveStyle}`}>
                            <Users size={16} />
                            <h1>Staffs</h1>
                    </NavLink>
                </div>

                <div className='border-t border-black/30 mt-auto pt-4 flex-stack gap-2'>
                    <h1 className='text-center text-black/70 font-montserrat text-sm'>© 2026 CLX</h1>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;