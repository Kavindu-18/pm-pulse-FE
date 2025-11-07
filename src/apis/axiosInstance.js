import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
