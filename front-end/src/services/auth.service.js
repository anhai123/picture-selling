import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "https://picture-selling.vercel.app/shopping/auth/";
const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  },
    {
      headers: authHeader(),
    });
};
const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    }, {
      headers: authHeader(),
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
const authService = {
  register,
  login,
  logout,
};
export default authService;
