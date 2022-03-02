
require('dotenv').config();
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;



app.use(express.json());
//application /x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());

const URI = process.env.MONGO_URI;
mongoose
  .connect(URI)
  .then(() => console.log('MongoDB Connected!!'))
  .catch((e) => console.log(e));

app.get('/', (req, res) => {
  res.send('Hello world!!');
});
app.get('/api/landing',(req,res)=> res.send("hello!!!!"));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});