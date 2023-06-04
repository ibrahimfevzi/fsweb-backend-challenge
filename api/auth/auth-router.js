const express = require("express");
const router = express.Router();
const userModel = require("../users/users-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { checkPayload, usernameVarmi } = require("./auth-middleware");

const { JWT_SECRET } = require("../secrets/jwt-secret.js"); // bu secret'ı kullanarak token oluşturacağız

// POST /auth/register
router.post("/register", checkPayload, async (req, res, next) => {
  try {
    let hashedPassword = bcrypt.hashSync(req.body.password, 10);
    let userRequestModel = {
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    };
    const registeredUser = await userModel.createUser(userRequestModel);
    res.status(201).json(registeredUser);
  } catch (error) {
    next(error);
  }
});

// POST /auth/login
router.post("/login", checkPayload, usernameVarmi, (req, res, next) => {
  try {
    let payload = {
      subject: req.currentUser.user_id,
      username: req.currentUser.username,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    res.json({
      message: `${req.currentUser.username} logged in!...`,
      token: token,
    });
  } catch (error) {
    next(error);
  }
});
router.get("/logout", (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      jwt.verify(token, JWT_SECRET); // Verify the token

      // Token is valid, perform logout action
      res.clearCookie("token"); // Clear the token cookie

      res.json({
        message: "Yine bekleriz!...",
        clearToken: true, // Add a flag to indicate clearing the token on the client-side
      });
    } catch (error) {
      next({ status: 400, message: "Token is not valid!..." });
    }
  } else {
    next({ status: 400, message: "Token is not provided!..." });
  }
});

module.exports = router;
