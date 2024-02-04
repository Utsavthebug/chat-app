import { useDispatch, useSelector } from "react-redux"
import { CloseIcon, SendIcon } from "../../../../svg"
import Add from "./Add"
import { uploadFiles } from "../../../../utils/upload"
import { useContext, useState } from "react"
import { sendMessage,removeFileFromFiles } from "../../../../features/chatSlice"
import SocketContext from "../../../../context/SocketContext"
import { ClipLoader } from "react-spinners"
import VideoThumbnail from 'react-video-thumbnail'

const HandleAndSend = ({
    setActiveIndex,
    activeIndex,
    message
}) => {
    const socket = useContext(SocketContext)
    const dispatch = useDispatch()
    const {files,activeConversation} = useSelector((state)=>state.chat)
    const {user} = useSelector((state)=>state.user)
    const {token} = user
    const [loading,setLoading] = useState(false)

    //handle remove file
    const handleRemoveFile =(index)=>{
        dispatch(removeFileFromFiles(index))
    }

    //send message handler
    const sendMessageHandler = async()=>{
        //upload files first
        setLoading(true)
        const uploaded_files = await uploadFiles(files)
        //send the message
        const values = {
            token,
            message,
            convo_id:activeConversation._id,
            files:uploaded_files.length>0?uploaded_files:[],
        }

        let newMsg = await dispatch(sendMessage(values))
        socket.emit('send message',newMsg.payload)
        setLoading(false)
    }

    return (
    <div className="w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2">
        {/* Empty */}
        <span></span>
        {/* List Files */}
        <div className="flex items-center gap-x-2">
        {
            files.map((file,i)=>(
                <div 
                key={i} 
                className={`fileThumbnail relative w-14 h-14 border mt-2 dark:border-white rounded-md overflow-hidden cursor-pointer
                ${activeIndex===i ? 'border-[3px] border-green_1':""}
                `}
                onClick={()=>setActiveIndex(i)}
                >
                {
                    file.type==="IMAGE" ?
                    <img className={`w-full h-full object-cover`} src={file.fileData} alt="" /> : 
                    file.type==="VIDEO" ? <VideoThumbnail
                    videoUrl={file.fileData}
                  
                    /> :
                    <img src={`../../../../images/file/${file.type}.png`} alt="" className="w-8 h-10 mt-1.5 ml-2.5" />
                }
                {/* Remove file icon */}
                <div className="removeFileIcon hidden" onClick={()=>handleRemoveFile(i)}>
                <CloseIcon className={"dark:fill-dark_svg_1 absolute right-0 top-0 w-4 h-4"}/>
                </div>
               
                </div>
            ))
        }
        {/* Add another files */}
        <Add setActiveIndex={setActiveIndex} />
        </div>

        {/* send button */}
        <div onClick={()=>sendMessageHandler()} className="bg-green_1 w-16 h-16 mt-2 rounded-full items-center cursor-pointer">
       {
        loading ? <ClipLoader color="#E9EDEF" size={25}/> : <SendIcon className={"fill-white"}/>
       }
       
        </div>

    </div>
  )
}

export default HandleAndSend