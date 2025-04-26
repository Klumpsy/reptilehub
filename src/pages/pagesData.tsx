import React from "react";
import { routerType } from "../types/router.types";
import Blog from "./Blog";
import Home from "./Home";
import Reptiles from "./Reptiles";
import Teraria from "./Teraria";

const pagesData: routerType[] = [
  {
    path: "/",
    element: <Home />,
    title: "home",
  },
  {
    path: "/terraria",
    element: <Teraria />,
    title: "terraria",
  },
  {
    path: "/reptiles",
    element: <Reptiles />,
    title: "reptiles",
  },
  {
    path: "/blog",
    element: <Blog />,
    title: "blog",
  },
];

export default pagesData;
