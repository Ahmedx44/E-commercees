const express = require("express");
const orderController = require("./../Controllers/orderController");

const router = express.Router();

// router.route("/");
router.route("/").get(orderController.getAllOrders);
router.route("/createOrder").post(orderController.createOrder);
router
  .route("/:id")
  .get(orderController.getOrderById)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

router.route("/orderHistory/:id").get(orderController.getAllOrdersByUser);
router.route("/getorder/:id").get(orderController.getOrderById);

module.exports = router;
