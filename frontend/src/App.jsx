import {
  RouterProvider,
  createBrowserRouter,
  BrowserRouter,
} from "react-router-dom";
import React from "react";

import HomePage from "@pages/HomePage";
import SignupPage from "@pages/SignupPage";
import LoginPage from "@pages/LoginPage";
import "./styles/index.css";
import Header from "@components/Header";
import { Toaster } from "react-hot-toast";
import ChatPage from "@pages/ChatPage";
import { ChatProvider } from "./context/ChatContext";
import { UserProvider } from "./context/UserContext";
import AuthPage from "@pages/AuthPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/register",
      element: <SignupPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/chat",
      element: <AuthPage Component={ChatPage} />,
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />
      <Toaster />
    </UserProvider>
  );
}

export default App;
