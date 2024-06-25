import React from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type FormData = {
  email: string;
  password: string;
  username: string;
  profile?: string;
  membership?: boolean;
};

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(1, "Username must be 1 char minimum")
      .matches(/[a-zA-Z]/, "Username can only contain Latin letters."),
    email: yup.string().required("Email is required").email("Email is invalid"),

    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password must contain Latin letters."),
    profile: yup.string(),
    membership: yup.boolean(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const generateProfilePic = () => {
    const colorOne = [
      "lime",
      "green",
      "mediumblue",
      "teal",
      "dimgray",
      "indigo",
      "#001bff",
    ];
    const colorTwo = [
      "violet",
      "red",
      "orange",
      "yellow",
      "purple",
      "fuchsia",
      "pink",
    ];

    const randomIndex = Math.floor(Math.random() * 7);
    const randomIndexTwo = Math.floor(Math.random() * 7);

    const gradientColorOne = `${colorOne[randomIndex]}`;
    const gradientColorTwo = `${colorTwo[randomIndexTwo]}`;
    return `linear-gradient(to left top, ${gradientColorOne}, ${gradientColorTwo})`;
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    setValue("profile", generateProfilePic());
    setValue("membership", false);
    axios
      .post("http://localhost:8080/auth/register", data)
      .then(() => {
        navigate(0);
        reset();
      })
      .catch((error: any) => {
        const statusCode = error.response.status;
        if (statusCode === 409) {
          toast.error(error.response.data.error);
        } else if (statusCode === 400) {
          toast.error("Something went wrong");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="text-black">
      <h1 className="text-center text-[#FFF]">Register</h1>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" p-6 flex-auto">
            <div className="flex flex-col gap-4">
              <Input
                id="username"
                label="Username"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
              <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
              <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 p-6">
            <input
              type="submit"
              disabled={isLoading}
              value="Sign Up"
              className="hover:cursor-pointer relative py-3 text-white w-full rounded-lg border-2  hover:bg-cusGreen/80 bg-cusGreen disabled:bg-cusGreen/30"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
