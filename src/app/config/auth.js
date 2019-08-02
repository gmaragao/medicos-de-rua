const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports._validateDoctor = async (req, res) => {
  const email = req.body.email;
  const doctor = await Doctor.findOne({ email });
  if (!doctor) {
    const { name, cpf, password, email } = req.body;
    const newDoctor = {
      name,
      cpf,
      password,
      email
    };
    const salt = await bcrypt.genSalt(10);
    await bcrypt.hash(newDoctor.password, salt, async (err, hashPassword) => {
      if (err) {
        res.status(400).send({ message: err });
      }
      newDoctor.password = hashPassword;
      await new Doctor(newDoctor)
        .save()
        .then(() => {
          res.send('cadastrado com sucesso');
        })
        .catch(err => console.log(err));
    });
  } else {
    res.status(400).send({ message: `Usuário com email ${email} já existe` });
  }
};

exports._login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Doctor.findOne({ email });
  if (!user) {
    res
      .status(400)
      .send({ message: `O usuário com email ${email} não existe` });
  } else {
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).send('Senha incorreta');
    }
    const token = jwt.sign({ _id: user.id }, 'vascooooooooo');
    res.header('auth-token', token).send(token);
  }
};
