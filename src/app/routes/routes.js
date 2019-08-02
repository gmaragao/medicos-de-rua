const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/DoctorController');
const verify = require('../config/verifyToken');
router.get('/', (req, res) => {
  res.send('HOME');
});

router.post('/doctor', DoctorController._createDoctor);
router.post('/login', DoctorController._login);
router.get('/autenticado', verify, (req, res) => {
  res.json({
    posts: {
      title: 'my first post',
      description: 'just authenticated guys'
    }
  });
});
module.exports = router;
