import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_SERVER;
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
var TOKEN = currentUser?.accessToken;

export const updateToken = () => {
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(user).currentUser;
  if (!currentUser) return
  TOKEN = currentUser.accessToken || "";
  return TOKEN;
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${updateToken()}` },
});