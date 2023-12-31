import React, { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveMovie, searchMovies } from '../utils/API';
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';

const SearchMovies = () => {
  // create state for holding returned google api data
  const [searchedMovies, setSearchedMovies] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved movieId values
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  // set up useEffect hook to save `savedMovieIds` list to localStorage on component unmount
  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });

  // create method to search for movies and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchMovies(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const movies = await response.json()

      console.log(movies.Search)

      const movieData = movies.Search.map((movie) => ({
        movieId: movie.imdbID,
        authors: movie.Year || ['No author to display'],
        title: movie.Title,
        description: movie.Type,
        image: movie.Poster || '',
      }));

      setSearchedMovies(movieData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a movie to our database
  const handleSaveMovie = async (movieId) => {
    // find the movie in `searchedMovies` state by the matching id
    const movieToSave = searchedMovies.find((movie) => movie.movieId === movieId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveMovie(movieToSave, token);
      console.log(response)

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if movie successfully saves to user's account, save movie id to state
      setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className='text-light pt-5'>
        <Container>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  className='border-dark'
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a movie...'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedMovies.length
            ? `Viewing ${searchedMovies.length} results:`
            : 'Search for a movie to see results...'}
        </h2>
        <Row>
          {searchedMovies.map((movie) => {
            return (
              <Col md="4" key={movie.movieId}>
                <Card border='' className='mb-4'>
                  {movie.image ? (
                    <a href={`https://www.imdb.com/title/${movie.movieId}/`} target="blank"><Card.Img src={movie.image} alt={`The cover for ${movie.title}`} variant='top' className='' /></a>
                  ) : null}
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <p className='small'>{movie.authors}</p>
                    <Card.Text>{movie.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveMovie(movie.movieId)}>
                        {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                          ? 'In your Watchlist'
                          : 'Add to Watchlist'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchMovies;
