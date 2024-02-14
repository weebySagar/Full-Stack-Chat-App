import React, { useEffect, useState } from "react";

import ChatBg from "@images/bg-illustrations.jfif";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { getMessage } from "../../services/chatServices";
// import ChatBg from "@images/whatsapp-light-bg.png"
// import ChatBg from "@images/whatsapp-dark-bg.png"

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedMsgs = JSON.parse(localStorage.getItem("chathub-messages")) ?? [];
    setMessages(storedMsgs);

    const fetchRecentMessages = async() =>{
      let lastMsgId = null;
      if(storedMsgs.length > 0){
         lastMsgId = storedMsgs[storedMsgs.length-1].id || null
      }
      const newMsgs = await getMessage(lastMsgId);

      const updatedMsg = [...storedMsgs,...newMsgs].slice(-10);
      localStorage.setItem("chathub-messages",JSON.stringify(updatedMsg));
      setMessages(updatedMsg)
    }

    fetchRecentMessages();
  }, []);

  return (
    <div className="chat-window relative bg-neutral-300 h-full">
      <div
        className={`bg-image absolute inset-0  opacity-40`}
        style={{ backgroundImage: `url(${ChatBg})` }}
      ></div>
      <ChatHeader />
      {messages?.map((msg) => (
        <p key={msg.id}>{msg?.content}</p>
      ))}
      <ChatInput />
    </div>
  );
}
