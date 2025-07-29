const { schemaAuth } = require("../utils/validation");
const { getDb } = require("../data/db");
const { ObjectId } = require("mongodb");
const { generateToken } = require("../utils/tokegen");

const getAuthenticatedToken = async (req, res) => {
  try {
    const db = getDb();
    const accessToken = req.params.access_token;

    const { error } = schemaAuth.validate({ access_token: accessToken });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const authenticatedUser = await db
      .collection("authentication")
      .findOne({ access_token: accessToken });

    if (!authenticatedUser) {
      return res.status(404).json({ error: "Token not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(authenticatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error retrieving authenticated Token" });
  }
};

const updateToken = async (req, res) => {
  try {
    const db = getDb();
    const Id = req.params.id;

    const { error } = schemaAuth.validate({ access_token: accessToken });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await db
      .collection("authentication")
      .updateOne({ _id: new ObjectId(Id) }, { access_token: generateToken() });

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "Token not found or no changes made" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Token updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating authentication token" });
    console.log(error);
  }
};

const createToken = async (req, res) => {
  try {
    const db = getDb();
    const newToken = { access_token: generateToken() };

    // Validate the new token data
    const { error } = schemaAuth.validate(newToken);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await db.collection("authentication").insertOne(newToken);
    res.setHeader("Content-Type", "application/json");
    res.status(201).json({
      message: "Token created successfully",
      ...newToken,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating authentication token" });
  }
};

const deleteTokenById = async (req, res) => {
  try {
    const db = getDb();
    const tokenId = req.params.access_token;

    const { error } = schemaAuth.validate({ access_token: tokenId });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await db
      .collection("authentication")
      .deleteOne({ access_token: tokenId });
    res.setHeader("Content-Type", "application/json");
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Token not found" });
    }
    res.status(200).json({ message: "Token deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting token from the database" });
    console.log(error);
  }
};

module.exports = {
  getAuthenticatedToken,
  createToken,
  updateToken,
  deleteTokenById,
};
