import { createBrowserRouter, Navigate } from "react-router";
import Home from './views/Home.tsx';
import Assortments from './views/Assortments.tsx';
import Hierarchy from './views/Hierarchy.tsx';
import MainLayout from "./main-layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/assortments", element: <Assortments /> },
      { path: "/hierarchy", element: <Hierarchy /> }
    ]
  },
  {
    path: "*",
    element: <Navigate to='/' replace />,
  },
]);

export default router;