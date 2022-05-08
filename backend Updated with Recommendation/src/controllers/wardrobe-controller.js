const Wardrobe = require("../models/wardrobe");
const Product = require("../models/product");
const fetch = require("node-fetch");
const PrelovedItem = require("../models/preloved-items")

exports.addItemToWardrobe = (req, res) => {
  const { title, description } = req.body;
  const image = req.file.filename;

  Wardrobe.findOne({ user: req.user._id }).exec((err, wardrobe) => {
    if (err) return res.status(400).json({ err });
    if (wardrobe) {
      // user has already a wardrobe, so add items in the wardrobe

      // add item to the user's wardrobe items
      Wardrobe.findOneAndUpdate(
        { user: req.user._id },
        {
          $push: {
            // "wardrobeItems": req.body.wardrobeItems
            wardrobeItems: {
              title,
              image,
              description,
            },
          },
        }
      ).exec((error, _wardrobeItem) => {
        if (error) return res.status(400).json({ error });
        if (_wardrobeItem) {
          return res.status(201).json({ message: "Item added successfuly" });
        }
      });
    } else {
      //Create a new wardrobe for user and add product into it
      const wardrobe = new Wardrobe({
        user: req.user._id,
        wardrobeItems: [{ title, image, description }],
      });

      wardrobe.save((error, wardrobeItem) => {
        if (error) return res.status(400).json({ error });
        if (wardrobeItem) {
          return res.status(201).json({ message: "Item added successfuly" });
        }
      });
    }
  });
};

exports.getWardrobeItems = (req, res) => {
  Wardrobe.findOne({ user: req.user._id }).exec((err, wardrobe) => {
    if (err) return res.status(400).json({ err });

    if (wardrobe) {
      const wardrobeItems = wardrobe.wardrobeItems;
      return res.status(200).json({ wardrobe: wardrobeItems });
    }

    return res
      .status(400)
      .json({ message: "You have not added any item in your Wardrobe" });
  });
};

exports.removeWardrobeItem = (req, res) => {
  const { itemId } = req.body;
  if (itemId) {
    Wardrobe.updateOne(
      { user: req.user._id },
      {
        $pull: {
          wardrobeItems: {
            _id: itemId,
          },
        },
      }
    ).exec((err, result) => {
      if (err) return res.status(400).json({ err });
      if (result) {
        PrelovedItem.updateOne(
          { user: req.user._id },
          {
            $pull: {
              prelovedItems: {
                productId: itemId,
              },
            },
          }
        ).exec((error, result2) => {
          if (error) {
            console.log("Error Removing item from preloved goods.", err);
          } else if (result2) {
            console.log("Item also removed from preloved items.");
          }
        });
        return res.status(200).json({ message: "Item deleted successfully" });
      }
    });
  }
};

exports.showWardrobeRecommendations = (req, res) => {
  // console.log(`${process.env.API}/public/${req.file.filename}`)
  // res.status(200).json({file: req.file, body: req.body});
  const path = "F:\\Semester-8\\FYP-2\\Shop-Spot\\FYP\\backend\\src\\uploads";
 

  Wardrobe.findOne({ user: req.user._id }).exec((error, wardrobe) => {
    if (error) return res.status(400).json({ error });
    if (wardrobe) {
      const wardrobeItems = wardrobe.wardrobeItems;

      if (wardrobeItems.length > 0) {
        itemsImagePaths = [];
        for (i in wardrobeItems) {
          itemImage = wardrobeItems[i].image;
          imgPath = `${path}\\${itemImage}@`;
          itemsImagePaths.push(imgPath);
        }

        fetch("http://127.0.0.1:5000/", {
          method: "POST",
          body: itemsImagePaths,
        })
          .then((response) => response.json())
          .then((data) => {
            const matchedImagesList = data.images;
            console.log(matchedImagesList);

            titlesList = [];
            var i;
            for (i = 0; i < matchedImagesList.length; i++) {
              matchedImagesList[i] = matchedImagesList[i].split(".")[0];
              // console.log(titlesList[i])
            }
            console.log(matchedImagesList);

            Product.find({
              title: { $in: matchedImagesList },
            }).exec((error, products) => {
              if (error) return res.status(400).json({ error });
              if (products) {
                console.log(products);
                return res.status(200).json({ suggestedProducts: products });
              }
            });
          });
      } else {
        return res.status(200).json({ message: "No item in your wardrobe" });
      }
    }
  });

  // const imagePath = req.file.path;
};
