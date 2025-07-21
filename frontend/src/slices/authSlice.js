import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState:{
      loading:true,
      isAuthenticate:false
    },
    reducers : {
        loginRequest(state,action){
            return {
                ...state,
                loading:true
            }
        },
        loginSuccess(state,action){
            return{
                loading:false,
                isAuthenticate:true,
                user:action.payload.user
            }
        },
        loginFail(state,action){
            return {
                ...state,
                loading:false
            }
        },
        clearError(state,action){
            return {
                ...state,
                error: null
            }
        },
        registerRequest(state,action){
            return {
                ...state,
                loading:true
            }
        },
        registerSuccess(state,action){
            return{
                loading:false,
                isAuthenticate:true,
                user:action.payload.user
            }
        },
        registerFail(state,action){
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        },
        loadUserRequest(state,action){
            return {
                ...state,
                isAuthenticate:false,
                loading:true
            }
        },
        loadUserSuccess(state,action){
            return{
                loading:false,
                isAuthenticate:true,
                user:action.payload.user
            }
        },
        loadUserFail(state,action){
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        },
        logoutSuccess(state,action){
            return{
                loading:false,
                isAuthenticate:false
            }
        },
        logoutFail(state,action){
            return {
                ...state,
                error:action.payload
            }
        },
        updateProfileRequest(state,action){
            return {
                ...state,
                loading:true,
                isUpdated:false
            }
        },
        updateProfileSuccess(state,action){
            return{
                loading:false,
                isAuthenticate:true,
                user:action.payload.user,
                isUpdated:true
            }
        },
        updateProfileFail(state,action){
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        },
        clearUpdateProfile(state,action){
            return {
                ...state,
                loading:false,
                isUpdated:false
            }
        },
        updatePasswordRequest(state,action){
            return {
                ...state,
                loading:true,
                isUpdated:false
            }
        },
        updatePasswordSuccess(state,action){
            return{
                loading:false,
                isAuthenticate:true,
                isUpdated:true
            }
        },
        updatePasswordFail(state,action){
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        },
        forgotPasswordRequest(state,action){
            return {
                ...state,
                loading:true,
                message:null
             
            }
        },
        forgotPasswordSuccess(state,action){
            return{
                ...state,
                loading:false,
                message:action.payload.message
            }
        },
        forgotPasswordFail(state,action){
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        },
        resetPasswordRequest(state,action){
            return {
                ...state,
                loading:true,
             
            }
        },
        resetPasswordSuccess(state,action){
            return{
                ...state,
                loading:false,
                isAuthenticate:true,
                user:action.payload.user
            }
        },
        resetPasswordFail(state,action){
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        }
    }
})

const {actions , reducer}=authSlice;

export const{
    loginRequest,
    loginSuccess,
    loginFail,
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
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
} =actions;

export default reducer;