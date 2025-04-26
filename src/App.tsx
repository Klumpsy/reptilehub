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

//https://www.youtube.com/watch?v=dKuE9ubQMCs&list=PL6tf8fRbavl2Y9nntlYBVS64bk28ffekB&index=4
