import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./pages/router";
import Navbar from "./components/Navbar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext/AuthContext";

const App: React.FunctionComponent = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <>
            <Navbar />
            <div className="max-w-7xl mx-auto p-2">
              <Router />
            </div>
          </>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
