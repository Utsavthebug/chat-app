import createHttpError from 'http-errors'
import {ConversationModel, UserModel} from '../models/index.js'

export const doesConversationExist = async(sender_id,receiver_id) =>{
    let convos = await ConversationModel.find({
        isGroup:false,
        users : {
            $all : [sender_id,receiver_id]
        }

    }).populate("users",'-password').populate("latestMessage")

    if(!convos) throw createHttpError.BadRequest('Something went wrong!')

    //populate message model
    return convos[0]
}

export const updateLatestMessage = async (convo_id,message)=>{
    const updatedConvo = await ConversationModel.findByIdAndUpdate(convo_id,{
        latestMessage:message
    })
    if(!updatedConvo){
        throw createHttpError.BadRequest("Something went wrong....")
    }
    return updatedConvo
}


export const createConversation = async(data) =>{
    const newConvo = await ConversationModel.create(data)
    if(!newConvo) throw createHttpError.BadRequest("Something went wrong!")

    return newConvo
} 

export const populateConversation = async(id,fieldsToPopulate,fieldsToRemove) =>{
    const populatedConvo = await ConversationModel.findOne({_id:id}).populate(fieldsToPopulate,fieldsToRemove)
    if(!populatedConvo){
        throw createHttpError.BadRequest("Something went wrong!")
    }
    return populatedConvo
}

export const getUserConversations = async (user_id) =>{
    let conversations ;
   await ConversationModel.find({
        users:{$elemMatch : {$eq : user_id}}
    }).populate('users','-password')
    .populate('admin','-password')
    .populate('latestMessage')
    .sort({updatedAt:-1}).then(async(results)=>{
        results = await UserModel.populate(results,{
            path:"latestMessage.sender",
            select:"name email picture status"
        })
    conversations=results
    }).catch((err)=>{
        throw createHttpError.BadRequest("Something went wrong!")
    })
    return conversations
}