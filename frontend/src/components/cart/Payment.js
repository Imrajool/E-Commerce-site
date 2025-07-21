import { useElements, useStripe } from "@stripe/react-stripe-js"
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateShipping } from "./Shipping";
import axios from "axios";
import { toast } from "react-toastify";
import { clearCartItems } from "../../slices/cartSlice";
import { createOrder } from "../../actions/orderActions";
import { clearError as clearOrderError } from "../../slices/orderSlice";

export default function Payment(){

    const stripe =useStripe();
    const elements = useElements();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {user} = useSelector(state => state.authState)
    const {items:cartItems,shippingInfo} = useSelector(state => state.cartState)
    const {error:orderError} = useSelector(state => state.orderState)

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')) 
    const paymentData = {
        amount: Math.round(Number(orderInfo?.totalPrice) * 100) ,
        shipping: {
            name: user.name,
            address:{
                city:shippingInfo.city,
                postal_code:shippingInfo.postalCode,
                state:shippingInfo.state,
                country:shippingInfo.country
            },
            phone:shippingInfo.phone
        }
    }

    const order ={
        orderItems: cartItems,
        shippingInfo
    }

    if(orderInfo){
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    useEffect(() => {
        if(Object.keys(shippingInfo || {}).length === 0) return;
        validateShipping(shippingInfo, navigate)
        if(orderError){
            toast(orderError,{
                type:'error',
                position:'top-center',
                onOpen: () => {dispatch(clearOrderError())}
            })
        }
    },[])

    const submitHandler = async(e) => {
        e.preventDefault()
        document.querySelector("#pay_btn").disabled = true
        try {
            const {data} =  await axios.post('/api/v1/payment/process',paymentData)
            const clientSecret = data.client_secret
            const result = await stripe.confirmCardPayment(clientSecret,{
                payment_method:{
                    card: elements.getElement(CardNumberElement),
                    billing_details:{
                        name:user.name,
                        email:user.email
                    }
                }
            })

            if(result.error){
                toast( result.error.message,{
                    type:'error',
                    position:'top-center'
                })
                document.querySelector('#pay_btn').disabled = false
            }else{
                if(result.paymentIntent.status === 'succeeded'){
                    toast('Payment Successful',{
                        type:'success',
                        position:'top-center'
                    })
                    order.paymentInfo = {
                        id:result.paymentIntent.id,
                        status:result.paymentIntent.status
                    }
                    dispatch(clearCartItems())
                    dispatch(createOrder(order))
                    navigate('/order/success')
                }else{
                    toast('Please Try Again',{
                        type:'error',
                        position:'top-center'
                    })
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-4">Card Info</h1>
                    <div className="form-group">
                    <label htmlFor="card_num_field">Card Number</label>
                    <CardNumberElement
                        type="text"
                        id="card_num_field"
                        className="form-control"
                       
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="card_exp_field">Card Expiry</label>
                    <CardExpiryElement
                        type="text"
                        id="card_exp_field"
                        className="form-control"
                        
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="card_cvc_field">Card CVC</label>
                    <CardCvcElement
                        type="text"
                        id="card_cvc_field"
                        className="form-control"
                        
                    />
                    </div>
        
                
                    <button
                    id="pay_btn"
                    type="submit"
                    className="btn btn-block py-3"
                    >
                    Pay ${orderInfo?.totalPrice}
                    </button>
    
                </form>
			</div>
        </div>
    )
}