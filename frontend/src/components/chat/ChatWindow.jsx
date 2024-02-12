import React, { useEffect, useState } from "react";

import ChatBg from "@images/bg-illustrations.jfif";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { getMessage } from "../../services/chatServices";
// import ChatBg from "@images/whatsapp-light-bg.png"
// import ChatBg from "@images/whatsapp-dark-bg.png"

export default function ChatWindow() {
  const [messages,setMessages] = useState([])


  useEffect(()=>{
    setInterval(()=>getMessage(setMessages),1000)
    // setInterval(

    //   getMessage(setMessages),1000
    // )
  },[])
  return (
    <div className="chat-window relative bg-neutral-300 h-full">
      <div
        className={`bg-image absolute inset-0  opacity-40`}
        style={{ backgroundImage: `url(${ChatBg})` }}
      ></div>
      <ChatHeader />
      {
        messages.map(msg=><p key={msg.id}>{msg?.content}</p>)
      }
      <ChatInput />
    </div>
  );
}
