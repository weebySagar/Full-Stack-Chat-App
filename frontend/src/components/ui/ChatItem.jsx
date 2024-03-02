import React, { useContext } from "react";

import CircleAvatar from "./CircleAvatar";
import ChatContext from "../../context/ChatContext";
import { useAuth } from "../../context/UserContext";
import { getUser } from "../../utils/helper";

export default function ChatItem({
  id,
  img,
  chatName,
  lastMsg,
  lastSeen,
  msgs,
  isGroup,
  users,
  chatData,
}) {
  const { setSelectedChat } = useContext(ChatContext);
  const handleClick = () => {
    setSelectedChat(chatData);
  };
  return (
    <div
      className="chat-item h-20 flex p-3 items-center border-b-[1px] border-neutral-400/40 cursor-pointer hover:bg-neutral-400/80"
      onClick={handleClick}
    >
      <CircleAvatar
        className={"h-9 w-9 bg-teal-800"}
        img={
          img ||
          "https://images.unsplash.com/photo-1504473114289-43f5e302d6bb?q=80&w=2151&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <div className="message flex-grow ml-3 overflow-hidden whitespace-nowrap text-ellipsis">
        <h3 className="text-lg">{isGroup ? chatName : getUser(users).name}</h3>
        <p className="text-sm">{lastMsg}</p>
      </div>
      <div className="timestamp flex-none text-end">
        <p className="text-xs text-neutral-700">{lastSeen}</p>
        <p className="text-xs py-1 px-[6px] inline-block bg-teal-800 rounded-full text-neutral-100">
          {msgs}
        </p>
      </div>
    </div>
  );
}
