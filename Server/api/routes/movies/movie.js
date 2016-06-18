var express = require('express');
var router = express.Router();

var imdbObj = require('node-movie');
var Movie = require('../../../models/movies/movie');
// Route to get all movies and save a movie
router.route('/movies')
// Get all movies
    .get(function(req, res){
      Movie.find(function(err, movies) {
            if (err)
                res.send(err);
            res.json(movies);
        });
    })
// Search and save the movie
  .post(function(req, res) {
    console.log("Inside Search and Save Movie method");
    console.log("Saving the movie::"+req.body.Title);
        imdbObj(req.body.Title, function (err, data) {
        if (data){
        var movie = new Movie();
        movie.Title = data.Title;
        movie.Year =  data.Year;
        movie.Rated = data.Rated;
        movie.Released = data.Released;
        movie.Runtime = data.Runtime;
        movie.Genre = data.Genre;
        movie.Director = data.Director;
        movie.Writer = data.Writer;
        movie.Actors = data.Actors;
        movie.Plot = data.Plot;
        movie.Language = data.Language;
        movie.Country = data.Country;
        movie.Awards = data.Awards;
        movie.Poster = data.Poster;
        movie.Metascore = data.Metascore;
        movie.imdbRating = data.imdbRating;
        movie.imdbVotes = data.imdbVotes;
        movie.imdbID = data.imdbID;
        movie.Type = data.Type;
        movie.Response = data.Response;
        movie.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Movie added!' });
              });
            }else {
              res.send(err);
            }
            });
        });


// Route to get all movies and save a movie
    router.route('/movies/:movie_id')
// Get the movie by id
          .get(function(req, res) {
            Movie.findById(req.params.movie_id, function(err, movie) {
                if (err)
                    res.send(err);
                res.json(movie);
            });
        })

// Update the movie by id
        .put(function(req, res) {
        Movie.findById(req.params.movie_id, function(err, movie) {
            if (err)
                res.send(err);
            movie.Title = 'Hello';
            movie.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Movie updated!' });
            });
        });
    })
// Delete the movie by id
    .delete(function(req, res) {
      console.log("Deleting the movie :: "+req.params.movie_id);
        Movie.remove({
            Title: req.params.movie_id
        }, function(err, movie) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

    // Adding a movie by Title
    router.route('/getMovie')
      .post(function(req, res) {
        console.log("req.body.Title="+req.body.Title);
          imdbObj(req.body.Title, function (err, data) {
          if (data){
              res.json(data);
              }else {
                res.send(err);
              }
              });
          });

  // Add movie
  router.route('/addMovie')
      .post(function(req, res){
        console.log("inside adding movie");
        var movie = new Movie({
          Title: req.body.Title,
          Year:req.body.Year,
          Released:req.body.Released,
          Director:req.body.Director,
          Actors:req.body.Actors,
          Plot:req.body.Plot,
          Awards:req.body.Awards,
          Poster:req.body.Poster,
          imdbRating:req.body.imdbRating
  });
    movie.save(function (err) {
      if (err) {
        return err;
      }
      else {
        console.log("New movie has been saved successfully !!!");
      }
    });
    res.redirect("/");
  });


module.exports= router;
