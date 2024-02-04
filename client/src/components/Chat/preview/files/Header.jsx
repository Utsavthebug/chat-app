import React from 'react'
import { CloseIcon } from '../../../../svg'
import { useDispatch, useSelector } from 'react-redux'
import { clearFiles } from '../../../../features/chatSlice'

const Header = ({
    activeIndex
}) => {
    const dispatch = useDispatch()

    const clearFilesHandler = ()=>{
        dispatch(clearFiles())
    }

    const {files} = useSelector((state)=>state.chat)

  return (
    <div className='w-full'>
        {/* Container */}
        <div className="w-full flex items-center justify-between">
            {/* close icon */}
            <div className=" translate-x-4 cursor-pointer" onClick={clearFilesHandler}>
                <CloseIcon className={"dark:fill-dark_svg_1"}/>
            </div>
            {/* File Name */}
            <h1 className=' dark:text-dark_text_1 text-[15px]'>
                {files[activeIndex].file?.name}
            </h1>
            {/* Empty tag */}
            <span></span>
        </div>
    </div>
  )
}

export default Header