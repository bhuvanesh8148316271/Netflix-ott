import React, { Component } from "react";
import axios from "axios";
import "./MovieInfoComponents.css";

const API_KEY = "55bb103b"; // Replace with your actual API key

class MovieInfoComponent extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      movieData: null,
      showFullDetails: false,
    };
  }

  fetchData = async () => {
    const { selectedMovie } = this.props;
    const plot = this.state.showFullDetails ? "full" : "short";

    if (!selectedMovie) {
      this.setState({ movieData: null });
      return;
    }

    const url = `https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}&plot=${plot}`;

    try {
      const response = await axios.get(url);
      this.setState({ movieData: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  toggleDetails = () => {
    this.setState(
      (prevState) => ({
        showFullDetails: !prevState.showFullDetails,
      }),
      this.fetchData
    );
  };

  render() {
    const { movieData } = this.state;

    return (
      <div className="MovieContent">
        {movieData ? (
          <>
            <img
              src={movieData.Poster}
              alt="Movie Poster"
              className="CoverImage"
            />
            <div className="MovieInfoContainer">
              <div className="MovieInfoRow">
                <span className="Label">Title:</span>
                <span className="Value">{movieData.Title}</span>
              </div>
              <div className="MovieInfoRow">
                <span className="Label">Year:</span>
                <span className="Value">{movieData.Year}</span>
              </div>
              <div className="MovieInfoRow">
                <span className="Label">Rated:</span>
                <span className="Value">{movieData.Rated}</span>
              </div>
              <div className="MovieInfoRow">
                <span className="Label">Released:</span>
                <span className="Value">{movieData.Released}</span>
              </div>
              <div className="MovieInfoRow">
                <span className="Label">Runtime:</span>
                <span className="Value">{movieData.Runtime}</span>
              </div>
              <div className="MovieInfoRow">
                <span className="Label">Genre:</span>
                <span className="Value">{movieData.Genre}</span>
              </div>
              <div className="MovieInfoRow">
                <span className="Label">Director:</span>
                <span className="Value">{movieData.Director}</span>
              </div>
              <div className="MovieInfoRow">
                <span className="Label">Writer:</span>
                <span className="Value">{movieData.Writer}</span>
              </div>
              <div className="MovieInfoRow">
                <span className="Label">Actors:</span>
                <span className="Value">{movieData.Actors}</span>
              </div>
              <div className="MovieInfoRow">
                <span className="Label">Plot:</span>
                <span className="Value">{movieData.Plot}</span>
              </div>
              <div className="MovieInfoRow">
                <span className="Label">Language:</span>
                <span className="Value">{movieData.Language}</span>
              </div>
              <div className="MovieInfoRow">
                <span className="Label">Country:</span>
                <span className="Value">{movieData.Country}</span>
              </div>
              <div className="MovieInfoRow">
                <span className="Label">Awards:</span>
                <span className="Value">{movieData.Awards}</span>
              </div>
              <div className="MovieInfoRow">
                <span className="Label">Metascore:</span>
                <span className="Value">{movieData.Metascore}</span>
              </div>
              <div className="MovieInfoRow">
                <span className="Label">imdb Rating:</span>
                <span className="Value">
                  <div className="StarRating">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <span key={index}>
                        {index <= parseFloat(movieData.imdbRating) / 2
                          ? "★"
                          : "☆"}
                      </span>
                    ))}
                  </div>
                </span>
              </div>
              <div className="MovieInfoRow">
                <span className="Label">imdbVotes:</span>
                <span className="Value">{movieData.imdbVotes}</span>
              </div>
              <div className="MovieInfoRow">
                <span className="Label">DVD release:</span>
                <span className="Value">{movieData.DVD}</span>
              </div>
              <div className="MovieInfoRow">
                <span className="Label">Box Office:</span>
                <span className="Value">{movieData.BoxOffice}</span>
              </div>
              <div className="MovieInfoRow">
                <a href="#" onClick={this.toggleDetails}>
                  {this.state.showFullDetails ? "View Less" : "View More"}
                </a>
              </div>
            </div>
          </>
        ) : (
          <p>No movie selected.</p>
        )}
      </div>
    );
  }
}

export default MovieInfoComponent;
