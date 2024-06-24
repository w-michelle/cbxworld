import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Auth from "./components/Auth";
import CreatePost from "./components/CreatePost";
import Join from "./components/Join";
import UserPosts from "./components/UserPosts";
export const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/createPost" element={<CreatePost />} />
      <Route path="/join" element={<Join />} />
      <Route path="/user/:userId" element={<UserPosts />} />
    </Routes>
  );
};
