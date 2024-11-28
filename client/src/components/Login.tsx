/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "./Loader";

type FormData = {
  email: string;
  password: string;
  username?: string;
};
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    axios
      .post(`${apiUrl}/auth/login`, data, {
        withCredentials: true,
      })
      .then((data: any) => {
        localStorage.setItem("cbAuth", data.data.token);
        reset();
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="text-black">
      <h1 className="text-center text-[#FFF]">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" p-6 flex-auto">
          <div className="flex flex-col gap-4">
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
            value="Login"
            className="hover:cursor-pointer relative py-3 text-white w-full rounded-lg border-2 disabled:cursor-not-allowed"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
