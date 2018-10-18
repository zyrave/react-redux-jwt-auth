import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { login } from '../redux/modules/auth';

class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  static defaultProps = {};

  state = {
    username: '',
    password: ''
  };

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/welcome');
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/welcome');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <form onSubmit={this.onSubmit}>
            <h1>Login</h1>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={this.onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { login }
  )(Login)
);
