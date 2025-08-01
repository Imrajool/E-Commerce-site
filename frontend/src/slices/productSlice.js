import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    name:'product',
    initialState:{
      loading:false,
      product:{},
      isReviewSubmitted:false,
      isProductCreated:false
    },
    reducers : {
        productRequest(state,action){
            return {
                ...state,
                loading:true
            }
        },
        productSuccess(state,action){
            return{
                ...state,
                loading:false,
                product:action.payload.product
            }
        },
        productFail(state,action){
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        },
        createReviewRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        createReviewSuccess(state,action){
            return{
                ...state,
                loading:false,
                isReviewSubmitted:true
            }
        },
        createReviewFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        clearReviewSubmitted(state,action){
            return{
                ...state,
                isReviewSubmitted:false
            }
        },
        clearError(state,action){
            return{
                ...state,
                error:null
            }
        },
        newProductRequest(state,action){
            return {
                ...state,
                loading:true
            }
        },
        newProductSuccess(state,action){
            return{
                ...state,
                loading:false,
                product:action.payload.product,
                isProductCreated:true
            }
        },
        newProductFail(state,action){
            return {
                ...state,
                loading:false,
                isProductCreated:false,
                error:action.payload
            }
        },
        clearIsProductCreated(state,action){
            return{
                ...state,
                isProductCreated:false
            }
        }

    }
})

const {actions , reducer}=productSlice;

export const{
    productRequest,
    productSuccess,
    productFail,
    createReviewRequest,
    createReviewSuccess,
    createReviewFail,
    clearReviewSubmitted,
    clearError,
    newProductFail,
    newProductRequest,
    newProductSuccess,
    clearIsProductCreated
} =actions;

export default reducer;