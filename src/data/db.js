const env = require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

let db;
let DB_NAME = process.env.DB_NAME; // Default database name

const intializeDb = (callback) => {
  if (db) {
    console.log("Database already initialized");
    return callback(null, db);
  }
  MongoClient.connect(process.env.MONGODB_URI + `/${DB_NAME}`)
    .then((client) => {
      db = client.db(DB_NAME);
      callback(null, db);
    })
    .catch((error) => {
      callback(error);
    });
  console.log("Database connection established");
};

const getDb = () => {
  if (!db) {
    throw new Error("Database not initialized. Call initializeDb first.");
  }
  return db;
};

module.exports = {
  intializeDb,
  getDb,
};
