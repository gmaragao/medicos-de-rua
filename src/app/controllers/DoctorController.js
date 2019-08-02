const auth = require('../config/auth');
const Doctor = require('../models/Doctor');

exports._createDoctor = async (req, res) => {
  await auth._validateDoctor(req, res);
};

exports._login = async (req, res) => {
  await auth._login(req, res);
};
