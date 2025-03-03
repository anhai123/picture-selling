import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "https://picture-selling.vercel.app/payment";
const createPayment = (cart, address) => {
  return axios
    .post(
      API_URL,
      {
        cart,
        address,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

const getPayment = () => {
  return axios
    .get(API_URL, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const paymentService = {
  getPayment,
  createPayment,
};
export default paymentService;
