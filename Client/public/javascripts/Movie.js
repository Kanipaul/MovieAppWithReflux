var React=require('react');
var ReactDOM=require('react-dom');
var Router=require('react-router').Router;
var IndexRoute=require('react-router').IndexRoute;
var Route=require('react-router').Route;
var browserHistory=require('react-router').browserHistory;
var Link=require('react-router').Link;
var Reflux=require('reflux');
var Actions=require('../Actions/MovieActions');
var Store=require('../Stores/MovieStore');


var MovieContainer = React.createClass({
  render : function(){
    return(
      <div className ="container" id = "main">
      <Navbar />
      <main>
      {this.props.children}
      </main>
      </div>
    );
  }
});

// Navigation bar
var Navbar = React.createClass({
  render: function(){
    return(
      <div className="navbar navbar-inverse navbar-static-top">
        <div className="container">
          <a href="#" className="navbar-brand">Movie Manager</a>
            <button className="navbar-toggle" data-toggle="collapse" data-target=".navHeaderCollapse">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            <div className="collapse navbar-collapse navHeaderCollapse">
            <ul className="nav navbar-nav">
              <li className="active"><Link to="/home">Home</Link></li>
              <li><Link to="/movies">Movie List</Link></li>
              <li><Link to="/add">Add Movie</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
              <li><Link to="/">Login</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});
// Home component
var Home = React.createClass({
  render : function(){

    return(
<div id="myCarousel" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
      <li data-target="#myCarousel" data-slide-to="3"></li>
      <li data-target="#myCarousel" data-slide-to="4"></li>
    </ol>
    <div className="carousel-inner" role="listbox">
      <div className="item active">
        <img src="/images/cinderella.jpeg" className="img-responsive" alt="First slide" />
      </div>
      <div className="item">
        <img src="/images/Image2.jpeg" className="img-responsive" alt="Second slide" />
      </div>
      <div className="item">
        <img src="/images/alice.jpeg.jpg" className="img-responsive" alt="Third slide" />
      </div>
      <div className="item">
        <img src="/images/Image4.jpeg" className="img-responsive" alt="Fourth slide" />
      </div>
      <div className="item">
        <img src="/images/Movie.jpeg.jpg" className="img-responsive" alt="Fifth slide" />
      </div>
    </div>
    <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
      <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
      <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
    );
  }
});

// Search movie
var SearchMovie = React.createClass({
  mixins : [Reflux.listenTo(Store, 'onStoreUpdate')],
  getInitialState: function() {
    return {data: []};
  },
  onStoreUpdate : function(search){
    this.setState({data:search.moviesdata})
  },
  submit : function(event){
  event.preventDefault()
  var data = $('#MovieForm').serialize();
  Actions.search(data);
  },
  componentDidMount : function(){
    Actions.fetch();
  },
  MovieTitleChange: function(event) {
    this.setState({Title: event.target.value});
  },
  render : function(){
    return (
      <div>
      <div className = "well">
      <div className = "container">
      <form onSubmit = {this.submit} id="MovieForm">
       <div className="form-group">
         <input type="text" onChange={this.MovieTitleChange} val={this.state.Title} name ="Title" placeholder="Enter movie name .." className="form-control" id="searchForm"/>
       </div>
       <div className="form-group">
       <div className="col-sm-offset-4 col-sm-10">
         <button type="submit" id="save" className="btn btn-success">Search and Save</button>
       </div>
       </div>
       </form>
       </div>
       </div>
       {this.state.data.length>0?<MovieList data = {this.state.data} />:<div></div>}
       </div>
    );
  }
});

// Movie List component
var MovieList = React.createClass({
    render : function(){
       return (
         <div>
         {
           this.props.data.map(function(movie){
           return(
             <div className = "row">
             <div className = "jumbotron">
             <div className="col-md-4">
             <img src={movie.Poster} alt={movie.Title} id="img" />
             </div>
             <div className = "col-md-8">
             <p>Title : {movie.Title}</p>
             <p>Description : {movie.Plot}</p>
             <p>Director : {movie.Director}</p>
             <p>Actors : {movie.Actors}</p>
             <DeleteMovie movie_title={movie.Title}/>
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

var AddForm =React.createClass({
  mixins : [Reflux.listenTo(Store, 'onStoreAdd')],
  getInitialState: function() {
    return {data: []};
  },
  onStoreAdd : function(input){
    this.setState({data:input.moviesdata})
    console.log(this.data);
  },
  submit : function(event){
    console.log("inside submit");
  event.preventDefault()
  var data = $('#AddForm').serialize();
  Actions.add(data);
  },
  titleChange: function(event) {
    this.setState({Title: event.target.value});
  },
  render : function(){
    return(
      <div>
      <div className ="jumbotron" id="addMovie">
       <div className="container" >
           <form onSubmit={this.submit} id="AddForm">
             <div className="form-group">
                 <div className="row">
                     <div className="col-xs-8">
                         <label className="control-label">Movie title</label>
                         <input type="text" className="form-control" name="Title" onChange={this.titleChange} val={this.state.Title}/>
                     </div>
                     <button type="submit" className="btn btn-primary" id="addBtn">Search Movie</button>
                  </div>
            </div>
          </form>
       </div>
     </div>
    <AddMovieList data ={this.state.data} />
      </div>
    );
  }
});


// Add Movie List component
var AddMovieList = React.createClass({
  mixins : [Reflux.listenTo(Store,'onStoreSave')],
  getInitialState : function(event){
      return {data :[]};
  },
  onStoreSave : function(save){
    this.setState({data:save.Actors})
  },
  submit : function(event){
    event.preventDefault()
    console.log("inside submit");
    var data = $('#saveForm').serialize();
    console.log(data);
    Actions.save(data);
  },
    render : function(){
       return (
         <div>
             <div className ="jumbotron" id="addMovie">
              <div className="container" >
                  <form onSubmit ={this.submit} id="saveForm">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-4 selectContainer">

                                <label className="control-label">Genre</label>
                                  <input type="text" className="form-control" name="genre" value={this.props.data.Genre}/>
                            </div>

                            <div className="col-xs-4 selectContainer">
                                <label className="control-label">Language</label>
                                  <input type="text" className="form-control" name="language" value={this.props.data.Language}/>
                            </div>

                            <div className="col-xs-4 selectContainer">
                                <label className="control-label">Country</label>
                                  <input type="text" className="form-control" name="country" value={this.props.data.Country}/>
                            </div>
                          </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-4">
                                <label className="control-label">Director</label>
                                <input type="text" className="form-control" name="director" value={this.props.data.Director}/>
                            </div>
                            <div className="col-xs-4">
                                <label className="control-label">Writer</label>
                                <input type="text" className="form-control" name="writer" value ={this.props.data.Writer}/>
                            </div>
                            <div className="col-xs-4">
                                <label className="control-label">Actors</label>
                                <input type="text" className="form-control" name="actor" value={this.props.data.Actors}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-6">
                                <label className="control-label">Released</label>
                                <input type="text" className="form-control" name="released" value={this.props.data.Released}/>
                            </div>
                            <div className="col-xs-6">
                                <label className="control-label">Youtube trailer</label>
                                <input type="text" className="form-control" name="poster" value={this.props.data.Poster}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Plot</label>
                        <textarea className="form-control" name="plot" rows="8" value={this.props.data.Plot}></textarea>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-xs-6">
                          <label className="control-label">Rating</label>
                          <input type="text" className="form-control" name="ratings" value={this.props.data.imdbRating}/>
                       </div>
                       <div className="col-xs-6">
                         <label className="control-label">Awards</label>
                         <input type="text" className="form-control" name="awards" value={this.props.data.Awards}/>
                      </div>
                    </div>
                  </div>
                    <button type="submit" className="btn btn-success pull-right">Save Movie</button>
                  </form>
              </div>
            </div>
             </div>
           );
     }
});

// Contact us component
var ContactUS = React.createClass({
render:function(){
  return(
    <div className="container ContactUs">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="well well-sm">
              <form className="form-horizontal" action="" method="post">
              <fieldset>
                <legend className="text-center">Contact us</legend>
                <div className="form-group">
                  <label className="col-md-3 control-label" for="name">Name</label>
                  <div className="col-md-9">
                    <input id="name" name="name" type="text" placeholder="Your name" className="form-control"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label" for="email">Your E-mail</label>
                  <div className="col-md-9">
                    <input id="email" name="email" type="text" placeholder="Your email" className="form-control"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label" for="message">Your message</label>
                  <div className="col-md-9">
                    <textarea className="form-control" id="message" name="message" placeholder="Please enter your message here..." rows="5"></textarea>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-md-12 text-right">
                    <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                  </div>
                </div>
              </fieldset>
              </form>
            </div>
          </div>
        </div>
    </div>
  );
}
});

// Delete component
var DeleteMovie = React.createClass ({
 delete:function(event){
   event.preventDefault()
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

// Login component
var Login = React.createClass({
  render : function(){
    return(
      <div>
      <div className="container">
           <section>
               <div id="container_demo" >
                   <a class="hiddenanchor" id="toregister"></a>
                   <a class="hiddenanchor" id="tologin"></a>
                   <div id="wrapper">
                       <div id="login" class="animate form">
                           <form  action="/login" method ="POST">
                               <h1>Log in</h1>
                               <p>
                                   <label for="username" class="uname" data-icon="u" > Your email or username </label>
                                   <input id="username" name="username" required="required" type="text" placeholder="myusername or mymail@mail.com"/>
                               </p>
                               <p>
                                   <label for="password" class="youpasswd" data-icon="p"> Your password </label>
                                   <input id="password" name="password" required="required" type="password" placeholder="eg. X8df!90EO" />
                               </p>
                               <p class="keeplogin">
                                   <input type="checkbox" name="loginkeeping" id="loginkeeping" value="loginkeeping" />
                                   <label for="loginkeeping">Keep me logged in</label>
                               </p>
                               <p class="login button">
                                   <input type="submit" value="Login" />
                               </p>
                               <p class="change_link">
                               Not a member yet ?
                               <a href="#toregister" class="to_register">Join us</a>
                               </p>
                           </form>
                       </div>

                       <div id="register" class="animate form">
                           <form  action="mysuperscript.php" autocomplete="on">
                               <h1> Sign up </h1>
                               <p>
                                   <label for="usernamesignup" class="uname" data-icon="u">Your username</label>
                                   <input id="usernamesignup" name="usernamesignup" required="required" type="text" placeholder="mysuperusername690" />
                               </p>
                               <p>
                                   <label for="emailsignup" class="youmail" data-icon="e" > Your email</label>
                                   <input id="emailsignup" name="emailsignup" required="required" type="email" placeholder="mysupermail@mail.com"/>
                               </p>
                               <p>
                                   <label for="passwordsignup" class="youpasswd" data-icon="p">Your password </label>
                                   <input id="passwordsignup" name="passwordsignup" required="required" type="password" placeholder="eg. X8df!90EO"/>
                               </p>
                               <p>
                                   <label for="passwordsignup_confirm" class="youpasswd" data-icon="p">Please confirm your password </label>
                                   <input id="passwordsignup_confirm" name="passwordsignup_confirm" required="required" type="password" placeholder="eg. X8df!90EO"/>
                               </p>
                               <p class="signin button">
                 <input type="submit" value="Sign up"/>
               </p>
                               <p class="change_link">
                 Already a member ?
                 <a href="#tologin" class="to_register"> Go and log in </a>
               </p>
                           </form>
                       </div>

                   </div>
               </div>
           </section>
       </div>
      </div>
    );
  }
});


// Main Route
ReactDOM.render(
(
<Router history = {browserHistory}>
    <Route path="/" component={Login}>
      <Route path="home" component={Home} />
      <Route path="movies" component={SearchMovie} />
      <Route path="add" component={AddForm} />
      <Route path="contact" component ={ContactUS} />
      <Route path="loginSuccess" component={MovieContainer} />
    </Route>
</Router>
),
document.getElementById('content')
);
