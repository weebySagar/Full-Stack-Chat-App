import React, { useCallback, useRef, useState } from "react";

import Input from "@components/ui/Input";
import Badge from "@components/ui/Badge";
import UserList from "./UserList";
import useGroupForm from "@hooks/useGroupForm";

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
    handleRemoveSelectedUser
  } = useGroupForm();

  return (
    <>
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Create Group
      </h3>
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

      <div className="mt-3">
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
          onClick={() => handleReset(closeModal)}
        >
          Create group
        </button>
      </div>
    </>
  );
}
