const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")

require("./config/config");
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(require("./rutas/usuario"));
app.use(require("./rutas/index"));

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

mongoose.connect(
  process.env.URLDB,
  // "mongodb://localhost:27017/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err, res) => {
    if (err) throw err;
    console.log("Base de datos Online");
  }
);

app.listen(process.env.PORT, () => {
  console.log("Escuchando puerto ", process.env.PORT);
});
