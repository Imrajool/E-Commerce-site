const products=require('../data/product.json');
const Product=require('../model/productmodel');
const path=require('path');
const dotenv=require('dotenv');

dotenv.config({path:path.join(__dirname,'../config/config.env')});
const connect_database=require('../config/database');
connect_database();
const seedProducts=async()=>{
    try{
        await Product.deleteMany();
    console.log("deleted")
    await Product.insertMany(products);
    console.log('All products added!')
    }catch(error){
        console.log(error.message)
    }
}
seedProducts();