import moment from 'moment/moment'
import React from 'react'
import { TraingleIcon } from '../../../svg'

const Message = ({message,me}) => {
  return (
    <div className={`w-full flex mt-2 space-x-3 max-w-xs ${me ? "ml-auto justify-end" : ""}`}>
        <div className='relative'>
        {
          !me && message.conversation.isGroup &&  <div className='absolute top-0 left-[-37px]'>
          <img src={message.sender.picture} className='w-8 h-8 rounded-full' alt="" />
        </div>
        }   
            <div className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg ${me ? 'bg-green_3' : 'dark:bg-dark_bg_2'}`}>
                <p className='float-left h-full text-sm pb-5'>{message?.message}</p>
                <span className='absolute right-1.5 bottom-1.5 leading-none text-xs  pt-6 text-dark_text_5'>{moment(message?.createdAt).format("HH:mm")}</span>
             
                {
                    !me ? <span>
                    <TraingleIcon  className={"dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5"}/>
                </span> : null
                }
             
            </div>
        </div>
    </div>
  )
}

export default Message