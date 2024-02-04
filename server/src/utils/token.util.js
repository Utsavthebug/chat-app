import jwt from 'jsonwebtoken'
import logger from '../configs/logger.config.js'

export const sign = async(payload,secret,expiresIn)=>{
    return new Promise((resolve,reject)=>{
       try {
        const token = jwt.sign(payload,secret,{expiresIn}) 
        resolve(token)        
       } catch (error) {
        logger.error(error)
        reject(error)
       }
    })
}


export const verify = async(token,secret)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,secret,(error,payload)=>{
            if(error){
                logger.log(error)
                resolve(null)
            }
            else{
                resolve(payload)
            }
        })
    })
}