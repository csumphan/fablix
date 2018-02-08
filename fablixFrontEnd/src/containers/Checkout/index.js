import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';

import NonEditCartItem from '../../components/NonEditCartItem';
import LabelInput from '../../components/LabelInput';

import { buyCart } from '../ShoppingCart/actions';

import { selectShoppingCartData, selectShoppingCartError } from '../ShoppingCart/selectors';

import './styles.css';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      cardNum: '',
      cardExp: '',

    };
  }

  getCartCount = () => {
    const movies = this.props.cartData;
    let count = 0;
    for (let i = 0; i < movies.length; i++) {
      count += movies[i].count;
    }
    return count;
  }

  handleTextChange = (field) => (e) => {
    console.log(e.target.value);
    this.setState({ [field]: e.target.value });
  };

  buyItems = () => {
    console.log('fuck you');
  }


  render() {
    const movies = this.props.cartData;
    const cartMovies = movies.map((movie, index) => {

      const lastItem = (index + 1 === movies.length) ? 'last-item' : ''
      return (
        <NonEditCartItem
          id={lastItem}
          movieName={movie.movie.title}
          movieYear={movie.movie.year}
          movieDirector={movie.movie.director}
          movieRating={movie.movie.rating}
          count={movie.count}
         />
      );
    });

    return (
      <div id="shopping-cart-root">
        <div className='info-left-column'>
          <div id="info-cart">
            <div id="cart-header">
              <h2>Your Cart ({this.getCartCount()})</h2>
            </div>
            <div id="movies">
              {cartMovies}
            </div>
          </div>
        </div>
        <div className='info-right-column'>
          <div id="info-checkout">
            <h1>Customer Billing Information</h1>
            <form onSubmit={this.buyItems} className='customer-form'>
              <div>
                <div className='customer-input-container'>
                  <LabelInput
                    name="user"
                    label="Cardholder First Name"
                    type="text"
                    onChange={this.handleTextChange('firstName')}
                    required
                  />
                </div>
                <div className='customer-input-container'>
                  <LabelInput
                    name="user"
                    label="Cardholder Last Name"
                    type="text"
                    onChange={this.handleTextChange('lastName')}
                    required
                  />
                </div>
                <div className='customer-input-container'>
                  <LabelInput
                    name="credit-card"
                    label="Credit Card Number"
                    onChange={this.handleTextChange('cardNum')}
                    type="number"
                    required
                  />
                </div>

                <div className='customer-input-container'>
                  <LabelInput
                    name="calendar"
                    label="Credit Card Expiration Date"
                    onChange={this.handleTextChange('cardExp')}
                    type="date"
                    required
                  />
              </div>
            </div>
            <button id='customer-checkout-button'>
              <p>Confirm Checkout</p>
            </button>
          </form>
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
    actions: bindActionCreators({ buyCart}, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
