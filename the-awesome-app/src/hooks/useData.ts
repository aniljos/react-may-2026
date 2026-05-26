import axios from 'axios';
import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { AppState } from '../store/store';

export type UseDataResult<T> = {
    data: T[];
    setData: Dispatch<SetStateAction<T[]>>;
    fetchData: () => Promise<void>;
};

export function useData<T>(url: string, isSecure = true): UseDataResult<T> {

    const [data, setData] = useState<T[]>([]);
    const auth = useSelector((state: AppState) => state.auth);
    const navigate = useNavigate();

    async function fetchData() {
        try {
            if (isSecure && !auth.isAuthenticated) {
                navigate("/login");
                return;
            }

            const headers = isSecure
                ? { Authorization: `Bearer ${auth.accessToken}` }
                : undefined;
            const response = await axios.get<T[]>(url, { headers });

            setData(response.data);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
       
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void fetchData();
        
    }, []);

    return { data, setData, fetchData };
}
