export const checkSession = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).send("Acceso denegado: No has iniciado sesión");
  }
  next();
};