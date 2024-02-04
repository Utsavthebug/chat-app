import { useSelector } from "react-redux"
import { DotsIcon, SearchLargeIcon } from "../../../svg"
import { capitalize } from "../../../utils/string"
import { getConversationImage, getConversationName } from "../../../utils/chat"


const ChatHeader = ({online}) => {
   
  const {user} = useSelector((state)=>state.user)
  const {activeConversation} = useSelector((state)=>state.chat)
  const {name,picture} = activeConversation

    return (
    <div className="h-[59px] select-none flex items-center p16 dark:bg-dark_bg_2">
        {/* Container */}
        <div className="w-full flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-x-4">
                {/* Conversation image */}
                <button className="btn">
                    <img src={activeConversation.isGroup ? picture : getConversationImage(user,activeConversation.users)} alt={``}  className="h-full w-full rounded-full object-cover"/>
                </button>

            <div className="flex flex-col">
                <h1 className="dark:text-white text-md font-bold">{activeConversation.isGroup ? capitalize(name.split(" ")[0]) : capitalize(getConversationName(user,activeConversation.users).split(" ")[0])}</h1>
                <span className=" text-xs dark:text-dark_svg_2">{online ? 'online':''}</span>
            </div>
            </div>
        
        {/* Right */}
        <ul className="flex items-center gap-x-2.5">
        <li>
            <button className="btn">
            <SearchLargeIcon  className={"dark:fill-dark_svg_1"}/>
            </button>
        </li>

        <li>
            <button className="btn">
            <DotsIcon  className={"dark:fill-dark_svg_1"}/>
            </button>
        </li>
        </ul>
        </div>

    </div>
  )
}

export default ChatHeader