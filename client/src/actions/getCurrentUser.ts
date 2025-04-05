/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

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
      if (error.response.status === 401) {
        return null;
      } else if (error.response.status === 403) {
        return null;
      }
    });
  return user;
}
