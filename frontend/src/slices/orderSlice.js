import { createSlice } from "@reduxjs/toolkit";

const orderSlice=createSlice({
    name:'order',
    initialState:{
      orderDetails:{},
      userOrders:[],
      review:{},
      loading:false
    },
    reducers : {
        createOrderRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },createOrderSuccess(state,action){
            return{
                ...state,
                loading:false,
                orderDetails:action.payload.order
            }
        },
        createOrderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        clearError(state,action){
            return{
                ...state,
                error:null,
            }
        },
        userOrdersRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        userOrderSuccess(state,action){
            return{
                ...state,
                loading:false,
                userOrders:action.payload.orders
            }
        },
        userOrderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        orderDetailRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        orderDetailSuccess(state,action){
            return{
                ...state,
                loading:false,
                orderDetails:action.payload.order
            }
        },
        orderDetailFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        
    }
})

const {actions , reducer}= orderSlice;

export const{
    createOrderRequest,
    createOrderSuccess,
    createOrderFail,
    clearError,
    userOrdersRequest,
    userOrderSuccess,
    userOrderFail,
    orderDetailRequest,
    orderDetailSuccess,
    orderDetailFail
} =actions;

export default reducer;