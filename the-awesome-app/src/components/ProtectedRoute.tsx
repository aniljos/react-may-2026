import { useSelector } from "react-redux";
import type { AppState } from "../store/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute(){

    const auth = useSelector((state: AppState) => state.auth);
    const location = useLocation();
    

    if(!auth.isAuthenticated){
        return <Navigate to="/login" replace={true} state={{from: location.pathname}}/>
    }


    return <Outlet/>

}

export default ProtectedRoute;