const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
let rolesValidos = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} no es un role valido",
};

let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"],
  },
  apellido: {
    type: String,
    required: [true, "El nombre es necesario"],
  },
  fecha_ingreso_dia:{
    type: Number,
    required:true,
  },
  fecha_ingreso_mes:{
    type: Number,
    required:true,
  },
  fecha_ingreso_anio:{
    type: Number,
    required:true,
  },
  id:{
    type: Number,
    required:true,
  },
  email: {
    type: String,
    required: [true, "El correo es necesario"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  telefono:{
    type: Number,
    required: true,
  },
  role: {
    type: String,
    default: "USER_ROLE",
    enum: rolesValidos,
  },
  institucion: {
    type: String,
    required:true,
    default: "Tonin High school",
  },
  direccion:{
    type: String,
    required: true,
    default: "General paz 880",
  },
  estado: {
    type: Boolean,
    default: true,
  },
});
usuarioSchema.plugin(uniqueValidator, {
  message: "{PATH} debe ser unico",
});

usuarioSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};
module.exports = mongoose.model("Usuario", usuarioSchema);
