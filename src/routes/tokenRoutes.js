const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/authenticate");

const controller = require("../controller/authenticationController");

// Route to get a token by ID
router.get("/:access_token", controller.getAuthenticatedToken);
// Route to create a new token
router.post("/", isAuthenticated, controller.createToken);
// Route to update the token
router.put("/:access_token", isAuthenticated, controller.updateToken);
// Route to delete a token by ID
router.delete("/:access_token", isAuthenticated, controller.deleteTokenById);

module.exports = router;
