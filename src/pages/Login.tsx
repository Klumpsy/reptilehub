import React from "react";
import LoginForm from "../components/LoginForm";

const Login: React.FunctionComponent = () => {
  return (
    <div className="flex mx-auto flex-col w-full">
      <div className="text-4xl mx-auto mb-7">Login</div>
      <LoginForm />
    </div>
  );
};

export default Login;
