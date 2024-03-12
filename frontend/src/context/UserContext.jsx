import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("chathub-user")) || null,
  token: localStorage.getItem("chathub-token") || null,
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const login = (user, token) => {
    setUser({ ...user, user, token });
  };

  useEffect(() => {
    const token = localStorage.getItem("chathub-token");
    const newUser = JSON.parse(localStorage.getItem("chathub-user"));

    if (token && newUser) {
      //   setUser(...user, token, user);
      setUser({ ...user, token, user: newUser });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export const useAuth = () => {
  return useContext(UserContext);
};
