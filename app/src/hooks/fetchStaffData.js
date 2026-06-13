import { useEffect, useState } from "react";
import supabase from '../utils/supabaseclient.js';

export const useDataFetcher = () => {
    const [records, setRecords] = useState([]);
    const [error, setError] = useState(null)

    const fetchUserData = async () => {
        const { data, error } = await supabase.from('staffs').select('UserID, Name, Department, Position, BaseSalary');

        if (error) {
            setError(error.message)
        } else {
            setRecords(data)
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    const totalEmployees = records.length;

    return { records, error, totalEmployees };
}