import { useSelector } from "react-redux"

const FileViewer = ({
    activeIndex
}) => {

    const {files} = useSelector((state)=>state.chat)

  return (
    <div className=" w-full max-w-[60%]">
        {/* Container */}
        <div className="flex justify-center items-center">
            {
           files[activeIndex].type ==="IMAGE" ?   <img src={files[activeIndex].fileData} className="max-w-[80%] object-contain hview" alt="image" /> : 
           files[activeIndex.type==="VIDEO"] ? <video src={files[activeIndex].fileData} className="max-w-[80%] object-contain hview" controls></video>:
           <div className="min-w-full items-center justify-center hview flex flex-col"> 
           {/* File Icon Image */}
            <img src={`../../../../images/file/${files[activeIndex].type}.png`} alt="" />
           
           {/* No preview text */}
           <h1 className=" dark:text-dark_text_2 text-2xl">No preview available</h1>

           <span className="dark:text-dark_text_2">
            {files[activeIndex]?.file?.size} kB - {files[activeIndex]?.type}
           </span>
           </div>
        }
        </div>
    </div>
  )
}

export default FileViewer