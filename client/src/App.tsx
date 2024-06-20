import { BrowserRouter } from "react-router-dom";

import video from "../assets/worldvid.mp4";
import { RouterConfig } from "./route";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addUser } from "./redux/features/authSlice";
import getCurrentUser from "./actions/getCurrentUser";
import Nav from "./components/Nav";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const data = await getCurrentUser();
      if (data) {
        dispatch(addUser(data.data.user));
      }
      setLoading(false);
    };
    getUser();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-[#000000] h-screen">
      <BrowserRouter>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[200px] relative object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
        <Nav />

        <RouterConfig />
      </BrowserRouter>
    </div>
  );
}

export default App;
