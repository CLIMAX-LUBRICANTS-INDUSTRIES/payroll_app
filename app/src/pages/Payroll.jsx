import { Search, Upload } from "lucide-react";
import pfp from '../assets/download.jpg';
import { useDataFetcher } from "../hooks/fetchStaffData";
import AnimatedButton from "../components/AnimatedButton";
import { useState } from "react";
import AnimatedUploadModal from "../components/AnimatedModal";


function Payroll() {
    const { records } = useDataFetcher();
    const activeStyle = "flex items-center gap-2 bg-clx-green hover:bg-clx-green2 px-8 py-3 text-white font-montserrat font-medium text-sm rounded-sm";

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const getMonth = months[new Date().getMonth()]
    
    const [modal, setModal] = useState(false)

    const handleOpenModal = () => {
        setModal(true)
    }

    
    return(
        <section>
            {/*top section*/}
            <div className="h-[90vh] bg-white rounded-3xl px-8 py-6 flex-stack gap-3">
                {/*search bar*/}
                <div className="text-black/50 px-2">
                    <Search
                        className="absolute mt-1"
                        size={16}/>
                    <form>
                        <input
                        placeholder="Search Employee by name or role"
                        className="w-full ml-6 focus:outline-none focus:text-black"/>
                    </form>
                </div>

                {/*header*/}
                <div className="flex items-center justify-between px-2">
                    <h1 className="text-gray-800 font-black text-4xl">Payroll</h1>
                    <div className="flex items-center gap-4 ">
                        <AnimatedButton 
                            onClickFunction={handleOpenModal}
                            style={activeStyle}><Upload size={14}/>Upload CSV</AnimatedButton>
                        <hr className="border-r border-black/30 h-8" />

                        {modal && <AnimatedUploadModal closeModal={setModal} />}


                        <div className="flex items-center gap-3">
                            <img src={pfp} className="h-16 rounded-full border-2 border-clx-green shadow-lg"/>
                            <div>
                                <h1 className="text-sm font-bold truncate w-32">Isaac Johnson</h1>
                                <h2 className="text-[12px] text-gray-500">Super Admin</h2>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/*2nd header*/}
                <div className="flex gap-2 items-center text-gray-700 px-2">
                    <h1 className="font-semibold">Employee Salary Table</h1>
                    <hr className="border-r h-4" />
                    <h1 className="font-semibold">Payroll period: <span className="text-clx-green font-bold">{getMonth}</span>, 2026</h1>
                </div>

                {/*table*/}
                <div className="overflow-auto  scrollbar-none mt-5 rounded-2xl shadow-2xl">
                    <table className="min-w-full table-fixed text-left">
                        <thead className="sticky top-0 text-xs bg-clx-green text-white">
                            <tr>
                                <th className="px-6 py-2">Id</th>
                                <th className="px-6 py-2">Name</th>
                                <th className="px-6 py-2">Fixed Salary</th>
                                <th className="px-6 py-2">Deduction</th>
                                <th className="px-6 py-2">Net Salary</th>
                                <th className="px-6 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-black font-normal text-[16px]">
                            {records.map(record => 
                                <tr key={record.id}>
                                    <td className="px-6 py-2">{record.id}</td>
                                    <td className="px-6 py-2">{record.full_name}</td>
                                    <td className="px-6 py-2">{record.fixed_salary}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Payroll;