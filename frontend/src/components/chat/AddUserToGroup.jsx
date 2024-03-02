import React from "react";

import SearchUsers from "@components/SearchUsers";
import useGroupForm from "@hooks/useGroupForm";
import useFetch from "@hooks/useFetch";
import { addUserToGroup } from "../../services/groupServices";
import toast from "react-hot-toast";
import { useChat } from "../../context/ChatContext";

export default function AddUserToGroup({chatData, existingUsers,closeModal }) {
  const {
    selectedUsers,
    selectedUsersSet,
    searchedUser,
    handleSelectedUser,
    handleReset,
    inputRef,
    optimisedChange,
    handleRemoveSelectedUser,
    // handleSubmit
  } = useGroupForm(existingUsers);

  // const {  loading,fetchData } = useFetch();
  let loading = false;
  const {updateUserList} = useChat()
  const handleSubmit = async() => {
    const users = selectedUsers.map(user=>user.id);

    if(users.length != 0){
        try {
          loading=true;
          const data = await addUserToGroup(chatData.id,users);
          updateUserList(data);
          handleReset()
          closeModal()
        } catch (error) {
          toast.error('Cannot add users')
        }finally{
          loading= false
        }
        // fetchData(addUserToGroup,chatData.id,users).then(()=>handleReset())
    }

  };
  return (
    <SearchUsers
      existingUsers={existingUsers}
      handleSubmit={handleSubmit}
      loading={loading}
      handleSelectedUser={handleSelectedUser}
      searchedUser={searchedUser}
      selectedUsers={selectedUsers}
      selectedUsersSet={selectedUsersSet}
      inputRef={inputRef}
      handleRemoveSelectedUser={handleRemoveSelectedUser}
      optimisedChange={optimisedChange}
    />
  );
}
