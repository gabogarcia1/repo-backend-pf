const express = require("express");
const { verificaToken } = require("../middlewares/autenticacion");
const app = express();
let Alumno = require("../models/alumno");
//---Método GET
app.get("/alumno", verificaToken, (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);
  let limite = req.query.limite || 5;
  limite = Number(limite);

  Alumno.find({ activo: true })
    .limit(limite) //limito registros a mostrar por página
    .skip(desde) //desde que registro comienzo a mostrar
    .sort("nombre") //ordeno la lista por nombre A-Z
    .populate("usuario", "nombre email") //traigo los datos segun el id de usuario
    .exec((err, alumnos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      Alumno.count({ activo: true }, (err, conteo) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
          alumnos,
          cantidad: conteo,
        });
      });
    });
});
app.get("/alumno/:id", verificaToken, (req, res) => {
  let id = req.params.id;

  Alumno.findById(id)
    .populate("usuario", "nombre email")
    .exec((err, alumnoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err: {
            message: "El Id no existe o es incorrecto",
          },
        });
      }

      res.json({
        ok: true,
        alumno: alumnoDB,
      });
    });
});
//==========================
// Buscar producto por termino
//==========================
app.get("/alumno/buscar/:termino", verificaToken, (req, res) => {
  let termino = req.params.termino;
  let reGex = new RegExp(termino, "i");
  Alumno.find({ nombre: reGex }).exec((err, producto) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      alumno,
    });
  });
});
app.post("/alumno", verificaToken, (req, res) => {

// app.post("/alumno", (req, res) => {
  let body = req.body;
  let alumno = new Alumno({
    //usuario: req.usuario._id,
    nombre: body.nombre,
    apellido:body.apellido,
    email:body.email,
    aniocursado: body.aniocursado,
    nroexpediente: body.nroexpediente,
    activo: body.activo,
  });

  alumno.save((err, alumnoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    res.status(201).json({
      ok: true,
      alumno: alumnoDB,
    });
  });
});

app.put("/alumno/:id", verificaToken, (req, res) => {
  let id = req.params.id;
  let body = req.body;
  Alumno.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, alumnoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      if (!alumnoDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "El id no existe",
          },
        });
      }

      res.json({
        ok: true,
        message: "Alumno actualizado",
        alumno: alumnoDB,
      });
    }
  );
});

app.delete("/alumno/:id", verificaToken, (req, res) => {
  let id = req.params.id;
  let activoActualizado = {
    activo: false,
  };
  Alumno.findByIdAndUpdate(
    id,
    activoActualizado,
    { new: true },
    (err, alumnoBorrado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      if (!alumnoBorrado) {
        return res.status(400).json({
          ok: false,
          message: "Alumno no encontrado",
        });
      }
      res.json({
        ok: true,
        alumno: alumnoBorrado,
      });
    }
  );
});

module.exports = app;
