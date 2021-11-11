import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";
import AddMovieForm from "./components/AddMovieForm";
import MovieHeader from "./components/MovieHeader";

import EditMovieForm from "./components/EditMovieForm";
import FavoriteMovieList from "./components/FavoriteMovieList";

import axios from "axios";
import DeleteMovieModal from "./components/DeleteMovieModal";
import { useHistory } from "react-router-dom";
const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { push } = useHistory();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => {
        setMovies(res.data);
        console.log(movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movies]);

  const deleteMovie = (id) => {
    const filterMovies = movies.filter((item) => Number(id) !== item.id);
    setMovies(filterMovies);
  };

  const addToFavorites = (movie) => {};

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand">
          <img width="40px" alt="" src="./Lambda-Logo-Red.png" /> HTTP / CRUD
          Module Project
        </span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies} />
            </Route>

            <Route path="/movies/add/:id">
              <AddMovieForm movies={movies} />
            </Route>

            <Route path="/movies/:id">
              <Movie deleteMovie={deleteMovie} />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
