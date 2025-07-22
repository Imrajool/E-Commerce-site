
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import productsReducers from './slices/productsSlice'
import productReducers from './slices/productSlice'
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'
import orderReducer from './slices/orderSlice'


const reducer =combineReducers({
    productsState : productsReducers,
    productState: productReducers,
    authState: authReducer,
    cartState: cartReducer,
    orderState:orderReducer
   
})

const store =configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk:true,
        serializableCheck:false
    })
})

export default store;
