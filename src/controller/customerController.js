const { schema } = require("../utils/validation");
const { getDb } = require("../data/db");
const { ObjectId } = require("mongodb");

const getCustomers = async (req, res) => {
  try {
    const db = getDb();
    const customers = await db
      .collection("customer")
      .find()
      .toArray()
      .then((data) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(data);
      });
    return customers;
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving customers from the database" });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const db = getDb();
    const customerId = req.params.id;
    const customer = await db
      .collection("customer")
      .findOne({ _id: new ObjectId(customerId) });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(customer);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving customer from the database" });
  }
};

const createCustomer = async (req, res) => {
  try {
    const db = getDb();
    const customer = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      dob: req.body.age,
      isActive: req.body.isActive,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      address: req.body.address,
    };

    // Validate the new customer data
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await db.collection("customer").insertOne(customer);
    res.setHeader("Content-Type", "application/json");
    res.status(201).json({
      message: "Customer created successfully",
      id: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating customer in the database" });
  }
};

const updateCustomerById = async (req, res) => {
  try {
    const db = getDb();
    const customerId = req.params.id;
    const customer = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      dob: req.body.age,
      isActive: req.body.isActive,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      address: req.body.address,
    };
    // Validate the updated data
    const { error } = schema.validate(customer);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await db
      .collection("customer")
      .replaceOne({ _id: new ObjectId(customerId) }, customer);

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "Customer not found or no changes made" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating customer in the database" });
  }
};

const deleteCustomerById = async (req, res) => {
  try {
    const db = getDb();
    const customerId = req.params.id;

    const result = await db
      .collection("customer")
      .deleteOne({ _id: new ObjectId(customerId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting customer from the database" });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomerById,
  deleteCustomerById,
};
