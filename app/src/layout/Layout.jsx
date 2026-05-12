import logo from '../assets/logo.png';
import user from "../assets/26.jpg";
import { LayoutDashboard, PieChart, ReceiptText } from 'lucide-react';

function Layout() {
    return (
        <div className='flex min-h-screen bg-dblack'>
            <aside className='w-64 bg-white text-dblack flex flex-col fixed h-full shadow-lg p-6'>
                
                {/* Logo */}
                <div className='flex justify-center mb-10'>
                    <img src={logo} alt='Logo' className='h-12 w-auto object-contain' />
                </div>

                {/*General section*/}
                <div className='mb-6'>
                    <h3 className='text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-4'>
                        General
                    </h3>
                    <div className='flex items-center gap-3 text-gray-600 hover:text-black cursor-pointer transition-colors px-3'>
                        <LayoutDashboard size={18} />
                        <span className='font-bold text-[14px]'>Dashboard</span>
                    </div>
                </div>

                {/*Separator Line*/}
                <hr className='border-t border-gray-200 my-2 w-full' />

                {/*Organization section*/}
                <div className='mt-2'>
                    <h3 className='text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-4'>
                        Organization
                    </h3>
                    <div className='flex flex-col gap-4'>
                        {/*Active Link*/}
                        <div className='flex items-center gap-3 bg-clx-yellow text-white px-4 py-3 rounded-[4px] shadow-sm cursor-pointer'>
                            <ReceiptText size={18} />
                            <span className='font-bold text-[14px]'>Payroll</span>
                        </div>

                        {/*Inactive Link*/}
                        <div className='flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer transition-colors px-4'>
                            <PieChart size={18} />
                            <span className='font-bold text-[14px]'>Reports</span>
                        </div>
                    </div>
                </div>

                {/*profile*/}
                <div className='mt-auto flex items-center gap-3 pt-6 border-t border-gray-100'>
                    <img src={user} alt='user' className='w-16 h-auto rounded-full object-cover' />
                    <div>
                        <p className='text-sm font-bold'>Isaac Johnson</p>
                        <p className='text-[12px] text-gray-500'>Super Admin</p>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Layout;