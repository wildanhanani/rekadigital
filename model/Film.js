const mongoose = require('mongoose');

const Filmschema = mongoose.Schema({
  tconst: { type: String },
  tittleType: { type: String, required: true },
  primaryTittle: { type: String, required: true },
  originalTittle: { type: String, required: true },
  isAdult: { type: Boolean, required: true },
  startYear: { type: Number },
  endYear: { type: Number },
  runtimeMinutes: { type: Number },
  genres: { type: String },
});

module.exports = mongoose.model('Film', Filmschema);
