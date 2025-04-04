import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function getCurrentUser() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const user = axios
    .get(`${apiUrl}/getCurrentUser`, {
      withCredentials: true,
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          const navigate = useNavigate();
          navigate("/auth");
          return null;
        } else if (error.response.status === 403) {
          return null;
        }
      }

      console.error("Error:", error);
      return null;
    });

  return user;
}
