import React from "react";

import SearchUsers from "@components/SearchUsers";
import useGroupForm from "@hooks/useGroupForm";
import useFetch from "@hooks/useFetch";
import { addUserToGroup } from "../../services/groupServices";

export default function AddUserToGroup({chatData, existingUsers }) {
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

  const { data, loading,fetchData } = useFetch();
  const handleSubmit = () => {
    const users = selectedUsers.map(user=>user.id);

    if(users.length != 0){
        fetchData(addUserToGroup,chatData.id,users).then(()=>handleReset())
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
