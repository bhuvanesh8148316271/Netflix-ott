import React, { Component } from "react";
import "./MovieComponents.css"; // Make sure the CSS file is correctly imported.

class MovieComponents extends Component {
  render() {
    const { movieDetail, onMovieSelect } = this.props;

    return (
      <div
        className="movieContainerStyle" // Use the class names from your CSS file
        onClick={() => onMovieSelect(movieDetail.imdbID)}
      >
        <img
          src={movieDetail.Poster}
          alt={movieDetail.Title}
          className="coverImageStyle" // Use the class names from your CSS file
        />
        <span className="movieNameStyle">{movieDetail.Title}</span>
        <div className="infoColumnStyle">
          {" "}
          <span className="movieInfoStyle">Year: {movieDetail.Year}</span>
          <span className="movieInfoStyle">Type: {movieDetail.Type}</span>
        </div>
      </div>
    );
  }
}

export default MovieComponents;
