// content validation
const validateComment = (req, res, next) => {
  const { content, post_id } = req.body;

  //yorum içeriği boş olamaz, post_id girilmeli,  içerik yoksa ve string değilse ve içerik boşsa hata döndür ve karakter sayısı 280 karakterden fazla olamaz
  if (!post_id || !content || typeof content !== "string" || !content.trim()) {
    res
      .status(400)
      .json({
        message:
          "Yorum içeriği ve yorum yazılacak post'a ait post_id gereklidir.",
      });
  } else if (content.length > 280) {
    res
      .status(400)
      .json({ message: "Yorum içeriği 280 karakterden fazla olamaz." });
  } else {
    next();
  }
};

module.exports = {
  validateComment,
};
