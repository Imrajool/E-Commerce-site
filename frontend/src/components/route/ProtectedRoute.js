import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from '../layouts/Loader';

export default function ProtectedRoute ({children,isAdmin}){
    const {isAuthenticate, loading, user}=useSelector(state => state.authState)
    if(!isAuthenticate && !loading){
        return <Navigate to={'/login'} />
    }
    if(isAuthenticate ){
        if(isAdmin === true && user.role !== 'admin'){
            return <Navigate to={'/'} />
        }
        return children;
    }
    
    if(loading){
        return <Loader/>
    }
}