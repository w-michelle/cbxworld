/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function getCurrentUser() {
  const user = axios
    .get("https://cbxworld-mocha.vercel.app/getCurrentUser", {
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
