
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Scraping Tools ================
var axios = require("axios");
var cheerio = require("cheerio");

// Require Models ================
var db = require("./models");

var PORT = 3000;

var app = express();

// Middleware ====================
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Connect to Mongo DB ============
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// Routes =====================================
// GET route for scraping ==============
app.get("/scrape", function(req, res) {
  axios.get("https://blog.codinghorror.com/").then(function(response) {
    var $ = cheerio.load(response.data);

    $("h2.post-title").each(function(i, element) {

      var result = {};

      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");

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

// GET ALL Articles ====================
app.get("/headlines", function(req, res) {
  db.Headline.find({})
    .then(function(dbHeadline) {
      res.json(dbHeadline);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// GET Specific Article by ID: ==========
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

// Starting the Server =====================
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
