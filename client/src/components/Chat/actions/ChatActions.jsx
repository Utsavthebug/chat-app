import React, { useContext, useRef, useState } from 'react'
import EmojiPickerApp from './EmojiPickerApp'
import {Attachments} from './attachments'
import { SendIcon } from '../../../svg'
import Input from './Input'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import SocketContext from '../../../context/SocketContext'
import { sendMessage } from '../../../features/chatSlice'

const ChatActions = () => {

    //state
  const [message,setMessage] = useState("") 
  const [showEmojis,setShowEmojis] = useState(false)
  const [showAttachments,setShowAttachments] = useState(false)
  const [loading,setLoading] = useState(false)

  //socket 
  const socket = useContext(SocketContext)

    const dispatch = useDispatch()

    const {activeConversation,status} = useSelector((state)=>state.chat)
    const {user} = useSelector((state)=>state.user)
    const {token} = user

    const values = {
        message,
        convo_id:activeConversation?._id,
        files:[],
        token
    }

    const textRef = useRef()

  const sendMessageHandler = async(e)=>{
    setLoading(true)
    e.preventDefault()
   let newMsg = await dispatch(sendMessage(values))
   socket.emit("send message",newMsg.payload)
    setMessage("")
    setLoading(false)
  }

  return (
    <form onSubmit={(event)=>sendMessageHandler(event)} action="" className='dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none'>
        <div className="w-full flex items-center gap-x-2">
            {/* Emojis and attachments */}
            <ul className='flex gap-x-2'>    
                <EmojiPickerApp 
                showPicker={showEmojis} 
                setShowPicker={setShowEmojis} 
                setShowAttachments={setShowAttachments}
                textRef={textRef} 
                message={message} 
                setMessage={setMessage} />


                <Attachments
                showAttachments={showAttachments}
                setShowAttachments={setShowAttachments}
                setShowPicker={setShowEmojis}
                />
            </ul>

            {/* Inputs */}
            <Input message={message} setMessage={setMessage} textRef={textRef}/>

            {/* Send button */}
            <button type='submit' className='btn'>
                {
                    status ==="loading" && loading ? <ClipLoader color="#E9EDEF" size={25}/> : <SendIcon className={"dark:fill-dark_svg_1"} />
                }
               
            </button>
        </div>
    </form>
    )
}

export default ChatActions