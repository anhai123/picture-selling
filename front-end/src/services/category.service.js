import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:9001/categories/";
const createCategories = (name) => {
  return axios
    .post(
      API_URL,
      {
        name,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

const getCategories = () => {
  return axios.get(API_URL).then((response) => {
    return response.data;
  });
};

const deleteCategory = (id) => {
  return axios
    .delete(API_URL + `${id}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const putCategory = (id, name) => {
  return axios
    .put(
      API_URL + `${id}`,
      {
        name,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
const categoryService = {
  getCategories,
  createCategories,
  deleteCategory,
  putCategory,
};
export default categoryService;
