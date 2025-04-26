import React from "react";
import pagesData from "./pagesData";
import { Route, Routes } from "react-router-dom";

const router = () => {
  const pageRoutes = pagesData.map(({ path, title, element }) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  return <Routes>{pageRoutes}</Routes>;
};

export default router;
