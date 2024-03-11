import React, { useEffect } from "react";

import ChatHeader from "./ChatHeader";
import ChatSearch from "./ChatSearch";
import ChatItem from "@components/ui/ChatItem";
import useFetch from "@hooks/useFetch";
import { getGroups } from "../../services/groupServices";
import { getAllChats } from "../../services/chatServices";
import { useChat } from "../../context/ChatContext";
import ScrollableFeed from "react-scrollable-feed";

export default function ChatList() {
  const { data, fetchData, loading } = useFetch();
  const { chats, setChats } = useChat();
  useEffect(() => {
    fetchData(getAllChats);
  }, []);

  useEffect(() => {
    if (data) {
      setChats([...chats, ...data]); // Update chats state by
    }
  }, [data]);
  return (
    <div className="chat-list relative   h-full">
      <ChatHeader />
      <ChatSearch />
      <div className="list">
        <ScrollableFeed>
          {!loading &&
            chats?.map((chat) => (
              <ChatItem {...chat} key={chat?.id} chatData={chat} />
            ))}
        </ScrollableFeed>
      </div>
    </div>
  );
}
