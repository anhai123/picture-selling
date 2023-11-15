import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:9001/api/shopping/user/";
const patchItemInCart = (userId, cart) => {
  return axios
    .patch(
      API_URL + "add_cart",
      {
        userId,
        cart,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

const getUser = (userId) => {
  console.log(authHeader());
  return axios
    .get(
      API_URL + "information",

      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
const getUserHistory = (userId) => {
  return axios
    .get(
      API_URL + "history",

      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
const userService = {
  getUser,
  patchItemInCart,
  getUserHistory,
};
export default userService;
