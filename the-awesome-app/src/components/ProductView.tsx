//  <ProductView product={p}/>

import type React from "react";
import type Product from "../models/Product"
import { memo } from "react";

type ProductViewProps = {
    product: Product;
    onDelete: (product: Product) => void;
    onEdit: (product: Product) => void;
}

// function ProductView(props: ProductViewProps){
//     return <>
//     </>
// }

const ProductView: React.FC<ProductViewProps>  = memo( function ProductView({product, onDelete, onEdit}) {

    console.log("prodictview rendering", product.id);

    return (
         <div className="product" key={product.id}>
            <p>Id: {product.id}</p>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <div>
              <button
                className="btn btn-danger"
                onClick={() => {
                   onDelete(product);
                }}
              >
                Delete
              </button>
              &nbsp;
              <button
                className="btn btn-info"
                onClick={() =>{ 
                    onEdit(product)
                }}
              >
                Edit
              </button>
            </div>
          </div>
    )
})



export default ProductView;