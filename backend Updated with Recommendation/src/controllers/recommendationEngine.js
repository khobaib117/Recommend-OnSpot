const Product = require("../models/product");
var similarity = require("string-cosine-similarity");
const Favourite = require("../models/favourite");
const Event = require("../models/event");
const Category = require("../models/category");
const fetch = require("node-fetch");
const axios = require("axios");

exports.recommendationEngine = async (req, res) => {
  console.log("Inside Recommendation system");
  //user email
  const email = req.body.email;

  let AllData;
  let favData;
  let catData;
  let eventData;
  let favMetaData;
  let proMetaData;
  var singeSimilarityArray = [];
  var FinalSimilarityArray = [];

  // All Data
  await axios
    .get(`http://localhost:2000/api/products`)
    .then((res) => {
      AllData = res.data.data;
    })

    .catch((err) => {
      console.log(err);
    });

  // category Data
  await axios
    .get("http://localhost:2000/api/categories")
    .then((res) => {
      catData = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });

  // Events Data
  await axios
    .get("http://localhost:2000/api/Events")
    .then((res) => {
      eventData = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });

  // Favourite Data
  await axios
    .get(`http://localhost:2000/api/user/favourite?email=${email}`)
    .then((res) => {
      favData = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });

  function getUnique(array) {
    var uniqueArray = [];

    // Loop through array values
    for (i = 0; i < array.length; i++) {
      if (uniqueArray.indexOf(array[i]) === -1) {
        uniqueArray.push(array[i]);
      }
    }
    return uniqueArray;
  }

  //  console.log("Event Data found is ",favData)

  if (favData) {
    console.log("inside main funcation");
    favData.map((favProduct) => {
      let metaData;

      metaData = favProduct.title;

      console.log("First metaData", metaData);

      metaData = metaData.concat(" ", favProduct.brand);

      console.log("Second metaData", metaData);

      if (eventData) {
        eventData.map((event) => {
          if (event._id == favProduct.event) {
            metaData = metaData.concat(" ", event.event);

            console.log("Third metaData", metaData);

            return;
          }
        });
      }

      if (catData) {
        catData.map((cat) => {
          if (cat._id == favProduct.category) {
            metaData = metaData.concat(" ", cat.name);

            console.log("4th metaData", metaData);

            return;
          }
        });
      }

      favMetaData = metaData;
      // console.log("finally  favourite item concanated meta data is ",metaData)

      AllData.map((product) => {
        let metaData;

        metaData = product.title;

        //  console.log("Product First metaData",metaData)

        metaData = metaData.concat(" ", product.brand);

        //  console.log("Product Second metaData",metaData)

        if (eventData) {
          eventData.map((event) => {
            if (event._id == product.event) {
              metaData = metaData.concat(" ", event.event);

              //  console.log("Product Third metaData",metaData)

              return;
            }
          });
        }

        if (catData) {
          catData.map((cat) => {
            if (cat._id == product.category) {
              metaData = metaData.concat(" ", cat.name);

              //  console.log("Product 4th metaData",metaData)

              return;
            }
          });
        }

        proMetaData = metaData;
        //  console.log("finally Product item concanated meta data is ",metaData)

        singeSimilarityArray.push(
          product._id + "/" + similarity(favMetaData, proMetaData)
        );
      });

      //Sorting an array in decending order
      singeSimilarityArray.sort((a, b) => {
        let splitedA = a.split("/");
        let splitedB = b.split("/");

        // console.log("split A", splitedA);
        splitedA = splitedA[1];
        splitedB = splitedB[1];

        return splitedA < splitedB ? 1 : -1;
      });

      for (let i = 0; i < 5; i++) {
        let splited = singeSimilarityArray[i].split("/");

        splited = splited[0];

        // console.log("The spilited has the value",splited)
        FinalSimilarityArray.push(splited);
      }

      singeSimilarityArray = [];
    });
  }

  // console.log("This is the fev meta data",favMetaData)
  // console.log("This is the Product meta data",proMetaData )
  // console.log("Final array is",FinalSimilarityArray )

  // getUnique(FinalSimilarityArray);

  const FinalRecommendedProducts = getUnique(FinalSimilarityArray);
  // console.log("The unique array has",FinalRecommendedProducts )

  Product.find({ _id: { $in: FinalRecommendedProducts } }).exec(
    (err, products) => {
      if (err) return res.status(400).json({ message: err });
      if (products) {
        // console.log("Finally recemended products", products);
        res.send({ data: products });
      }
    }
  );
};
