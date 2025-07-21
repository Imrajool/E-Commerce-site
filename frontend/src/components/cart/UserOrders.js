import { Fragment, useEffect } from "react"
import { MDBDataTable } from 'mdbreact';
import MetaData from '../layouts/MetaData'
import { useDispatch, useSelector } from "react-redux"
import { userOrders as userOrdersActions } from "../../actions/orderActions"
import { Link } from "react-router-dom"

export default function OrderDetails (){
    const {userOrders = []} = useSelector(state => state.orderState)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userOrdersActions())
    },[])
    
    const setOrder = () =>{
        const data ={
            columns:[
                {
                    label:'Order id',
                    field:'id',
                    sort:'asc'
                },
                {
                    label:'Number of Items',
                    field:'numOfItems',
                    sort:'asc'
                },
                {
                    label:'Amount',
                    field:'amount',
                    sort:'asc'
                },
                {
                    label:'Status',
                    field:'status',
                    sort:'asc'
                },
                {
                    label:'Actions',
                    field:'actions',
                    sort:'asc'
                }
            ],
            rows:[]
        }
        if (Array.isArray(userOrders)) {
        userOrders.forEach(userOrder => {
        data.rows.push({
            id: userOrder._id,
            numOfItems: userOrder.orderItems.length,
            amount: userOrder.totalPrice,
            status: userOrder.orderStatus && userOrder.orderStatus.includes('Delivered') ? 
            <p style={{color:'green'}}>{userOrder.orderStatus}</p> :
            <p style={{color:'red'}}>{userOrder.orderStatus}</p>,
            actions:<Link to={`/order/${userOrder._id}`} className="btn btn-primary">
                <i className="fa fa-eye" ></i>
            </Link>
        })
        })};
        return data;
    }
    
    

    return (
        <Fragment>
            <MetaData title={'My Orders'}/>
            <h1 className="mt-5">Orders</h1>
            <MDBDataTable
            className="px-3"
            bordered
            striped
            hover
            data={setOrder()}
            />
        </Fragment>



        // <div className="container container-fluid">
	
		//     <div className="row d-flex justify-content-between">
        //         <div className="col-12 col-lg-8 mt-5 order-details">

        //             <h1 className="my-5">Order # 4543f34f545</h1>
        //             <h4 className="mb-4">Shipping Info</h4>
        //             <p><b>Name:</b> {user.name}</p>
        //             <p><b>Phone:</b>{} </p>
        //             <p className="mb-4"><b>Address:</b>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}</p>
        //             <p><b>Amount:</b>{shippingInfo.totalPrice}</p>

        //             <hr />

        //             <h4 className="my-4">Payment</h4>
        //             <p className="greenColor" ><b>{paymentInfo.status}</b></p>


        //             <h4 className="my-4">Order Status:</h4>
        //             <p className='greenColor' ><b>{}</b></p>

        //             <h4 className="my-4">Order Items:</h4>

        //             <hr />
        //             {orderItems  ?? orderItems.map(item => {
        //                 <Fragment>
        //                     <div className="cart-item my-1">
        //                         <div className="row my-5">
        //                             <div className="col-4 col-lg-2">
        //                                 <img src={item.image} alt={item.name} height="45" width="65" />
        //                             </div>

        //                             <div className="col-5 col-lg-5">
        //                                 <Link to={`/product/${item.product}`}>{item.name}</Link>
        //                             </div>


        //                             <div className="col-4 col-lg-2 mt-4 mt-lg-0">
        //                                 <p>{item.price}</p>
        //                             </div>

        //                             <div className="col-4 col-lg-3 mt-4 mt-lg-0">
        //                                 <p>{item.quantity} Piece(s)</p>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <hr />
        //                 </Fragment>

        //             })}
        //         </div>
        //     </div>
        
        // </div>
    )
}