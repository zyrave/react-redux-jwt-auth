import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { signup } from '../redux/modules/auth';

class Signup extends Component {
  static propTypes = {
    signup: PropTypes.func.isRequired
  };

  static defaultProps = {};

  state = {
    username: '',
    password: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    this.props
      .signup(this.state)
      .then(
        () => this.props.history.push('/login'),
        err => {
          debugger;
        }
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <form onSubmit={this.onSubmit}>
            <h1>Sign up!</h1>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-lg">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { signup }
  )(Signup)
);
