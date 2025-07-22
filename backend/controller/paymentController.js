const catchAsyncerror = require('../middlewares/catchAsyncerror')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.processPayment= catchAsyncerror(async(req,res,next)=>{
    const paymentIntent = await stripe.paymentIntents.create({
        amount:Math.round(Number(req.body.amount)),
        currency:'usd',
        description:"Test Payment",
        metadata:{integration_check : 'accept_payment'},
        shipping: req.body.shipping
    })
    res.status(200).json({                                      //STRIPE PAYMENT INTEGRATION PROCESS
        success:true,
        client_secret: paymentIntent.client_secret
    })
})

exports.sendStripeApi= catchAsyncerror(async(req,res,next)=>{
    res.status(200).json({
       stripeApiKey: process.env.STRIPE_API_KEY
    })
})