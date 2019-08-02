const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DoctorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
