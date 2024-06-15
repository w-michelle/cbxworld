/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Nav from "./Nav";
import axios from "axios";
import { formatDate } from "../utils/formatDate";
import getCurrentUser from "../actions/getCurrentUser";
import { Link } from "react-router-dom";

const Home = () => {
  // fetch all posts ->
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [posts, setPosts] = useState<any>();
  const [currentUser, setCurrentUser] = useState<any>();

  //provide logion/signup buttons at top
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getCurrentUser();
      if (data) {
        setCurrentUser(data?.data.user);
      } else {
        setCurrentUser(null);
      }
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
  console.log(posts);

  return (
    <div className="h-full bg-[#000]">
      <Nav />

      <div className="relative mt-4 flex flex-col justify-center md:flex-row gap-10 w-full p-4">
        {/* if signed in then theres member component */}
        {currentUser && (
          <div className="max-w-screen-md w-full">
            <div className="p-4 w-full border-2 border-[#ffff] rounded-lg">
              <div className="flex gap-2">
                <div
                  className="rounded-full w-8 h-8"
                  style={{ backgroundImage: `${currentUser.profile}` }}
                ></div>
                <div className="bg-red">
                  <p>{currentUser.username}</p>
                  {currentUser.membership ? (
                    <div>
                      <p className="text-xs text-neutral-400">Member</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-neutral-400">Non-member</p>
                      <Link to="/join">
                        <button className="text-xs bg-customBlue/60 hover:bg-customBlue px-2 py-2 rounded-lg mt-2">
                          Become a member
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
                {currentUser.membership && (
                  <Link to="/createPost" className="ml-auto">
                    <button className="text-sm flex items-center justify-center bg-customBlue/60 hover:bg-customBlue w-[2rem] h-[2rem] rounded-full">
                      <span className="ml-[2px]">+</span>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

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
                    className={`${
                      !currentUser || !currentUser.membership ? "blur-sm" : ""
                    }`}
                  >
                    <p>{post.author.username}</p>
                    <p className="text-xs text-neutral-400">
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
