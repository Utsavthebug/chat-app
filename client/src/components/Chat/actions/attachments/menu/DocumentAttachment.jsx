import { useRef } from "react"
import { DocumentIcon } from "../../../../../svg"
import { useDispatch } from "react-redux"
import { addFiles } from "../../../../../features/chatSlice"
import { getFileType } from "../../../../../utils/file"

const DocumentAttachment = () => {
    const inputRef = useRef(null)
    const dispatch = useDispatch()

    const handleClick = ()=>{
        inputRef.current.click()
    }

    const DocumentHandler=(e)=>{
        let files = Array.from(e.target.files)

        files.forEach((file)=>{
            if(file.type!=="application/pdf" &&
            file.type!=="text/plain" && 
            file.type!=="application/msword" && 
            file.type!=="application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
            file.type!=="application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
            file.type!=="application/vnd.ms-powerpoint" && 
            file.type!=="application/vnd.rar" && 
            file.type!=="application/zip" &&
            file.type!=="audio/mpeg" && 
            file.type!=="audio/wav"
            ){  
                files = files.filter((item)=> item.name!==file.name)
                return;
            } else if(file.size>1024*1024*10){
                files = files.filter((item)=> item.name!==file.name)
                return
            } else{
                dispatch(addFiles({file:file,imgData:e.target.result,type: getFileType(file.type) }))
            }
        })
    }

  return (
    <li>
    <button onClick={handleClick} type="button" className="bg-[#5F66CD] rounded-full">
        <DocumentIcon />
    </button>

    <input 
    type="file" 
    hidden 
    ref={inputRef} 
    multiple
    onChange={DocumentHandler}
    accept='text/plain,
    application/*,
    audio/*
    ' />
    </li>
  )
}

export default DocumentAttachment