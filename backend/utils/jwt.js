const sendToken = (user,statusCode,res)=>{
    //Creating a jwt token
    const token =user.getJWTtoken();
    
    //Setting up cookies
    const options ={
        expires:new Date(Date.now()+ process.env.COOKIE_EXPIRE_TIME*24*60*60*1000),
        httpOnly:true
    }

    res.status(statusCode)
    .cookie('token',token,options)
    .json({
        success:true,
        token,
        user
    })
}
module.exports = sendToken;