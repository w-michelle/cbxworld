import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Tester from "./TesterBtn";

const Auth = () => {
  const [authOption, setAuthOption] = useState("Register");
  return (
    <div className="relative flex flex-col items-center justify-center w-full">
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
      </div>
      {/* //tester button */}
      <Tester />
    </div>
  );
};

export default Auth;
