import React from "react";

import { useAuth } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { ChatProvider } from "../context/ChatContext";

const AuthPage = ({ Component, ...rest }) => {
  const { user } = useAuth();

  if (user.user) {
    return (
      <ChatProvider>
        <Component {...rest} />
      </ChatProvider>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default AuthPage;
