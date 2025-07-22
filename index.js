const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");

const db = require("./src/data/db");

const costumerRoutes = require("./src/routes/customerRoutes");
const tokeRoutes = require("./src/routes/tokenRoutes");
const swaggerRoutes = require("./src/routes/swaggerRoutes");

const PORT = process.env.PORT || 3000;

// Initialize database connection
db.intializeDb((err) => {
  if (err) {
    console.error("Failed to initialize database:", err);
    process.exit(1); // Exit the application if database initialization fails
  } else {
    console.log("Database initialized successfully");
  }
});

app.use(express.json());
app.use(bodyparser.json());
app.use(cors());
app.use("/customers", costumerRoutes);
app.use("/token", tokeRoutes);
app.use("/", swaggerRoutes);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, GET, POST, PUT, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to the CSE341 week 03-04 Project!");
});

app.listen(PORT, () => {});
