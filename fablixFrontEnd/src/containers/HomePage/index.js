import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import LabelInput from '../../components/LabelInput';

import { searchMovies } from '../MovieListPage/actions';
import { selectMoviesData, selectSearchMoviesError } from '../MovieListPage/selectors';

import './styles.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      director: '',
      year: '',
      star: '',
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const { title, director, year, star } = this.state;

    let searchTerms = {};

    if (title) {
      searchTerms.title = title.split(' ').join('+');
    }

    if (director) {
      searchTerms.director = director.split(' ').join('+');
    }

    if (year) {
      searchTerms.year = year;
    }

    if (star) {
      searchTerms.star = star.split(' ').join('+');
    }

    // if (Object.keys(searchTerms).length > 0) {
    this.props.actions.searchMovies(searchTerms);
    console.log(this.props);
    this.props.history.push('/MovieList');
    // }
  };

  render() {
    return (
      <div className="home-container">
        <div className="redirects-container">
          <h1 className="redirects-title">Fablix</h1>
          <div className="buttons-container">
            <Link to="/Search" className="redirect">
              <FontAwesome className="icon" name="search" />
              Search
            </Link>
            <Link to="/Browse" className="redirect">
              <FontAwesome className="icon" name="eye" />
              Browse
            </Link>
          </div>
        </div>
      </div>
    );
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
      },
      dispatch,
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
