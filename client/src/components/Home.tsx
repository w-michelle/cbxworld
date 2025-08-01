/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import axios from "axios";
import { formatDate } from "../utils/formatDate";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/authSlice";
import UserProfile from "./UserProfile";
import { MoonLoader } from "react-spinners";

const Home = () => {
  const [posts, setPosts] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    const fetchPosts = async (retryCount = 0) => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/getPosts`, {
          withCredentials: true,
        });
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        if (retryCount < 3) {
          // Retry after 3 seconds if the fetch fails (up to 3 retries)
          setTimeout(() => {
            fetchPosts(retryCount + 1);
          }, 3000);
        } else {
          // Set error state after 3 retries
          setError("Failed to load posts. Please try again later.");
          setLoading(false);
        }
      }
    };
    fetchPosts();
  }, []);
  if (loading) {
    return (
      <div className="text-white w-full h-screen flex items-center justify-center">
        <MoonLoader
          size={40}
          color="#001bff"
          aria-label="Loading Spinner"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white w-full h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#000]">
      <div className="relative mt-4 flex flex-col justify-center md:flex-row gap-10 w-full p-4">
        {/* if signed in then theres member component */}
        {currentUser && <UserProfile />}

        <section className="max-w-screen-md flex flex-col items-center w-full gap-6">
          {posts &&
            posts?.map((post: any, index: number) => (
              <article
                key={index}
                className="p-4 rounded-md border-2 border-white w-full"
              >
                <div className="flex gap-2">
                  <div
                    className="rounded-full w-8 h-8"
                    role="img"
                    aria-label={`Profile avatar for ${post.author.name}`}
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
              </article>
            ))}
        </section>
      </div>
    </div>
  );
};

export default Home;
