/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function getCurrentUser() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("cbAuth");

  if (!token) {
    return null;
  }
  const user = axios
    .get(`${apiUrl}/getCurrentUser`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((data) => {
      return data;
    })

    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem("cbAuth");
        const navigate = useNavigate();
        navigate("/auth");
        return null;
      } else if (error.response.status === 403) {
        return null;
      }
    });
  return user;
}
