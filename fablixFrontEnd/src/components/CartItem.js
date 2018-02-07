import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import './LabelInputStyles.css'

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.count
    };
  }

  onFocus = () => {
    this.setState({selected: true});
  }

  onBlur = () => {
    this.setState({selected: false});
  }

  onChange = (e) => {
    this.setState({count: e.target.value});
  }

  render() {

    const color = this.state.selected ? "selected" : "";

    return (
      <div id={this.props.id} className="cart-item">
        <p className='cart-movie'>{this.props.movieName}</p>
        <form onSubmit={this.props.updateCount(this.state.count)}>
          <input onChange={this.onChange} className='quantity' type="number" value={this.state.count} />
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
    );
  }
}

export default CartItem;
