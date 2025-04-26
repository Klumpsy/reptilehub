import React from "react";
import { routerType } from "../types/router.types";
import Blog from "./Blog";
import Home from "./Home";
import Reptiles from "./Reptiles";
import Teraria from "./Teraria";
import Login from "./Login";

const pagesData: routerType[] = [
  {
    path: "/",
    element: <Home />,
    title: "home",
    inNavBar: true,
  },
  {
    path: "/terraria",
    element: <Teraria />,
    title: "terraria",
    inNavBar: true,
  },
  {
    path: "/reptiles",
    element: <Reptiles />,
    title: "reptiles",
    inNavBar: true,
  },
  {
    path: "/blog",
    element: <Blog />,
    title: "blog",
    inNavBar: true,
  },
  {
    path: "/login",
    element: <Login />,
    title: "login",
    inNavBar: false,
  },
];

export default pagesData;
