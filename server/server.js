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
  Usuario.find({ estado: true }, "nombre email role estado")
    .limit(limite)
    .skip(desde)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      Usuario.count({ estado: true }, (err, conteo) => {
        res.json({
          ok: true,
          usuarios,
          cantidad: conteo,
        });
      });
    });
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
  let id = req.params.id;
  Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    14;
    if (!usuarioBorrado) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuario no encontrado",
        },
      });
    }
    res.json({
      ok: true,
      usuario: usuarioBorrado,
    });
  });
});

app.listen(process.env.PORT, () => {
  console.log("Escuchando puerto ", process.env.PORT);
});
