import React from "react";
import RegistrationForm from "../components/RegistrationForm";

const Register: React.FunctionComponent = () => {
  return (
    <div className="flex mx-auto flex-col w-full">
      <div className="text-4xl mx-auto mb-7">Register</div>
      <RegistrationForm />
    </div>
  );
};

export default Register;
