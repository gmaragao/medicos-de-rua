const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Patient = new Schema({
  name: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  }
});

module.exports = new mongoose.model(PatientSchema, 'Patient');
