import { LoginForm } from "@/components/forms/login-form";
import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <LoginForm className={`max-w-xl w-full`} />
    </div>
  );
};

export default LoginPage;
