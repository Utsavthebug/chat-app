import { useCallback, useState } from "react"
import { ReturnIcon, ValidIcon } from "../../../../svg"
import UnderlineInput from "./UnderlineInput"
import MultipleSelect from "./MultipleSelect"
import { useDispatch, useSelector } from "react-redux"
import { debounce } from "../../../../utils/helpers"
import axios from "axios"
import { ClipLoader } from "react-spinners"
import { createGroupConversation } from "../../../../features/chatSlice"

function CreateGroup({setShowCreateGroup}) {
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.user)
  const {status} = useSelector((state)=>state.chat)

  const [name,setName] = useState("")
  const [searchResults,setSearchResults]  = useState([])
  const [selectedUsers,setSelectedUsers] = useState([])


  const handleSearch = async(e)=>{
    if(e.target.value && e.key==="Enter"){
      setSearchResults([])
      try {
        const {data} = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user?search=${e.target.value}`,{
          headers:{
            Authorization:`Bearer ${user.token}`
          }
        })
        
        if(data.length>0){
          let tempArray =[]
          data.forEach(user => {
            let temp= {
              value:user._id,
              label:user.name,
              picture:user.picture
            }
            tempArray.push(temp)
          })
          setSearchResults(tempArray)
        }
        
      } catch (error) {
        console.log(error.response.data.error.message)
      }
    }
    else{
      setSearchResults([])
    }
  }

  const createGroupHandler = async ()=>{
    if(status!=="loading"){
      const users = selectedUsers.map((user)=>user.value)

      let values = {
        name,
        users,
        token:user.token
      }

      const newConvo = await dispatch(createGroupConversation(values))

    }
  }



  return (
    <div className="createGroupAnimation relative flex0030 h-full z-40">
        <div className="mt-5">
            {/* Close button */}
            <button onClick={()=>setShowCreateGroup(false)} className="btn w-6 h-6">
                <ReturnIcon className={"fill-white"}/>
            </button>

            {/* Group name input */}
            <UnderlineInput placeholder="Name" name={name} setName={setName}/>

            {/* Multiple Select */}
            <MultipleSelect
            selectedUsers={selectedUsers}
            searchResults={searchResults}
            setSelectedUsers={setSelectedUsers}
            handleSearch={handleSearch}
            />


            {/* create group button */}
            <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 ">
              <button 
              onClick={createGroupHandler}
              className="btn bg-green_1 scale-100 hover:bg-green-500">
                {
                  status === 'loading' ? <ClipLoader color="#E9EDEF" size={25}/> : <ValidIcon className={"fill-white mt-2 h-full"}/>
                }
              </button>
            </div>
        </div>
    </div>
  )
}

export default CreateGroup