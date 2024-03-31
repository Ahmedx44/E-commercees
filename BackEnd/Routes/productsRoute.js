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

module.exports = router;
