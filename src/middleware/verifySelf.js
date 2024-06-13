function verifySelf(req, res, next) {
  const { id } = req.params;
  const userId = req.user.id;

  if (Number(id) !== userId) {
    return res.status(403).json({ message: "you don't have permissions" });
  }

  next();
}
export default verifySelf;