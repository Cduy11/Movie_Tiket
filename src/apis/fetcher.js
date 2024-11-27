import axios from "axios";
import { API_URL, TOKEN_CYBERSOFT } from "../constants";



export const fetcher = axios.create({
  baseURL: API_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
  },
});

// Sử dụng interceptor để thêm token vào header trước mỗi yêu cầu
fetcher.interceptors.request.use((config) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    config.headers.Authorization = `Bearer ${currentUser.accessToken}`;
  }
  return config;
})

export default fetcher;

