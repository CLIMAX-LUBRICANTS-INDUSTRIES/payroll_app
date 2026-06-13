import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { Search, Upload, MoreHorizontal } from "lucide-react";
import AnimatedUploadModal from "../components/AnimatedUploadModal";
import AnimatedButton from "../components/AnimatedButton";
import pfp from "../assets/pfp.png"; 

export default function Payroll() {
    const { 
        computedPayroll, 
        isPayrollCalculated, 
        files, 
        resetProcessor 
    } = useOutletContext();

    const [modal, setModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    
    // ========================================================================
    // 🌟 PAGINATION STATE ENGINE VARIABLES
    // ========================================================================
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 50; // Limits the display grid strictly to 50 items

    // ========================================================================
    // 1. SEARCH FILTERING LAYER (Resets back to Page 1 when searching)
    // ========================================================================
    const filteredPayroll = useMemo(() => {
        setCurrentPage(1); // Reset page index back to 1 on a query refresh
        return computedPayroll.filter(row => {
            const nameMatch = row.Name?.toLowerCase().includes(searchTerm.toLowerCase());
            const positionMatch = row.Position?.toLowerCase().includes(searchTerm.toLowerCase());
            const deptMatch = row.Department?.toLowerCase().includes(searchTerm.toLowerCase());
            return nameMatch || positionMatch || deptMatch;
        });
    }, [computedPayroll, searchTerm]);

    // ========================================================================
    // 🌟 2. THE PAGINATION CHOPPING BLOCK (SLICING DETACHMENT)
    // ========================================================================
    const totalPages = Math.ceil(filteredPayroll.length / rowsPerPage);

    const paginatedPayroll = useMemo(() => {
        const indexOfLastRow = currentPage * rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - rowsPerPage;
        
        // Slices exactly rows 0 to 50 on page 1, 50 to 100 on page 2, etc.
        return filteredPayroll.slice(indexOfFirstRow, indexOfLastRow);
    }, [filteredPayroll, currentPage]);

    // Metadata reporting metrics index indicators
    const currentEntryStart = filteredPayroll.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
    const currentEntryEnd = Math.min(currentPage * rowsPerPage, filteredPayroll.length);

    // ========================================================================
    // 3. LIVE SUMMARY METRICS
    // ========================================================================
    const metrics = useMemo(() => {
        let totalNetPayout = 0;
        let staffPaidCount = 0;
        let pendingCount = 0;
        let deductionFlagCount = 0;

        computedPayroll.forEach(staff => {
            totalNetPayout += staff.netSalary || 0;
            if (isPayrollCalculated) {
                if (staff.totalDeductions > 0) deductionFlagCount++;
                if (staff.presentDays === staff.totalWorkDays) staffPaidCount++;
                else pendingCount++;
            }
        });

        return { totalNetPayout, staffPaidCount, pendingCount, deductionFlagCount };
    }, [computedPayroll, isPayrollCalculated]);

    return (
        <div className="w-full bg-[#f8fafc] min-h-screen p-6 font-montserrat antialiased text-slate-800 flex flex-col gap-6">
            
            {/* Top Search & Filter Panel */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="relative flex-1 max-w-md flex items-center">
                    <Search className="absolute left-4 text-slate-400" size={16}/>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search Employee by name, position, or department..."
                        className="w-full pl-11 pr-4 py-2 text-sm bg-slate-50 border border-slate-200/60 rounded-xl focus:outline-none focus:border-slate-300 placeholder-slate-400 text-slate-900"
                    />
                </div>

                <div className="flex items-center gap-4">
                    {isPayrollCalculated && (
                        <button
                            onClick={resetProcessor}
                            className="text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                        >
                            Reset Data
                        </button>
                    )}

                    <AnimatedButton
                        whileHover={{ scale: 1.01 }} 
                        onClickFunction={() => setModal(true)}
                        style="bg-clx-green hover:bg-clx-green2 text-white font-semibold py-2.5 px-5 rounded-xl transition-all shadow-sm text-xs flex items-center gap-2 cursor-pointer"
                    >
                        <Upload size={14}/> {isPayrollCalculated ? "Modify Records" : "Upload Attendance Logs"}
                    </AnimatedButton>
                    
                    <hr className="border-r border-slate-200 h-8" />

                    <div className="flex items-center gap-3">
                        <img src={pfp} alt="Admin Profile" className="h-10 w-10 rounded-full border-2 border-clx-green shadow-sm object-cover"/>
                        <div className="hidden md:block">
                            <h1 className="text-xs font-bold text-slate-900">Isaac Johnson</h1>
                            <h2 className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">Super Admin</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics Grid Dashboard Summaries */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">This Month's Payroll</p>
                        <h3 className="text-lg font-bold mt-1 text-slate-900">₦{metrics.totalNetPayout.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
                    </div>
                    <span className="p-3 bg-slate-50 text-slate-400 rounded-xl font-bold text-sm">₦</span>
                </div>
                
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Perfect Attendance</p>
                        <h3 className="text-lg font-bold mt-1 text-slate-900">{metrics.staffPaidCount} <span className="text-slate-400 font-medium text-xs">/ {computedPayroll.length} Paid</span></h3>
                    </div>
                    <span className="p-3 bg-emerald-50 text-emerald-500 rounded-xl text-sm">✓</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Deductions Applied</p>
                        <h3 className="text-lg font-bold mt-1 text-slate-900">{metrics.deductionFlagCount} Employees</h3>
                    </div>
                    <span className="p-3 bg-amber-50 text-amber-500 rounded-xl text-sm">⚠️</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Payroll Status</p>
                        <h3 className="text-sm font-bold mt-2 text-slate-800">
                            {isPayrollCalculated ? (
                                <span className="text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">● Live Active</span>
                            ) : (
                                <span className="text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-lg">○ Base Preview</span>
                            )}
                        </h3>
                    </div>
                    <span className="p-3 bg-slate-50 text-slate-500 rounded-xl text-sm">⚙️</span>
                </div>
            </div>

            {/* ========================================================================
                MAIN LAYOUT GRID SPACE WITH PAGINATION FOOTER FIXED MAPPING
               ======================================================================== */}
            <div className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                
                {/* Secondary Header Row */}
                <div className="p-4 border-b border-slate-100 bg-slate-50/40 flex justify-between items-center text-xs font-semibold text-slate-500">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-800 font-bold">Employee Grid Layout</span>
                        <hr className="border-r border-slate-300 h-3" />
                        <span>Period: <strong className="text-clx-green">June 2026</strong></span>
                    </div>
                    <span>Showing {currentEntryStart}-{currentEntryEnd} of {filteredPayroll.length} records</span>
                </div>

                {/* Core Data Layout Render Frame */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-400 font-bold text-[10px] uppercase tracking-wider bg-slate-50/20">
                            <th className="p-4 w-24">User ID</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Department / Position</th>
                            <th className="p-4">Base Salary</th>
                            <th className="p-4">Attendance Metric</th>
                            <th className="p-4">Deduction Penalty</th>
                            <th className="p-4">Calculated Net Pay</th>
                            <th className="p-4 w-12 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-600 bg-white">
                            {/* 🌟 Notice we map over PAGINATEDPAYROLL instead of filteredPayroll */}
                            {paginatedPayroll.length > 0 ? (
                                paginatedPayroll.map(row => (
                                    <tr key={row.UserID} className="hover:bg-slate-50/40 transition-colors">
                                        <td className="p-4 font-mono font-bold text-slate-400">#{row.UserID}</td>
                                        <td className="p-4 font-bold text-slate-900 text-sm">{row.Name}</td>
                                        <td className="p-4">
                                            <div className="font-semibold text-slate-700">{row.Department || "Operation"}</div>
                                            <div className="text-[10px] text-slate-400 font-medium mt-0.5">{row.Position || "Staff"}</div>
                                        </td>
                                        <td className="p-4 font-semibold text-slate-900">₦{row.BaseSalary?.toLocaleString()}.00</td>
                                        
                                        <td className="p-4">
                                            {row.totalWorkDays > 0 ? (
                                                <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200/80 text-slate-700 px-2.5 py-1 rounded-lg font-semibold">
                                                    <strong className="text-emerald-600">{row.presentDays}</strong> / {row.totalWorkDays} days
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 italic bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100/50">
                                                    No logs parsed
                                                </span>
                                            )}
                                        </td>

                                        <td className="p-4 font-bold">
                                            {row.totalDeductions > 0 ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold bg-red-50 text-red-500 border border-red-100">
                                                    -₦{row.totalDeductions.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 font-medium">₦0.00</span>
                                            )}
                                        </td>

                                        <td className="p-4 font-extrabold text-emerald-600 text-sm">
                                            ₦{row.netSalary.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                        </td>
                                        
                                        <td className="p-4 text-center">
                                            <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
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

                {/* ========================================================================
                    🌟 LUNARDESK INTERACTIVE PAGINATION CONTROLS FOOTER
                   ======================================================================== */}
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
                                                ? "bg-slate-900 text-white shadow-sm" 
                                                : "text-slate-600 hover:bg-slate-100"
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
                        
                        <p className="text-slate-400 text-[11px]">
                            Showing {currentEntryStart} to {currentEntryEnd} of {filteredPayroll.length} total entries
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}