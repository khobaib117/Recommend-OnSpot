const User = require("../models/user"); // Import user schema
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json(error);
    if (user)
      return res.status(400).json({ message: "User already registered" });

    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
    });

    _user.save((err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }

      if (data) {
        res.status(201).json({
          //user: data,
          message: "User Created successfully.",
        });
      }
    });
  });
};

//-==-=-=-=-=-=--=-=-=-=-==-==-==-=-=-=-==-==-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-

exports.signin = (req, res) => {
  console.log("got here");
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });

    if (user) {
      if (user.access == false) {
        res.send({ code: -1, message: "user blocked" });
      } else {
        const isAuth = user.authenticate(req.body.password);
        if (isAuth) {
          const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET_TOKEN,
            { expiresIn: "1h" }
          );
          const { firstName, lastName, email, fullName } = user;

          return res.status(200).json({
            token,
            user: {
              firstName,
              lastName,
              email,
              fullName,
            },
          });
        } else {
          return res.status(400).json({ message: "Invalid password" });
        }
      }
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  });
};

//-==-=-=-=-=-=--=-=-=-=-==-==-==-=-=-=-==-==-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Signin Required" });
  }
  next();
};
