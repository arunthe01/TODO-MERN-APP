const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017/todo";
const client = new MongoClient(url);
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  await client.connect();
  res.send("Connected to MongoDb");
});

app.post("/add", async (req, res) => {
  const { data } = req.body;
  await client.connect();
  await client.db().collection("todo").insertOne(data);
  res.end();
});

app.post("/data", async (req, res) => {
  await client.connect();
  var data = client.db().collection("todo").find();
  data = await data.toArray();
  res.end(JSON.stringify(data));
});

app.post("/del", async (req, res) => {
  await client.connect();
 
  const { id } = req.body;
  console.log(id)
  await client.db().collection("todo").deleteOne({ id: id });
  res.end();
});

app.post('/update', async (req, res) => {
    await client.connect();
    const {id, checked} = req.body;
    await client.db().collection("todo").updateOne({ id: id}, {$set:{checked: checked}});
    res.end();
});



app.listen(4000);
