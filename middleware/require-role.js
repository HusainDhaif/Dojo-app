const requireRole = (requiredRoles) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/auth/sign-in');
    }

    const userRole = req.session.user.role;

    const rolesArray = Array.isArray(requiredRoles)
      ? requiredRoles
      : [requiredRoles];

    if (rolesArray.includes(userRole)) {
      return next();
    }

    return res.status(403).send('Forbidden: insufficient role');
  };
};

module.exports = requireRole;


