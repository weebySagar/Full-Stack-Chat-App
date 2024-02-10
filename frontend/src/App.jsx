import { RouterProvider, createBrowserRouter,BrowserRouter } from 'react-router-dom';
import React from 'react';

import HomePage from '@pages/HomePage';
import SignupPage from '@pages/SignupPage';
import LoginPage from '@pages/LoginPage';
import './styles/index.css'
import Header from '@components/Header';

function App() {

 const router = createBrowserRouter([
    {
        path:'/',
        element:<HomePage/>
    },
    {
        path:'/register',
        element:<SignupPage/>
    },
    {
        path:'/login',
        element:<LoginPage/>
    }
])

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
