import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUser } from "../../utils/helper";
import { useAuth } from "../../context/UserContext";
import Button from "./Button";
import AvatarImg from "@images/default-avatar.jpg";
import Input from "./Input";
import axios from "axios";
import { updateUser } from "../../services/apiServices";
import EditComponent from "@components/EditComponent";

export default function UserDetail({ users }) {
  const user = getUser(users);
  const { user: currentUser, logout, updateUserDetails } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    // <div className="flex flex-col text-center">
    <>
      <EditComponent user={user} />
      {user.id === currentUser.user.id && (
        <div className="fixed bottom-6 left-0 right-0 px-6">
          <Button
            className={"!bg-red-200 !text-red-600  w-full"}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </>
    // </div>
  );
}
