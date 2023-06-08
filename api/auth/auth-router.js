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
      avatar: req.body.avatar,
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
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1y" });
    res.json({
      message: `${req.currentUser.username} logged in!...`,
      token: token,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/logout", (req, res) => {
  // Token'in geçersiz hale gelmesi için süre sonunu daha kısa bir süre olarak ayarlayabilirsiniz
  const expirationTime = 1; // Örneğin, 1 dakika

  // Token'in süresini geçmiş bir tarihe ayarlayarak logout işlemini gerçekleştirir
  res.cookie("token", "", { expires: new Date(Date.now() - expirationTime) });

  res.json({
    message: "Yine bekleriz!...",
    logout: true,
  });
});

module.exports = router;
