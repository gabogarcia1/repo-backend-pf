const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const alumnoSchema = new Schema({
 

  nombre: {
    type: String,
    required: [true, "El nombre es necesario"],
  },
  apellido: {
    type: String,
    required: [true, "El apellido es necesario"],
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
  // categoria: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Categoria",
  //   required: true,
  // },
  // usuario: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Usuario",
  // },
});
module.exports = mongoose.model("alumno", alumnoSchema);
