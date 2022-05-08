const mongoose = require("mongoose");
const Admin = require("../models/admin");
const Feedback = require("../models/feedback");
const Users = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.adminLogin = async (req, res) => {
  console.log(req.body, "body");
  try {
    const result = await Admin.findOne({ email: req.body.email });
    if (!result) {
      // this means result is null
      return res.json({
        success: false,
        message: "Incorrect Email",
      });
    } else {
      // email did exist
      // so lets match password
      if (bcrypt.compareSync(req.body.password, result.password)) {
        // great, allow this user access
        const token = jwt.sign(
          { _id: result._id },
          process.env.JWT_SECRET_TOKEN,
          { expiresIn: "10h" }
        );

        return res.json({
          success: true,
          message: "Successfully Logged in",
          token: token,
          email: req.body.email,
          password: req.body.password,
        });
      } else {
        return res.json({
          success: false,
          message: "Incorrect Password",
        });
      }
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.UpdateProfile = async (req, res) => {
  console.log(req.body);
  try {
    const email = req.body.email;
    const password = req.body.password;
    const newEmail = req.body.newEmail;
    const data = {};

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      data.password = hash;
    }
    if (newEmail) {
      data.email = newEmail;
    }

    const response = await Admin.findOneAndUpdate({ email }, data);
    res.send({ data: response, code: 0 });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "server error",
      data: null,
    });
  }
};

exports.adminSignup = async (req, res) => {
  console.log("got in admin signup");
  console.log(req.body, "admin");
  try {
    console.log("0.1");
    const salt = bcrypt.genSaltSync(10);
    console.log("0.2");
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log("0.5");
    let admin = new Admin({
      email: req.body.email,
      password: hash,
    });
    console.log("1");
    const result = await admin.save();
    console.log("admin created", result);
    return res.status(200).json({
      message: "signup successfully",
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "server error",
      data: null,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  console.log("got here in get all users");
  try {
    const users = await Users.find({}, { originalPassword: 0 }).sort({
      createdAt: -1,
    });
    if (users.length === 0) {
      return res.status(200).json({
        message: "no users found",
        success: true,
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      message: "users found",
      data: users,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "server error",
      data: null,
    });
  }
};

exports.deleteUser = async (req, res) => {
  console.log("got here in delete user");
  try {
    const users = await Users.deleteOne({
      _id: mongoose.Types.ObjectId(req.body.id),
    });
    console.log(users, "delete results");
    return res.status(200).json({
      message: "user deleted successfully",
      success: true,
      data: null,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "server error",
      data: null,
    });
  }
};

exports.updateUserAccess = async (req, res) => {
  console.log("got here in update user acces");
  try {
    const users = await Users.updateOne(
      { _id: req.body.id },
      { access: req.body.access }
    );
    console.log(users, "access update results");
    if (users.nModified === 1) {
      return res.status(200).json({
        message: "user access updated",
        success: true,
        data: null,
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "server error",
      data: null,
    });
  }
};

exports.countUsers = async (req, res) => {
  console.log("got here in update user acces");
  try {
    const allowedUsers = await Users.countDocuments({ access: true });
    const blockedUsers = await Users.countDocuments({ access: false });
    console.log(allowedUsers, "allowed users");
    console.log(blockedUsers, "blocked users");
    console.log(new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000));
    const currentMonthUsers = await Users.countDocuments({
      createdAt: {
        $gte: new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000),
      },
    });

    return res.status(200).json({
      success: true,
      message: "users found",
      data: {
        unblockedUsers: allowedUsers,
        blockedUsers: blockedUsers,
        totalUsers: allowedUsers + blockedUsers,
        lastThirtyDaysUsers: currentMonthUsers,
      },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "server error",
      data: null,
    });
  }
};

exports.addFeedback = async (req, res) => {
  console.log("got in feedback");
  try {
    const feedback = new Feedback({
      comment: req.body.comment.toLowerCase(),
      number: req.body.number,
    });
    const result = await feedback.save();
    return res.status(200).json({
      success: true,
      message: "feedback added successfully",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "server error",
      data: null,
    });
  }
};

exports.getFeedback = async (req, res) => {
  console.log("getting all the feedbacks");
  try {
    const veryDisappointed = await Feedback.countDocuments({ number: 0 });
    const disappointed = await Feedback.countDocuments({ number: 1 });
    const neutral = await Feedback.countDocuments({ number: 2 });
    const satisfied = await Feedback.countDocuments({ number: 3 });
    const verySatisfied = await Feedback.countDocuments({ number: 4 });

    return res.status(200).json({
      success: true,
      message: "All the feedbacks",
      data: {
        veryDisappointed,
        disappointed,
        neutral,
        satisfied,
        verySatisfied,
      },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "server error",
      data: null,
    });
  }
};
