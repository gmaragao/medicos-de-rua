module.exports = (app, express, bodyParser, mongoose) => {
  const router = require('../routes/routes');
  require('dotenv').config();
  app.use(express.static(__dirname + '/public'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.set('view engine', 'ejs');
  app.use('/', router);
  mongoose.connect('mongodb://localhost:27017/medicos-de-rua', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
};
