import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { usePayrollProcessor } from '../hooks/usePayrollProcessor';

const PayrollUploadModal = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState([]);
  const { processFiles, isProcessing } = usePayrollProcessor();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const startSync = async () => {
    // Pass the actual files length to your processor if needed for day-based logic
    const success = await processFiles(files, '2026-05-01');
    if (success) {
      alert("Payroll processed successfully!");
      setFiles([]);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-lg bg-[#121212] border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 shrink-0">
              <h2 className="text-xl font-bold text-white">Upload Payroll Data</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition p-1">
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Area Starts Here */}
            <div className="overflow-y-auto pr-2 custom-scrollbar">
              {/* Dropzone Area */}
              <div 
                className="border-2 border-dashed border-white/10 rounded-xl p-10 flex flex-col items-center justify-center hover:border-yellow-500/50 transition-colors group cursor-pointer relative"
              >
                <input 
                  type="file" 
                  multiple 
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="p-4 bg-yellow-500/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="text-yellow-500" size={32} />
                </div>
                <p className="text-gray-300 font-medium">Click or drag CSV files here</p>
                <p className="text-gray-500 text-sm">Upload departmental work logs</p>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-6 space-y-2">
                  <p className="text-sm text-yellow-500 font-bold uppercase tracking-wider mb-2">
                    {files.length} Files Selected
                  </p>
                  {files.map((file, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={idx} 
                      className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5"
                    >
                      <FileText size={18} className="text-yellow-500" />
                      <span className="text-sm text-gray-200 truncate flex-1">{file.name}</span>
                      <CheckCircle2 size={16} className="text-green-500" />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            {/* Scrollable Area Ends Here */}

            {/* Action Button - Shrink-0 keeps it from disappearing */}
            <button
              onClick={startSync}
              disabled={files.length === 0 || isProcessing}
              className={`w-full mt-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
                files.length > 0 && !isProcessing
                ? 'bg-yellow-500 text-black hover:bg-yellow-400 shadow-lg shadow-yellow-500/20'
                : 'bg-white/5 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing {files.length} Files...
                </>
              ) : (
                `Run Payroll for ${files.length || '...'} Files`
              )}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PayrollUploadModal;