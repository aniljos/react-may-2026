import axios from 'axios';
import { useEffect, useState } from 'react';
import Product from '../models/Product';
import './ListProducts.css'

const url = "http://localhost:9000/products";

function ListProducts(){

    const [products, setProducts] = useState<Product[]>([]);

    async function fetchProducts(){

        try {   
            const response = await axios.get<Product[]>(url);
            console.log("response", response.data);
            setProducts(response.data);
            

        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect( () => {

        fetchProducts();

    }, [])

    function handleDelete(product: Product){

        

    }
   

    const mystyle = {display: 'flex', flexFlow: 'row wrap', justifyContent: 'center'}
    return (
        <div>
            <h4>List Products</h4>
            <div style={mystyle}>
                {products.map(product => (
                    <div className='product' key={product.id}>
                        <p>Id: {product.id}</p>
                        <p>{product.name}</p>
                        <p>{product.description}</p>
                        <p>Price: {product.price}</p>
                        <div>
                            <button className='btn btn-danger' onClick={() => {handleDelete(product)}}>Delete</button>&nbsp;
                            <button className='btn btn-info'>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListProducts;