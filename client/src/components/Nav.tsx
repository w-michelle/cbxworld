/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/authSlice";

const Nav = () => {
  const currentUser = useSelector(selectUser);
  const location = useLocation();
  const navigate = useNavigate();
  const logout = () => {
    axios
      .post(
        "http://localhost:8080/auth/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then(() => {
        navigate(0);
        console.log("logged out");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  console.log(location.pathname);

  // if (!currentUser) {
  //   return (
  //     <div className="px-4 w-full flex justify-end">
  //       <Link to="/auth">
  //         <button className="py-2 px-4 bg-customBlue rounded-md">Login</button>
  //       </Link>
  //     </div>
  //   );
  // }
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
          <button className="py-2 px-4 bg-customBlue rounded-md">
            Log out
          </button>
        </div>
      ) : (
        <div
          className={`${location.pathname === "/auth" ? "hidden" : ""} ml-auto`}
        >
          <Link to="/auth">
            <button className="py-2 px-4 bg-customBlue rounded-md">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
