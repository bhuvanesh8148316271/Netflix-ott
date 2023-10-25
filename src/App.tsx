import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import MovieComponents from "./components/MovieComponents";
import MovieInfoComponent from "./components/MovieInfoComponents";

const API_KEY = "55bb103b";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
  color: white;
  align-items: center;
  padding: 2px;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 9px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: auto;
  margin-right: 10px;
  align-items: center;
  min-width: 320px;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-evenly;
`;

const MovieItem = styled.div`
  flex: 0 0 calc(5.33% - 6px);
  margin-bottom: 12px;
`;

class App extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      searchQuery: "",
      timeoutId: undefined,
      movieList: [],
      selectedMovie: null,
      isFullDetails: false,
    };
  }

  fetchData = async (searchString: any) => {
    if (!searchString) return;
    const url = `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`;
    try {
      const response = await axios.get(url);
      this.setState({ movieList: response.data.Search, selectedMovie: null });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  onTextChange = (event: { target: { value: any } }) => {
    const { timeoutId } = this.state;
    clearTimeout(timeoutId);
    this.setState({ searchQuery: event.target.value });
    const timeout = setTimeout(() => this.fetchData(event.target.value), 500);
    this.setState({ timeoutId: timeout });
  };

  fetchMovieData = async (movieId: any) => {
    if (!movieId) return;
    const url = `https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`;
    try {
      const response = await axios.get(url);
      this.setState({ selectedMovie: response.data, isFullDetails: false });
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  handleMovieSelect = (movieId: any) => {
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
      <Container>
        <Header>
          <AppName>
            <MovieImage src="/film.png.png" />
            NETFLIX OTT App
          </AppName>
          <SearchBox>
            <SearchIcon src="/searchh.png" />
            <SearchInput
              placeholder="Search Movie"
              value={searchQuery}
              onChange={this.onTextChange}
            />
          </SearchBox>
        </Header>
        {selectedMovie && (
          <MovieInfoComponent
            selectedMovie={selectedMovie.imdbID}
            isFullDetails={isFullDetails}
            setIsFullDetails={(isFullDetails: any) =>
              this.setState({ isFullDetails })
            }
          />
        )}
        <MovieListContainer>
          {movieList && movieList.length > 0 ? (
            movieList.map((movie: { imdbID: React.Key | null | undefined }) => (
              <MovieItem key={movie.imdbID}>
                <MovieComponents
                  movieDetail={movie}
                  onMovieSelect={() => {
                    this.handleMovieSelect(movie.imdbID);
                    this.resetSelectedMovie();
                  }}
                />
              </MovieItem>
            ))
          ) : (
            <div>No movies foundded.</div>
          )}
        </MovieListContainer>
      </Container>
    );
  }
}

export default App;
