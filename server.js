
require('dotenv').config();

// Require Models ================
const db = require("./models");
const PORT = process.env.PORT || 7000;

var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Connect to Mongo DB ============
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapetastic";
// mongoose.connect(MONGODB_URI);
// mongoose.connect("mongodb://localhost/scrapetastic", { useNewUrlParser: true });

// Scraping Tools ================
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();

// Middleware ====================
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Routes =====================================
// GET route for scraping ==============
app.get("/scrape", function(req, res) {
  axios.get("https://blog.codinghorror.com/").then(function(response) {
    var $ = cheerio.load(response.data);

    $("h2.post-title").each(function(i, element) {

      var result = {};

      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");
      result.body = $(this).children("a").text();

      db.Headline.create(result)
        .then(function(dbHeadline) {
          console.log(dbHeadline);
        })
        .catch(function(err) {
          console.log(err);
        });
    });

    res.send("Scrape Complete");
  });
});

// GET ALL Headlines ====================
app.get("/headlines", function(req, res) {
  db.Headline.find({})
    .then(function(dbHeadline) {
      res.json(dbHeadline);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// GET Specific Headline by ID: ==========
app.get("/headlines/:id", function(req, res) {
  db.Headline.findOne({ _id: req.params.id })
    .populate("comment")
    .then(function(dbHeadline) {
      res.json(dbHeadline);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// UPDATE for saving/updating associated Comment ===
app.post("/headlines/:id", function(req, res) {
  db.Comment.create(req.body)
    .then(function(dbComment) {
      return db.Headline.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
    })
    .then(function(dbHeadline) {
      res.json(dbHeadline);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//===============================================================

// GET ALL Comments ====================
app.get("/comments", function(req, res) {
  db.Comment.find({})
    .then(function(dbComment) {
      res.json(dbComment);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// GET Specific Comment by ID: ==========
app.get("/comments/:id", function(req, res) {
  db.Comment.findOne({ _id: req.params.id })
    .populate("headline")
    .then(function(dbComment) {
      res.json(dbComment);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// DELETE Specific Comment by ID: ==========
app.get("/comments/:id", function(req, res) {
  db.Comment.deleteOne({ 
    _id: req.params.id }, { comment: dbComment._id }, { new: true }),

    function(error, removed) {
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        console.log(removed);
        res.send(removed);
      }
    }
});

// Starting the Server =====================
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
