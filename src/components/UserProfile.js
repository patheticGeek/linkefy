import React, { Component } from 'react';

export default class UserProfile extends Component {
  render() {
    return (
      <div>
        <h1>User prodile{console.log(this.props)}</h1>
      </div>
    );
  }
}
