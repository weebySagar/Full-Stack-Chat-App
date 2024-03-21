import React, { useContext, useEffect, useState } from "react";

import ChatBg from "@images/bg-illustrations.jfif";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { getMessage } from "../../services/chatServices";
import ChatContext, { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/UserContext";
import ScrollableFeed from "react-scrollable-feed";
import { io } from "socket.io-client";
import Message from "./Message";
import Loading from "@components/ui/Loading";
// import ChatBg from "@images/whatsapp-light-bg.png"
// import ChatBg from "@images/whatsapp-dark-bg.png"

const socket = io(import.meta.env.SOCKET_URL);
// let socket;
export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { selectedChat, setChats } = useChat();
  const { user } = useAuth();

  useEffect(() => {
    // socket = io("http://localhost:3000");
    socket.on("connect", () => {});
    socket.on("receive-message", message => {
      setMessages(msgs => [...msgs, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // useEffect(() => {

  // });
  useEffect(() => {
    // const storedMsgs =
    //   JSON.parse(localStorage.getItem("chathub-messages")) ?? [];
    // setMessages(storedMsgs);

    // const fetchRecentMessages = async () => {
    //   let lastMsgId = null;
    //   if (storedMsgs.length > 0) {
    //     lastMsgId = storedMsgs[storedMsgs.length - 1].id || null;
    //   }
    //   const newMsgs = await getMessage(lastMsgId);

    //   const updatedMsg = [...storedMsgs, ...newMsgs].slice(-10);
    //   localStorage.setItem("chathub-messages", JSON.stringify(updatedMsg));
    //   setMessages(updatedMsg);
    // };

    const fetchMessages = async () => {
      setLoading(true);
      const msgs = await getMessage(selectedChat.id);
      setMessages(msgs);
      socket.emit("join-chat", selectedChat.id);
      setLoading(false);
    };
    fetchMessages();
    // fetchRecentMessages();
  }, [selectedChat.id]);

  return (
    <div className="chat-window relative bg-neutral-300 h-full">
      <ChatHeader chatData={selectedChat} />
      <div className="messages-wrapper  w-full h-full absolute pb-32 z-[1] ">
        <ScrollableFeed>
          {!loading ? (
            messages?.map(msg => (
              <Message
                msg={msg}
                selectedChat={selectedChat}
                currentUser={user.user}
                key={msg?.id}
              />
            ))
          ) : (
            <Loading />
          )}
        </ScrollableFeed>
      </div>

      <div
        className={`bg-image absolute inset-0  opacity-30 `}
        style={{ backgroundImage: `url(${ChatBg})` }}
      ></div>
      <ChatInput
        setMessages={setMessages}
        message={message}
        setMessage={setMessage}
        socket={socket}
      />
    </div>
  );
}
