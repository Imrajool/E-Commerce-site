
const catchAsyncError=require('../middlewares/catchAsyncerror')
const Order = require('../model/orderModel')
const Product = require('../model/productmodel')
const ErrorHandler = require('../utils/errorhandler')

//Create new order - api/v1/order/new
exports.newOrder=catchAsyncError(async(req,res,next)=>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        totalPrice,
        shippingPrice,
        taxPrice,
        paymentInfo
    }=req.body


    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        totalPrice,
        shippingPrice,
        taxPrice,
        paymentInfo,
        paidAt:Date.now(),
        user:req.user._id
    })

    res.status(200).json({
        success:true,
        message:'Order placed successfully',
        order
    })
})


//Get single order - /api/v1/order/:id
exports.getSingleOrder=catchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate('user', 'name email')
    if(!order){
        return next(new ErrorHandler(`Order not found with this id ${req.params.id}`,404))
    }
    res.status(200).json({
        success:true,
        order
    })
})

//Get logged in users orders - /api/v1/myorder
exports.myOrder=catchAsyncError(async(req,res,next)=>{
    const orders=await Order.find({user:req.user.id})
   
    res.status(200).json({
        success:true,
        orders
    })
})

//ADMIN : Get all orders - /api/v1/admin/orders
exports.getAllOrders=catchAsyncError(async(req,res,next)=>{
    const orders=await Order.find()

    let TotalAmount=0;

    orders.forEach(orders=>{
        TotalAmount += orders.totalPrice
    })
    res.status(200).json({
        success:true,
        TotalAmount,
        orders
    })
})

//ADMIN - Update orders - /api/v1/admin/updateorder/:id
exports.updateOrder=catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(order.orderStatus == 'Delivered'){
        return next(new ErrorHandler('Order has been already delivered',401))
    }
    ///Updating stock
    order.orderItems.forEach(items =>{
        updateStock(items.product,items.quantity)
    })

    order.orderStatus=req.body.orderStatus;
    order.deliveredAt=Date.now()
    await order.save()
    res.status(200).json({
        success:true,
        message:'Product stock has been updated'
    })
})


async function updateStock (productID,quantity){
    const product =await Product.findById(productID)
    product.stock=product.stock - quantity
    product.save({validateBeforeSave:false})
}

//ADMIN - Delete order - /api/v1/admin/deleteorder/:id
exports.deleteOrder=catchAsyncError(async(req,res,next)=>{
    const order =await Order.findByIdAndDelete(req.params.id)
    if(!order){
        return next(new ErrorHandler('Order deos not exist',401))
    }
    
     res.status(200).json({
        success:true,
        message:'Order has been deleted'
    })
})

