import React, { useContext } from "react";

import CircleAvatar from "./CircleAvatar";
import ChatContext, { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/UserContext";
import { getUser } from "../../utils/helper";
import AvatarImg from "@images/default-avatar.jpg";

export default function ChatItem({
  id,
  imageUrl,
  chatName,
  latestMessageId,
  lastSeen,
  unreadCount,
  isGroup,
  users,
  chatData,
}) {
  const { setSelectedChat } = useChat();
  const handleClick = () => {
    setSelectedChat(chatData);
  };
  return (
    <div
      className={`chat-item h-20 flex p-3 items-center border-b-[1px] bg-neutral-300 border-neutral-400/40 cursor-pointer hover:bg-neutral-400/80`}
      onClick={handleClick}
    >
      <div>
        <CircleAvatar
          className={"h-9 w-9 bg-teal-800"}
          img={
            // img ||
            // "https://images.unsplash.com/photo-1504473114289-43f5e302d6bb?q=80&w=2151&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            (isGroup ? imageUrl : getUser(users).imageUrl) || AvatarImg
          }
        />
      </div>
      <div className="message flex-grow ml-3 whitespace-nowrap text-ellipsis overflow-hidden">
        <h3 className="text-lg whitespace-nowrap text-ellipsis overflow-x-hidden ">
          {isGroup ? chatName : getUser(users).name}
        </h3>
        <p className="text-sm whitespace-nowrap text-ellipsis overflow-x-hidden flex-grow">
          {latestMessageId?.content}
        </p>
      </div>
      <div className="timestamp flex-none text-end">
        <p className="text-xs text-neutral-700">{lastSeen}</p>
        {/* <p className="text-xs py-1 px-[6px] inline-block bg-teal-800 rounded-full text-neutral-100">
          {unreadCount > 0 && unreadCount}
        </p> */}
      </div>
    </div>
  );
}
