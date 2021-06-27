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
  email:{
    type: String,
    require:true,
    unique: true,
  },
  aniocursado: {
    type: Number,
    required: true,
    
  },
  nroExpediente:{ // este es mi numero de expediente
    type: Number,
    required:true,
    unique: true,
  },
  activo: {
    type: Boolean,
    required: true,
    default: true,
  },
  cuota_al_dia: {
    type: Boolean,
    default: true,
  },
  materia_matematicas:{
    type: Number,
    default: 4,
  },
  materia_lyl:{
    type: Number,
    default: 8,
  },
  materia_bio:{
    type: Number,
    default: 5,
  },
  materia_fisica:{
    type: Number,
    default: 8,
  },
  materia_quim:{
    type: Number,
    default: 5,
  },
  materia_eco:{
    type: Number,
    default: 8,
  },
  materia_geo:{
    type: Number,
    default: 8,
  },
  materia_historia:{
    type: Number,
    default: 7,
  },
  materia_edfis:{
    type: Number,
    default: 6,
  }
});
alumnoSchema.plugin(uniqueValidator, {
  message: "{PATH} debe ser unico",
});
module.exports = mongoose.model("alumno", alumnoSchema);
