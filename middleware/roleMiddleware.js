// Middleware för att kontrollera användarens behörighetsnivå
const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // Kontrollerar att användaren är inloggad och har rätt roll
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Du har inte behörighet"
        });
      }

      next();
    } catch (err) {
      // Returnerar felmeddelande vid behörighetsfel
      return res.status(403).json({
        message: "Behörighetsfel"
      });
    }
  };
};

module.exports = roleMiddleware;