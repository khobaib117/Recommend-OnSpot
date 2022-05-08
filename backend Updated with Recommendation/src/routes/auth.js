/******************************* Imports ************************************** */
const express = require("express");
const {
  signup,
  signin,
  requireSignin,
} = require("../controllers/auth-controller");
const {
  validateSigninRequest,
  validateSignupRequest,
  isRequestValidated,
} = require("../validators/auth-validator");
const router = express.Router();
/********************************************************************************/

// signin request
router.post("/signin", validateSigninRequest, isRequestValidated, signin);

// user signup request
router.post("/signup", validateSignupRequest, isRequestValidated, signup);


router.post("/retrive", async (req,res)=>{


    // const response = await user.findOne({})



})
// router.post("/profile", requireSignin, (req, res) => {
//   return res.status(200).json({ message: "Profile created.." });
// });

module.exports = router;
