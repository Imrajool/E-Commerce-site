const catchAsyncerror = require('../middlewares/catchAsyncerror')
const User=require('../model/userModel')
const ErrorHandler = require('../utils/errorhandler')
const sendToken = require('../utils/jwt')
const sendEmail = require('../utils/email')
const crypto=require('crypto')


//Register user-api/v1/register
exports.registerUser = catchAsyncerror(async(req,res,next)=>{
    const {name,email,password}=req.body
     
    let avatar;

    let BASE_URL = process.env.BACKEND_URL

    if(process.env.NODE_ENV === 'production'){
        BASE_URL= `${req.protocol}://${req.get('host')}`
    }
    if(req.file){
        avatar=`${BASE_URL}/upload/users/${req.file.originalname}`
    }

    const user = await User.create({
        name,
        email,
        password,
        avatar
    });
    sendToken(user,201,res)
})


//Login user-api/v1/login
exports.loginUser = catchAsyncerror(async(req,res,next)=>{
    const {email, password}=req.body

    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password',400))
    }
    //finding user data from DB
    const user=await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid email or password',401))
    }

    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler('Invalid email or password',401))
    }

    sendToken(user,201,res)
})


//Logout user-api/v1/logout
exports.logoutUser=catchAsyncerror((req,res,next)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    }).status(200).json({
        success:true,
        message:'Logged out'
    })
})


//Forgot password -api/v1/password/forgot
exports.forgotPassword=catchAsyncerror(async (req,res,next)=>{

    console.log("Incoming forgot password request", req.body)

    const user =await User.findOne({email: req.body.email})
    
    if(!user){
        return next(new ErrorHandler('User not found in this email',404))
    }

    const resetToken=user.getResetToken();
    await user.save({validateBeforeSave:false})

    let BASE_URL = process.env.FRONTEND_URL

    if(process.env.NODE_ENV === 'production'){
        BASE_URL= `${req.protocol}://${req.get('host')}`
    }

    //Create reset url
    const resetUrl=`${BASE_URL}/password/reset/${resetToken}`;

    const message=`Your password reset url is as follows\n\n
    ${resetUrl}\n\n If you have  not requested this email,Please ignore it.`

    try{
        await sendEmail({
            email: user.email,
            subject:'My cart password recovery',
            message
        })
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email}`
        })
    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordTokenExpire=undefined;
        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message,500))
    }
})


//Reset password-api/v1/password/reset/:token
exports.resetPassword = catchAsyncerror(async(req,res,next)=>{
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: { $gt: Date.now() }
    });
    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or expired',401))
    }

    if(req.body.password !== req.body.newPassword){
        return next(new ErrorHandler('Password does not match',404))
    }

    user.password=req.body.password
    user.resetPasswordToken=undefined
    user.resetPasswordTokenExpire=undefined
    await user.save()

    sendToken(user,201,res)

})

//Get user profile-api/v1/myprofile
exports.getUserProfile = catchAsyncerror(async(req,res,next)=>{
    const user=await User.findById(req.user.id)
    res.status(200).json({
        success:true,
        user
    })
})

//Change password-api/v1/password/change
exports.changePassword = catchAsyncerror(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password')

    //check old password
    if(!await user.isValidPassword(req.body.oldPassword)){
        return next(new ErrorHandler('Old password is incorrect',401))
    }

    //assigning new password
    user.password=req.body.newPassword
    await user.save()
    res.status(200).json({
        success:true
    })
})

//Update profile - /api/v1/updateProfile
exports.updateProfile=catchAsyncerror(async(req,res,next)=>{
    //getting new datas to be updated
    console.log(req.file)
    let newUserData={
        name:req.body.name,
        email:req.body.email
    }

    let avatar;

    let BASE_URL = process.env.BACKEND_URL

    if(process.env.NODE_ENV === 'production'){
        BASE_URL= `${req.protocol}://${req.get('host')}`
    }
    
    if(req.file){
        avatar=`${BASE_URL}/upload/users/${req.file.originalname}`;
        newUserData={...newUserData,avatar}
    }

    //updating data
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true
    })
    console.log('Updated user:', user);
    res.status(200).json({
        success:true,
        user
    })
})

//ADMIN: Get All users - /api/v1/admin/getusers
exports.getAllUsers=catchAsyncerror(async(req,res,next)=>{
    const users=await User.find()
    if(!users){
        return next(new ErrorHandler('No users found',404))
    }
    res.status(200).json({
        success:true,
        users
    })
})

//ADMIN:Get a specific user - /api/v1/admin/getuser/:id
exports.getUser=catchAsyncerror(async(req,res,next)=>{
    const user=await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler('User not found with this id',404))
    }
    res.status(200).json({
        success:true,
        user
    })
})

//ADMIN:Get a user and Update profile - /api/v1/admin/getuser/:id
exports.getUser_and_Update=catchAsyncerror(async(req,res,next)=>{
    const newUserData={
        role: req.body.role
    }
    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true
    })
    if(!user){
        return next(new ErrorHandler('User not found with this id',404))
    }
    res.status(200).json({
        success:true,
        message:'User profile is Updated',
        user
    })
})

//ADMIN:Get a User and Delete - /api/v1/admin/getuser/:id
exports.get_user_and_delete =catchAsyncerror(async(req,res,next)=>{
    const user=await User.findByIdAndDelete(req.params.id)
    if(!user){
        return next(new ErrorHandler('User not found with this id',404))
    }
    res.status(200).json({
        success:true,
        message:'User deleted successfully'
    })
})