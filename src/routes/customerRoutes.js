const express = require("express");
const router = express.Router();

const controller = require("../controller/customerController");

// Route to get all customers
router.get("/", controller.getCustomers);
// Route to get a customer by ID
router.get("/:id", controller.getCustomerById);
// Route to create a new customer
router.post("/", controller.createCustomer);
// Route to update a customer by ID
router.put("/:id", controller.updateCustomerById);
// Route to delete a customer by ID
router.delete("/:id", controller.deleteCustomerById);

module.exports = router;
