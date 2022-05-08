const express = require("express");
const { requireSignin } = require("../controllers/auth-controller");
const {
  addToPrelovedItems,
  getPrelovedItems,
  getUserDetailsById,
  removeFromPrelovedItems,
} = require("../controllers/preloved-controller");
const router = express.Router();

router.post(
  "/user/wardrobe/add-preloved-item",
  requireSignin,
  addToPrelovedItems
);

router.get("/preloved-items", getPrelovedItems);

router.get("/user/user-details", getUserDetailsById);

router.post(
  "/user/preloved-items/delete-item",
  requireSignin,
  removeFromPrelovedItems
);

module.exports = router;
