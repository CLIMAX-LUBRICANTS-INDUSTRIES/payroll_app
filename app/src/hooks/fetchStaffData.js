import { useEffect, useState } from "react";
import supabase from '../utils/supabaseclient.js';

export function useDataFetcher() {
    const [records, setRecords] = useState([]);

    const fetchUserData = async () => {
        const { data, error } = await supabase.from('Staffs').select('id, full_name, fixed_salary');

        if (error) {
            alert(`Error fetching data: ${error.message}`)
        } else {
            setRecords(data)
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return { records };
}