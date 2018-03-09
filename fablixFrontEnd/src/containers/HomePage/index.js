import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import Autocomplete from 'react-autocomplete';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Elasticlunr from 'elasticlunr';

import LabelInput from '../../components/LabelInput';

import { searchFullTextMovies, emptyMovieData } from '../MovieListPage/actions';
import { selectMoviesData, selectSearchMoviesError, selectStarsData } from '../MovieListPage/selectors';

import './styles.css';
//[{movies: [] }, {stars: []}]

const menuStyle = {
  boxSizing: 'border-box',
  borderRadius: '3px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '10px',
  fontSize: '90%',
  position: 'absolute',
  overflow: 'auto',
  maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
  width: '322px',
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      loading: false,
    };

    this.requestTimeout = null;
  }

  onComponentWillMount() {
    this.props.actions.emptyMovieData();
    if (this.state.value.length < 3) {
      console.log('empty movie data')

    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const { title, director, year, star } = this.state;

    this.props.history.push('/MovieList');
    // }
  };

  onAutoCompleteChange = (event, value) => {
    clearTimeout(this.requestTimeout)
    this.setState({
      value
    })
    this.filterAutoComplete()

    if (value.length >= 3) {
      this.requestTimeout = setTimeout(() => {
        console.log('BEGIN AUTOCOMPLETE SEARCH AFTER 300MS')
        const searchMovieTerms = {
          type: 'movie',
          query: value.split(' ').join('+')
        }

        const searchStarTerms = {
          type: 'star',
          query: value.split(' ').join('+')
        }

        this.props.actions.searchFullTextMovies(searchStarTerms)
        this.props.actions.searchFullTextMovies(searchMovieTerms)
      }, 300)
    }
    else {
      // this.props.actions.emptyMovieData();
    }
  }

  filterAutoComplete = () => {
    const movieIndex = Elasticlunr(function() {
      this.addField('title')
    })
    console.log('this.props.moviesData', this.props.moviesData)
    for (let i = 0; i < this.props.moviesData.data.length; i++) {
      console.log('add movie', this.props.moviesData.data[i])
      movieIndex.addDoc(this.props.moviesData.data[i])
    }

    console.log('full text search')
    console.log(movieIndex.search('the n'))
  }

  getAutoCompleteItems = () => {
    if (this.props.moviesData && this.props.starsData) {
      return [{header: 'Movies'}, ...this.props.moviesData.data, {header: 'Stars'}, ...this.props.starsData.data]
    }
    else {
      return [{header: 'Movies'}, {header: 'Stars'}]
    }
  }

  getAutoCompleteLabel = (item) => {
    if (item.name) {
      return item.name
    }
    else if (item.title) {
      return item.title
    }
  }

  render() {
    return (
      <div className="home-container">
        <div className="full-text-search-container">
          <h1 className="redirects-title">Fablix</h1>
          <form onSubmit={this.onFormSubmit}>
            <div className='search-bar-container'>
              <Autocomplete
                inputProps={{
                  className: 'autocomplete-field'
                }}
                menuStyle={menuStyle}
                autoHighlight={false}
                value={this.state.value}
                items={this.getAutoCompleteItems()}
                getItemValue={this.getAutoCompleteLabel}
                renderItem={(item, isHighlighted) => {
                  if (item.header) {
                    return (
                      <div className='autocomplete-header'>
                        {item.header}
                      </div>
                    )
                  }
                  else {
                    if (item.title) {
                      return (
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                          {item.title}
                        </div>
                      )
                    }
                    return (
                      <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.name}
                      </div>
                    )
                  }
                  }
                }
                onChange={this.onAutoCompleteChange}
                onSelect={(value, state) => {
                  this.setState({value})
                }}
              />
              <button type='submit' className='buttons-container'>
                <FontAwesome className="icon" name="search" size='2x' />
              </button>
            </div>
          </form>

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
  return {
    moviesData: selectMoviesData(state),
    starsData: selectStarsData(state),
    error: selectSearchMoviesError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        searchFullTextMovies,
        emptyMovieData
      },
      dispatch,
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
