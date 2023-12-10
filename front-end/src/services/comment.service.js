import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "https://picture-selling-4lhwzky02-anhai123.vercel.app/comment";

const getComment = (productId) => {
  return axios.get(API_URL + `/${productId}`).then((response) => {
    return response.data;
  });
};

const commentService = {
  getComment,
};
export default commentService;
