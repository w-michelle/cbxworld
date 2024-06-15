/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getCurrentUser from "../actions/getCurrentUser";
import axios from "axios";

const Nav = () => {
  const [currentUser, setCurrentUser] = useState<any>();
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

  useEffect(() => {
    const checkCurrentUser = async () => {
      const data = await getCurrentUser();
      if (data) {
        setCurrentUser(data?.data.user);
      } else {
        return null;
      }
    };
    checkCurrentUser();
  }, []);

  console.log(currentUser);

  if (currentUser) {
    return (
      <div className="pr-4 w-full flex justify-end" onClick={logout}>
        <button className="py-2 px-4 bg-customBlue rounded-md">Log out</button>
      </div>
    );
  }
  return (
    <div className="px-4 w-full flex justify-end">
      <Link to="/auth">
        <button className="py-2 px-4 bg-customBlue rounded-md">Login</button>
      </Link>
    </div>
  );
};

export default Nav;
