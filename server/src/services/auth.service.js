import createHttpError from "http-errors"
import { createUserSchema,getErrormessage } from "../utils/joiSchema.js"
import {UserModel} from '../models/index.js'

//env variables
const {DEFAULT_PICTURE,DEFAULT_STATUS} = process.env

export const createUser = async(userData)=>{
   const {name,email,picture,status,password} = userData
   //validation using joi schema
    const {error,value} = createUserSchema.validate(userData)
   
   if(error){
    const errorMessage = getErrormessage(error)
    throw createHttpError.BadRequest(errorMessage)
    }

    //check if user already exists 

    const checkDb = await UserModel.findOne({
        email
    })


    if(checkDb){
        throw createHttpError.Conflict('Please try again with a different email address')
    }

    const user = await UserModel.create({
        name,
        email,
        picture : picture || DEFAULT_PICTURE,
        status:status || DEFAULT_STATUS,
        password
    })

    return user
}


export const signUser = async(email,password) =>{
    const user = await UserModel.findOne({email:email.toLowerCase()})

    //check if user exists
    if(!user){
        throw createHttpError.NotFound('Invalid credentials')
    }

 //comparing password
    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        throw createHttpError.NotFound('Invalid credentials')
    }
    return user    
}