const express = require("express");
const { upload } = require("../common-middleware/common-middlewares");
const router = express.Router();
const { getProductsBySlug, searchProductByImage, getProductsByGenderAndEvent,getProductsByCategory ,getAllProducts,addFavProducts,getUserFavProducts,deleteFavProducts,productsCategories,productsEvents} = require("../controllers/product-controller");

router.get("/products/:slug", getProductsBySlug);

router.get("/products/:cat/:event", getProductsByGenderAndEvent);

router.get("/categoryWise", getProductsByCategory);

router.get("/products", getAllProducts);

router.get("/user/favourite", getUserFavProducts);

router.get("/categories", productsCategories);

router.get("/events", productsEvents);

router.post("/products/favourite/delete", deleteFavProducts);

router.post("/products/favourite", addFavProducts);

router.post("/image-search",upload.single('queryImage'), searchProductByImage);

module.exports = router;
