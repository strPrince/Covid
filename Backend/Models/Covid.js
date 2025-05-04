const mongoose = require('mongoose');

const CovidSchema = new mongoose.Schema({
  state: { type: String, required: true },
  cases: { type: Number, required: true },
  deaths: { type: Number, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Covid', CovidSchema);