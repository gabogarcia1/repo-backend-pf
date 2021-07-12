const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const alumnoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"],
  },
  apellido: {
    type: String,
    required: [true, "El apellido es necesario"],
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  dni: {
    type: Number,
    require: true,
    unique: true,
    default: 50111222,
  },
  diafechanac: {
    type: Number,
  },
  mesfechanac: {
    type: Number,
  },
  aniofechanac: {
    type: Number,
  },
  domicilio: {
    type: String,
    default: "General Paz 576, San Miguel de Tucuman, Tucuman",
  },
  aniocursado: {
    type: Number,
  },
  nroexpediente: {
    // este es mi numero de expediente
    type: Number,
    required: true,
    unique: true,
  },
  activo: {
    type: Boolean,
    // required: true,
    default: true,
  },
  cuotaaldia: {
    type: Boolean,
    default: true,
  },
  materia_matematicas: {
    type: Array,
    default: ["4", "6", "7", "4"],
  },
  materia_lyl: {
    type: Array,
    default: ["5", "10", "7", "4"],
  },
  materia_bio: {
    type: Array,
    default: ["9", "6", "7", "10"],
  },
  materia_fisica: {
    type: Array,
    default: ["10", "6", "7", "9"],
  },
  materia_quim: {
    type: Array,
    default: ["5", "6", "7", "7"],
  },
  materia_eco: {
    type: Array,
    default: ["9", "6", "7", "9"],
  },
  materia_geo: {
    type: Array,
    default: ["5", "6", "7", "9"],
  },
  materia_historia: {
    type: Array,
    default: ["10", "6", "7", "7"],
  },
  materia_edfis: {
    type: Array,
    default: ["10", "6", "10", "7"],
  },
  img_alumno: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx_7XSeoV5uoxiFIbSEg9QT-YT7TFqgvuxag&usqp=CAU",
  },
});
alumnoSchema.plugin(uniqueValidator, {
  message: "{PATH} debe ser unico",
});
module.exports = mongoose.model("alumno", alumnoSchema);
