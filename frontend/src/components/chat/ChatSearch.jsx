import React, { useState } from "react";

import MyModal from "@components/ui/Modal";
import GroupForm from "./GroupForm";
import SearchUsers from "@components/SearchUsers";
import NewChat from "./NewChat";
export default function ChatSearch() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="search sticky top-16  py-2 px-3 bg-neutral-300 flex items-center gap-2">
        <div className="input-wrapper flex items-center gap-5 px-5 py-2 rounded-lg bg-teal-700/30 flex-grow">
          <i class="fa-regular fa-magnifying-glass"></i>
          <input
            type="text"
            className="bg-transparent w-full placeholder:text-slate-700 placeholder:text-sm outline-none"
            placeholder="Search"
          />
        </div>
        <div className="create-group">
          <button
            className="bg-teal-700 py-2 px-3 rounded-full outline-none"
            title="Create group"
            onClick={openModal}
          >
            <i class="fa-solid fa-plus" style={{ color: "#d4d4d4" }}></i>
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
        tabContentComponents={[<GroupForm closeModal={closeModal}/>,<NewChat closeModal={closeModal}/>]}
      >
        
      </MyModal>
    </>
  );
}
