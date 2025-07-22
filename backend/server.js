const app=require('./app');

const path=require('path');
const connect_database = require('./config/database');




connect_database();


const server=app.listen(process.env.PORT ,()=>{
    console.log(`My Server is listening to the port: ${process.env.PORT} in ${process.env.NODE_ENV}`)
})

process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the Server due to unhandled rejection error');
    server.close(()=>{
        process.exit(1);
    })
})
