import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Message from './Message'
import Typing from './Typing'
import FileMessage from './files/FileMessage'

const ChatMessages = () => {
    const {messages,typing,activeConversation} = useSelector((state)=>state.chat)
    const {user} = useSelector((state)=>state.user)

    const endRef = useRef();

    useEffect(()=>{
      endRef.current.scrollIntoView({behavior:"smooth"})
    },[messages])
  return (
    <div className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat">
    {/* COntainer */}
    <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
        {/* Messages */}
        {
            messages && messages.map((message)=>(
              <>
              {message.files.length>0 && message.files.map((file)=>(
                <FileMessage
                fileMessage={file}
                message={message}
                key={message._id}
                me={user?._id===message?.sender?._id}
                />

              ))}
              {message.message.length>0 && <Message message={message} key={message?._id} me={user?._id===message?.sender?._id}/>} 
              </>
            ))
        }

        {
          typing === activeConversation?._id && <Typing/>
        }
  <div className='mt-2' ref={endRef}></div>
    </div>
    </div>
  )
}

export default ChatMessages