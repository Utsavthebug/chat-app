import { AttachmentIcon } from "../../../../svg"
import Menu from "./menu/Menu"

const Attachments = ({
  showAttachments,
  setShowAttachments,
  setShowPicker
}) => {
  return (
    <li className="relative">
        <button
         type="button" 
         className="btn"
         onClick={()=>{setShowAttachments((prev)=>!prev)
          setShowPicker(false)
        }
        }
         >
            <AttachmentIcon className={"dark:fill-dark_svg_1"} />
        </button>
        {/* Attachments menus */}

        {showAttachments ? <Menu/> : null}
      
    </li>
  )
}

export default Attachments