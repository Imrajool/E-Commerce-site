import { Fragment, useEffect, useState } from "react";
import MetaData from '../layouts/MetaData'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from "react-redux";
import { register,clearAuthError } from "../../actions/userActions";
import { useNavigate } from 'react-router-dom';

export default function Register(){
    const [userData,setUserData]=useState({
        name:"",
        email:"",
        password:""
    })
    const [avatar,setAvatar]=useState("")
    const [avatarPreview,setAvatarPreview]=useState("/images/default_avatar.png")
    const {error,loading,isAuthenticate}= useSelector(state => state.authState)
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const onChange =(e)=>{
        if(e.target.name === 'avatar'){
            const reader=new FileReader();
            
            reader.onload=()=>{
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result)
                    setAvatar(e.target.files[0])
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }else{
            setUserData({...userData, [e.target.name]:e.target.value})
        }
    }
    
    const submitHandler=(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('name',userData.name)
        formData.append('email',userData.email)
        formData.append('password',userData.password)
        formData.append('avatar',avatar)
        dispatch(register(formData))
    }

    useEffect(()=>{
        toast(error, { 
            position: "top-center",
            type: 'error',
            onOpen: () =>  dispatch(clearAuthError()) // ✅ Correct function call
        })
    },[error,dispatch])
    useEffect(() => {
        if (isAuthenticate) {
            navigate('/');
            toast.success('Login Successful', {
                position: 'top-center',
            });
        }
    }, [isAuthenticate, navigate]);

    return(
        <Fragment>
            <MetaData title={`Register`}/>
            <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                    <h1 className="mb-3">Register</h1>

                <div className="form-group">
                    <label htmlFor="email_field">Name</label>
                    <input type="name" name="name" id="name_field" className="form-control" onChange={onChange} />
                </div>

                    <div className="form-group">
                    <label htmlFor="email_field">Email</label>
                    <input
                        name="email"
                        type="email"
                        id="email_field"
                        className="form-control"
                        onChange={onChange}
                    />
                    </div>
        
                    <div className="form-group">
                    <label htmlFor="password_field">Password</label>
                    <input
                        name="password"
                        type="password"
                        id="password_field"
                        className="form-control"
                        onChange={onChange}
                    />
                    </div>

                    <div className='form-group'>
                    <label htmlFor='avatar_upload'>Avatar</label>
                    <div className='d-flex align-items-center'>
                        <div>
                            <figure className='avatar mr-3 item-rtl'>
                                <img
                                    src={avatarPreview}
                                    className='rounded-circle'
                                    alt='profile'
                                />
                            </figure>
                        </div>
                        <div className='custom-file'>
                            <input
                                type='file'
                                name='avatar'
                                onChange={onChange}
                                className='custom-file-input'
                                id='customFile'
                            />
                            <label className='custom-file-label' htmlFor='customFile'>
                                Choose Avatar
                            </label>
                        </div>
                    </div>
                </div>
        
                <button
                    id="register_button"
                    type="submit"
                    className="btn btn-block py-3"
                    disabled={loading}
                >
                    REGISTER
                </button>
                </form>
            </div>
            </div>
        </Fragment>
    )
}