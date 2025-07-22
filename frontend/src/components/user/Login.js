import { Fragment, useState, useEffect } from "react"
import MetaData from '../layouts/MetaData'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { clearAuthError, login } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function Login(){

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("");
    const {loading,error,isAuthenticate}= useSelector(state => state.authState)

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location = useLocation();

    const redirect = location.search?'/'+location.search.split('=')[1]:'/';

    const loginHandler = (e)=>{
       e.preventDefault();
       dispatch(login(email,password))
    }
     useEffect(()=>{
            // if(error){
            //     toast(error,{ 
            //         position: "top-center",
            //         type:'error',
            //         onOpen: ()=>{ dispatch(clearAuthError)}
            //        })
            // }
            if(isAuthenticate){
                navigate(redirect)
                toast.success('Login Successful',{
                    position:'top-center'
                })
            }
            return
        },[isAuthenticate,navigate,dispatch])

    return(
        <Fragment>
            <MetaData title={`Login`}/>
            <div className="row wrapper"> 
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={loginHandler}>
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                
                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <Link to={'/password/forgot'} className="float-right mb-4">Forgot Password?</Link>
            
                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading}
                        >
                            LOGIN
                        </button>

                        <Link to={'/register'} className="float-right mt-3">New User?</Link>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}