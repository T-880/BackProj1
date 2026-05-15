const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Hämtar token från headers
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Ingen token, åtkomst nekad",
      });
    }

    // "Bearer TOKEN"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token saknas eller är felaktig",
      });
    }

    // Verifierar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Sparar userId i requesten
    req.user = decoded.userId;

    // Går vidare till nästa funktion
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Ogiltig token",
    });
  }
};

module.exports = authMiddleware;