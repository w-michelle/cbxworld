/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/authSlice";

const Nav = () => {
  const currentUser = useSelector(selectUser);
  const location = useLocation();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios.post(
        "https://cbxworld-mocha.vercel.app/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center px-4 py-2">
      <Link to="/" className={`${location.pathname === "/" ? "hidden" : ""}`}>
        <button className="text-customBlue"> &lt; Home</button>
      </Link>
      {currentUser ? (
        <div
          className={`${location.pathname === "/auth" ? "hidden" : ""} ml-auto`}
          onClick={logout}
        >
          <button className="py-2 px-4 bg-customBlue/60 hover:bg-customBlue  rounded-md">
            Log out
          </button>
        </div>
      ) : (
        <div
          className={`${location.pathname === "/auth" ? "hidden" : ""} ml-auto`}
        >
          <Link to="/auth">
            <button className="py-2 px-4 bg-customBlue/60 hover:bg-customBlue  rounded-md">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
