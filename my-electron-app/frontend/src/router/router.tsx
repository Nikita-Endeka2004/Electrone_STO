import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import User, { userAction } from "../pages/User";
import Works, { worksAction, worksLoader } from "../pages/Works";
import About from "../pages/About";
import Search from "../pages/Search";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "user",
        element: <User/>,
        action: userAction,
      },
      {
        path: "works",
        element: <Works/>,
        action: worksAction,
        loader: worksLoader
      },
      {
        path: "about",
        element: <About/>
      },
      {
        path: "search",
        element: <Search/>
      }
    ]
  }
])