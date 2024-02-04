import { useDispatch, useSelector } from "react-redux"
import ChatHeader from "./header/ChatHeader"
import ChatMessages from "./messages/ChatMessages"
import { useEffect } from "react"
import { getConversationMessages } from "../../features/chatSlice"
import { ChatActions } from "./actions"
import { checkOnlineStatus } from "../../utils/chat"
import FilesPreview from "./preview/files/FilesPreview"

const ChatContainer = () => {
  const {activeConversation,onlineUsers,files} = useSelector((state)=>state.chat)
  const {user} = useSelector((state)=> state.user)
  const {token} = user
  const dispatch = useDispatch()

  useEffect(()=>{
    if(activeConversation?._id){  
      dispatch(getConversationMessages({
        token,
        convo_id:activeConversation?._id
      }))
    }

  },[activeConversation._id])

  return (
    <div className="relative w-full h-full dark:border-l-dark_border_2 select-none">
      {/* Container */}
      <div>
        {/* chat header */}
        <ChatHeader online={activeConversation?.isGroup ? false : checkOnlineStatus(onlineUsers,user,activeConversation.users)} />

        {
          files.length > 0 ? <FilesPreview/> : 
          (
            <>
            {/* chat messages */}
              <ChatMessages />
    
            {/* Chat Actions */}
            <ChatActions />
            </>
          )
        }


      </div>
    </div>
  )
}

export default ChatContainer