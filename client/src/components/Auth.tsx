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

      <div className="fixed bottom-0 left-0  text-xs w-full md:max-w-[350px]  p-6 bg-neutral-600">
        ⚠️ Your browser is blocking third-party cookies, which may cause login
        issues. Please enable third-party cookies or use a different browser.
      </div>
    </div>
  );
};

export default Auth;
