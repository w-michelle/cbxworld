import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import getCurrentUser from "../actions/getCurrentUser";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/features/authSlice";

const Tester = () => {
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const testUserEmail = import.meta.env.VITE_TEST_EMAIL;
  const testPw = import.meta.env.VITE_TEST_PW;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.post(
        `${apiUrl}/auth/login`,
        { email: testUserEmail, password: testPw },
        { withCredentials: true }
      );

      await new Promise((res) => setTimeout(res, 500));
      const currentUser = await getCurrentUser();
      if (currentUser) {
        dispatch(addUser(currentUser.data));
        navigate("/");
      } else {
        toast.error("Login Failed");
      }

      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
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
