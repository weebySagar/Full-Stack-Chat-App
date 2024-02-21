import React from "react";

import Input from "@components/ui/Input";
import Badge from "@components/ui/Badge";
import UserList from "./UserList";
import useGroupForm from "@hooks/useGroupForm";
import { createGroup } from "../../services/groupServices";
import useFetch from "@hooks/useFetch";
import SearchUsers from "@components/SearchUsers";

export default function GroupForm({ closeModal }) {
  const {
    groupName,
    handleChange,
    selectedUsers,
    selectedUsersSet,
    searchedUser,
    handleSelectedUser,
    handleReset,
    inputRef,
    optimisedChange,
    handleRemoveSelectedUser,
    // handleSubmit
  } = useGroupForm();

  const {loading,fetchData} = useFetch()

  const handleSubmit=async()=>{
    const users = selectedUsers?.map(user=>user.id);
    const adminId= JSON.parse(localStorage.getItem('chathub-user')).id;
    console.log(users.length);
    if(users.length!= 0 && groupName){

      fetchData(createGroup,groupName,users,adminId).then(()=>{
        handleReset();
        closeModal()
      })
    }
    
  }

  return (
    <>
      {/* <h3 className="text-lg font-medium leading-6 text-gray-900">
        Create Group
      </h3> */}
      <div className="mt-2">
        <Input
          placeholder={"Enter group name"}
          icon={"fa-solid fa-user-group"}
          onChange={handleChange}
          type={"text"}
          value={groupName}
          name="groupName"
        />
      </div>

      {/* <div className="mt-3">
        <p>Add Users</p>
        <Input
          type={"text"}
          icon={"fa-solid fa-user"}
          onChange={(e) => optimisedChange(e)}
          placeholder={"search users"}
          ref={inputRef}
        />

        <div className="mt-2">
          {selectedUsers.map((user) => (
            <Badge
              {...user}
              key={user.email}
              onClick={() => handleRemoveSelectedUser(user)}
            />
          ))}
        </div>
        <div className="mt-3">
          {searchedUser.length == 0 ? (
            <p>No user found</p>
          ) : (
            <ul>
              {searchedUser.map((user) => {
                return (
                  !selectedUsersSet.has(user.email) && (
                    <UserList
                      user={user}
                      handleSelectedUser={handleSelectedUser}
                      key={user.id}
                    />
                  )
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-4">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-teal-600  px-4 py-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          onClick={ handleSubmit}
          disabled={loading}
        >
          {
            loading ? <><i class="fa-solid fa-spinner-third animate-spin mr-2"></i> Loading</> :
          "Create group"
          }
        </button>
      </div> */}
      <SearchUsers handleSubmit={handleSubmit} loading={loading} handleSelectedUser={handleSelectedUser} searchedUser={searchedUser} selectedUsers={selectedUsers} selectedUsersSet={selectedUsersSet} inputRef={inputRef} handleRemoveSelectedUser={handleRemoveSelectedUser} optimisedChange={optimisedChange}/>
    </>
  );
}
