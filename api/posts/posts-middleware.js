// Örnek bir post doğrulama işlevi
exports.validatePost = (req, res, next) => {
  // Postu doğrula
  // ...

  if (valid) {
    // Post doğrulandı, devam et
    next();
  } else {
    // Post doğrulanmadı, hata döndür
    res.status(400).json({ message: "Geçersiz post verisi." });
  }
};

// Örnek bir post yetkilendirme işlevi
exports.authorizePost = (req, res, next) => {
  // Postu yetkilendir
  // ...

  if (authorized) {
    // Post yetkilendirildi, devam et
    next();
  } else {
    // Post yetkilendirilmedi, hata döndür
    res.status(403).json({ message: "Post yetkilendirilmedi." });
  }
};
