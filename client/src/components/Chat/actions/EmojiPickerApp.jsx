import React, { useEffect, useState } from 'react'
import { CloseIcon, EmojiIcon } from '../../../svg'
import EmojiPicker from 'emoji-picker-react'

const EmojiPickerApp = ({
  message,
  setMessage,
  textRef,
  setShowAttachments
}) => {
  const [showPicker,setShowPicker] = useState(false)
  const [cursorPosition,setCursorPosition] = useState()

  useEffect(()=>{
    textRef.current.selectionEnd = cursorPosition;
  },[cursorPosition])

  const handleEmojiClick = (emojiData,e) =>{
    const {emoji} = emojiData
    const ref = textRef.current;
    ref.focus()

    const start = message.substring(0,ref.selectionStart);
    const end = message.substring(ref.selectionStart);

    const newText = start + emoji + end

    setMessage(newText)

    setCursorPosition(start.length+emoji.length)

  }

  return (
    <li>
        <button onClick={()=>{
          setShowAttachments(false)
          setShowPicker((prev)=>!prev)
        }} className='btn' type='button'>
           {
            showPicker ? <CloseIcon  className={"dark:fill-dark_svg_1"}/> :  <EmojiIcon className={"dark:fill-dark_svg_1"} />
           }
           
        </button>
        {/* Emoji picker */}
        {
          showPicker ?  <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker
          theme='dark'
          onEmojiClick={handleEmojiClick}
          />
          </div> : null
        } 
    </li>
  )
}

export default EmojiPickerApp