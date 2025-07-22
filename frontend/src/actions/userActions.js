import axios from 'axios';
import {
    loginRequest,
    loginSuccess,
    loginFail,
    clearError, 
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    clearUpdateProfile,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
} from '../slices/authSlice';

export const login =(email , password)=> async(dispatch)=>{

    try {
        dispatch(loginRequest());
        const config = {
            headers: { 'Content-Type': 'application/json' },
            
        };
        const{data}=await axios.post(`/api/v1/login`, {email,password},config)
        dispatch(loginSuccess(data))
    } catch (error) {
        dispatch(loginFail(error.response.data.message))
    }
};

const token = localStorage.getItem("token");

export const clearAuthError =()=> (dispatch) =>{
    dispatch(clearError());
}

export const register =(UserData)=> async(dispatch)=>{

    try {
        dispatch(registerRequest());
        const config = {
            headers:{
                'Content-type':'multipart-form-data'
            }
        }
        const{data}=await axios.post(`/api/v1/register`,UserData,config)
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }
};

export const loadUser = async(dispatch)=>{

    try {
        dispatch(loadUserRequest());
    
        const{data}=await axios.get(`/api/v1/myprofile`,{withCredentials:true})
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }
};

export const logoutUser = async(dispatch)=>{

    try {
        await axios.get(`/api/v1/logout`)
        localStorage.removeItem("token");
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFail())
    }
};

export const updateProfile =(UserData)=> async(dispatch)=>{

    try {
        dispatch(updateProfileRequest());
        const config = {
            headers: {
                'Content-Type': 'multipart-form-data',
                'Authorization': `Bearer ${token}`
            },
        };
        const{data}=await axios.put(`/api/v1/myprofile/updateProfile`,UserData,config)
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
    }
};
export const ClearUpdateProfile =()=> (dispatch) =>{
    dispatch(clearUpdateProfile());
}

export const updatePassword =(FormData)=> async(dispatch)=>{

    try {
        dispatch(updatePasswordRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true // ✅ if you use cookies for auth
        };
        await axios.put(`/api/v1/myprofile/password/change`,FormData,config)
        dispatch(updatePasswordSuccess())
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message))
    }
};

export const forgotPassword =(payload) => async(dispatch)=>{

    try {
        dispatch(forgotPasswordRequest())
       
        const{data}=await axios.post(`/api/v1/password/forgot`,payload)
        dispatch(forgotPasswordSuccess(data))
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message))
    }
};

export const resetPassword =(formData,token) => async(dispatch)=>{

    try {
        dispatch(resetPasswordRequest())
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const{data}=await axios.post(`/api/v1/password/reset/${token}`,formData,config)
        dispatch(resetPasswordSuccess(data))
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
    }
};
