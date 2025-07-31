const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/authenticate");

const controller = require("../controller/customerController");

// Route to get all customers
router.get("/", controller.getCustomers);
// Route to get a customer by ID
router.get("/:id", controller.getCustomerById);
// Route to create a new customer
router.post("/", isAuthenticated, controller.createCustomer);
// Route to update a customer by ID
router.put("/:id", isAuthenticated, controller.updateCustomerById);
// Route to delete a customer by ID
router.delete("/:id", isAuthenticated, controller.deleteCustomerById);

module.exports = router;
