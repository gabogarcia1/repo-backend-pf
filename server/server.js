const express = require("express");
const app = express();
require("./config/config");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/usuarios", function (req, res) {
  res.json("GET usuarios");
});
app.post("/usuarios", function (req, res) {
  let body = req.body;
  if (body.usuario === undefined) {
    res.status(400).json({
      ok: false,
      message: "El usuario es necesario",
    });
  } else {
    res.json({
      body,
    });
  }
});
app.put("/usuarios/:id", function (req, res) {
  res.json("PUT usuarios");
});
app.delete("/usuarios/:id", function (req, res) {
  res.json("DELETE usuarios");
});

app.listen(process.env.PORT, () => {
  console.log("Escuchando puerto ",process.env.PORT);
});
