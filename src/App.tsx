import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import MovieComponents from "./components/MovieComponents";
import MovieInfoComponent from "./components/MovieInfoComponents";
import "./Apple.css"; // Import your CSS file

const API_KEY = "55bb103b";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      timeoutId: undefined,
      movieList: [],
      selectedMovie: null,
      isFullDetails: false,
    };
  }

  fetchData = async (searchString) => {
    if (!searchString) return;
    const url = `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`;
    try {
      const response = await axios.get(url);
      this.setState({ movieList: response.data.Search, selectedMovie: null });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  onTextChange = (event) => {
    const { timeoutId } = this.state;
    clearTimeout(timeoutId);
    this.setState({ searchQuery: event.target.value });
    const timeout = setTimeout(() => this.fetchData(event.target.value), 500);
    this.setState({ timeoutId: timeout });
  };

  fetchMovieData = async (movieId) => {
    if (!movieId) return;
    const url = `https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`;
    try {
      const response = await axios.get(url);
      this.setState({ selectedMovie: response.data, isFullDetails: false });
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  handleMovieSelect = (movieId) => {
    this.fetchMovieData(movieId);
  };

  resetSelectedMovie = () => {
    this.setState({ selectedMovie: null });
    requestAnimationFrame(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page in the next frame
    });
  };

  render() {
    const { searchQuery, movieList, selectedMovie, isFullDetails } = this.state;

    return (
      <div className="Containers">
        <div className="Header">
          <div className="AppName">
            <img className="MovieImage" src="/film.png.png" alt="Movie Icon" />
            NETFLIX OTT App
          </div>
          <div className="SearchBox">
            <img className="SearchIcon" src="/searchh.png" alt="Search Icon" />
            <input
              className="SearchInput"
              placeholder="Search Movie"
              value={searchQuery}
              onChange={this.onTextChange}
            />
          </div>
        </div>
        {selectedMovie && (
          <div className="MovieInfoComponent">
            <MovieInfoComponent
              selectedMovie={selectedMovie.imdbID}
              isFullDetails={isFullDetails}
              setIsFullDetails={(isFullDetails) =>
                this.setState({ isFullDetails })
              }
            />
          </div>
        )}
        <div className="MovieListContainer">
          {movieList && movieList.length > 0 ? (
            movieList.map((movie) => (
              <div className="MovieItem" key={movie.imdbID}>
                <MovieComponents
                  movieDetail={movie}
                  onMovieSelect={() => {
                    this.handleMovieSelect(movie.imdbID);
                    this.resetSelectedMovie();
                  }}
                />
              </div>
            ))
          ) : (
            <div className="NoMoviesFound">No movies found.</div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
