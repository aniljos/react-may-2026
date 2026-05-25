import axios from "axios";
import Product from "../models/Product";
import "./ListProducts.css";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useSelector } from "react-redux";
import type { AppState } from "../store/store";


//const url = "http://localhost:9000/products";
const url = "http://localhost:9000/secure_products";

function ListProducts() {

  const navigate = useNavigate();
  const { products, setProducts } = useProducts(url);
  const auth = useSelector((state: AppState) => state.auth);

  async function handleDelete(product: Product) {
    try {
      const deleteUrl = url + "/" + product.id;
      const headers = { Authorization: `Bearer ${auth.accessToken}` };
      await axios.delete(deleteUrl, { headers });
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
  }

  function handleEditProduct(product: Product) {
    navigate("/products/" + product.id);
  }

  const mystyle = {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
  };
  return (
    <div>
      <h4>List Products</h4>
      <div style={mystyle}>
        {products.map((product) => (
          <div className="product" key={product.id}>
            <p>Id: {product.id}</p>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <div>
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleDelete(product);
                }}
              >
                Delete
              </button>
              &nbsp;
              <button
                className="btn btn-info"
                onClick={() => handleEditProduct(product)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListProducts;
