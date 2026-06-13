import { useEffect, useState, useMemo } from "react";
import Papa from 'papaparse';
import supabase from "../utils/supabaseclient";
import { useDataFetcher } from "./fetchStaffData.js";

export const PayrollProcessor = () => {
    const [files, setFiles] = useState([]);
    const [CSVData, setCSVData] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState(null); // Will hold { text, type }
    const { records, totalEmployees } = useDataFetcher();

    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => {
            setMessage(null);
        }, 5000);

        return () => clearTimeout(timer);
    }, [message]);

    const showError = (text) => setMessage({ text, type: 'error' });
    const showSuccess = (text) => setMessage({ text, type: 'success' });
    const numberOfRows = CSVData.length;

    const handleFiles = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length === 0) {
            showError("No file selected");
            return;
        }
        const hasInvalidFile = selectedFiles.some(file => {
            return file.type !== 'text/csv' && !file.name.endsWith('.csv');
        });
        if (hasInvalidFile) {
            showError("Please upload valid CSV files only");
            return;
        }
        setMessage(null);
        selectedFiles.forEach((file) => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    if (results.data.length === 0) {
                        showError(`Warning: CSV file "${file.name}" is empty`);
                        return;
                    }
                    const taggedRows = results.data.map(row => ({
                        ...row,
                        origin_file_name: file.name
                    }));
                    setCSVData((prevRows) => [...prevRows, ...taggedRows]);
                    setFiles((prev) => [...prev, file]);
                },
                error: (parseError) => {
                    showError(`Failed to read ${file.name}: ${parseError.message}`);
                }
            });
        });
    };

    const computedPayroll = useMemo(() => {
        const uniqueDates = [...new Set(CSVData.map(log => log.Date).filter(Boolean))];
        const totalWorkDays = uniqueDates.length;

        return records.map(staff => {
            const staffLogs = CSVData.filter(log => Number(log['User ID']) === Number(staff.UserID));
            const checkInDates = new Set(staffLogs.filter(log => log.State === "Check-In").map(log => log.Date));
            const presentDays = checkInDates.size;
            
            const missedDays = totalWorkDays > 0 ? Math.max(0, totalWorkDays - presentDays) : 0;
            const dailyRate = totalWorkDays > 0 ? (staff.BaseSalary / totalWorkDays) : 0;
            const totalDeductions = missedDays * dailyRate;
            const netSalary = staff.BaseSalary - totalDeductions;

            return {
                ...staff,
                presentDays,
                totalWorkDays,
                totalDeductions,
                netSalary
            };
        });
    }, [records, CSVData]);

    const uploadFiles = async () => {   
        setIsUploading(true);
        try {
            const cleanPayload = CSVData.map(({ origin_file_name, ...rest }) => rest);
            const { error: supabaseError } = await supabase.from('payrollrecords').insert(cleanPayload);

            if (supabaseError) throw supabaseError;

            showSuccess(`Successfully uploaded ${numberOfRows} rows to SUPABASE`);
            setFiles([]);
            setCSVData([]);

        } catch (err) {
            showError(`Supabase Error: ${err.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveFile = (fileName) => {
        setFiles((prev) => prev.filter(f => f.name !== fileName));
        setCSVData((prev) => prev.filter(row => row.origin_file_name !== fileName));
    };

    const isPayrollCalculated = CSVData.length > 0;

    const resetProcessor = () => {
        setFiles([]);
        setCSVData([]);
        setMessage(null);
    };

    return { 
        files, 
        CSVData, 
        message, 
        isUploading, 
        numberOfRows, 
        computedPayroll, 
        isPayrollCalculated, 
        totalStaffCount: totalEmployees, 
        resetProcessor,
        handleFiles, 
        uploadFiles,
        handleRemoveFile 
    };  
};