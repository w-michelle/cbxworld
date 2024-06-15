import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";

const Auth = () => {
  const [authOption, setAuthOption] = useState("Register");
  return (
    <div className="flex flex-col items-center justify-center border-2 border-neutral-600 w-full">
      <div className="mt-6">
        {authOption === "Register" ? <Login /> : <Register />}
      </div>
      <div>
        <span
          className="hover:cursor-pointer underline text-customBlue"
          onClick={() =>
            setAuthOption(authOption === "Register" ? "Login" : "Register")
          }
        >
          {authOption}
        </span>{" "}
        instead.
      </div>
    </div>
  );
};

export default Auth;
