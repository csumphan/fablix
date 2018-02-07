import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';

import { loginUser } from './actions';
import { selectUserData, selectUserLoginError } from './selectors';


import LabelInput from '../../components/LabelInput';


import './styles.css';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleTextChange = (field) => (e) => {
    this.setState({[field]: e.target.value});
  };


  handleLogin = (e) => {
    e.preventDefault();

    const cred = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.actions.loginUser(cred);

  }


  render() {
    return (
      <div id="shopping-cart-root">
        <div className='left-column'>
          <div id="cart">
            <div id="cart-header">
              <h2>Your Cart (2)</h2>
            </div>
            <div id="movies">
              <div className="cart-item">
                <p className='cart-movie'>Your Lie in April</p>
                <form>
                  <input className='quantity' type="number"/>
                  <button className='cart-button'>
                    <span className='button-label'>
                      <p>Update</p>
                      <FontAwesome name='edit' />
                    </span>
                  </button>
                  <button className='cart-button remove'>
                    <span className='button-label'>
                      <p>Remove</p>
                      <FontAwesome name='trash' />
                    </span>
                  </button>
                </form>
              </div>
              <div className="cart-item">
                <p className='cart-movie'>Your Lie in April</p>
                <form>
                  <input className='quantity' type="number"/>
                  <button className='cart-button'>
                    <span className='button-label'>
                      <p>Update</p>
                      <FontAwesome name='edit' />
                    </span>
                  </button>
                  <button className='cart-button remove'>
                    <span className='button-label'>
                      <p>Remove</p>
                      <FontAwesome name='trash' />
                    </span>
                  </button>
                </form>
              </div>
              <div id='last-item' className="cart-item">
                <p className='cart-movie'>Your Lie in April</p>
                <form>
                  <input className='quantity' type="number"/>
                  <button className='cart-button'>
                    <span className='button-label'>
                      <p>Update</p>
                      <FontAwesome name='edit' />
                    </span>
                  </button>
                  <button className='cart-button remove'>
                    <span className='button-label'>
                      <p>Remove</p>
                      <FontAwesome name='trash' />
                    </span>
                  </button>
                </form>
              </div>
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

// const mapStateToProps = (state) => {
//   console.log('selectUserData', selectUserData(state));
//   console.log('selectUserLoginError', selectUserLoginError(state));
//   return {
//     userData: selectUserData(state),
//     error: selectUserLoginError(state)
//   }
// };
//
// const mapDispatchToProps = (dispatch) => {
//   console.log('dispatch', dispatch);
//   return {
//     actions: bindActionCreators({ loginUser }, dispatch),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default ShoppingCart;
