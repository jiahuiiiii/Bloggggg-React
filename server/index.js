require("dotenv").config({
  path: "./.env.local",
});
const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const expressFileUpload = require("express-fileupload");
const uuid = require("uuid");

const DB_ENDPOINT = `mongodb+srv://jiahuiiiii:${process.env.VITE_DB_PASSWORD}@cluster0.crhng.mongodb.net/?retryWrites=true&w=majority`;
console.log(DB_ENDPOINT);

const app = express();
app.use(cors());
app.use(expressFileUpload());
app.use(express.json());

app.post("/create", async (req, res) => {
  const connection = await mongodb.MongoClient.connect(DB_ENDPOINT);
  const db = connection.db("blog");
  const collection = db.collection("post");

  const post = req.body;
  collection.insertOne(post);

  res.send({
    success: true,
  });
});

app.post("/upload/image", async (req, res) => {
  const image = req.files.image;
  const imageName = uuid.v4() + "." + image.name.split(".").pop();
  image.mv(`${__dirname}/public/images/${imageName}`, (err) => {
    console.log(err);
  });
  res.send({
    data: `http://localhost:8787/images/${imageName}`,
  });
});

app.get("/images/:image", (req, res) => {
  res.sendFile(`${__dirname}/public/images/${req.params.image}`);
});

app.delete("/delete/:id", async (req, res) => {
  const connection = await mongodb.MongoClient.connect(DB_ENDPOINT);
  const db = connection.db("blog");
  const collection = db.collection("post");
  await collection.deleteOne({
    _id: mongodb.ObjectId(req.params.id),
  });
  res.send({
    success: true,
  });
  connection.close()
});

// 每当client side get这个东西，这个func就会被call
// req sent to server, server send the reponse back
app.get("/list", async (req, res) => {
  const connection = await mongodb.MongoClient.connect(DB_ENDPOINT);
  // await and async is used for api, not only because you need to wait, but also you want your client side to do other thing
  //
  const db = connection.db("blog");
  const collection = db.collection("post");
  const posts = await collection.find({}).sort({ _id: -1 }).toArray(); // if parameter of find is an empty object, it will return all shit
  res.json(posts); //send it back to client
  connection.close();
});

app.get("/article/:id", async (req, res) => {
  const connection = await mongodb.MongoClient.connect(DB_ENDPOINT);
  const db = connection.db("blog");
  const collection = db.collection("post");
  const post = await collection.findOne({
    _id: new mongodb.ObjectID(req.params.id),
  });
  res.json(post);
  connection.close();
});

app.listen(8787, () => {
  console.log("server is running on 8787");
});
