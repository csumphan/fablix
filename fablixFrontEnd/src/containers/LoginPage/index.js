import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';

import { loginUser } from './actions';
import { selectUserData, selectUserLoginError } from './selectors';

import LabelInput from '../../components/LabelInput';

import './styles.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleTextChange = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  };

  handleLogin = (e) => {
    e.preventDefault();

    const cred = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.actions.loginUser(cred);
  };

  render() {
    return (
      <div id="container-root">
        <div id="container">
          <div id="intro-container">
            <h1 id="app-title">Fablix</h1>
            <p id="app-one-liner">
              The worlds most popular and authoritative source for movie, TV and celebrity content!
            </p>
            <div id="app-description">
              <div className="description-container">
                <div className="icon-container">
                  <FontAwesome className="description-icon" name="film" />
                </div>

                <p>Browse through a catalog of over a million movies</p>
              </div>
              <div className="description-container">
                <div className="icon-container">
                  <FontAwesome className="description-icon" name="bolt" />
                </div>
                <p>Purchase the latest movies instantly</p>
              </div>
              <div className="description-container">
                <div className="icon-container">
                  <FontAwesome className="description-icon" name="star-half-o" />
                </div>
                <p>Find the best movies using our advanced rating system</p>
              </div>
            </div>
          </div>
          <div id="login-container">
            <h2 className="signin-header">Sign In</h2>
            <form className="form-container" onSubmit={this.handleLogin}>
              <LabelInput
                name="user"
                label="Email"
                onChange={this.handleTextChange('email')}
                type="email"
                required
              />
              <LabelInput
                name="key"
                label="Password"
                onChange={this.handleTextChange('password')}
                type="password"
                required
              />
              <p className="error-msg">{this.props.error}</p>
              <input className="button" type="submit" value="Sign In" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('selectUserData', selectUserData(state));
  console.log('selectUserLoginError', selectUserLoginError(state));
  return {
    userData: selectUserData(state),
    error: selectUserLoginError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('dispatch', dispatch);
  return {
    actions: bindActionCreators({ loginUser }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
