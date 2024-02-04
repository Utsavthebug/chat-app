import React from 'react'

const FileImageVideo = ({url,type}) => {
  return (
    <div>
          {
        type==="IMAGE" ? (
            <img src={url} alt="" className='cursor-pointer' />
        ) : (
            <video src={url} controls className='cursor-pointer'></video>
        )
}
    </div>
  
  )
}

export default FileImageVideo