import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { decreaseQuantity, increaseQuantity, removeCartItem } from "../../slices/cartSlice";

export default function Cart () {
    const {items:cartItems} = useSelector(state => state.cartState)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const checkOutHandler=()=>{
        navigate('/login?redirect=shipping')
    }
    return(
        <Fragment>
            {cartItems.length === 0 ?
               <h2 className="mt-5">Your Cart is Empty</h2> :
               <Fragment>
                    <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {cartItems.map(item => (
                                <Fragment>
                                    <hr />
                                    <div className="cart-item">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.image} alt={item.name} height="90" width="115"/>
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">${item.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus" disabled={item.quantity === 1} onClick={() => dispatch(decreaseQuantity(item.product))}>-</span>
                                                    <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                    <span className="btn btn-primary plus" onClick={() => dispatch(increaseQuantity(item.product))}>+</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={ () => dispatch(removeCartItem(item.product))}></i>
                                            </div>

                                        </div>
                                    </div>
                                </Fragment>
                            )
                            )
                            }
                            <hr />
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc , item) => (acc + item.quantity),0)} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">{cartItems.reduce((acc , item) => (acc + item.quantity * item.price),0)}</span></p>
                
                                <hr />
                                <button id="checkout_btn" onClick={checkOutHandler} className="btn btn-primary btn-block">Check out</button>
                            </div>
                        </div>
                    </div>
               </Fragment>
            }
      
        </Fragment>
    )
}