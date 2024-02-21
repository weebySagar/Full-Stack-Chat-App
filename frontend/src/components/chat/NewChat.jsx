import SearchUsers from "@components/SearchUsers";
import useFetch from "@hooks/useFetch";
import useGroupForm from "@hooks/useGroupForm";
import React from "react";

export default function NewChat() {
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

  const { data, loading, fetchData } = useFetch();

  const handleClick = (user) => {
    console.log(user);
  };

  return (
    <SearchUsers
      //   selectedUsers={selectedUsers}
      searchedUser={searchedUser}
      optimisedChange={optimisedChange}
      inputRef={inputRef}
      loading={loading}
      startChat={true}
      selectedUsersSet={selectedUsersSet}
      handleSelectedUser={handleSelectedUser}
      handleSubmit={handleClick}
    />
  );
}
