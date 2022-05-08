const express = require("express");
const { upload } = require("../common-middleware/common-middlewares");
const { requireSignin } = require("../controllers/auth-controller");
const {
  addItemToWardrobe,
  getWardrobeItems,
  removeWardrobeItem,
  showWardrobeRecommendations,
} = require("../controllers/wardrobe-controller");
const router = express.Router();

router.post(
  "/user/wardrobe/add-to-wardrobe",
  requireSignin,
  upload.single("image"),
  addItemToWardrobe
);

router.get("/user/wardrobe", requireSignin, getWardrobeItems);

router.post("/user/wardrobe/removeItem", requireSignin, removeWardrobeItem);

router.get("/user/wardrobe/trends", requireSignin, showWardrobeRecommendations);

module.exports = router;
