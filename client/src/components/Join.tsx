/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import getCurrentUser from "../actions/getCurrentUser";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const inputRef = useRef<any>([]);
  const [pin, setPin] = useState(new Array(4).fill(""));
  const [currentUser, setCurrentUser] = useState<any>();

  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (value.length <= 1) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value.length === 1 && index < inputRef.current.length - 1) {
        inputRef.current[index + 1].focus();
      }
    }
  };

  const onSubmit = () => {
    axios
      .post(
        `http://localhost:8080/auth/join/${currentUser._id}`,
        {
          passcode: pin,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        setPin(new Array(4).fill(""));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getCurrentUser();
      if (!data) {
        navigate("/");
      } else {
        setCurrentUser(data?.data.user);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full bg-black">
      <div className="flex items-center justify-center space-x-3 shadow-custom py-6 w-[250px] text-customBlue rounded-md">
        {[...Array(4)].map((_, i) => (
          <input
            ref={(el) => (inputRef.current[i] = el)}
            key={i}
            maxLength={1}
            type="text"
            value={pin[i]}
            onChange={(e) => handleInputChange(e, i)}
            className="w-[38px] h-[38px] text-center border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          />
        ))}
      </div>
      <div>
        <button
          onClick={onSubmit}
          className="text-sm py-2 bg-customBlue/60 hover:bg-customBlue w-[80px] rounded-md tracking-widest"
        >
          JOIN
        </button>
      </div>
    </div>
  );
};

export default Join;
