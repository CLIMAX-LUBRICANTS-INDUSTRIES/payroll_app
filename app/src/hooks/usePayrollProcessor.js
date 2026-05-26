import { useState } from 'react';
import Papa from 'papaparse';
import supabase from '/supabase-client';

export const usePayrollProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const processFiles = async (files, targetMonth) => {
    setIsProcessing(true);
    const totalFiles = files.length; // The total possible workdays for the month

    try {
      // 1. FETCH: Get all employees to know their base salaries
      const { data: employees, error: fetchError } = await supabase
        .from('Staffs')
        .select('id, fixed_salary, full_name');

      if (fetchError) throw fetchError;

      // 2. PARSE: Read all uploaded CSVs into one big array
      const parsePromises = Array.from(files).map((file) => {
        return new Promise((resolve) => {
          Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => resolve(results.data),
          });
        });
      });

      const resultsArray = await Promise.all(parsePromises);
      const allAttendanceRows = resultsArray.flat();

      // 3. AGGREGATE: Count how many days each employee was present
      const attendanceMap = {};
      allAttendanceRows.forEach((row) => {
        const id = row.employee_id;
        if (id) {
          attendanceMap[id] = (attendanceMap[id] || 0) + 1;
        }
      });

      // 4. CALCULATE: Compare expected days vs. actual attendance
      const finalPayrollRecords = employees.map((emp) => {
        const daysPresent = attendanceMap[emp.id] || 0;
        const daysAbsent = totalFiles - daysPresent;
        
        const dailyRate = emp.base_salary / totalFiles;
        const totalDeductions = daysAbsent * dailyRate;

        return {
          employee_id: emp.id,
          payroll_month: targetMonth,
          gross_salary: emp.base_salary,
          deductions: Number(totalDeductions.toFixed(2)), // Clean currency format
          status: 'pending'
        };
      });

      // 5. SYNC: Upload the calculated payroll to Supabase
      const { error: upsertError } = await supabase
        .from('payroll_records')
        .upsert(finalPayrollRecords, { onConflict: 'employee_id, payroll_month' });

      if (upsertError) throw upsertError;

      setIsProcessing(false);
      return true;
    } catch (err) {
      console.error("Logic Error:", err.message);
      setIsProcessing(false);
      return false;
    }
  };

  return { processFiles, isProcessing };
};