import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { sendMessage } from '../../services/chatServices';
import ChatContext from '../../context/ChatContext';

export default function ChatInput() {
  const [message,setMessage] = useState("");
  const {selectedChat} = useContext(ChatContext)

  // console.log(selectedChat);

  const handleChange = (e) =>{
    setMessage(e.target.value);
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();

    if(message.trim()){
      const groupId = selectedChat?.admin ? selectedChat.id : null
      console.log(selectedChat.id);
      const status = await sendMessage(message,groupId,selectedChat.id);

      if(status !== 201){
        return toast.error('cannot send message')
      }

      setMessage("")
    }
  }
  return (
    <form noValidate onSubmit={handleSubmit}>
    <div className="chat-input absolute bottom-0  w-full bg-neutral-400 py-2 px-8 flex items-center gap-5">
    <div className="input flex-grow">
      <input
        type="text"
        className="w-full py-3 px-2 outline-none rounded bg-neutral-300 placeholder:text-slate-600"
        placeholder="Type a message"
        value={message}
        onChange={handleChange}
      />
    </div>
    <div className="submit-btn">
      <button className="bg-teal-800 py-3 px-4 rounded-full" type='submit'>
        <i class="fa-solid fa-paper-plane-top" style={{color: "#d4d4d4"}}></i>
      </button>
    </div>
  </div>
  </form>
  )
}
