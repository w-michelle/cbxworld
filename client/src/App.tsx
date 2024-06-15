import { BrowserRouter } from "react-router-dom";

import video from "../assets/worldvid.mp4";
import { RouterConfig } from "./route";

function App() {
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

        <RouterConfig />
      </BrowserRouter>
    </div>
  );
}

export default App;
