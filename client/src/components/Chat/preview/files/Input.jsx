const Input = ({
    message,
    setMessage
}) => {
  return (
    <div className="w-full max-w-[60%] dark:bg-dark_hover_1 rounded-lg">
        <input 
        type="text" 
        value={message} 
        placeholder="Type a message" 
        className="border-none focus:outline-none h-11 p-2 w-full bg-transparent dark:text-dark_text_1"
        onChange={(e)=>setMessage(e.target.value)} />
    </div>
  )
}

export default Input