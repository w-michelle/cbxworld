import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Providers } from "./redux/provider.tsx";
import { Suspense } from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <Suspense fallback={<div>Loading App...</div>}>
      <App />
    </Suspense>
  </Providers>
);
