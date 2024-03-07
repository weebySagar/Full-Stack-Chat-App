import React, { useContext, useEffect, useState } from "react";

import ChatBg from "@images/bg-illustrations.jfif";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { getMessage } from "../../services/chatServices";
import ChatContext, { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/UserContext";
import { pickRandomColor } from "../../utils/helper";
import ScrollableFeed from "react-scrollable-feed";
// import ChatBg from "@images/whatsapp-light-bg.png"
// import ChatBg from "@images/whatsapp-dark-bg.png"

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const { selectedChat } = useChat();
  const { user } = useAuth();

  useEffect(() => {
    const storedMsgs =
      JSON.parse(localStorage.getItem("chathub-messages")) ?? [];
    setMessages(storedMsgs);

    const fetchRecentMessages = async () => {
      let lastMsgId = null;
      if (storedMsgs.length > 0) {
        lastMsgId = storedMsgs[storedMsgs.length - 1].id || null;
      }
      const newMsgs = await getMessage(lastMsgId);

      const updatedMsg = [...storedMsgs, ...newMsgs].slice(-10);
      localStorage.setItem("chathub-messages", JSON.stringify(updatedMsg));
      setMessages(updatedMsg);
    };

    const fetchMessages = async () => {
      const msgs = await getMessage(selectedChat.id);
      setMessages(msgs);
    };
    fetchMessages();

    // fetchRecentMessages();
  }, [selectedChat.id]);

  return (
    <div className="chat-window relative bg-neutral-300 h-full">
      <ChatHeader chatData={selectedChat} />
      <div className="messages-wrapper  w-full h-full absolute pb-32 z-[1] ">
        <ScrollableFeed>
          {messages?.map((msg) => (
            <div
              className={`flex ${
                msg.userId === user.user.id ? "justify-end" : "justify-start"
              } my-2 mx-4`}
            >
              {selectedChat.isGroup ? (
                <div
                  key={msg.id}
                  className={`${
                    msg.userId === user.user.id
                      ? "bg-green-200 "
                      : "bg-blue-200"
                  }  px-2 py-1 rounded shadow inline-block`}
                >
                  <p
                    className={`${pickRandomColor(true)} font-medium text-sm `}
                  >
                    {selectedChat.users.map(
                      (chatUser) =>
                        chatUser.email !== user.user.email &&
                        chatUser.id === msg.userId &&
                        chatUser.name
                    )}
                  </p>
                  <p>
                    {msg?.content}

                    <span className="text-xs text-neutral-600 relative top-1 ml-3">
                      {formatDate(msg?.timeStamp)}
                    </span>
                  </p>
                </div>
              ) : (
                <p
                  key={msg.id}
                  className={`${
                    msg.userId === user.user.id
                      ? "bg-green-200 "
                      : "bg-blue-200"
                  }  px-2 py-1 rounded shadow inline-block`}
                >
                  {msg?.content}

                  <span className="text-xs text-neutral-600 relative top-1 ml-3">
                    {formatDate(msg?.timeStamp)}
                  </span>
                </p>
              )}
            </div>
          ))}
        </ScrollableFeed>
      </div>

      <div
        className={`bg-image absolute inset-0  opacity-30 `}
        style={{ backgroundImage: `url(${ChatBg})` }}
      ></div>
      <ChatInput setMessages={setMessages} />
    </div>
  );
}

function formatDate(data) {
  const date = new Date(data);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format hours, minutes, and seconds to have leading zeros if needed
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Construct the 24-hour time string
  const time24Hours = `${formattedHours}:${formattedMinutes}`;
  return time24Hours;
}
