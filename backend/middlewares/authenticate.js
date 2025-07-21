const Errorhandler=require('../utils/errorhandler')
const catchAsyncError=require('./catchAsyncerror')
const jwt=require('jsonwebtoken')
const User=require('../model/userModel')
const ErrorHandler = require('../utils/errorhandler')

exports.isAuthenticateUser = catchAsyncError(async(req,res,next)=>{
    
    const { token } =req.cookies

    if(!token){
        
        return next(new Errorhandler('Please login to access resources',401))
    }
    
    const decoded =jwt.verify(token,process.env.JWT_SECRET)
    
    req.user= await User.findById(decoded.id)
    if (!req.user) {
       
        return next(new Errorhandler('User not found', 404));
    }
    next();
})

exports.authorizeRoles = (...roles) =>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`,401))
        }
        next();
    }
}
