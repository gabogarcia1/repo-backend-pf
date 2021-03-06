const express = require("express");
const app = express();
const Usuario = require("../models/usuario");
const {
  verificaToken,
  verificaAdmin_role,
} = require("../middlewares/autenticacion");
const bcrypt = require("bcrypt");
const _ = require("underscore");

app.get("/usuarios", verificaToken, function (req, res) {
  //res.json('get usuarios ')
  let desde = req.query.desde || 0;
  desde = Number(desde);
  let limite = req.query.limite || 5;
  limite = Number(limite);
  Usuario.find({}, "nombre email role estado")
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      Usuario.count({}, (err, conteo) => {
        res.json({
          ok: true,
          usuarios,
          cantidad: conteo,
        });
      });
    });
});
// app.post("/usuarios", [verificaToken, verificaAdmin_role], function (req, res) {
  //para mi no deberia verificar token y admin role
  
  app.post("/usuarios",  function (req, res) {
  //res.json('get usuarios ')
  let body = req.body;
    
  let usuario = new Usuario({
    nombre: body.nombre,
    apellido:body.apellido,
    telefono:body.telefono,
    institucion:body.institucion,
    direccion:body.direccion,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
    
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });
});
app.put(
  "/usuarios/:id",
  [verificaToken, verificaAdmin_role],
  function (req, res) {
    //res.json('get usuarios ')
    let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

    Usuario.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true },
      (err, usuarioDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
          usuario: usuarioDB,
        });
      }
    );
  }
);
app.delete(
  "/usuarios/:id",
  [verificaToken, verificaAdmin_role],
  function (req, res) {
    res.json("DELETE usuarios");
  }
);

module.exports = app;
