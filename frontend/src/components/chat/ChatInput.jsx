import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

import { sendMessage } from "../../services/chatServices";
import ChatContext, { useChat } from "../../context/ChatContext";
import ImageInput from "./ImageInput";

export default function ChatInput({
  setMessages,
  message,
  setMessage,
  socket,
}) {
  const { selectedChat } = useChat();
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = null;
    if (previewImage) {
      data = await sendMessage(message, previewImage, selectedChat.id);
      if (!data) {
        return toast.error("cannot send message");
      }
    } else if (message.trim()) {
      data = await sendMessage(message, null, selectedChat.id);
      if (!data) {
        return toast.error("cannot send message");
      }
    }

    if (data) {
      socket.emit("send-message", selectedChat.id, data);
      setMessages((messages) => [...messages, data]);
      setMessage("");
      setPreviewImage(null);
    }
  };

  const handleClosePreviewImage = () => {
    setPreviewImage(null);
  };
  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="chat-input w-full absolute bottom-0 z-[2]"
      >
        <div className=" bg-neutral-400 py-2 px-8 flex items-center gap-5">
          <ImageInput
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            handleClose={handleClosePreviewImage}
          />
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
            <button
              className="bg-teal-800 py-3 px-4 rounded-full"
              type="submit"
            >
              <i
                className="fa-solid fa-paper-plane-top"
                style={{ color: "#d4d4d4" }}
              ></i>
            </button>
          </div>
        </div>
      </form>
      {previewImage && (
        <div className="preview-image absolute flex justify-center items-center  top-0 left-0 w-full h-full bg-neutral-500 z-[1]">
          <div className="p-5 absolute top-16 left-0">
            <button className="" onClick={handleClosePreviewImage}>
              <i className="fa-solid fa-xmark text-white text-xl"></i>
            </button>
          </div>
          <div className="h-2/3 w-2/4">
            <img
              src={previewImage}
              alt=""
              className="object-contain h-full w-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
