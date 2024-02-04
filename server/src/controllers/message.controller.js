import logger from "../configs/logger.config.js";
import { createMessage, getConvoMessages, populateMessage } from "../services/message.service.js";
import tryCatch from "../utils/tryCatch.js";
import {updateLatestMessage} from '../services/conversation.service.js'

export const sendMessage = tryCatch(async(req,res)=>{
    const user_id = req.user.userId;

    const {
        message,
        convo_id,
        files
    } = req.body

    if(!convo_id || (!message && !files)){
        logger.error("Please provide conversation id and message body")
        return res.sendStatus(400)
    }

    const msgData = {
        sender:user_id,
        message,
        conversation:convo_id,
        files:files || []
    }

    let newMessage = await createMessage(msgData)

    let populatedMessage = await populateMessage(newMessage._id)

    await updateLatestMessage(convo_id,newMessage)

    res.json(populatedMessage)
})

export const getMessages = tryCatch(async(req,res)=>{
    const convo_id = req.params.convo_id

    if(!convo_id){
        logger.error("please add a conversation id in params")
        res.sendStatus(400)
    }

    const messages = await getConvoMessages(convo_id)
    res.json(messages)

})