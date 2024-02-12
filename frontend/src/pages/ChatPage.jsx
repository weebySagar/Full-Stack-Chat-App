import React from "react";

import ChatWindow from "@components/chat/ChatWindow";
import ChatList from "@components/chat/ChatList";



export default function ChatPage() {
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
            <ChatWindow/>
          
          </div>
          
        </div>
      </div>
    </section>
  );
}
