
require('dotenv').config();
const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const {User} = require('./src/models/user');
const {Product} = require('./src/models/product');
const {ListNum} = require('./src/models/listnum');
const cookieParser = require('cookie-parser');
const {auth} = require('./middelware/auth');
const bodyParser = require('body-parser');
const { faArrowRightRotate } = require('@fortawesome/free-solid-svg-icons');
const { privateDecrypt } = require('crypto');
const port = process.env.PORT || 5000;


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/user',require("./routes/user"));
app.use('/api/product',require("./routes/product"));

const URI = process.env.MONGO_URI;

mongoose
  .connect(URI)
  .then(() => console.log('MongoDB Connected!!'))
  .catch((e) => console.log(e));

app.get('/', (req, res) => {
  res.send('Hello world!!');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});