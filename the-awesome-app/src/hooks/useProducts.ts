import {useSelector} from 'react-redux';
import type { AppState } from '../store/store';
import Product from '../models/Product';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../axios/Axios';


// useData<T>(url, isSecure)  => customers, products, orders 

export function useProducts(url: string){

    const [products, setProducts] = useState<Product[]>([]);
    const auth = useSelector((state: AppState) => state.auth);
    const navigate = useNavigate();

     async function fetchProducts(controller: AbortController){

        try {   

            if(!auth.isAuthenticated){
                navigate("/login");
                return;
            }
            // const headers = {"Authorization": `Bearer ${auth.accessToken}`};
            // const response = await axios.get<Product[]>(url, {headers});
            const response = await Axios.get<Product[]>(url, {signal: controller.signal});
            console.log("response", response.data);
            setProducts(response.data);
            

        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect( () => {

        const controller = new AbortController();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProducts(controller);

        return ()=> {
            controller.abort();
        }

    }, [])

    return {products, setProducts, fetchProducts};
}