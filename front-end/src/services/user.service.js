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
      API_URL + "history?page=1&limit=30",

      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
/**
 * API sử dụng để xem lịch sử đặt hàng theo trạng thái.
 * `historyType?type=Đang xác nhận&page=1&limit=5`
 * @param {*} {type,page,limit}
 * @returns
 */
const getUserHistoryType = ({ type, page, limit }) => {
  console.log(`${API_URL}historyType?type=${type}&page=${page}&limit=${limit}`)
  return axios
    .get(
      API_URL + `historyType?type=${type}&page=${page}&limit=${limit}`,

      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

const updatePaymentStatus = (orderId, status) => {
  return axios
    .put(
      `http://localhost:9001/payment`,
      {
        _id: orderId,
        status,
      },
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
  getUserHistoryType,
  updatePaymentStatus
};
export default userService;
