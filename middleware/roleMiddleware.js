const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Du har inte behörighet"
        });
      }

      next();
    } catch (err) {
      return res.status(403).json({
        message: "Behörighetsfel"
      });
    }
  };
};

module.exports = roleMiddleware;