import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Tester = () => {
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const testUserEmail = import.meta.env.VITE_TEST_EMAIL;
  const testPw = import.meta.env.VITE_TEST_PW;

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        `${apiUrl}/auth/login`,
        { email: testUserEmail, password: testPw },
        {
          withCredentials: true,
        }
      );

      window.location.reload();
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const statusCode = axiosError.response.status;
        if (statusCode === 401) {
          toast.error("The email or password you entered is incorrect");
        } else if (statusCode === 400) {
          toast.error("Something went wrong");
        }
      }
    }
  };
  return (
    <div className="flex flex-col gap-2 p-6 ">
      <button
        onClick={() => handleSubmit()}
        disabled={isLoading}
        className="hover:cursor-pointer relative py-2 px-4 text-white w-full  bg-customBlue/60 hover:bg-customBlue  rounded-md disabled:cursor-not-allowed"
      >
        {" "}
        TESTER LOG IN
      </button>
    </div>
  );
};

export default Tester;
