var Reflux = require('reflux');
var Actions = require('../Actions/MovieActions');


var MovieStore=Reflux.createStore({
  listenables:Actions,
  input:{
      moviesdata:[]
  },
  data :{
    Title : null,
    Poster : null,
    Description : null,
    Actors : null
  },
  onSearch:function(title){
    console.log("inside Title ::"+title);
    $.ajax({
    type: 'POST',
    url: 'api/movies',
    data : title,
    success : function(data){
      console.log(data);
    this.input.moviesdata = data;
    this.trigger(this.input);
    }.bind(this)
  });
},
  onFetch : function(){
    console.log("inside get movie");
    $.ajax({
        url: 'api/movies',
        dataType: 'json',
        cache: false,
        type: 'GET',
        success: function(data) {
        this.input.moviesdata = data;
        this.trigger(this.input);
          }.bind(this)
        });
      },
      onAdd : function(Title){
        console.log("Adding movie ::"+Title);
        $.ajax({
        type: 'POST',
        url: '/api/getMovie',
        data : Title,
        success : function(data){
        this.input.moviesdata = data;
        this.trigger(this.input);
        }.bind(this)
      });
      },
      onSave : function(input){
        console.log("inside save movie ::" + input);
        $.ajax({
        type: 'POST',
        url: '/api/addMovie',
        data:input,
        success : function(data){
        this.data.Title = data.Title;
        this.data.Poster = data.Poster;
        this.data.Description = data.Description;
        this.data.Actors = data.Actors;
        this.trigger(this.data);
        }.bind(this)
      });
      },
});

module.exports = MovieStore;
