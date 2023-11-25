const config = require("../config/auth.config");
const db = require("../models");
const Status = require("../models/status.model");
const Users = db.user;
const Payments = db.payment;
const general = require("./generalController");
var ObjectId = require("mongodb").ObjectId;

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  sorting(criterion) {
    this.query = this.query.sort(criterion);
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

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.getUser = async (req, res) => {
  res = general.setResHeader(res);
  console.log("Id ng dung: " + req.userId);
  try {
    const user = await Users.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
exports.addCart = async (req, res) => {
  res = general.setResHeader(res);
  try {
    const user = await Users.findById(req.userId);
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    await Users.findOneAndUpdate(
      { _id: req.userId },
      {
        cart: req.body.cart,
      }
    );

    return res.json({ msg: "Added to cart." });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
  // Users.findOneAndUpdate(
  //   { _id: req.body.userId },
  //   {
  //     $push: { cart: new ObjectId(req.body.itemId) },
  //   },
  //   function (error, success) {
  //     if (error) {
  //       console.log(error);
  //       return;
  //     } else {
  //       res.status(200).json({ msg: "added to cart" });
  //       return;
  //     }
  //   }
  // );
};

exports.history = async (req, res) => {
  var hasError = false;
  res = general.setResHeader(res);
  try {

    const features = new APIfeatures(
      Payments.find({ user_id: req.userId }),
      req.query
    )
      .sorting("-createdAt")
      .paginating();

    const histories = await features.query;
    console.log("D128 " + histories);

    var result = [];
    for (var i = 0; i < histories.length; i++) {
      if (hasError) {
        return;
      }
      await Status.find(
        {
          _id: ObjectId(histories.at(i).status),
        }
      ).then(function (statusR, err) {
        if (err) {
          hasError = true;
          res.status(500).send({ message: err });
          return;
        }
        var obj = histories.at(i).toJSON();
        obj.status = statusR.at(0).name;
        result.push(obj);
      });
    }
    if (hasError) {
      return;
    }

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
