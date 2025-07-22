const express = require("express");
const router = express.Router();

const controller = require("../controller/authenticationController");

// Route to get a token by ID
router.get("/:access_token", controller.getAuthenticatedToken);
// Route to create a new token
router.post("/", controller.createToken);
// Route to delete a token by ID
router.delete("/:id", controller.deleteTokenById);

module.exports = router;
