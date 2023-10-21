const express = require('express');
const path = require('path');
const movieRoutes = express.Router();
const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;

movieRoutes.get('/movie', async (req, res) => {
  let db = await dbo.getDb('PortFolio');
  let collection = await db.collection('movies');
  const results = await collection.find({ year: 2017 }).limit(50).toArray();
  res.json(results).status(200);
});

movieRoutes.post('/movie/search', async (req, res) => {
  let year = 0;
  let title = '';
  let cast = '';
  let genre = '';
  let searchString = '';
  let bolText = false;

  if (req.body.title.length > 0) {
    title = req.body.title.trim();
    searchString = '"' + title + '"';
    bolText = true;
  }

  if (req.body.cast.length > 0) {
    cast = req.body.cast.trim();
    searchString += ' ' + '"' + cast + '"';
    bolText = true;
  }

  if (req.body.genre.length > 0) {
    genre = req.body.genre.trim();
    searchString += ' ' + '"' + genre + '"';
    bolText = true;
  }

  const searchQry = {
    $text: {
      $search: searchString,
      $caseSensitive: false,
    },
  };

  if (req.body.year.length > 1) {
    year = parseInt(req.body.year, 10);
    if (bolText) {
      searchQry.year = year;
    } else {
      delete searchQry.$text;
      searchQry.year = year;
    }
  }

  // console.log('year: ', req.body.year);
  // console.log('title: ', req.body.title);
  // console.log('cast: ', req.body.cast);
  // console.log('genre: ', req.body.genre);
  // console.log('searchQry: ', searchQry);

  let db = await dbo.getDb('PortFolio');
  // console.log('db: ', db);
  let collection = await db.collection('movies');

  let results = await collection.find(searchQry).limit(50).toArray();
  // console.log('results: ', results);

  res.json(results).status(200);
});

movieRoutes.get('/movie/:id', async (req, res) => {
  let id = new ObjectId(req.params.id);
  let db = await dbo.getDb('PortFolio');
  let collection = await db.collection('movies');
  const results = await collection.findOne(
    { _id: id },
    {
      title: 0,
      year: 0,
      cast: { $addToset: '$name' },
      genre: { $addToset: '$name' },
    }
  );

  res.json(results).status(200);
});

movieRoutes.post('/movie/updateOne', async (req, res) => {
  let id = new ObjectId(req.body._id);
  let title = req.body.title;
  let year = parseInt(req.body.year, 10);
  let cast = req.body.cast;
  let genre = req.body.genre;

  console.log('title: ', title);
  console.log('year: ', year);
  console.log('cast: ', cast);
  console.log('genre: ', genre);
  let db = await dbo.getDb('PortFolio');
  let collection = await db.collection('movies');
  const results = await collection.updateOne(
    { _id: id },
    {
      $set: {
        title: title,
        year: year,
        cast: cast,
        genre: genre,
      },
    }
  );
  res.json(results).status(200);
});

movieRoutes.post('/movie/add', async (req, res) => {
  let title = req.body.title;
  let year = parseInt(req.body.year);
  let cast = req.body.cast;
  let genre = req.body.genre;
  let inputData = {};
  inputData.title = title;
  inputData.year = year;
  inputData.cast = cast;
  inputData.genre = genre;

  console.log('title: ', title);
  console.log('year: ', year);
  console.log('cast: ', cast);
  console.log('genre: ', genre);
  let db = await dbo.getDb('PortFolio');
  let collection = await db.collection('movies');
  const results = await collection.insertOne(inputData);
  res.json(results).status(200);
});

movieRoutes.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + 'error.html'));
});

module.exports = movieRoutes;
