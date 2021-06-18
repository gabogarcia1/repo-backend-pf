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
    required: [true, "El apellido es necesario"],
  },
  email:{
    type: String,
    require:true,
  },
  aniocursado: {
    type: Number,
    required: true,
  },
  id:{ // este es mi numero de expediente
    type: Number,
    required:true
  },
  activo: {
    type: Boolean,
    required: true,
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
