// http://localhost:5173/products/1
// http://localhost:5173/products/2

import axios from "axios";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../models/Product";
import Toast, { type ToastHandle } from "../components/Toast";

function EditProduct(){

    const [product, setProduct] = useState<Product>(new Product(0, "", 0, ""));
    const params = useParams();
    const navigate = useNavigate();
    const toastRef = useRef<ToastHandle>(null);

    const id = params.id;

    useEffect(() => {

        async function fetchData(){
            const response = await axios.get<Product>("http://localhost:9000/products/" + id);
            setProduct(response.data);
        }
        fetchData();

    }, [])

    async function handleSave() {
        try {
            await axios.put(`http://localhost:9000/products/${id}`, product);
            toastRef.current?.show({
                title: "Success",
                text: "Product updated successfully",
            });

            setTimeout(() => {
                navigate("/products");
            }, 1200);
        } catch (error) {
            console.log("save product error", error);
            toastRef.current?.show({
                title: "Error",
                text: "Unable to update the product",
            });
        }
    }

    function handleCancel() {
        navigate("/products");
    }

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
                <button className="btn btn-success" onClick={handleSave}>Save</button>&nbsp;
                <button className="btn btn-warning" onClick={handleCancel}>Cancel</button>
            </div>
            <Toast ref={toastRef}/>
        </div>
    )
}

export default EditProduct;
