import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePassword as updatePasswordAction,clearAuthError } from "../../actions/userActions";

export default function UpdatePassword(){
    const [newPassword,setPassword]=useState("");
    const [oldPassword,setOldPassword]=useState("");
    const dispatch = useDispatch();
    const {error,isUpdated} = useSelector(state => state.authState)

    const submitHandler = (e) =>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('oldPassword',oldPassword)
        formData.append('newPassword',newPassword)
        dispatch(updatePasswordAction(formData))
    }


    useEffect(()=>{
         if(isUpdated){
                    toast.success('Password Updated Successfully',{
                        position:'top-center'
                    })
                } 
        
                toast(error, { 
                    position: "top-center",
                    type: 'error',
                    onOpen: () =>  dispatch(clearAuthError()) // ✅ Correct function call
                })
        
                return
    },[error,isUpdated,dispatch])

    return (
        <Fragment>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={e => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={newPassword}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}