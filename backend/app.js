const express=require('express');
const app=express();
const errorMiddleware=require('./middlewares/Error')
const cookieParser =require('cookie-parser')
const cors = require('cors');
const dotenv=require('dotenv');
const path=require('path')

dotenv.config({path:path.join(__dirname,"config/config.env")});


const products=require('./routes/product');
const auth=require('./routes/auth')  
const order=require('./routes/order')
const payment=require('./routes/payment')



app.use(express.urlencoded({ extended: true })); // For form submissions
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL, // frontend URL
  credentials: true // ✅ this allows cookies to be sent/received
}));
app.use(cookieParser());
app.use('/upload',express.static(path.join(__dirname,'upload')))

app.use('/api/v1/',products)
app.use('/api/v1/',auth)
app.use('/api/v1/',order)
app.use('/api/v1/',payment)

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'../frontend/build')));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
  })
}


app.use(errorMiddleware)


module.exports=app;