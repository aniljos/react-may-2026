// http://localhost:5173/products/1
// http://localhost:5173/products/2

import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import Product from "../models/Product";

function EditProduct(){

    const [product, setProduct] = useState<Product>(new Product(0, "", 0, ""));
    const params = useParams();

    const id = params.id;

    useEffect(() => {

        async function fetchData(){
            const response = await axios.get<Product>("http://localhost:9000/products/" + id);
            setProduct(response.data);
        }
        fetchData();

    }, [])

    function handleNameChange(e: ChangeEvent<HTMLInputElement>){

        // const value = e.target.value;
        // const copy = {...product};
        // copy.name = value;
        // setProduct(copy);

        setProduct({...product, name: e.target.value});
    }

    return (
        <div>
            <h4>Edit Product : {id}</h4>

            <div className="form-group">
                 <label htmlFor="name">Name</label>
                 <input type="text" id="name" className="form-control" placeholder="Name" 
                            value={product.name} onChange={handleNameChange}/>   
            </div>
            <div className="form-group">
                 <label htmlFor="desc">Description</label>
                 <input type="text" id="desc" className="form-control" 
                        placeholder="Description" value={product.description} 
                        onChange={e => setProduct({...product, description: e.target.value})} />   
            </div>
            <div className="form-group">
                 <label htmlFor="price">Price</label>
                 <input type="number" id="price" className="form-control" 
                        placeholder="Price" value={product.price} onChange={e => setProduct({...product, price: e.target.valueAsNumber})}/>   
            </div>
            <br />
            <div>
                <button className="btn btn-success">Save</button>&nbsp;
                <button className="btn btn-warning">Cancel</button>
            </div>
        </div>
    )
}

export default EditProduct;