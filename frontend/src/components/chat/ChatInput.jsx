import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

import { sendMessage } from "../../services/chatServices";
import ChatContext, { useChat } from "../../context/ChatContext";

export default function ChatInput({
  setMessages,
  message,
  setMessage,
  socket,
}) {
  const { selectedChat } = useChat();

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim()) {
      const data = await sendMessage(message, selectedChat.id);

      if (!data) {
        return toast.error("cannot send message");
      }
      socket.emit("send-message", selectedChat.id, data);
      setMessages((messages) => [...messages, data]);
      setMessage("");
    }
  };
  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="chat-input w-full absolute bottom-0 z-[2]"
    >
      <div className=" bg-neutral-400 py-2 px-8 flex items-center gap-5">
        <div className="input flex-grow">
          <input
            type="text"
            className="w-full py-3 px-2 outline-none rounded bg-neutral-300 placeholder:text-slate-600"
            placeholder="Type a message"
            value={message}
            onChange={handleChange}
          />
        </div>
        <div className="submit-btn">
          <button className="bg-teal-800 py-3 px-4 rounded-full" type="submit">
            <i
              class="fa-solid fa-paper-plane-top"
              style={{ color: "#d4d4d4" }}
            ></i>
          </button>
        </div>
      </div>
    </form>
  );
}
