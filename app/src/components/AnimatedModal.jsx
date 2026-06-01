import { CheckCircle2, FileText, Upload, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedButton from "./AnimatedButton";

function AnimatedUploadModal({ closeModal }) {
    const activeStyle = "w-full mt-3 py-4 rounded-xl font-montserrat font-semibold flex items-center justify-center gap-2 bg-clx-green text-white tracking-widest hover:bg-clx-green2 transition-colors shadow-lg shadow-yellow-500/20";

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease:'easeInOut' }} 
                exit={{ opacity: 0, scale: 0.9, y: 20, duration: 5 }}
                onClick={() => closeModal(false)}
                className="ease-spring-soft fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg p-4">

                <AnimatePresence>
                    {error && 
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                onClick={(e) => e.stopPropagation()} 
                                className="fixed top-0 bg-white rounded-xl px-6 py-4 mt-4 z-50 shadow-lg">
                                <h1 className="text-red-500 font-semibold font-sm font-montserrat">{error}</h1>
                            </motion.div>
                    }
                </AnimatePresence>
                

                <motion.div
                    initial={{ scale: "90%" }} 
                    animate={{ scale: "100%" }}
                    onClick={(e) => e.stopPropagation()}
                    className="ease-spring-soft w-full max-w-xl bg-white rounded-2xl p-8 shadow-2xl flex flex-col max-h-[90vh]"
                >
                    {/*header*/}
                    <div className="flex justify-between items-center mb-6 shrink-0">
                        <span className="text-xl font-bold text-black">Upload CSV Files</span>
                        <span>
                            <X 
                                onClick={() => closeModal(false)}
                                className="text-gray-400 hover:text-red-700 transition cursor-pointer" />
                        </span>
                    </div>

                    {/*main*/}
                    <div>
                        <div className="border-2 border-dashed border-clx-green/50 rounded-xl p-10 flex flex-col items-center justify-center  transition-colors group cursor-pointer relative">
                            <input
                                type="file"
                                multiple
                                accept=".csv"
                                onChange={(e) => handleFileUpload(e)} 
                                className="absolute inset-0 opacity-0 cursor-pointer" />
                            <motion.div
                                whileHover={{ scale: 1.05 }} 
                                className="p-4 bg-clx-green/10 rounded-full mb-4">
                                <Upload className="text-clx-green" size={32} />
                            </motion.div>
                            <p className="text-black font-medium">Click or drag CSV files here</p>
                            <p className="text-gray-500 text-sm">Upload departmental work logs</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-clx-green font-bold uppercase tracking-wider mb-2">
                                {files.length} Files Selected
                            </p>
                        </div>
                        <div className="scrollbar-none border-2 border-dashed border-clx-green/50 rounded-xl px-2 py-2 mt-4 overflow-auto space-y-2 max-h-[20vh]">
                            {files.length > 0 && (
                                <div className="flex-stack gap-1">
                                    
                                    {files.map((i, idx) => 
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            key={idx} 
                                            className="flex items-center gap-3 bg-clx-green p-3 rounded-lg"
                                        >
                                            <FileText size={18} className="text-white" />
                                            <span className="truncate flex-1 text-white font-montserrat text-sm font-semibold tracking-widest">{i.name}</span>
                                            <CheckCircle2 size={16} className="text-white" />
                                        </motion.div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div>
                            {files.length > 0 && (
                                <AnimatedButton 
                                    stiffness={'800'}
                                    damping={'60'}
                                    style={`${activeStyle}`}
                                >Run Payroll
                                </AnimatedButton>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default AnimatedUploadModal;