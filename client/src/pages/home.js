import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Sidebar } from '../components/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations } from '../features/chatSlice'
import { WhatsappHome } from '../components/Chat'
import {ChatContainer} from '../components/Chat'
import SocketContext from '../context/SocketContext'
import { updateMessagesAndConversations,addOnlineUsers,addTyping } from '../features/chatSlice'

const Home = () => {
  const dispatch = useDispatch()

  //use context
  const socket = useContext(SocketContext)

  const {user} = useSelector((state)=>state.user)

  const {activeConversation,onlineUsers} = useSelector((state)=>state.chat)

  //join user into socket io
  useEffect(()=>{
    socket.emit("join",user._id)

    //get online users
    socket.on('get-online-users',(users)=>{
      dispatch(addOnlineUsers(users))
    })


  },[user])
  
  //get conversations
  useEffect(()=>{
    if(user?.token){
      dispatch(getConversations(user.token))
    }
  },[user,dispatch])

  const myMessagehandler = useCallback((message)=>{
    dispatch(updateMessagesAndConversations(message))
  },[]) 
  
  //listening to received messages 
  useEffect(()=>{
    socket.on("message received",myMessagehandler)

    
    //listening when a user is typing
    // socket.on("typing",(conversation)=> dispatch(addTyping(conversation)))
    // socket.on("stop typing",()=>dispatch(addTyping(false)))

    return ()=> socket.off('message received',myMessagehandler)
  },[])

  return (
    <div className='h-screen dark:bg-dark_bg_1 flex  justify-center overflow-hidden'>
      {/* container */}
      <div className='container h-screen flex py-[19px]'>
      {/* sidebar */}
      <Sidebar onlineUsers={onlineUsers}/>
      {
        activeConversation?._id ? <ChatContainer/> : <WhatsappHome/>
      }

      </div>

    </div>
  )
}

export default Home