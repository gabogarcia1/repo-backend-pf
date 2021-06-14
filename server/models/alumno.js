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
