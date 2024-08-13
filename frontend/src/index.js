import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import HomePage from "./routes/homepage/homePage";
import DashboardPage from "./routes/dashboardpage/dashboardPage";
import ChatPage from "./routes/chatPage/chatPage"
import RootLayout from './layouts/rootLayout/RootLayout';
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout';
import SignInPage from './routes/signinPage/signInPage';
import SignupPage from './routes/signupPage/signupPage';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "/sign-in/*",
        element: <SignInPage />
      },
      {
        path: "/sign-up/*",
        element: <SignupPage />
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage/>
          },
          {
            path: "/dashboard/chats/:id",
            element: <ChatPage />
          }
        ]
      }
    ]
  },
  
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
