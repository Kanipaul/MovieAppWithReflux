var MovieContainer = React.createClass({
  render : function(){
    return(
      <SearchBar/>
    );
  }
});

var SearchBar = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  submit : function(event){
  var self
  event.preventDefault()
  self = this
  console.log(this.state.Title);
  var input ={
    Title: this.state.Title
  }
    $.ajax({
    type: 'POST',
    url: 'api/movies',
    data:input,
    success : function(data){
    this.setState({data: data});
    }.bind(this)
  });
},
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
  componentDidMount: function() {
    this.getData();
    setInterval(this.getData, 2000);
    },

  MovieTitleChange: function(event) {
    this.setState({Title: event.target.value});
    console.log(this.state);
  },

render : function(){
    return (

      <div>
      <div className = "navbar navbar-inverse">
      <a className="navbar-brand" href="#">Movie Manager</a>
      <button type="button" className="btn btn-default navbar-btn" id="add">Add new</button>
      <button type="button" className="btn btn-default navbar-btn" id="delete">Delete</button>
      </div>
      <div className = "well">
      <div className = "container">
      <form onSubmit = {this.submit}>
       <div className="form-group">
         <input type="text" onChange={this.MovieTitleChange} val={this.state.Title} name ="Title" placeholder="Enter movie name .." className="form-control"/>
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

var MovieList = React.createClass({

  getInitialState: function() {
    return {
          checked: this.props.checked || false
       };
  },

  handleClick: function(event) {
    this.setState({checked: e.target.checked});
    console.log(this.state);
  },

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
             <div className = "col-md-8">
             <p>Title : {result.Title}</p>
             <p>Description : {result.Plot}</p>
             <p>Director : {result.Director}</p>
             <p>Actors : {result.Actors}</p>
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

ReactDOM.render(
<MovieContainer />,
document.getElementById('content')

);
