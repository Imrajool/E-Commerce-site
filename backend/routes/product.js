const express=require('express');
const router=express.Router();
const multer = require('multer')
const path=require('path')
const {getProducts, newProduct, getSingleProduct,updateProduct, deleteProduct, createReview, getReviews, deleteReview, getAdminProducts} =require('../controller/productsController')
const {isAuthenticateUser, authorizeRoles} = require('../middlewares/authenticate')

const upload = multer({storage: multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,path.join(__dirname,'..','upload/products'))
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})})

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/:id').put(updateProduct);
router.route('/product/:id').delete(deleteProduct);
router.route('/review').put(isAuthenticateUser,createReview);
router.route('/reviews').get(getReviews);
router.route('/review').delete(deleteReview);


//Admin Routes
router.route('/admin/product/new').post(isAuthenticateUser,authorizeRoles('admin'), upload.array('images') ,newProduct);
router.route('/admin/products').get(isAuthenticateUser,authorizeRoles('admin'),getAdminProducts);
module.exports =router