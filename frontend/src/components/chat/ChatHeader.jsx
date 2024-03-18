import React, { useContext, useState } from "react";

import CircleAvatar from "@components/ui/CircleAvatar";
import MyModal from "@components/ui/Modal";
import ChatGroupDetails from "./ChatGroupDetails";
import { getUser } from "../../utils/helper";
import UserDetail from "@components/ui/UserDetail";
import AvatarImg from "@images/default-avatar.jpg";

export default function ChatHeader({ chatData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(chatData);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="header sticky top-0 w-full z-50">
        <div
          className="profile-header py-2 px-3 bg-teal-700 flex items-center gap-2 cursor-pointer"
          onClick={handleOpenModal}
        >
          <CircleAvatar
            className={"h-12 w-12 "}
            img={
              // "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7f7fb319428103.562da3a4c90fd.png"
              chatData?.isGroup
                ? chatData?.imageUrl
                  ? chatData.imageUrl
                  : AvatarImg
                : getUser(chatData?.users)?.imageUrl || AvatarImg
            }
          />
          <h1 className="text-neutral-200 text-lg">
            {chatData?.isGroup
              ? chatData.chatName
              : getUser(chatData?.users).name}
          </h1>
        </div>
      </div>
      <MyModal
        closeModal={handleCloseModal}
        isOpen={isModalOpen}
        className={"h-96"}
      >
        {chatData?.isGroup ? (
          <ChatGroupDetails chatData={chatData} closeModal={handleCloseModal} />
        ) : (
          <UserDetail users={chatData?.users} />
        )}
      </MyModal>
    </>
  );
}
