const express = require("express");
const router = express.Router();
const { recommendationEngine} = require("../controllers/recommendationEngine");

router.post("/recommendations", recommendationEngine)

module.exports = router;
