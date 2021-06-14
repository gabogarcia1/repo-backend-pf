const express = require("express");
let Materia = require("../models/materia");

//app.use(require("../models/categoria"));


let {
  verificaToken,
  verificaAdmin_role,
} = require("../middlewares/autenticacion");

let app = express();



app.get("/materia", verificaToken, (req, res) => {
  Materia.find({})
    .sort("descripcion")
    .populate("usuario", "nombre email")
    .exec((err, materias) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        materias,
      });
    });
});

app.get("/materia/:id", verificaToken, (req, res) => {
  let id = req.params.id;
  Materia.findById(id, (err, materiaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!materiaDB) {
      return res.status(500).json({
        ok: false,
        err: {
          message: "La materia no existe",
        },
      });
    }
    res.json({
      ok: true,
      categoria: categoriaDB,
    });
  });
});

app.post("/categoria", [verificaToken, verificaAdmin_role], (req, res) => {
  let body = req.body;
  let categoria = new Categoria({
    descripcion: body.descripcion,
    usuario: req.usuario_id,
  });
  categoria.save((err, categoriaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!categoriaDB) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      categoria: categoriaDB,
    });
  });
});

app.put("/categoria/:id", [verificaToken, verificaAdmin_role], (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let descCategoria = {
    descripcion: body.descripcion,
  };
  Categoria.findByIdAndUpdate(
    id,
    descCategoria,
    { new: true, runValidators: true },
    (err, categoriaDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      if (!categoriaDB) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        categoria: categoriaDB,
      });
    }
  );
});

app.delete(
  "/categoria/:id",
  [verificaToken, verificaAdmin_role],
  (req, res) => {
    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      if (!categoriaBorrada) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "El id no existe",
          },
        });
      }
      res.json({
        ok: true,
        message: "Categoría borrada",
      });
    });
  }
);

module.exports = app;
