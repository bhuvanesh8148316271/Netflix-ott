import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

const API_KEY = "55bb103b"; // Replace with your actual API key

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgrey;
`;

const CoverImage = styled.img`
  height: 400px;
  width: 20%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const MovieInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  background-color: #fff;
  padding: 18px;
`;

const MovieInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span`
  font-weight: bold;
  color: #333;
`;

const Value = styled.span`
  flex-grow: 1;
  color: #555;
  margin-left: 16px;
`;

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
      <Container>
        {movieData ? (
          <>
            <CoverImage src={movieData.Poster} alt="Movie Poster" />
            <MovieInfoContainer>
              <MovieInfoRow>
                <Label>Title:</Label>
                <Value>{movieData.Title}</Value>
              </MovieInfoRow>
              <MovieInfoRow>
                <Label>Year:</Label>
                <Value>{movieData.Year}</Value>
              </MovieInfoRow>
              <MovieInfoRow>
                <Label>Rated:</Label>
                <Value>{movieData.Rated}</Value>
              </MovieInfoRow>
              <MovieInfoRow>
                <Label>Released:</Label>
                <Value>{movieData.Released}</Value>
              </MovieInfoRow>
              <MovieInfoRow>
                <Label>Runtime:</Label>
                <Value>{movieData.Runtime}</Value>
              </MovieInfoRow>
              <MovieInfoRow>
                <Label>Genre:</Label>
                <Value>{movieData.Genre}</Value>
              </MovieInfoRow>
              <MovieInfoRow>
                <Label>Director:</Label>
                <Value>{movieData.Director}</Value>
              </MovieInfoRow>
              <MovieInfoRow>
                <Label>Writer:</Label>
                <Value>{movieData.Writer}</Value>
              </MovieInfoRow>
              <MovieInfoRow>
                <Label>Actors:</Label>
                <Value>{movieData.Actors}</Value>
              </MovieInfoRow>
              <MovieInfoRow>
                <Label>Plot:</Label>
                <Value>{movieData.Plot}</Value>
              </MovieInfoRow>
              <MovieInfoRow>
                <Label>Language:</Label>
                <Value>{movieData.Language}</Value>
              </MovieInfoRow>
              <MovieInfoRow>
                <Label>Country:</Label>
                <Value>{movieData.Country}</Value>
              </MovieInfoRow>
              <MovieInfoRow>
                <Label>Awards:</Label>
                <Value>{movieData.Awards}</Value>
              </MovieInfoRow>
              <MovieInfoRow>
                <Label>Metascore:</Label>
                <Value>{movieData.Metascore}</Value>
              </MovieInfoRow>
              <MovieInfoRow>
                <Label>imdb Rating:</Label>
                <Value>{movieData.imdbRating}</Value>
              </MovieInfoRow>
              <MovieInfoRow>
                <Label>imdbVotes:</Label>
                <Value>{movieData.imdbVotes}</Value>
              </MovieInfoRow>
              <MovieInfoRow>
                <Label>DVD release:</Label>
                <Value>{movieData.DVD}</Value>
              </MovieInfoRow>
              <MovieInfoRow>
                <Label>Box Office:</Label>
                <Value>{movieData.BoxOffice}</Value>
              </MovieInfoRow>

              <MovieInfoRow>
                <a href="#" onClick={this.toggleDetails}>
                  {this.state.showFullDetails ? "View Less" : "View More"}
                </a>
              </MovieInfoRow>
            </MovieInfoContainer>
          </>
        ) : (
          <p>No movie selected.</p>
        )}
      </Container>
    );
  }
}

export default MovieInfoComponent;
