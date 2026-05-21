// http://localhost:5173/products/1
// http://localhost:5173/products/2

import { useParams } from "react-router-dom";

function EditProduct(){

    const params = useParams();

    const id = params.id;

    return (
        <div>
            <h4>Edit Product : {id}</h4>
        </div>
    )
}

export default EditProduct;