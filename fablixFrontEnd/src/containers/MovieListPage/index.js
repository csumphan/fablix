import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import { Button } from 'reactstrap';

import {
  searchMovies,
  sortTitleAscending,
  sortTitleDescending,
  sortYearAscending,
  sortYearDescending,
} from './actions';
import { selectMoviesData, selectSearchMoviesError } from './selectors';

import './styles.css';

class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    const searchTerms = { director: 'david', title: 'e' };

    this.props.actions.searchMovies(searchTerms);
  }

  componentWillReceiveProps(nextProps) {
    console.log('Receiving next props...');
    console.log(nextProps.moviesData.data);
  }

  sortTitleAscending = () => {
    this.props.actions.sortTitleAscending();
  };

  sortTitleDescending = () => {
    this.props.actions.sortTitleDescending();
  };

  sortYearAscending = () => {
    this.props.actions.sortYearAscending();
  };

  sortYearDescending = () => {
    this.props.actions.sortYearDescending();
  };

  changePerPage = (n) => {};

  renderActions = () => {
    return (
      <div className="action-bar">
        <div className="action" onClick={this.sortTitleAscending}>
          <FontAwesome className="icon large-icon" name="caret-up" />Title
        </div>
        <div className="action" onClick={this.sortTitleDescending}>
          <FontAwesome className="icon large-icon" name="caret-down" />Title
        </div>
        <div className="action" onClick={this.sortYearAscending}>
          <FontAwesome className="icon large-icon" name="caret-up" />Year
        </div>
        <div className="action" onClick={this.sortYearDescending}>
          <FontAwesome className="icon large-icon" name="caret-down" />Year
        </div>
        <div className="action-per-page">
          Movies Per Page --
          <span className="n"> 10 </span>
          <span className="n">20 </span>
          <span className="n">50 </span>
          <span className="n">100 </span>
        </div>
      </div>
    );
  };

  render() {
    if (this.props.moviesData) {
      const moviesData = this.props.moviesData.data.map((movie, index) => {
        if (index % 2 === 0) {
          const movieStars = movie.stars.split(',').map((star, i) => (
            <div key={i} className="movie-star movie-star-alternate">
              {star}
            </div>
          ));

          const movieGenres = movie.genres.split(',').map((genre, i) => (
            <div key={i} className="movie-genre movie-genre-alternate">
              {genre}
            </div>
          ));

          return (
            <div key={index} className="movie-container alternate">
              <div className="movie-header">
                <h1 className="movie-title">
                  {movie.title} ({movie.year})
                </h1>
                <div className="movie-rating movie-rating-alternate">{movie.rating}</div>
              </div>
              <div className="movie-director">Directed By: {movie.director}</div>
              <div className="movie-genres">
                <h2>Genres: {movieGenres}</h2>
              </div>
              <div className="movie-stars">
                <h2>Stars: {movieStars}</h2>
              </div>
              <div className="add-to-cart">
                <Button className="button">Add To Cart</Button>
              </div>
            </div>
          );
        }
        const movieStars = movie.stars.split(',').map((star, i) => (
          <div key={i} className="movie-star">
            {star}
          </div>
        ));

        const movieGenres = movie.genres.split(',').map((genre, i) => (
          <div key={i} className="movie-genre">
            {genre}
          </div>
        ));
        return (
          <div key={index} className="movie-container movie-container-alternate">
            <div className="movie-header">
              <h1 className="movie-title">
                {movie.title} ({movie.year})
              </h1>
              <div className="movie-rating">{movie.rating}</div>
            </div>
            <div className="movie-director">Directed By: {movie.director}</div>
            <div className="movie-genres">
              <h2>Genres: {movieGenres}</h2>
            </div>
            <div className="movie-stars">
              <h2>Stars: {movieStars}</h2>
            </div>
            <div className="add-to-cart">
              <Button className="button">Add To Cart</Button>
            </div>
          </div>
        );
      });
      return (
        <div>
          <h1 className="page-title">
            <FontAwesome name="rocket" />MOVIE LIST PAGE
          </h1>
          <div className="action-bar-container">{this.renderActions()}</div>
          <li className="movies-container">{moviesData}</li>
        </div>
      );
    }
    return <div>Loading...</div>;
  }
}

const mapStateToProps = (state) => {
  console.log('selectMoviesData', selectMoviesData(state));
  console.log('selectSearchMoviesError', selectSearchMoviesError(state));
  return {
    moviesData: selectMoviesData(state),
    error: selectSearchMoviesError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('dispatch', dispatch);
  return {
    actions: bindActionCreators(
      {
        searchMovies,
        sortTitleAscending,
        sortTitleDescending,
        sortYearAscending,
        sortYearDescending,
      },
      dispatch,
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
