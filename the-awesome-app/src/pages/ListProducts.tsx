import axios from "axios";
import Product from "../models/Product";
import "./ListProducts.css";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useSelector } from "react-redux";
import type { AppState } from "../store/store";
import { useCallback, useContext, useMemo, useState } from "react";
import { AppThemeContext } from "../context/AppThemeContext";
import ProductView from "../components/ProductView";
import { Axios } from "../axios/Axios";


//const url = "/products";
const url = "/secure_products";

function ListProducts() {

  const navigate = useNavigate();
  const { products, setProducts } = useProducts(url);
  //const auth = useSelector((state: AppState) => state.auth);
  const themeContext = useContext(AppThemeContext);
  const [isMessageVisible, setMessageVisible] = useState(true);


   const handleDelete = useCallback( async (product: Product) => {
    try {
      const deleteUrl = url + "/" + product.id;
      //const headers = { Authorization: `Bearer ${auth.accessToken}` };
      await Axios.delete(deleteUrl);
      // await fetchProducts();
     
      
      // const index = products.findIndex(p => p.id === product.id);
      // if(index !== -1){
      //     products.splice(index, 1);
      // }

      //copy of products
      const copyOfProducts = [...products];
      const index = copyOfProducts.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        copyOfProducts.splice(index, 1);
        setProducts(copyOfProducts);
      }

      alert("deleted product " + product.id);
    } catch {
      alert("deleted product " + product.id);
    }
  }, [products])

  const handleEditProduct =useCallback( (product: Product) => {
    navigate("/products/" + product.id);
  }, [])


  const totalPrice = useMemo(() => {

    console.log("calculating the total price...");
    let totalPrice = 0;
    products.forEach(p => {
      if(p.price)
        totalPrice += p.price;
    })

    return totalPrice;

  }, [products])

  const mystyle = {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    backgroundColor: themeContext.mode === 'light'  ? 'lightblue' : 'lightgray'
  };
  return (
    <div>
      <h4>List Products</h4>
      <div className="alert alert-primary">Total Price: {totalPrice}</div>
      {isMessageVisible &&  <div className="alert alert-info">This is an example on data fetching using axios</div>}
      <button className="btn btn-info" onClick={() => setMessageVisible(!isMessageVisible)}>{isMessageVisible ? 'Hide ' : 'Show '} Info</button>


      <div style={mystyle}>
        {products.map((product) => (
          <ProductView key={product.id} product={product} onDelete={handleDelete} onEdit={handleEditProduct} />
        ))}
      </div>
    </div>
  );
}

export default ListProducts;
