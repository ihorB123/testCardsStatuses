import {useEffect, useState} from "react";
import axios from "axios";

export const useFetchedData = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setData(Object.values(response.data));
                setLoading(false);
            })
            .catch(error => {
                console.error("Fetching error:", error);
                setError(error);
                setLoading(false);
            });
    }, [url]);

    return { data, error, loading };
};