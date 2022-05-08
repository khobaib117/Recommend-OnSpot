const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors')
const env = require("dotenv");

const app = express();
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/auth");
const wishlistRoutes = require("./routes/wishlist");
const wardrobeRoutes = require("./routes/wardrobe");
const prelovedRoutes = require("./routes/prelovedItems");
const admin = require("./routes/admin");
const recommendationEngine = require("./routes/recommendationEngine");




app.use(cors()) // Use this after the variable declaration
//Environment variable or constants
env.config();




// Database connection
const connectDB = async () => {
  try {
    await mongoose
      .connect("mongodb+srv://onspot_team:onspot123@cluster1.2ur47.mongodb.net/onSpot?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('db connected'))
    require("./models/user")

  } catch (err) {
    console.error(err.message);
    // exit process with failure
    process.exit(1);
  }
};

connectDB();



const user = mongoose.model('Users')







app.use(express.json());
app.use(express.static(__dirname + "/uploads"));
app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", wishlistRoutes);
app.use("/api", wardrobeRoutes);
app.use("/api", prelovedRoutes);
app.use("/api", admin);
app.use("/api", recommendationEngine);




app.post("/retrive", async (req, res) => {

  const email = req.body.email;

  const response = await user.findOne({ email });
  res.send({ data: response })
})


app.put("/update", async (req, res) => {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const originalPassword = req.body.originalPassword;


  const data = {};


  if (firstName) {

    data.firstName = firstName;

  }
  if (lastName) {

    data.lastName = lastName;

  }
  if (email) {

    data.email = email;

  }
  if (originalPassword) {

    data.originalPassword = originalPassword;

  }



  const response = await user.updateOne({ email }, data);
  res.send({ data: response, code: 0 })


})









// Listen for requests
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port 2000`);
});
