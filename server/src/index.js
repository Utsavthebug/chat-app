import mongoose from "mongoose";
import app from "./app.js";
import logger from "./configs/logger.config.js";
import { Server } from "socket.io";
import SocketServer from "./SocketServer.js";

//env variables
const PORT = process.env.PORT || 8000
const {DATABASE_URL} = process.env

console.log(process.env.PORT)

//handke errors after initial connection 
mongoose.connection.on('error',err =>{
    logger.error(`Mongodb connection error : ${err}`)
    process.exit(1)
})


//mongodb connection
mongoose.connect(DATABASE_URL).then(()=>{
    logger.info('Connected to mongodb')
  })

//mongodb debug mode
if(process.env.NODE_ENV==='development'){
    mongoose.set('debug',true)
}


let server;

server = app.listen(PORT,()=>{
   logger.info(`Server is listening at ${PORT}...`)
})

const io = new Server(server,{
    pingTimeout:60000,
    cors:{
        origin: process.env.CLIENT_ENDPOINT
    }
})

io.on("connection",(socket)=>{
    logger.info("socket io connected succesfully.")
    SocketServer(socket,io)
})

const exitHandler = ()=>{
    if(server){
        logger.info("Server closed")
        process.exit(1)
    }
    else{
        process.exit(1)
    }
}

//handle server errors 
const unexpectedErrorHandler  = (error) =>{
    logger.error(error)
    exitHandler()
}


process.on('uncaughtException',unexpectedErrorHandler)
process.on('unhandledRejection',unexpectedErrorHandler)

//SIGTERM 
process.on('SIGTERM',()=>{
    if(server){
        logger.info('Server closed')
        process.exit(1)
    }
})