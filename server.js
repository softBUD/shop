const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 5000

//application /x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://softBUD:<813813as>@shop.q8acx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.get('/',(req,res) => res.send("Hello world!"))
app.response('/add', (req,res)=> {



})
app.listen(port, () => console.log(`app listening on port ${port}`));