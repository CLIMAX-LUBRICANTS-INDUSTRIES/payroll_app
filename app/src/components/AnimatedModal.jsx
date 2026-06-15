import { CheckCircle2, FileText, Loader2, Upload, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedButton from "./AnimatedButton";
import { useOutletContext } from "react-router-dom";

function AnimatedUploadModal({ closeModal }) {
    const activeStyle = "w-full mt-3 py-4 rounded-xl font-montserrat font-semibold bg-clx-green text-white tracking-widest hover:bg-clx-green2 transition-colors shadow-lg flex items-center justify-center gap-2";
    
    const { 
        files, 
        message, 
        isUploading, 
        numberOfRows, 
        handleFiles, 
        uploadFiles 
    } = useOutletContext();
    
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                exit={{ opacity: 0 }}
                onClick={() => closeModal(false)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl p-4"
            >
                <AnimatePresence>
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            onClick={(e) => e.stopPropagation()} 
                            className={`fixed top-0 rounded-xl px-6 py-4 mt-4 z-50 shadow-lg text-sm font-semibold font-montserrat ${
                                message.type === 'error' 
                                    ? 'bg-red-50 text-red-500 border border-red-100' 
                                    : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            }`}
                        >
                            {message.text}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ scale: 0.9 }} 
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-xl bg-white rounded-2xl p-8 shadow-2xl flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6 shrink-0">
                        <span className="text-xl font-bold text-black">Upload CSV Files</span>
                        <button onClick={() => closeModal(false)} className="cursor-pointer">
                            <X className="text-gray-400 hover:text-red-700 transition" size={20} />
                        </button>
                    </div>

                    {/* Main */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="border-2 border-dashed border-clx-green/50 rounded-xl p-10 flex flex-col items-center justify-center transition-colors group cursor-pointer relative font-montserrat hover:bg-clx-green/5">
                            <input
                                type="file"
                                multiple
                                accept=".csv"
                                onChange={(e) => handleFiles(e)} 
                                className="absolute inset-0 opacity-0 cursor-pointer" 
                            />
                            <div className="p-4 bg-clx-green/10 rounded-full mb-4">
                                <Upload className="text-clx-green" size={32} />
                            </div>
                            <p className="text-black font-medium text-base">Click or drag CSV files here</p>
                            <p className="text-gray-500 text-sm">Upload departmental work logs</p>
                        </div>
                        
                        <div className="mt-4">
                            <p className="text-sm text-clx-green font-semibold font-montserrat uppercase tracking-wider mb-2">
                                {files.length} Files Selected, {numberOfRows} Rows selected
                            </p>
                        </div>

                        <div className="scrollbar-none border-2 border-dashed border-clx-green/50 rounded-xl px-2 py-2 mt-4 overflow-y-auto space-y-2 max-h-[20vh]">
                            {files.length > 0 && (
                                <div className="flex flex-col gap-1">
                                    {files.map((file, idx) => (
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            key={idx} 
                                            className="flex items-center gap-3 bg-clx-green p-3 rounded-lg"
                                        >
                                            <FileText size={18} className="text-white shrink-0" />
                                            <span className="truncate flex-1 text-white font-montserrat text-sm font-semibold tracking-widest">
                                                {file.name}
                                            </span>
                                            <CheckCircle2 size={16} className="text-white shrink-0" />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            {files.length > 0 && (
                                <AnimatedButton
                                    whileHover={{ scale: 1.01 }}
                                    onClickFunction={uploadFiles}
                                    disabled={isUploading}
                                    stiffness={'800'}
                                    damping={'60'}
                                    style={activeStyle}
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        "Run Payroll"
                                    )}
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