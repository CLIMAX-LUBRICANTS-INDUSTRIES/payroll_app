import { useEffect, useState, useMemo } from "react";
import Papa from 'papaparse';
import supabase from "../utils/supabaseclient";
import { useDataFetcher } from "./fetchStaffData.js";

export const PayrollProcessor = () => {
    const [files, setFiles] = useState([]);
    const [CSVData, setCSVData] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState(null); // Will hold { text, type }
    const { records } = useDataFetcher();

    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => {
            setMessage(null);
        }, 5000);

        return () => clearTimeout(timer);
    }, [message]);

    const showError = (text) => setMessage({ text, type: 'error' });
    const showSuccess = (text) => setMessage({ text, type: 'success' });
    const numberOfRows = CSVData.length

    const handleFiles = (e) => {
        const selectedFiles = Array.from(e.target.files);
        // handle errors
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
        // Process the files since they passed validation
        selectedFiles.forEach((file) => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    console.log(results.data)
                    // Check if headers exist but row content is empty
                    if (results.data.length === 0) {
                        showError(`Warning: CSV file "${file.name}" is empty`);
                        return;
                    }
                    // Tag rows with their origin filename so we can delete them cleanly later if needed
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
        // 1. Calculate total unique operational days found in the uploaded file
        // ZKTeco keys are PascalCase ('Date') based on our Python extractor script schema
        const uniqueDates = [...new Set(CSVData.map(log => log.Date).filter(Boolean))];
        const totalWorkDays = uniqueDates.length;

        // 2. Map through Supabase staff rows and merge data points
        return records.map(staff => {
            // Find logs matching this staff's primary database UserID
            // Handles both string or number types coming from hardware logs securely
            const staffLogs = CSVData.filter(log => Number(log['User ID']) === Number(staff.UserID));
            
            // Extract unique dates this employee was actually checked in
            const checkInDates = new Set(staffLogs.filter(log => log.State === "Check-In").map(log => log.Date));
            const presentDays = checkInDates.size;
            
            // Deductions math: Only penalize if files are uploaded
            const missedDays = totalWorkDays > 0 ? Math.max(0, totalWorkDays - presentDays) : 0;
            const dailyRate = totalWorkDays > 0 ? (staff.BaseSalary / totalWorkDays) : 0;
            const totalDeductions = missedDays * dailyRate;
            const netSalary = staff.BaseSalary - totalDeductions;

            return {
                ...staff, // Inherits UserID, Name, Department, Position, BaseSalary
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
            console.log(cleanPayload)

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

    return { files, CSVData, message, isUploading, numberOfRows, computedPayroll, handleFiles, uploadFiles, handleRemoveFile };
};