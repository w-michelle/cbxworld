/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default function getCurrentUser() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const user = axios
    .get(`${apiUrl}/getCurrentUser`, {
      withCredentials: true,
    })
    .then((data) => {
      console.log(data);
      return data;
    })

    .catch((error) => {
      if (error.response.status === 403) {
        return null;
      }
    });
  return user;
}
