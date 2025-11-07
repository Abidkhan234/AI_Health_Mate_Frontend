import { SignupForm } from "@/components/forms/signup-form";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <SignupForm className={`w-full max-w-xl`} />
    </div>
  );
};

export default RegisterPage;
