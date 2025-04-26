import React from "react";
import { BrowserRouter } from "react-router";
import Router from "./pages/router";
import Navbar from "./components/Navbar";

const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="max-w-7xl mx-auto p-2">
        <Router />
      </div>
    </BrowserRouter>
  );
};

export default App;
