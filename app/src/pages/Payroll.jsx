import { Check, MoreHorizontal, Search, Upload, Users } from "lucide-react";
import pfp from '../assets/download.jpg';
import naira from '../assets/naira.svg';
import { useOutletContext } from "react-router-dom";
import { useMemo, useState } from "react";
import AnimatedUploadModal from "../components/AnimatedModal";



function Payroll() {
    const { 
        computedPayroll, 
        isPayrollCalculated, 
        files,
        totalStaffCount,
        resetProcessor,
    } = useOutletContext();
 
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const getMonth = months[new Date().getMonth()];
    
    const [modal, setModal] = useState(false);

    // paginated and live metric card logic; move to .js file later
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 15;

    const filteredPayroll = useMemo(() => {
        return computedPayroll.filter(row => {
            const nameMatch = row.Name?.toLowerCase().includes(searchTerm.toLowerCase());
            const positionMatch = row.Position?.toLowerCase().includes(searchTerm.toLowerCase());
            const deptMatch = row.Department?.toLowerCase().includes(searchTerm.toLowerCase());
            return (nameMatch || positionMatch || deptMatch)
        });
    }, [computedPayroll, searchTerm])

    const totalPages = Math.ceil(filteredPayroll.length / rowsPerPage);

    const paginatedPayroll = useMemo(() => {
        const indexOfLastRow = currentPage * rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - rowsPerPage;

        return filteredPayroll.slice(indexOfFirstRow, indexOfLastRow)
    }, [filteredPayroll, currentPage]);

    const currentEntryStart = filteredPayroll.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
    const currentEntryEnd = Math.min(currentPage * rowsPerPage, filteredPayroll.length);

    const metrics = useMemo(() => {
        let netDeductions = 0;
        let totalNetPayout = 0;
        let staffPaidCount = 0;
        let pendingCount = 0;
        let deductionFlagCount = 0;

        computedPayroll.forEach(staff => {
            totalNetPayout += staff.netSalary || 0;
            netDeductions  += staff.totalDeductions;
            if (isPayrollCalculated) {
                if (staff.totalDeductions > 0) deductionFlagCount++;
                if (staff.presentDays === staff.totalWorkDays) staffPaidCount++;
                else pendingCount++;
            };
        });

        return { totalNetPayout, staffPaidCount, pendingCount, deductionFlagCount, netDeductions };
    }, [computedPayroll, isPayrollCalculated]);
 
    const handleOpenModal = () => {
        setModal(true);
    };
    
    return(
        <main className="flex-1 min-w-0 p-6 flex flex-col gap-4 overflow-y-auto bg-slate-100">
            { modal && <AnimatedUploadModal closeModal={setModal} /> }
            <div className="relative flex items-center">
                <Search
                    className="absolute left-2.5 ml-2 text-slate-400"
                    size={16}/>
                <input
                    type="text"
                    placeholder="Search Employee by name, position, or department..."
                    value={searchTerm}
                    onChange={e => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1)
                    }}
                    className="w-full pl-10 py-3 rounded-full text-[12px] bg-white border border-slate-200 focus:outline-none focus:border-emerald-600 placeholder-slate-400 transition-all shadow-inner"
                />
            </div>

            {/*header*/}
            <div className="flex items-center justify-between">
                <h1 className="font-Syne font-black text-4xl text-slate-900 tracking-tight">Payroll</h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleOpenModal}
                        className='flex items-center gap-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-100 hover:bg-emerald-300 border border-emerald-200 px-4 py-2.5 rounded-xl transition-all cursor-pointer'
                    >
                        <Upload size={14}/>
                       {isPayrollCalculated ? "Modify Records" : "Upload Attendance Logs"}
                    </button>
                    <hr className="border-r border-slate-300 h-4" />
                    <button
                        onClick={resetProcessor}
                        disabled={isPayrollCalculated == false}
                        className="text-xs font-semibold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 px-4 py-2.5 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed rounded-xl transition-all cursor-pointer"
                    >
                        Reset Data
                    </button>
                    <hr className="border-r border-slate-300 h-4" />
                    <div className="flex items-center gap-3 font-fit">
                        <img src={pfp} className="h-12.5 hover:scale-110 transition-all duration-250 rounded-full border-2 border-emerald-600 shadow-lg" />
                        <div>
                            <h1 className="text-base font-semibold tracking-wide truncate w-auto">Adegbuji Helen</h1>
                            <h2 className="text-[12px] text-slate-500 uppercase">Super Admin</h2>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-row w-full gap-4 justify-between">
                {/*payroll*/}
                <div className="bg-white p-5 rounded-2xl flex flex-col gap-6 border border-slate-100 shadow-sm w-full h-31.25">
                    <div className="flex items-center justify-between w-full">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            This Month's Payroll
                        </p>
                        {/* Circular Icon Container */}
                        <span className="text-slate-700 flex items-center rounded-full bg-slate-200 p-1 justify-center">
                            <img src={naira} alt="naira" className="h-4" />
                        </span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">
                            ₦{metrics.totalNetPayout.toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </h3>
                    </div>                   
                </div>

                {/*deductions*/}
                <div className="bg-white p-5 rounded-2xl flex flex-col gap-6 border border-slate-100 shadow-sm w-full h-31.25">
                    <div className="flex items-center justify-between w-full">
                        <p className="text-[11px] font-bold text-red-500 uppercase tracking-wider">
                            Deductions Applied
                        </p>
                        {/* Circular Icon Container */}
                        <span className="flex items-center rounded-full bg-red-200 p-1 justify-center">
                            <img src={naira} alt="naira" className="h-4" />
                        </span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-red-600">
                            - ₦{metrics.netDeductions.toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </h3>
                    </div>                   
                </div>

                {/*attendance*/}
                <div className="bg-white p-5 rounded-2xl flex flex-col gap-6 border border-slate-100 shadow-sm w-full h-31.25">
                    <div className="flex items-center justify-between w-full">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Perfect Attendance
                        </p>
                        {/* Circular Icon Container */}
                        <span className="text-slate-700 flex items-center justify-center">
                            <Check size={14} className="stroke-[2.5]" />
                        </span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">
                            {metrics.staffPaidCount}
                        </h3>
                    </div>                   
                </div>

                {/*employees*/}
                <div className="bg-white p-5 rounded-2xl flex flex-col gap-6 border border-slate-100 shadow-sm w-full h-31.25">
                    <div className="flex items-center justify-between w-full">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Total Employees
                        </p>
                        {/* Circular Icon Container */}
                        <span className="text-slate-700 flex items-center justify-center">
                            <Users size={14} className="stroke-[2.5]" />
                        </span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                            {totalStaffCount}
                        </h3>
                    </div>                   
                </div>
            </div>

            {/*table*/}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col flex-1">

                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs font-semibold text-slate-500">
                    <div className="flex gap-2 items-center text-xs">
                        <h1>Employee Table</h1>
                        <hr className="border-r border-slate-400 h-3" />
                        <h1 className="font-semibold">Payroll period: <strong className="text-clx-green font-bold">{getMonth}</strong>, 2026</h1>
                    </div>
                    
                    <span className="text-slate-400 text-[11px]">Showing {currentEntryStart}-{currentEntryEnd} of {filteredPayroll.length} records</span>
                </div>

                {/*main content*/}
                <div className="w-full overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse text-xs min-w-150">
                        <thead className="sticky top-0">
                            <tr className="border-b border-slate-100 text-slate-400 font-bold text-[10px] uppercase tracking-wider bg-slate-50">
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-2">Employee Name</th>
                                <th className="px-6 py-2">Department / Position</th>
                                <th className="px-6 py-2">Base Salary</th>
                                <th className="px-6 py-2">Attendance Metric</th>
                                <th className="px-6 py-2">Deduction</th>
                                <th className="px-6 py-2">Net Salary</th>
                                <th className="px-6 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-600 bg-white">
                            {paginatedPayroll.length > 0 ? (
                                paginatedPayroll.map(row => (
                                    <tr key={row.UserID} className="hover:bg-slate-50/40 transition-colors">
                                        <td className="px-6 py-3 font-mono font-bold text-slate-400">#{row.UserID}</td>
                                        <td className="px-6 py-3 font-bold text-slate-900 text-sm">{row.Name}</td>
                                        <td className="px-6 py-3">
                                            <div className="font-semibold text-slate-700">{row.Department || "Operation"}</div>
                                            <div className="text-[10px] text-slate-400 font-medium mt-0.5">{row.Position || "Staff"}</div>
                                        </td>
                                        <td className="px-6 py-3 font-semibold text-slate-900">₦{row.BaseSalary?.toLocaleString()}.00</td>
                                        
                                        <td className="px-6 py-3">
                                            {row.totalWorkDays > 0 ? (
                                                <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200/80 text-slate-700 px-2.5 py-1 rounded-lg font-semibold">
                                                    <span className="text-emerald-600 font-semibold">{row.presentDays}</span> / {row.totalWorkDays} days
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 italic bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100/50">
                                                    No logs parsed
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-3 font-bold">
                                            {row.totalDeductions > 0 ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-sm font-semibold bg-red-50 text-red-500 border border-red-100">
                                                    - ₦{row.totalDeductions.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 font-medium">₦0.00</span>
                                            )}
                                        </td>

                                        <td className="px-6 py-3 font-bold text-emerald-600 text-sm">
                                            ₦{row.netSalary.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                        </td>
                                        
                                        <td className="px-6 py-3">
                                            <button className="text-slate-400 hover:text-slate-600 ml-2.5 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                                                <MoreHorizontal size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-12 text-slate-400 italic bg-slate-50/20 text-xs">
                                        No active staff logs match the current search filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 && (
                    <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between text-xs font-semibold text-slate-500">
                        <div className="flex items-center gap-1">
                            {/* Previous Button Wrapper */}
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all cursor-pointer"
                            >
                                Previous
                            </button>

                            {/* Dynamically Map Page Buttons */}
                            {Array.from({ length: totalPages }, (_, index) => {
                                const pageNumber = index + 1;
                                return (
                                    <button
                                        key={pageNumber}
                                        onClick={() => setCurrentPage(pageNumber)}
                                        className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center transition-all cursor-pointer ${
                                            currentPage === pageNumber 
                                                ? "bg-emerald-700 text-white shadow-sm" 
                                                : "text-slate-600 hover:bg-emerald-100"
                                        }`}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}

                            {/* Next Button Wrapper */}
                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all cursor-pointer"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default Payroll;