import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout } from '../redux/modules/auth';

class Welcome extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  handleLogout = () => {
    this.props.logout();
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <h1>Welcome Page</h1>
        <button
          type="submit"
          className="btn btn-primary mt-4"
          onClick={() => this.handleLogout()}
        >
          Logout
        </button>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { logout }
  )(Welcome)
);
