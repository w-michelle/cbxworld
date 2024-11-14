import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Tester = () => {
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const testUserEmail = import.meta.env.VITE_TEST_EMAIL;
  const testPw = import.meta.env.VITE_TEST_PW;

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLoading(true);
    axios
      .post(
        `${apiUrl}/auth/login`,
        { email: testUserEmail, password: testPw },
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        localStorage.setItem("cbAuth", data.data.token);
        navigate("/");
        navigate(0);
      })
      .catch((error) => {
        const statusCode = error.response.status;
        if (statusCode === 401) {
          toast.error("The email or password you entered is incorrect");
        } else if (statusCode === 400) {
          toast.error("Something went wrong");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="flex flex-col gap-2 p-6 ">
      <button
        onClick={() => handleSubmit()}
        disabled={isLoading}
        value="Login"
        className="hover:cursor-pointer relative py-2 px-4 text-white w-full  bg-customBlue/60 hover:bg-customBlue  rounded-md disabled:cursor-not-allowed"
      >
        {" "}
        TESTER LOG IN
      </button>
    </div>
  );
};

export default Tester;

// {email: 'test123@cb.com, password: 'test123@@'}
