const PrelovedItem = require("../models/preloved-items");
const User = require("../models/user");
const Wardrobe = require("../models/wardrobe");

exports.addToPrelovedItems = (req, res) => {
  const { productId, price, brand } = req.body;
  const user = req.user._id;
  Wardrobe.findOne({ user: req.user._id }).exec((err, wardrobe) => {
    if (err) return res.status(400).json({ err });

    if (wardrobe) {
      const wardrobeItems = wardrobe.wardrobeItems;

      wardrobeItems.forEach((element) => {
        if (element._id == productId) {
          const { title, image, description } = element;

          PrelovedItem.findOne({ user: req.user._id }).exec(
            (_err, preloved) => {
              if (_err) return res.status(400).json({ _err });
              if (preloved) {
                // user has already a preloved item, so add items in the preloved items

                // add item to the user's preloved items
                PrelovedItem.findOneAndUpdate(
                  { user: req.user._id },
                  {
                    $push: {
                      // "wardrobeItems": req.body.wardrobeItems
                      prelovedItems: {
                        user,
                        productId,
                        title,
                        image,
                        description,
                        price,
                        brand,
                        forSale: true,
                      },
                    },
                  }
                ).exec((error, _prelovedItem) => {
                  if (error) return res.status(400).json({ error });
                  if (_prelovedItem) {
                    wardrobe.wardrobeItems.map((x) =>
                      x._id == productId ? (x.preloved = true) : x
                    );
                    wardrobe.save().then((saved) => {
                      console.log("Status of item changed to preloved item");
                    });

                    return res
                      .status(201)
                      .json({ message: "Item added successfuly" });
                  }
                });
              } else {
                //Create a new wardrobe for user and add product into it
                const prelovedItem = PrelovedItem({
                  user: req.user._id,
                  prelovedItems: [
                    {
                      user,
                      productId,
                      title,
                      image,
                      description,
                      price,
                      brand,
                      forSale: true,
                    },
                  ],
                });

                prelovedItem.save((error, item) => {
                  if (error) return res.status(400).json({ error });
                  if (item) {
                    wardrobe.wardrobeItems.map((x) =>
                      x._id == productId ? (x.preloved = true) : x
                    );
                    wardrobe.save().then((saved) => {
                      console.log("Status of item changed to preloved item");
                    });

                    return res
                      .status(201)
                      .json({ message: "Item added successfuly" });
                  }
                });
              }
            }
          );
        }
      });
    }
  });
};

exports.getPrelovedItems = (req, res) => {
  PrelovedItem.find({}).exec((error, items) => {
    if (error) return res.status(400).json({ error });
    let allPrelovedItems = [];

    if (items) {
      items.forEach((element) => {
        const user = element.user;
        let productsList = element.prelovedItems;

        if (productsList) {
          productsList.forEach((product) => {
            product.user = user;
          });

          allPrelovedItems = allPrelovedItems.concat(productsList);
        }
      });

      return res.status(200).json({ prelovedItems: allPrelovedItems });
    }
  });
};

exports.getUserDetailsById = (req, res) => {
  const userId = req.body.user;

  User.findOne({ _id: userId }).exec((error, _user) => {
    if (error) return res.status(400).json({ error });

    if (_user) {
      const { firstName, lastName, email } = _user;
      return res.status(201).json({
        username: firstName + " " + lastName,
        email: email,
      });
    }
  });
};

exports.removeFromPrelovedItems = (req, res) => {
  const { itemId } = req.body;

  if (itemId) {
    PrelovedItem.updateOne(
      { user: req.user._id },
      {
        $pull: {
          prelovedItems: {
            productId: itemId,
          },
        },
      }
    ).exec((err, result) => {
      if (err) return res.status(400).json({ err });
      if (result) {
        Wardrobe.findOne({ user: req.user._id }).exec((error, wardrobe) => {
          if (error) {
            console.log("Error in updating item status in wardrobe", error);
          } else if (wardrobe) {
            wardrobe.wardrobeItems.map((x) =>
              x._id == itemId ? (x.preloved = false) : x
            );
            wardrobe.save().then((saved) => {
              console.log(
                "Preloved Status removed from this item in wardrobe."
              );
            });
          }
        });
        return res
          .status(200)
          .json({ message: "Preloved Item deleted successfully" });
      }
    });
  }
};
