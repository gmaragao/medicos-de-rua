const assert = require('assert');
const auth = require('../src/app/config/auth');
const Doctor = require('../src/app/models/Doctor');
const app = require('../app');
const request = require('supertest');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

describe('Auth', function() {
  this.beforeAll(async () => {
    mongoose.connect(
      'mongodb://localhost:27017/medicos-de-rua',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      },
      async () => {
        await mongoose.connection.db.dropDatabase(() => {});
      }
    );
  });

  describe('Register a Doctor', function() {
    it('Should create a new doctor', async () => {
      const doctor = {
        name: 'Gabriel Aragao',
        email: 'gabriel@gmail.com',
        password: 'ac1234',
        cpf: '12345'
      };
      await request(app)
        .post('/doctor')
        .send(doctor)
        .set('Accept', 'application/json')
        .expect(201);
    });
    it('Should throw an error', async () => {
      const doctor = {
        name: 'Gabriel Aragao',
        email: 'gabriel@gmail.com',
        password: 'abc123',
        cpf: '12345'
      };
      await request(app)
        .post('/doctor')
        .send(doctor)
        .set('Accept', 'application/json')
        .expect(400);
    });

    it('Should make the doctor login', async () => {
      const doctor = {
        email: 'gabriel@gmail.com',
        password: 'ac1234'
      };

      await request(app)
        .post('/login')
        .send(doctor)
        .set('Accept', 'application/json')
        .expect(201)
        .then(async res => {
          const email = 'gabriel@gmail.com';
          const user = await Doctor.findOne({ email });
          const token = jwt.sign({ _id: user.id }, process.env.JWT_KEY);
          assert.equal(res.header.authtoken, token);
        });
    });
  });
});
