import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';

import CartItem from '../../components/CartItem';

import { updateCart } from './actions';
import { selectShoppingCartData, selectShoppingCartError } from './selectors';

import './styles.css';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  changeCount = (movie) => (count) => (e) => {
    e.preventDefault();
    const intCount = Number(count);

    const movieData = {
      movie,
      count: intCount
    };
    this.props.actions.updateCart(movieData);
  }

  render() {
    const movies = this.props.cartData;
    const cartMovies = movies.map((movie, index) => {

      const lastItem = (index + 1 === movies.length) ? 'last-item' : ''
      return (
        <CartItem
          id={lastItem}
          movieName={movie.movie.title}
          count={movie.count}
          updateCount={this.changeCount(movie.movie)}
         />
      );
    });

    return (
      <div id="shopping-cart-root">
        <div className='left-column'>
          <div id="cart">
            <div id="cart-header">
              <h2>Your Cart</h2>
            </div>
            <div id="movies">
              {cartMovies}
            </div>
          </div>
        </div>
        <div className='right-column'>
          <div id="checkout">
            <h1>Summary</h1>
            <div className='checkout-items'>
              <h3>Subtotal</h3>
              <h4>$0.00</h4>
            </div>
            <div className='checkout-items'>
              <h3>Estimated Shipping</h3>
              <h4>$0.00</h4>
            </div>
            <div className='checkout-items'>
              <h3>Estimated Taxes</h3>
              <h4>$0.00</h4>
            </div>
            <div className='checkout-items'>
              <h3>Total</h3>
              <h4>$0.00</h4>
            </div>
            <button id='checkout-button'>
              <p>Checkout</p>
            </button>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartData: selectShoppingCartData(state),
    error: selectShoppingCartError(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ updateCart }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
