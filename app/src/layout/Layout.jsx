import logo from '../assets/logo.png';
import user from "../assets/26.jpg";
import { LayoutDashboard, PieChart, ReceiptText, Search } from 'lucide-react';

function Layout() {
    return (
        <div className="flex min-h-screen" >
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
                    <div className='flex items-center gap-3 text-gray-600 cursor-pointer px-3 hover:bg-clx-yellow py-[12px] hover:text-white rounded-[4px]'>
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
                        <div className='flex items-center gap-3 text-gray-600 cursor-pointer px-3 hover:bg-clx-yellow py-[12px] hover:text-white rounded-[4px]'>
                            <ReceiptText size={18} />
                            <span className='font-bold text-[14px]'>Payroll</span>
                        </div>

                        {/*Inactive Link*/}
                        <div className='flex items-center gap-3 text-gray-600 hover:bg-clx-yellow py-[12px] hover:text-white rounded-[4px] cursor-pointer transition-colors px-3'>
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

            {/*main content*/}
            <main className='flex-1 ml-64 min-h-screen p-12 text-white'>
                {/*section 1*/}
                <div className='flex justify-between items-center mb-10'>
                    <h1 className='text-4xl font-black tracking-wide'>Payroll</h1>
                    <div className='flex gap-4'>
                        <button className='bg-clx-yellow text-white px-16 py-3 rounded cursor-pointer'>Add Employee</button>
                        <button className='bg-clx-yellow text-white px-16 py-3 rounded cursor-pointer'>Upload CSV</button>
                    </div>
                </div>
                {/*section 2*/}
                <div className='flex items-center gap-4'>
                    <h2 className='text-white font-semibold text-xl'>Employee Salary Table</h2>
                    <h2 className='text-white font-semibold text-xl'>|</h2>
                    <h2 className='text-white font-semibold text-xl'>Current Payroll period: May, 2026</h2>
                </div>

                {/*section 3*/}
                <div className="relative w-full mt-8">
                    {/* 1. The Icon */}
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                    </div>

                    {/* 2. The Input */}
                    <input
                        type="text"
                        className="block w-full bg-transparent border-b border-gray-200 py-2 pl-8 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:border-clx-yellow transition-colors font-montserrat"
                        placeholder="Search Employee..."
                    />
                </div>

                <div className='mt-8 backdrop-blur'>
                    <table className='w-full border-separate border-spacing-y-3'>
                        <thead>
                            <tr className='text-left text-white  text-sm'>
                                <th className='px-6 py-2'>Name</th>
                                <th className='px-6 py-2'>Role</th>
                                <th className='px-6 py-2'>Fixed Salary</th>
                                <th className='px-6 py-2'>Deduction</th>
                                <th className='px-6 py-2'>Net Salary</th>
                                <th className='px-6 py-2 text-right'>Status</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default Layout;