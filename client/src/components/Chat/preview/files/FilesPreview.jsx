import FileViewer from "./FileViewer"
import Header from "./Header"
import Input from "./Input"
import HandleAndSend from "./HandleAndSend"
import { useState } from "react"

const FilesPreview = () => {
    const [message,setMessage] = useState("")
    const [activeIndex,setActiveIndex] = useState(0)
  return (
    <div className="relative py-2 w-full flex item-center justify-center">
        {/* Container */}
        <div className="w-full flex flex-col items-center">
            {/* Header */}
            <Header activeIndex={activeIndex}/>

            {/* Viewing selected files */}
            <FileViewer activeIndex={activeIndex}/>

            <div className="w-full flex flex-col items-center">
                {/* Message Input */}
                <Input
                message={message}
                setMessage={setMessage}
                />

                {/* Send and manipulate files */}
                <HandleAndSend 
                message={message}
                setActiveIndex={setActiveIndex}
                activeIndex={activeIndex} />
            </div>
        </div>
    </div>
  )
}

export default FilesPreview