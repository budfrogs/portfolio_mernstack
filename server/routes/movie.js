const express = require("express");
const path = require("path");
const movieRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

movieRoutes.get("/movie", async (req, res) => {
  let db = await dbo.getDb("PortFolio");
  let collection = await db.collection("movies");
  const results = await collection.find({ year: 2017 }).limit(50).toArray();
  res.json(results).status(200);
});

movieRoutes.post("/movie/search", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let year = 0;
  let title = "";
  let cast = "";
  let genres = "";
  let searchString = "";
  let bolText = false;

  //console.log("body: ", req.body.title, req.body.year, req.body.cast, req.body.genres);

  if (req.body.title === null || req.body.title.trim() === "") {
    console.log("Empty title");
  } else {
    title = req.body.title.trim();
    searchString = '"' + title + '"';
    bolText = true;
  }

  if (req.body.cast === null || req.body.cast.trim() === "") {
    console.log("Empty Cast");
  } else {
    cast = req.body.cast;
    searchString += " " + '"' + cast + '"';
    bolText = true;
  }

  if (req.body.genres === null || req.body.genres.trim() === "") {
    console.log("Empty Genres");
  } else {
    genres = req.body.genres.trim();
    searchString += " " + '"' + genres + '"';
    bolText = true;
  }

  const searchQry = {
    $text: {
      $search: searchString,
      $caseSensitive: false,
    },
  };

  if (req.body.year === null || req.body.year.trim() === "") {
    console.log("Empty year");
  } else {
    year = parseInt(req.body.year, 10);
    if (bolText) {
      searchQry.year = year;
    } else {
      delete searchQry.$text;
      searchQry.year = year;
    }
  }

  // console.log("year: ", req.body.year);
  // console.log("title: ", req.body.title);
  // console.log("cast: ", req.body.cast);
  // console.log("genres: ", req.body.genres);
  console.log("searchQry: ", searchQry);

  let db = await dbo.getDb("PortFolio");
  //console.log("db: ", db);
  let collection = await db.collection("movies");
  //console.log("collection: ", collection);

  let results = await collection.find(searchQry).limit(50).toArray();
  //console.log("results: ", results);

  res.json(results).status(200);
});

movieRoutes.get("/movie/:id", async (req, res) => {
  let id = new ObjectId(req.params.id);
  let db = await dbo.getDb("PortFolio");
  let collection = await db.collection("movies");
  const results = await collection.findOne(
    { _id: id },
    {
      title: 0,
      year: 0,
      cast: { $addToset: "$name" },
      genres: { $addToset: "$name" },
    }
  );

  res.json(results).status(200);
});

movieRoutes.post("/movie/updateOne", async (req, res) => {
  let id = new ObjectId(req.body._id);
  let title = req.body.title;
  let year = parseInt(req.body.year, 10);
  let cast = req.body.cast;
  let genres = req.body.genres;

  // console.log("title: ", title);
  // console.log("year: ", year);
  // console.log("cast: ", cast);
  // console.log("genres: ", genres);
  let db = await dbo.getDb("PortFolio");
  let collection = await db.collection("movies");
  const results = await collection.updateOne(
    { _id: id },
    {
      $set: {
        title: title,
        year: year,
        cast: cast,
        genres: genres,
      },
    }
  );
  res.json(results).status(200);
});

movieRoutes.post("/movie/add", async (req, res) => {
  let title = req.body.title;
  let year = parseInt(req.body.year);
  let cast = req.body.cast;
  let genres = req.body.genres;
  let inputData = {};
  inputData.title = title;
  inputData.year = year;
  inputData.cast = cast;
  inputData.genres = genres;

  // console.log("title: ", title);
  // console.log("year: ", year);
  // console.log("cast: ", cast);
  // console.log("genres: ", genres);
  let db = await dbo.getDb("PortFolio");
  let collection = await db.collection("movies");
  const results = await collection.insertOne(inputData);
  res.json(results).status(200);
});

movieRoutes.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "error.html"));
});

module.exports = movieRoutes;
