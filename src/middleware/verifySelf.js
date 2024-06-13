function verifySelf(req, res, next) {
  const { id } = req.params;
  const userId = req.user.id;

  if (Number(id) !== userId) {
    return res.status(403).json({ message: "No tienes permisos para acceder a este recurso" });
  }

  next();
}
export default verifySelf;