const express = require("express");
const productController = require("./../Controllers/productController");

const router = express.Router();

router.route("/").get(productController.getAllProducts);
router.route("/addProduct").post(productController.createProduct);
router
  .route("/:id")
  .delete(productController.deleteProduct)
  .patch(productController.updateProduct)
  .get(productController.getProductById);

router.get("/retailer/:retailerId", productController.getProductsByRetailerId);
router.post("/:id/reviews", productController.createProductReview);
router.get("/:id/reviews", productController.getProductReviews);

module.exports = router;
