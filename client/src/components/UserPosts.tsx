/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import UserProfile from "./UserProfile";
import toast from "react-hot-toast";
import { formatDate } from "../utils/formatDate";

interface Post {
  _id: string;
  author: string;
  content: string;
  createdAt: Date;
}

const UserPosts = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState<Post[]>([]);

  const { userId } = useParams();

  const handleDeletePost = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/post/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post?._id !== id));
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/userPosts/${userId}`);
        const response = data.posts;
        setPosts(response);
      } catch (error: any) {
        const statusCode = error.response?.status;
        if (statusCode === 404) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Something went wrong");
        }
      }
    };

    getUserPosts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <UserProfile />
      <div className="max-w-screen-md flex flex-col items-center w-full gap-6">
        {posts &&
          posts?.map((post: any, index: number) => (
            <article
              key={index}
              className="relative p-4 rounded-md border-2 border-white w-full"
            >
              <button
                onClick={() => handleDeletePost(post._id)}
                className="absolute right-4 top-4 text-lg bg-red-600/20 text-[#FFF]/20 hover:bg-red-600 hover:text-[#FFF] rounded-full w-6 h-6 flex items-center justify-center"
              >
                &times;
              </button>
              <div className="flex gap-2">
                <div
                  className="rounded-full w-8 h-8"
                  style={{ backgroundImage: `${post.author.profile}` }}
                  role="img"
                  aria-label={`Profile avatar for ${post.author.name}`}
                ></div>
                <div className="">
                  <p>{post.author.username}</p>
                  <p className="text-xs text-neutral-500">
                    {" "}
                    {formatDate(post.createdAt)}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p>{post.content}</p>
              </div>
            </article>
          ))}
      </div>
    </div>
  );
};

export default UserPosts;
