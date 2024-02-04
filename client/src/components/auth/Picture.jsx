import { useRef, useState } from "react"

const Picture = ({readablePicture,setPicture,setReadablePicture}) => {
    const inputRef = useRef()
    const [error,setError] = useState("")

    const handlePicture =(e)=>{
        const pic = e.target.files[0];
        console.log(pic)

        if(pic.type!=="image/jpeg" && pic.type!=="image/png" && pic.type!=="image/webp" && pic.type!=="image/jpg"){
            setError(`${pic.name} format is not supported`)
            return;
        }
        else if(pic.size > 1024*1024*5) { //5mb 
            setError(`${pic.name} is too large, maximum 5mb allowed`)
            return
        }
        setError('')
        setPicture(pic)

        //reading the picture
        const reader = new FileReader()
        reader.readAsDataURL(pic)

        reader.onload = (e)=>{
            setReadablePicture(e.target.result)
        }
    }

    const handleChangePic = ()=>{
        setPicture("")
        setReadablePicture("")
    }

  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
        <label htmlFor="picture" className="text-sm font-bold tracking-wide">Picture(Optional)</label>
        {
            readablePicture ?( <div>
                <img src={readablePicture} alt="picture" className=" w-20 h-20 object-cover rounded-full" />
                
                <div onClick={handleChangePic} className="mt-2 p-3 dark:bg-dark_bg_3 rounded-md text-sm flex items-center justify-center cursor-pointer">
                    Remove
                 </div>

              </div> 
      
            )
            :  <div onClick={()=>inputRef.current.click()} className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"> 
                        Upload picture
                 </div>

        
        }

        <input type="file" name="picture" id="picture"  ref={inputRef} accept="image/png,image/jpeg,image/webp" onChange={handlePicture} hidden/>

        {
            <div className="mt-2">
                <p className="text-red-400">{error}</p>
            </div>
        }
    </div>
  )
}
 
export default Picture