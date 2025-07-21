import { createSlice } from "@reduxjs/toolkit";

// Safe parsing helper


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) : [],
    loading:false,
    shippingInfo: localStorage.getItem('shippingInfo')? JSON.parse(localStorage.getItem('shippingInfo')) : {},
  },
  reducers: {
    addCartItemRequest(state,action) {
      return{
        ...state,
        loading:true
      }
    },

    addCartItemSuccess(state, action) {
      const item = action.payload;
      const existingItem = state.items.find(i => i.product === item.product);

      if (existingItem) {
        // Optional: update quantity or do nothing
        state ={
          ...state,
          loading:false
        }
      } else {
        state ={
          items:[...state.items,item],
          loading:false
        }
        localStorage.setItem('cartItems',JSON.stringify(state.items))
      }

      return state
    },

    increaseQuantity(state, action) {
      const item = state.items.find(i => i.product === action.payload);
      if (item) {
        item.quantity += 1;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    decreaseQuantity(state, action) {
      const item = state.items.find(i => i.product === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },

    removeCartItem(state, action) {
      state.items = state.items.filter(i => i.product !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    saveShippingInfo(state, action) {
      state.shippingInfo = action.payload;
      localStorage.setItem('shippingInfo', JSON.stringify(state.shippingInfo));
    },
    clearCartItems(state,action){
      localStorage.removeItem('shippingInfo')
      localStorage.removeItem('cartItems')
      sessionStorage.removeItem('orderInfo')

      
        state.items=[]
        state.loading=false
        state.shippingInfo={}
      

    }
  }
});

export const {
  addCartItemRequest,
  addCartItemSuccess,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem,
  saveShippingInfo,
  clearCartItems
} = cartSlice.actions;

export default cartSlice.reducer;
