let verificaToken = (req, res, next) => {
  let token = req.get("token");
  res.json({
    token: token,
  });
};
module.exports = {
  verificaToken,
};
e.I;
