import { useEffect , Fragment} from "react"
import { useSelector } from "react-redux"
import { validateShipping } from "./Shipping"
import { Link, useNavigate } from "react-router-dom"
import CheckOutStep from "./CheckoutStep"

export default function ConfirmOrder(){
    const {shippingInfo, items:cartItems} = useSelector(state => state.cartState)
    const {user} = useSelector(state => state.authState)
    const navigate=useNavigate();
    const itemsPrice = cartItems.reduce((acc,item)=> acc+item.price*item.quantity,0)
    const shippingPrice=itemsPrice > 1000 ? 0 : 40
    let taxPrice = Number(0.05 * itemsPrice)
    const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2)
    taxPrice=Number(taxPrice).toFixed(2)

    const processPayment = () =>{
        const data = {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')
    }


    useEffect(()=>{
        validateShipping(shippingInfo,navigate)
    },[shippingInfo,navigate])
    return (
        <Fragment>
            <CheckOutStep shipping confirmOrder/>

            <div className="container container-fluid">
            
                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Name:</b>{user.name}</p>
                    <p><b>Phone:</b>{shippingInfo.phone}</p>
                    <p className="mb-4"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}</p>
                    
                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>

                    <hr />
                    {cartItems.map(item =>(
                        <Fragment>
                            <div className="cart-item my-1">
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                    </div>
        
                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>
        
        
                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                    <p>{item.quantity} x {item.price} = <b>${item.quantity*item.price}</b></p>
                                    </div>
        
                                </div>
                            </div>
                            <hr />

                        </Fragment>
                    ))}
                    

                </div>
                
                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${itemsPrice}</span></p>
                        <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                        <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" onClick={processPayment} className="btn btn-primary btn-block">Proceed to Payment</button>
                    </div>
                </div>
                
                
                </div>
            </div>

        </Fragment>
    )
}