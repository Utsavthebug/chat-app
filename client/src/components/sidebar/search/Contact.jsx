import { useDispatch, useSelector } from "react-redux"
import { open_create_conversation } from "../../../features/chatSlice"
import { useContext } from "react"
import SocketContext from "../../../context/SocketContext"

const Contact = ({
    contact,
    setSearchResults
}) => {

    const socket = useContext(SocketContext)
    const dispatch = useDispatch()
    const {user}  = useSelector((state)=>state.user)
    const {token} = user

    const values = {
        receiver_id : contact?._id,
        token
    }

    const openConversation = async()=>{
          const newConvo =  await dispatch(open_create_conversation(values))
           setSearchResults([])
           socket.emit("join conversation",newConvo.payload._id)
    }

  return (
    <li
    onClick={openConversation}
    className=" list-none h-[72px] hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]">
        {/* Container */}
        <div className="py-[10px] flex items-center gap-x-3">
            {/* Contacts */}
            <div className='flex items-center gap-x-3'>
            <div className="relative max-w-[50px] max-h-[50px] rounded-full overflow-hidden">
                <img src={contact?.picture} alt={contact?.name}  className='w-full h-full object-cover'/>
            </div>

            <div className="w-full flex flex-col">
                {/* conversation name */}
                <h1 className='font-bold flex items-center gap-x-2'>
                    {contact?.name}
                </h1>

                <div className='flex items-center gap-x-1 dark:text-dark_text_2'>
                    <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                        <p>{contact?.status}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    
    {/* Border */}
    <div className="ml-16 border-b dark:border-b-dark_border_1"></div>

    </li>
  )
}

export default Contact