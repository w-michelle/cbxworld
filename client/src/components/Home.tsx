/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Nav from "./Nav";
import axios from "axios";
import { formatDate } from "../utils/formatDate";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/authSlice";
import UserProfile from "./UserProfile";

const Home = () => {
  const [posts, setPosts] = useState<any>();
  const currentUser = useSelector(selectUser);
  //provide logion/signup buttons at top
  useEffect(() => {
    const fetchPosts = async () => {
      axios
        .get("http://localhost:8080/getPosts", {
          withCredentials: true,
        })
        .then((data) => {
          setPosts(data.data);
        })
        .catch((error: any) => {
          console.log(error);
        });
    };
    fetchPosts();
  }, []);

  return (
    <div className="h-full bg-[#000]">
      <div className="relative mt-4 flex flex-col justify-center md:flex-row gap-10 w-full p-4">
        {/* if signed in then theres member component */}
        {currentUser && <UserProfile />}

        <div className="max-w-screen-md flex flex-col items-center w-full gap-6">
          {posts &&
            posts?.map((post: any, index: number) => (
              <div
                key={index}
                className="p-4 rounded-md border-2 border-white w-full"
              >
                <div className="flex gap-2">
                  <div
                    className="rounded-full w-8 h-8"
                    style={{ backgroundImage: `${post.author.profile}` }}
                  ></div>
                  <div
                    className={`${currentUser?.membership ? "" : "blur-sm"}`}
                  >
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
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
