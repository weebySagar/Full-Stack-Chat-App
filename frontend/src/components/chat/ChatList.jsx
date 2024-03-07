import React, { useEffect } from "react";

import ChatHeader from "./ChatHeader";
import ChatSearch from "./ChatSearch";
import ChatItem from "@components/ui/ChatItem";
import useFetch from "@hooks/useFetch";
import { getGroups } from "../../services/groupServices";
import { getAllChats } from "../../services/chatServices";
import { useChat } from "../../context/ChatContext";

export default function ChatList() {
  const { data, fetchData, loading } = useFetch();
  const { chats, setChats } = useChat();
  useEffect(() => {
    fetchData(getAllChats);
  }, []);

  useEffect(() => {
    if (data) {
      setChats([...chats, ...updatedChats]); // Update chats state by
    }
  }, [data]);
  return (
    <div className="chat-list relative bg-neutral-300  h-full">
      <ChatHeader />
      <ChatSearch />
      <div className="list">
        {!loading &&
          chats?.map((chat) => (
            <ChatItem {...chat} key={chat?.id} chatData={chat} />
          ))}
      </div>
    </div>
  );
}
