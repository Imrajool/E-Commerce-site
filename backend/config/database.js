const mongoose=require('mongoose')
require('dotenv').config(); 

const connect_database=()=>{
    console.log("🔍 DB URI:", process.env.DB_LOCAL_URI);
    mongoose.connect(process.env.DB_LOCAL_URI,{
        
    }).then(con=>{
        console.log(`MongoDB is connected to the host: ${con.connection.host}`)
    })
}



module.exports =connect_database;