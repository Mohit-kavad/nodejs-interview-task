const express = require("express");
const app = express();
const { sequelize, User } = require("./models");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const jwterify = require("./middleware/jwtVerify");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const jwtVerify = require("./middleware/jwtVerify");

dotenv.config({ path: "./config.env" });

app.use(express.json());

// predicate the router with a check and bail out when needed

app.post("/signup", authController.register);
app.post("/login", authController.login);

app.put("/changepass", jwtVerify, authController.changePassword);

app.get("/users", userController.getAllUser);
app.get("/users/:uuid", userController.getUser);

app.listen(5000, async () => {
  console.log("App running on port 5000");
  await sequelize.authenticate();
  console.log("Database connected");
});
