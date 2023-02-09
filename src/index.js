const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to Db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(methodOverride('_method'));

app.use(bacBaoVe);

function bacBaoVe(req, res, next) {
  if (['vethuong', 'vevip'].includes(req.query.ve)) {
    req.face = 'Gach gach gach!!!';
    return next();
  }
  res.status(403).json({
    message: 'Access Denied',
  });
}

// app.get(
//   '/middleware',
//   function (req, res, next) {
//     if (['vethuong', 'vevip'].includes(req.query.ve)) {
//       req.face = 'Gach gach gach!!!';
//       return next();
//     }
//     res.status(403).json({
//       message: 'Access Denied',
//     });
//   },
//   function (req, res, next) {
//     res.json({
//       message: 'Successfully!',
//       face: req.face,
//     });
//   },
// );

// HTTP Logger
// app.use(morgan("combined"));

// Template Engine
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
    },
  }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
