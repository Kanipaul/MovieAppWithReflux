var { Router, Route, IndexRoute, Link, browserHistory } = ReactRouter

//Navigation bar
var Navigation = React.createClass({
  render: function(){
    return(
      <div className = "navbar navbar-inverse">
      <a className="navbar-brand" href="#">Movie Manager</a>
      <button type="button" className="btn btn-default navbar-btn" id="add">Add new</button>
      <button type="button" className="btn btn-default navbar-btn" id="delete">Delete more</button>
      </div>
    );
  }

});

//Search Movie Component
var SearchMovie = React.createClass({
// Getting initial state of the component
getInitialState : function (){
  return {data : []};
},

// Setting the state of the text input
MovieTitleChange: function(event) {
  this.setState({Title: event.target.value});
},

// Submit action
submit : function(event) {
var input = {
  Title : this.state.Title
}

// Post request for calling save method
  $.ajax ({
    type : 'POST',
    url : 'api/movies',
    data : input,
    success : function(data){
    this.setState({data: data});
    }.bind(this)
  });
},

// GET request for Getting data back from server
  getData : function(){
  $.ajax({
    url: 'api/movies',
    dataType: 'json',
    cache: false,
    type: 'GET',
    success: function(data) {
      this.setState({data: data});
      }.bind(this)
  });
},

// Automatically called by React after a component is rendered for the first time
componentDidMount: function() {
  this.getData();
  setInterval(this.getData, 2000);
  },

// Render function
render : function(){
  return(
    <div>
    <div className = "well">
    <div className = "container">
    <form onSubmit = {this.submit}>
     <div className="form-group">
       <input type="text" onChange={this.MovieTitleChange} val={this.state.Title} name ="Title" placeholder="Enter a movie name ....." className="form-control"/>
     </div>
     <div className="form-group">
     <div className="col-sm-offset-4 col-sm-10">
       <button type="submit" id="save" className="btn btn-success">Search and Save</button>
     </div>
     </div>
     </form>
     </div>
     </div>
     <MovieList data = {this.state.data} />
     </div>
  );
}
});

// Movie List
var MovieList = React.createClass({
  render : function(){
     return (
       <div>
       {
         this.props.data.map(function(result){
         return(
           <div className = "row">
           <div className = "jumbotron">
           <div className="col-md-4">
           <img src={result.Poster} className="img-thumbnail" alt={result.Title} id="img" />
           </div>
           <DeleteMore movie_title ={result.Title} />
           <div className = "col-md-8">
           <p>Title : {result.Title}</p>
           <p>Description : {result.Plot}</p>
           <p>Director : {result.Director}</p>
           <p>Actors : {result.Actors}</p>
           <DeleteMovie movie_title={result.Title}/>
           </div>
           </div>
           </div>
         );
       }
     )}
       </div>
     );
   }
});

// Delete component
var DeleteMovie = React.createClass ({
 delete:function(event){
   var input ={
     Title : this.props.movie_title
   }
// Deleting a movie
  $.ajax ({
    url: "api/movies/"+input.Title,
    type: 'DELETE',
    success : function(data){
    console.log("Success");
    }
  });
 },
render: function (){
  return (
 <form onSubmit={this.delete}>
 <button className="btn btn-danger" type="submit" value={this.props.movie_title} name="movie_title">Delete</button>
 </form>
 );
}
});

// Delete more movies using checkbox
var DeleteMore = React.createClass({

  // Getting initial state
  getInitialState : function (){
    return { checked :false};
  },

  // On click of checkbox
  onStateChanged : function (){
     var Title = this.props.movie_title
     console.log(Title);
  },
  // Render method
  render : function(){
    return(
      <div className ="checkbox">
      <input type="checkbox" checked={this.state.checked} onChange={this.onStateChanged} value={this.props.movie_title}/>
      </div>
    );
  }

});
// Main Render
ReactDOM.render(
  <SearchMovie />,
  document.getElementById('content')
);
