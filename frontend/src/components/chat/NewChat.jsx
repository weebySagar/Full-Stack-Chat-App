import SearchUsers from "@components/SearchUsers";
import useFetch from "@hooks/useFetch";
import useGroupForm from "@hooks/useGroupForm";
import React, { useContext } from "react";
import ChatContext, { useChat } from "../../context/ChatContext";
import { accessChat } from "../../services/chatServices";

export default function NewChat({ closeModal }) {
  const {
    selectedUsers,
    selectedUsersSet,
    searchedUser,
    handleSelectedUser,
    handleReset,
    inputRef,
    optimisedChange,
    handleRemoveSelectedUser,
    selectedUser,
    // handleSubmit
  } = useGroupForm(null, true);

  const { setSelectedChat, setChats, chats } = useChat();

  // const { data, loading, fetchData } = useFetch();

  const handleClick = async (user) => {
    const userId = [user.id];
    // await fetchData(accessChat, userId);
    const data = await accessChat(userId);

    // if(!loading){
    // console.log(data, loading);
    if (!chats.find((c) => c.id === data.id)) 
    {
      setChats([...chats, data]);
    }
    setSelectedChat(data);
    handleReset();
    closeModal();
    // }
  };

  return (
    <SearchUsers
      //   selectedUsers={selectedUsers}
      searchedUser={searchedUser}
      optimisedChange={optimisedChange}
      inputRef={inputRef}
      // loading={loading}
      startChat={true}
      selectedUsersSet={selectedUsersSet}
      handleSelectedUser={handleSelectedUser}
      handleSubmit={handleClick}
    />
  );
}
