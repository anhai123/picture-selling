const config = require("../config/auth.config");
const db = require("../models");
const Comments = db.comment;
const Products = db.product;
var ObjectId = require("mongodb").ObjectId;
const general = require("./generalController");
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  sorting() {
    this.query = this.query.sort("-createdAt");
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

exports.getCommentsByProductId = async (req, res) => {
  res = general.setResHeader(res);
  try {
    const features = new APIfeatures(
      Comments.find({ product_id: req.params.productId }),
      req.query
    )
      .sorting()
      .paginating();

    const comments = await features.query;

    return res.json({ success: true, result: comments.length, comments });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
