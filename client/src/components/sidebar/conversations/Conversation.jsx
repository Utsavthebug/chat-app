import moment from "moment"
import { dateHandler } from "../../../utils/date"
import { useDispatch, useSelector } from "react-redux"
import {setActiveConversation} from '../../../features/chatSlice'
import { capitalize } from "../../../utils/string"
import { useContext } from "react"
import SocketContext from "../../../context/SocketContext"
import { getConversationImage, getConversationName } from "../../../utils/chat"
import Typing from "../../Chat/messages/Typing"

const Conversation = ({convo,online}) => {
    const dispatch = useDispatch()

  const socket = useContext(SocketContext)

  const { user } = useSelector((state) => state.user);
  const {activeConversation,typing} = useSelector((state)=>state.chat)
   
    const openConversation = async()=>{
    await dispatch(setActiveConversation(convo))
    socket.emit('join conversation',convo._id)
    }

  return (
   <li 
   onClick={openConversation}
   className={`list-none h-[72px] w-full dark:bg-dark_bg_1 hover:${convo._id!==activeConversation?._id ? "dark:bg-dark_bg_2 cursor-pointer" : ""} dark:text-dark_text_1 px-[10px] ${convo?._id===activeConversation?._id ? "dark:bg-dark_hover_1": ""}`}>
    {/* Container */}
    <div className="relative w-full flex items-center justify-between py-[10px]">
        {/* left */}
        <div className='flex items-center gap-x-3'>
            {/* conversation image */}
            <div className={`relative max-w-[50px] max-h-[50px] rounded-full overflow-hidden ${online && !convo.isGroup ? "online":""}`}>
                <img 
                src={convo.isGroup ? convo.picture : getConversationImage(user,convo?.users)} 
                alt={convo?.name}  
                className='w-full h-full object-cover'/>
            </div>

            <div className="w-full flex flex-col">
                {/* conversation name */}
                <h1 className='font-bold flex items-center gap-x-2'>
                    {convo?.isGroup ? convo.name : capitalize(getConversationName(user,convo?.users))}
                </h1>

                <div className='flex items-center gap-x-1 dark:text-dark_text_2'>
                    <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                        {
            typing === convo._id ? <p className="text-green_1">Typing...</p> : <p>{convo?.latestMessage?.message.length >25 ? `${convo?.latestMessage?.message.substring(0,25)}..`: convo?.latestMessage?.message }</p>
                        }
                    </div>
                </div>
            </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-y-4 items-end text-xs">
            <span className=" dark:text-dark_text_2">
                {convo?.latestMessage?.createdAt ? dateHandler(convo?.latestMessage?.createdAt):""}
            </span>
        </div>
    </div>
    <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
   </li>
  )
}

export default Conversation