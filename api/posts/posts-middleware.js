// content validation
const validatePost = (req, res, next) => {
  const { content } = req.body;
  //post içeriği boş olamaz, içerik yoksa ve string değilse ve içerik boşsa hata döndür ve tweet karakteri 280 karakterden fazla olamaz
  if (!content || typeof content !== "string" || !content.trim()) {
    res.status(400).json({ message: "Post içeriği gereklidir." });
  } else if (content.length > 280) {
    res
      .status(400)
      .json({ message: "Post içeriği 280 karakterden fazla olamaz." });
  } else {
    next();
  }
};

module.exports = {
  validatePost,
};
