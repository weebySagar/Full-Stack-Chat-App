import React, { useContext } from "react";

import ChatWindow from "@components/chat/ChatWindow";
import ChatList from "@components/chat/ChatList";
import ChatContext from "../context/ChatContext";
import ChatWindowPlaceholder from "@components/ChatWindowPlaceholder";



export default function ChatPage() {
  const { selectedChat,chats} = useContext(ChatContext)
  console.log(selectedChat);
  console.log(chats);
  return (
    <section className="chat-page h-screen overflow-hidden">
      <div className="container mx-auto w-full h-full">
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-4  h-full overflow-y-scroll scrollbar-webkit">
        {/* users list */}
              <ChatList/>
          </div>
          {/* chats section */}
          <div className="col-span-8" >
            {
              selectedChat === null ?
              <ChatWindowPlaceholder/>:
              <ChatWindow/>
            }
          
          </div>
          
        </div>
      </div>
    </section>
  );
}
