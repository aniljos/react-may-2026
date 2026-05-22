import axios from 'axios';
import { useEffect, useState } from 'react';
import Product from '../models/Product';
import './ListProducts.css'
import { useNavigate } from 'react-router-dom';

const url = "http://localhost:9000/products";

function ListProducts(){

    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

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

    async function handleDelete(product: Product){

        try {
            
            const deleteUrl = url + "/" + product.id;            
            await axios.delete(deleteUrl);
           // await fetchProducts();
            // const index = products.findIndex(p => p.id === product.id);
            // if(index !== -1){
            //     products.splice(index, 1);
            // }

            //copy of products
            const copyOfProducts = [...products];
            const index = copyOfProducts.findIndex(p => p.id === product.id);
            if(index !== -1){
                copyOfProducts.splice(index, 1);
                setProducts(copyOfProducts);
            }

            alert("deleted product " + product.id);

        } catch {

            alert("deleted product " + product.id);
        }

    }

    function handleEditProduct(product: Product){
        navigate("/products/" + product.id);
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
                            <button className='btn btn-info' onClick={() => handleEditProduct(product)}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListProducts;