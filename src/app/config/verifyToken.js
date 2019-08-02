const jwt = require('jsonwebtoken');

module.exports = function verify(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Acesso negado!');
  try {
    const verified = jwt.verify(token, 'vascooooooooo');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};
