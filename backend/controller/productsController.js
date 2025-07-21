const catchAsyncError = require('../middlewares/catchAsyncerror');
const Product=require('../model/productmodel');
const errorhandler=require('../utils/errorhandler');
const APIFeatures=require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorhandler');

//Get Products -/api/v1/products
exports.getProducts=catchAsyncError(async (req,res,next)=>{

      const resPerPage=3;

      
      const apiFeaturesForCount= new APIFeatures(Product.find(), req.query).search().filter()
      
      
      const filteredProductsCount = await apiFeaturesForCount.query.clone().countDocuments({})
      const totalProductsCount = await Product.countDocuments({})

      let productsCount = totalProductsCount;

      if(filteredProductsCount !== totalProductsCount){
        productsCount=filteredProductsCount
      }
      const apiFeatures =  new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);

      const products = await apiFeatures.query
      console.log("Backend Page:", req.query.page);


      
      res.status(200).json({
        success : true,
        count:productsCount,
        resPerPage,
        products
      })
})
//Create Products -/api/v1/product/new
exports.newProduct = catchAsyncError (async (req, res, next) => {

  let images = [];

  let BASE_URL = process.env.BACKEND_URL

  if(process.env.NODE_ENV === 'production'){
    BASE_URL= `${req.protocol}://${req.get('host')}`
  }

  if(req.files.length > 0){
    req.files.forEach(file => {
      let url = `${BASE_URL}/uploads/products${file.originalname}`;
      images.push({ image : url })
    })
    
  }
  
  req.body.images = images

    req.body.user =req.user.id
    
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product
    })
   
})
//Get a Single Product- api/v1/product/:id
exports.getSingleProduct=async(req,res,next)=>{
  const product=await Product.findById(req.params.id).populate('reviews.user','name email')
  if(!product){
    
    return next(new errorhandler('Product not found.....', 400))
  }
  res.status(201).json({
    success:true,
    product
  })
}
// Update product - api/v1/product/:id
exports.updateProduct=async(req,res,next)=>{
  let product=await Product.findById(req.params.id)
  if(!product){
    return res.status(404).json({
      success: false,
      message : "product not found"
    })
  }

  product = await Product.findByIdAndUpdate(req.params.id,req.body,{
      new : true,
      runValidators:true
  })
  res.status(200).json({
    success:true,
    product
  })
}

//Delete a Product/api/v1/product/:id
exports.deleteProduct=async(req,res,next)=>{
  const product=await Product.findById(req.params.id)

  if(!product){
    return res.status(404).json({
      success: false,
      message : "product not found"
    })
  }
  await product.deleteOne();
  res.status(200).json({
    success:true,
    message:"Product deleted"
  })
}

//Create review -/api/v1/review
exports.createReview=catchAsyncError(async(req,res,next)=>{
   const {productId,rating,comment}=req.body
   const review={
    user: req.user._id,
    rating,
    comment
   }

   const product=await Product.findById(productId)
   if(!product){
    return next(new errorhandler('Product not found',400))
   }
   const isReviewed=product.reviews.find(review =>{
    return review.user.toString() == req.user.id.toString()
   })

   if(isReviewed){//updating the review
    product.reviews.forEach(reviewed =>{
      if(review.user.toString() == req.user.id.toString()){
         reviewed.comment=comment,
         reviewed.rating=rating
      }
    })
   }else{
    //Creating the review
    product.reviews.push(review)
    product.numOfReviews=product.reviews.length
   }
  //finding average of product rating
   product.ratings=product.reviews.reduce((acc,review)=>{
     return review.rating + acc;
   },0)

   isNaN(product.ratings)?0:product.ratings
   await product.save({validateBeforeSave:false})

   res.status(200).json({
    success:true,
    message:"Product review updated",
    product
})
})
  
//Get reviews - api/v1/reviews?id
exports.getReviews=catchAsyncError(async(req,res,next)=>{
  const product=await Product.findById(req.query.id)
  
  if(!product || product.reviews.length==0){
    return next(new ErrorHandler('No reviews for the product',401))
  }

  res.status(200).json({
    success:true,
    review:product.reviews
  })
})

//Delete review - api/v1/review
exports.deleteReview=catchAsyncError(async(req,res,next)=>{
  const product = await Product.findById(req.query.productId)

  //Filtering the reviews that does not match the deleting review id
  const reviews=product.reviews.filter(review=>{
    return review._id.toString() !== req.query.id.toString()
  })
  
  //Updating no of reviews
  const numOfReviews=reviews.length
  //Updating ratings
  let ratings=reviews.reduce((acc,review)=>{
     return reviews.rating + acc;
  },0) / reviews.length
  ratings=isNaN(ratings)?0:ratings

  await Product.findByIdAndUpdate(req.query.productId,{
    reviews,
    numOfReviews,
    ratings
  })
  res.status(200).json({
    success:true
  })
})

exports.getAdminProducts=catchAsyncError(async(req,res,next)=>{
  const products = await Product.find();
  res.status(200).json({
    success:true,
    products
  })
})