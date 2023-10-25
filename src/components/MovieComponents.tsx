import React, { Component } from "react";

const movieContainerStyle = {
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  width: "280px",
  boxShadow: "0 3px 10px 0 #aaa",
  cursor: "pointer",
};

const coverImageStyle = {
  height: "250px",
  objectFit: "cover",
};

const movieNameStyle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "black",
  margin: "15px 0",
};

const infoColumnStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

const movieInfoStyle = {
  fontSize: "16px",
  fontWeight: "500",
  color: "black",
  textTransform: "capitalize",
};

class MovieComponents extends Component {
  render() {
    const { movieDetail, onMovieSelect } = this.props;

    return (
      <div
        style={movieContainerStyle}
        onClick={() => onMovieSelect(movieDetail.imdbID)}
      >
        <img
          src={movieDetail.Poster}
          alt={movieDetail.Title}
          style={coverImageStyle}
        />
        <span style={movieNameStyle}>{movieDetail.Title}</span>
        <div style={infoColumnStyle}>
          <span style={movieInfoStyle}>Year: {movieDetail.Year}</span>
          <span style={movieInfoStyle}>Type: {movieDetail.Type}</span>
        </div>
      </div>
    );
  }
}

export default MovieComponents;
