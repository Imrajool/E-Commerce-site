import { useEffect } from 'react';
import { Fragment } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../components/layouts/Loader'
import {Link, useParams} from 'react-router-dom'
import { orderDetail as orderDetailAction} from '../../actions/orderActions';

export default function OrderDetails(){
    const { orderDetails:orderDetail , loading} = useSelector(state => state.orderState);
    const {user={},shippingInfo={},paymentInfo={},orderStatus="Processing",orderItems=[],totalPrice=0} = orderDetail;
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false;
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(orderDetailAction(id))
    },[dispatch,id])

    return (
        <Fragment>
            {loading ? <Loader/> :
            <Fragment>
                <div className="container container-fluid">
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8 mt-5 order-details">
    
                            <h1 className="my-5">Order # {orderDetail._id}</h1>
    
                            <h4 className="mb-4">Shipping Info</h4>
                            <p><b>Name:</b> {user.name}</p>
                            <p><b>Phone:</b>{shippingInfo.phone}</p>
                            <p className="mb-4"><b>Address:</b>{shippingInfo.address}, {shippingInfo.city},{shippingInfo.postalCode},{shippingInfo.state}, {shippingInfo.country}</p>
                            <p><b>Amount:</b> {totalPrice}</p>
    
                            <hr />
    
                            <h4 className="my-4">Payment</h4>
                            { isPaid === true ?<p className="greenColor" ><b>PAID</b></p> : <p className="redColor" ><b>UNPAID</b></p>}
                            
    
    
                            <h4 className="my-4">Order Status:</h4>
                            <p className={orderStatus.includes('succeeded')?'greenColor':'redColor'} ><b>{orderStatus}</b></p>
    
    
                            <h4 className="my-4">Order Items:</h4>
    
                            <hr />
                            <div className="cart-item my-1">
                                {orderItems && orderItems.map(item =>(
                                    
                                
                                <div className="row my-5">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                    </div>
    
                                    <div className="col-5 col-lg-5">
                                        <Link to={`/product/${item.product}`} >{item.name}</Link>
                                    </div>
    
    
                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p>{item.price}</p>
                                    </div>
    
                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <p>{item.quantity} Piece(s)</p>
                                    </div>
                                </div>
                                ))}
                            </div>
                            <hr />
                        </div>
                    </div>
                
                </div>
            </Fragment>
            }
        </Fragment>
    )
}