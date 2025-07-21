import axios from "axios";
import {addCartItemRequest, addCartItemSuccess, clearCartItems} from '../slices/cartSlice'

export const AddCartItems = (id,quantity)=> async(dispatch) =>{
     try {
        dispatch(addCartItemRequest())
        const {data} = await axios.get(`/api/v1/product/${id}`)
        dispatch(addCartItemSuccess({
            product : data.product._id,
            name: data.product.name,
            price: data.product.price,
            stock: data.product.stock,
            image:data.product.images[0].image,
            quantity
        }))
     } catch (error) {
        
     }
}
