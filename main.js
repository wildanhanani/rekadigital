const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') app.use(morgan('combined'));

const userRoute = require('./route/user');
const loginRoute = require('./route/login');
const filmRoute = require('./route/film');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('mongodb connected'))
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'film service up and running!',
    environment: process.env.NODE_ENV,
    timestamp: new Date(),
  });
});

const routerV1 = express.Router();

routerV1.use('/auth', loginRoute);
routerV1.use('/user', userRoute);
routerV1.use('/movie', filmRoute);

app.use('/api/v1', routerV1);

app.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    status: error.status || 500,
    error: error.message,
  });
});

app.listen(PORT, console.log(`listening on port ${PORT}`));
