import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import { Button } from 'reactstrap';

import { Link } from 'react-router-dom';

import './styles.css';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  render() {
    const items = [
      { icon: 'home', name: 'Home' },
      { icon: 'search', name: 'Search' },
      { icon: 'eye', name: 'Browse' },
      { icon: 'shopping-cart', name: 'Cart' },
    ];

    const navItems = items.map((item, index) => {
      const { icon, name } = item;
      const href = `/${name}`;
      console.log(index);
      console.log(this.state.activeIndex);

      if (index === this.state.activeIndex) {
        return (
          <Link
            key={index}
            to={href}
            onClick={() => this.setState({ activeIndex: index })}
            className="nav-item nav-item-active"
          >
            <FontAwesome className="icon" name={icon} />
            {name}
          </Link>
        );
      }
      return (
        <Link
          key={index}
          to={href}
          onClick={() => this.setState({ activeIndex: index })}
          className="nav-item"
        >
          <FontAwesome className="icon" name={icon} />
          {name}
        </Link>
      );
    });

    return <div id="navbar-container">{navItems}</div>;
  }
}

export default connect(null, null)(Navigation);
