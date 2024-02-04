import createHttpError from "http-errors";
import tryCatch from "../utils/tryCatch.js";
import logger from "../configs/logger.config.js";
import {searchUsers as searchUsersService} from '../services/user.service.js'

export const searchUsers = tryCatch(async(req,res)=>{
    const keyword = req.query.search
    if(!keyword){
        logger.error("Please add a search query first")
        throw createHttpError.BadRequest("PLease fill all the fields")
    }

    const users = await searchUsersService(keyword,req.user.userId)
    res.status(200).json(users)

})