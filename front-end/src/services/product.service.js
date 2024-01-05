import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:9001/products";
const createProduct = (form) => {
  return axios
    .post(API_URL, form, {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    });
};

const getProducts = () => {
  return axios.get(API_URL).then((response) => {
    return response.data;
  });
};

const deleteProduct = (id) => {
  return axios
    .delete(API_URL + `/${id}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const putProduct = (form, id) => {
  return axios
    .put(API_URL + `/${id}`, form, {
      headers: authHeader(),
      "Content-Type": "multipart/form-data",
    })
    .then((response) => {
      return response.data;
    });
};

const patchReviewsProduct = (id, star) => {
  return axios
    .put(
      "http://localhost:9001/productss" + `/${id}`,
      {
        star,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  putProduct,
  patchReviewsProduct,
};
export default productService;
