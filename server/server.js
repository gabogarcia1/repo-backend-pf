const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./config/config");
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(require('./rutas/usuario')); 
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

mongoose.connect(
  "mongodb://localhost:27017/test",
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
