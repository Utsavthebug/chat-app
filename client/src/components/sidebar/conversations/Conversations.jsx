import { useSelector } from "react-redux"
import Conversation from "./Conversation"
import { checkOnlineStatus } from "../../../utils/chat"

const Conversations = () => {
  const {conversations,activeConversation,onlineUsers,typing} = useSelector((state)=> state.chat)
  const {user} = useSelector((state)=>state.user)

  return (
    <div className='convos scrollbar'>
      <ul>
      {
        conversations && conversations.filter((c)=>c.latestMessage || c._id===activeConversation?._id || c.isGroup).map((convo)=>(
         <Conversation convo={convo} id={convo?._id} online={checkOnlineStatus(onlineUsers,user,convo.users)}/>
        )
        )
      }
      </ul>
  
    </div>
  )
}

export default Conversations