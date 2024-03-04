const express = require("express");
const userController = require("./../Controllers/userController");
const productController = require("./../Controllers/productController");
const { route } = require("./userRoute");

const router = express.Router();

router.route("/").get(productController.getAllProducts);
router.route("/addProduct").post(productController.addProduct);
router
  .route("/:id")
  .delete(productController.deleteProduct)
  .patch(productController.updateProduct)
  .get(productController.getProductById);

module.exports = router;
