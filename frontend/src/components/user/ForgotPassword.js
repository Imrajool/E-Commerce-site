import { Fragment, useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import { toast } from "react-toastify";
import { clearAuthError, forgotPassword } from "../../actions/userActions";

export default function ForgotPassword(){
    const [email,setEmail]=useState("");
    const dispatch=useDispatch();
    const {loading,error,message}=useSelector(state => state.authState);

    const submitHandler=(e)=>{
        e.preventDefault();
        const payload = { email };
        dispatch(forgotPassword(payload));
    }

    useEffect(()=>{
        if(message){
            toast(message,{
                type:'success',
                position:"top-center"
            })
            setEmail("")
            return
        }
        if(error){
            toast(error,{
                type:'error',
                position:"top-center",
                onOpen: ()=> {dispatch(clearAuthError())}
            })
        }
    },[message,error,dispatch])
    return (
        <Fragment>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading}>
                            Send Email
                    </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}