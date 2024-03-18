import React, { useState } from "react";

import MyModal from "@components/ui/Modal";
import GroupForm from "./GroupForm";
import SearchUsers from "@components/SearchUsers";
import NewChat from "./NewChat";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/UserContext";
export default function ChatSearch({
  filterChatValue,
  setFilterChatValue,
  setFilteredChats,
  setIsFilteredChatOpen,
  isFilteredChatOpen,
}) {
  let [isOpen, setIsOpen] = useState(false);
  const { chats } = useChat();
  const { user: currentUser } = useAuth();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleFilter = e => {
    const chatName = e.target.value.trim().toLowerCase();
    if (chatName) {
      setIsFilteredChatOpen(true);
      setFilterChatValue(chatName);
      const filteredChatsWithChatName = chats.filter(chat => {
        if (chat.chatName && chat.chatName.toLowerCase().includes(chatName)) {
          return true;
        }
        return false;
      });

      const filteredChatsWithUser = chats.filter(chat => {
        // Check if any user name matches the search query
        if (chat.users) {
          const otherUser = chat.users.find(
            user => user.id !== currentUser.user.id
          );
          if (otherUser && otherUser.name.toLowerCase().includes(chatName)) {
            return true; // Include chats where otherUser name matches
          }
        }
        return false;
      });

      setFilteredChats([
        ...filteredChatsWithChatName,
        ...filteredChatsWithUser,
      ]);
    }
  };

  const handleReset = () => {
    setFilterChatValue("");
    setFilteredChats([]);
    setIsFilteredChatOpen(false);
  };
  return (
    <>
      <div className="search sticky top-16  py-2 px-3 bg-neutral-300 flex items-center gap-2">
        <div className="input-wrapper flex items-center gap-5 px-5 py-2 rounded-lg bg-teal-700/30 flex-grow">
          <i className="fa-regular fa-magnifying-glass"></i>
          <input
            type="text"
            className="bg-transparent w-full placeholder:text-slate-700 placeholder:text-sm outline-none"
            placeholder="Search"
            value={filterChatValue}
            onChange={handleFilter}
          />
          {isFilteredChatOpen && (
            <button onClick={handleReset}>
              <i class="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
        <div className="create-group">
          <button
            className="bg-teal-700 py-2 px-3 rounded-full outline-none"
            title="Create group"
            onClick={openModal}
          >
            <i className="fa-solid fa-plus" style={{ color: "#d4d4d4" }}></i>
          </button>
        </div>
      </div>
      <MyModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
        openModal={openModal}
        withTabs={true}
        firstTab={<GroupForm closeModal={closeModal} />}
        tabContentComponents={[
          <GroupForm closeModal={closeModal} />,
          <NewChat closeModal={closeModal} />,
        ]}
      ></MyModal>
    </>
  );
}
