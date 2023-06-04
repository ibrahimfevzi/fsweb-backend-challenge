const express = require("express");
const router = express.Router();
const userModel = require("../users/users-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../secrets/jwt-secret.js"); // bu secret'ı kullanarak token oluşturacağız

// JWT oluşturmak için kullanılan fonksiyon
function createToken(user) {
  const payload = {
    userId: user.user_id,
    username: user.username,
    email: user.email,
  };

  // Token'i oluştur ve döndür
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  return token;
}

// POST /auth/register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Kullanıcı doğrulama ve veri işleme işlemleri

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kullanıcıyı oluştur
    const newUser = await userModel.createUser({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Kayıt oluşturulurken bir hata oluştu." });
  }
});

// POST /auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kullanıcı doğrulama ve veri işleme işlemleri

    // E-postaya göre kullanıcıyı al
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    // Şifreyi kontrol et
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Geçersiz parola." });
    }

    // Kullanıcı giriş işlemi başarılı
    // JWT oluştur ve token'i yanıtla
    const token = createToken(user);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Giriş yapılırken bir hata oluştu." });
  }
});

// GET /auth/logout
router.get("/logout", (req, res) => {
  // Oturumu sonlandırma işlemleri

  res.json({ message: "Oturum başarıyla sonlandırıldı." });
});

module.exports = router;
