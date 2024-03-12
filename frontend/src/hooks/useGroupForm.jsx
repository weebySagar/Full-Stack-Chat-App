import React, { useCallback, useRef, useState } from "react";

import { getSearchUser } from "../services/apiServices";
import { createGroup } from "../services/groupServices";

export default function useGroupForm(existingUsers, newChat) {
  const [groupName, setGroupName] = useState("");
  const [searchedUser, setSearchedUser] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedUsersSet, setSelectedUsersSet] = useState(
    new Set(existingUsers?.map((user) => user.email) || [])
  );
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  const handleChange = async (e) => {
    const { value, name } = e.target;
    if (name === "groupName") {
      return setGroupName(value);
    }
    if (value.trim()) {
      setLoading(true);
      const users = await getSearchUser(value);
      setSearchedUser(
        users.filter((user) => !selectedUsersSet.has(user.email))
      );
      setLoading(false);
    }
  };

  // Debounce function
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        timeoutId = null;
        func.apply(this, args);
      }, delay);
    };
  }

  const optimisedChange = useCallback(debounce(handleChange, 500), []);

  const handleSelectedUser = (user) => {
    if (newChat) {
      setSelectedUser(user);
    } else {
      setSelectedUsers((prev) => [...prev, user]);
      setSelectedUsersSet(new Set([...selectedUsersSet, user.email]));
      inputRef.current.value = "";
      setSearchedUser([]);
      inputRef.current.focus();
    }
  };

  const handleRemoveSelectedUser = (user) => {
    const updatedUser = selectedUsers.filter(
      (selectedUser) => selectedUser.id !== user.id
    );
    setSelectedUsers(updatedUser);

    const updatedEmail = new Set(selectedUsersSet);
    updatedEmail.delete(user.email);
    setSelectedUsersSet(updatedEmail);
  };

  const handleReset = (closeModal) => {
    setGroupName("");
    setSelectedUsers([]);
    setSearchedUser([]);
    setSelectedUsersSet(new Set());
    // closeModal()
  };

  return {
    groupName,
    searchedUser,
    selectedUsers,
    selectedUsersSet,
    optimisedChange,
    handleSelectedUser,
    handleRemoveSelectedUser,
    handleReset,
    handleChange,
    inputRef,
    selectedUser,
    loading,
    // handleSubmit
  };
}
