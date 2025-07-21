const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        trim:true,
        maxLength:[100,"Product name cannot exceed 100 characters"]
    },
    price:{
        type:Number,
        default:0.0,
    },
    description:{
        type:String,
        required: [true,"Please enter product description"]
    },
    ratings:{
        type:Number,
        default:0.0
    },
    images: [
        {
            image:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required: [true,"Please enter product category"],
        enum:{
            values: [
                'Electronics',
                'Food',
                'Beauty and Healthcare',
                'Home Appliances',
                'Accessories'
            ],
            message:"Please enter a valid category"
        }
    },
    seller:{
        type:String,
        required:[true,"Please enter the product seller"]
    },
    stock:{
        type:Number,
        required: [true,"Please enter the product stock"],
        max:[20,"Product stock cannot exceed 20"]
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
             user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
             },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

let schema= mongoose.model('Product', productSchema)

module.exports= schema