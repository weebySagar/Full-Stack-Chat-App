import React from "react";

import { convertBase64, formatDate, pickRandomColor } from "../../utils/helper";

const Message = ({ msg, currentUser, selectedChat }) => {
  return (
    <div
      className={`flex ${
        msg.userId === currentUser.id ? "justify-end" : "justify-start"
      } my-2 mx-4`}
    >
      {selectedChat.isGroup ? (
        <div
          key={msg.id}
          className={`${
            msg.userId === currentUser.id ? "bg-green-200 " : "bg-blue-200"
          } ${
            msg?.image?.imageData ? "max-w-52" : "max-w-[70%]"
          }  px-2 py-1 rounded shadow inline-block `}
        >
          <p className={`${pickRandomColor(true)} font-medium text-sm `}>
            {selectedChat.users.map(
              (chatUser) =>
                chatUser.email !== currentUser.email &&
                chatUser.id === msg.userId &&
                chatUser.name
            )}
          </p>
          {msg?.image?.imageData && (
            <img
              src={convertBase64(msg?.image?.imageData.data)}
              alt=""
              className="h-60 w-48 "
            />
          )}

          <p className="break-words whitespace-pre-wrap">
            {msg?.content}

            <span className="text-xs text-neutral-600 relative top-1 ml-3 float-right">
              {formatDate(msg?.timeStamp)}
            </span>
          </p>
        </div>
      ) : (
        <div
          key={msg.id}
          className={`${
            msg.userId === currentUser.id ? "bg-green-200 " : "bg-blue-200"
          } ${
            msg?.image?.imageData ? "max-w-52" : "max-w-[70%]"
          } px-2 py-1 rounded shadow inline-block  break-words whitespace-pre-wrap leading-none`}
        >
          {msg?.image?.imageData && (
            <img
              src={convertBase64(msg?.image?.imageData.data)}
              alt=""
              className="h-60 w-48 "
            />
          )}
          <p>
            {msg?.content}

            <span className="text-xs text-neutral-600 relative top-1 ml-3 float-right">
              {formatDate(msg?.timeStamp)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Message;
