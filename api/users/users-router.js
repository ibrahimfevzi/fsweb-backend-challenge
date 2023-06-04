const express = require("express");
const router = express.Router();
const userModel = require("./users-model");
const authMiddleware = require("../auth/auth-middleware");

// GET /users
router.get("/", async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Kullanıcıları getirirken bir hata oluştu." });
  }
});

// GET /users/:id
router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userModel.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Kullanıcıyı getirirken bir hata oluştu." });
  }
});

// POST /users
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  // Kullanıcı doğrulama ve veri işleme işlemleri

  try {
    const newUser = await userModel.createUser({
      username,
      email,
      password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Kullanıcı oluşturulurken bir hata oluştu." });
  }
});

// PUT /users/:id
router.put("/:id", authMiddleware.authenticate, async (req, res) => {
  const userId = req.params.id;
  const { username, email, password } = req.body;

  // Kullanıcı doğrulama ve veri işleme işlemleri

  try {
    const updatedUser = await userModel.updateUser(userId, {
      username,
      email,
      password,
    });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Kullanıcı güncellenirken bir hata oluştu." });
  }
});

// DELETE /users/:id
router.delete("/:id", authMiddleware.authenticate, async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await userModel.deleteUser(userId);
    if (deletedUser) {
      res.json({ message: "Kullanıcı başarıyla silindi." });
    } else {
      res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı silinirken bir hata oluştu." });
  }
});

module.exports = router;
