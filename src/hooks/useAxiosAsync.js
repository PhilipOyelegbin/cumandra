import { useEffect, useState } from 'react';
import {axiosInstance} from './axiosInstance';

export const useAxiosGet = (url) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosInstance.get(url);
                setData(res?.data);
                setLoading(false);
            } catch (error) {
                setError(error?.message && "Unable to load data!");
                setLoading(false);
            }
        };
        getData();
    }, [url])

    return (
        {loading, error, data}
    );
}

// export const useAxiosPost = (url, user) => {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const createData = async () => {
//             try {
//                 const res = await axiosInstance.post(url, user);
//                 setUser(res?.data);
//                 setLoading(false);
//             } catch (error) {
//                 setError(error?.response?.data?.error && "Unable to create user!");
//                 setLoading(false);
//             }
//         };
//         createData();
//     }, [url])

//     return (
//         {loading, error}
//     );
// }