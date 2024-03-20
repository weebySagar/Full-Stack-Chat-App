import React, { useEffect, useState } from "react";

import ChatHeader from "./ChatHeader";
import ChatSearch from "./ChatSearch";
import ChatItem from "@components/ui/ChatItem";
import useFetch from "@hooks/useFetch";
import { getGroups } from "../../services/groupServices";
import { getAllChats } from "../../services/chatServices";
import { useChat } from "../../context/ChatContext";
import ScrollableFeed from "react-scrollable-feed";
import Loading from "@components/ui/Loading";

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

  const [filterChatValue, setFilterChatValue] = useState("");
  const [filteredChats, setFilteredChats] = useState([]);
  const [isFilteredChatOpen, setIsFilteredChatOpen] = useState(false);
  return (
    <div className="chat-list relative bg-neutral-300  h-full">
      <ChatHeader />
      <ChatSearch
        filterChatValue={filterChatValue}
        setFilterChatValue={setFilterChatValue}
        setFilteredChats={setFilteredChats}
        setIsFilteredChatOpen={setIsFilteredChatOpen}
        isFilteredChatOpen={isFilteredChatOpen}
      />
      <div className="list ">
        <ScrollableFeed>
          {isFilteredChatOpen &&
            (filteredChats.length > 0 ? (
              filteredChats.map(chat => (
                <ChatItem {...chat} key={chat?.id} chatData={chat} />
              ))
            ) : (
              <p className="p-4">No chat found</p>
            ))}

          {!isFilteredChatOpen &&
            (!loading ? (
              chats?.map(chat => (
                <ChatItem {...chat} key={chat?.id} chatData={chat} />
              ))
            ) : (
              <Loading />
            ))}
        </ScrollableFeed>
      </div>
    </div>
  );
}
