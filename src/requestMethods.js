import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_SERVER;
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDhlZTA2MmFhMzQ0ZWNjNWYzMDA5MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2ODI1NjU4NywiZXhwIjoxNjY4NTE1Nzg3fQ.tCzT002MG0rXKH5p_jy3iIflRhAVS8JtxgUXSlma9Ns'
const TOKEN = currentUser?.accessToken;

export const updateToken = () => {
  TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken || "";
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});