const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const alumnoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"],
  },
  apellido: {
    type: Number,
    required: [true, "El apellido es necesario"],
  },
  email:{
    type: String,
    require:true,
  },
  aniocursado: {
    type: String,
    required: true,
  },
  nroexpediente:{
    type: String,
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
