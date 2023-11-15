import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:9001/comment";

const getComment = (productId) => {
  return axios.get(API_URL + `/${productId}`).then((response) => {
    return response.data;
  });
};

const commentService = {
  getComment,
};
export default commentService;
