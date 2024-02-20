import React from "react";

import useGroupForm from "@hooks/useGroupForm";
import Input from "./ui/Input";
import UserList from "./chat/UserList";
import Badge from "./ui/Badge";

export default function SearchUsers({
  existingUsers,
  handleSubmit,
  selectedUsers,
  searchedUser,
  selectedUsersSet,
  handleSelectedUser,
  inputRef,
  handleRemoveSelectedUser,
  optimisedChange,
  loading,
}) {
  //   const {
  //     optimisedChange,
  //     selectedUsers,
  //     handleRemoveSelectedUser,
  //     searchedUser,
  //     selectedUsersSet,
  //     handleSelectedUser,
  //     inputRef,
  //   } = useGroupForm(existingUsers);

  return (
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
        {selectedUsers?.map((user) => (
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
                    key={user?.id}
                  />
                )
              );
            })}
          </ul>
        )}
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-teal-600  px-4 py-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <i class="fa-solid fa-spinner-third animate-spin mr-2"></i>{" "}
              Loading
            </>
          ) : existingUsers ? (
            "Add users"
          ) : (
            "Create group"
          )}
        </button>
      </div>
    </div>
  );
}
