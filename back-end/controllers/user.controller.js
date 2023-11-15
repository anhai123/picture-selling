const config = require("../config/auth.config");
const db = require("../models");
const Users = db.user;
const Payments = db.payment;
var ObjectId = require("mongodb").ObjectId;
const general = require("./generalController");
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
  res = general.setResHeader(res);
  try {
    const history = await Payments.find({ user_id: req.userId });
    return res.json(history);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
