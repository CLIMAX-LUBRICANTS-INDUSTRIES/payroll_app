import { useEffect, useState } from "react";
import Papa from 'papaparse';

export const PayrollProcessor = () => {
    const [files, setFiles] = useState([])
    const [error, setError] = useState('')
    const [CSVData, setCSVData] = useState([])

    useEffect(() => {
        if (!error) return;
        const timer = setTimeout(() => {
            setError('');
        }, 3000)

        return () => clearTimeout(timer)
    }, [error])

    const handleFileUpload = (e) => {
        // handling fetching files
        const selectedFiles = Array.from(e.target.files);
        
        selectedFiles.forEach((file) => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    console.log(results.data)
                    setCSVData((prevRows) => [...prevRows, ...results.data])
                },
                error: (parseError) => {
                    setError(`Failed to read ${file.name}: ${parseError.message}`)
                }
            })
        })
        // handling errors
        if (selectedFiles === 0) {
            setError(`No file selected`);
            return;
        }

        const hasInvalidFile = selectedFiles.some(file => {
            return file.type !== 'text/csv' && !file.name.endsWith('.csv');
        })

        if (hasInvalidFile) {
            setError(`Please Upload valid CSV files only`);
            return;
        }

        setError('')
        setFiles((prev) => [...prev, ...selectedFiles])
        console.log("files: ", selectedFiles)
    }

    return { files, CSVData, error }

}