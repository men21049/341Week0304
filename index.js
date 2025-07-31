const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2");
const { generateToken } = require("./src/utils/tokegen");

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

app
  .use(bodyparser.json())
  .use(
    session({
      secret: generateToken(),
      resave: false,
      saveUnitialized: true,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(cors({ methods: ["GET", "POST", "DELETE", "PUT", "PATCH"] }))
  .use(cors({ origin: "*" }));

app
  .use("/customers", costumerRoutes)
  .use("/token", tokeRoutes)
  .use("/", swaggerRoutes)
  .use((req, res, next) => {
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

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayname}`
      : "Logged Out"
  );
});
app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);
app.listen(PORT, () => {});
