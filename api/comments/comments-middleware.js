// Örnek bir yorum doğrulama işlevi
exports.validateComment = (req, res, next) => {
  // Yorumu doğrula
  // ...

  if (valid) {
    // Yorum doğrulandı, devam et
    next();
  } else {
    // Yorum doğrulanmadı, hata döndür
    res.status(400).json({ message: "Geçersiz yorum verisi." });
  }
};

// Örnek bir yorum yetkilendirme işlevi
exports.authorizeComment = (req, res, next) => {
  // Yorumu yetkilendir
  // ...

  if (authorized) {
    // Yorum yetkilendirildi, devam et
    next();
  } else {
    // Yorum yetkilendirilmedi, hata döndür
    res.status(403).json({ message: "Yorum yetkilendirilmedi." });
  }
};
