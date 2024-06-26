/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/authSlice";
import toast from "react-hot-toast";

type FormData = {
  author?: string;
  content: string;
};

const CreatePost = () => {
  const currentUser = useSelector(selectUser);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const schema = yup.object().shape({
    content: yup
      .string()
      .required("Email is required")
      .min(1, "Content cannot be blanked"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    setValue("author", currentUser?._id);

    try {
      await axios.post(`https://cbxworld-mocha.vercel.app/createPost`, data, {
        withCredentials: true,
      });
      navigate("/");
      reset();
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="mt-10">Create Post</h1>

      <div className="w-1/3 text-black">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" p-6 flex-auto">
            <div className="flex flex-col gap-4">
              <textarea
                id="content"
                {...register("content")}
                required
                disabled={isLoading}
                placeholder="Your Content"
                className="p-2 rounded-md"
                rows={6}
              />
              {errors["content"] && (
                <p className="mt-4 text-red-400">
                  {errors["content"]?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1 px-6">
            <input
              type="submit"
              disabled={isLoading}
              value="Submit"
              className="hover:cursor-pointer relative py-3 text-white w-full rounded-lg  bg-customBlue disabled:cursor-not-allowed"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
