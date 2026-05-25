import {useSelector} from 'react-redux';
import type { AppState } from '../store/store';
import Product from '../models/Product';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


// useData<T>(url, isSecure)  => customers, products, orders 

export function useProducts(url: string){

    const [products, setProducts] = useState<Product[]>([]);
    const auth = useSelector((state: AppState) => state.auth);
    const navigate = useNavigate();

     async function fetchProducts(){

        try {   

            if(!auth.isAuthenticated){
                navigate("/login");
                return;
            }
            const headers = {"Authorization": `Bearer ${auth.accessToken}`};
            const response = await axios.get<Product[]>(url, {headers});
            console.log("response", response.data);
            setProducts(response.data);
            

        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect( () => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProducts();

    }, [])

    return {products, setProducts, fetchProducts};
}