import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions';
import { Redirect } from 'react-router-dom';
import firebase, { uiConfig } from '../firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import '../assets/signin.css';

class Signin extends Component {
  state = { username: '', notAvail: false };
  componentDidMount() {
    document.body.classList.toggle('home');
  }
  componentWillUnmount() {
    document.body.classList.toggle('home');
  }

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  registerUser = () => {
    const username = this.state.username;
    const that = this;
    if (
      this.state.username === '' ||
      this.state.username === 'about' ||
      this.state.username === 'contact' ||
      this.state.username === 'privacy-policy'
    ) {
      this.setState({ notAvail: true });
    } else {
      let taken;
      firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get()
        .then(function(querySnapshot) {
          taken = !querySnapshot.empty;
          that.setState({ notAvail: taken });
          if (!taken) {
            that.props.register(that.props.user.uid, username);
          }
        })
        .catch(function(error) {
          console.log('Error getting documents: ', error);
        });
    }
  };

  render() {
    if (this.props.logedin && this.props.user.username !== '') {
      return <Redirect to="/admin" />;
    }
    if (this.props.logedin && this.props.user.username === '') {
      return (
        <main className="signin">
          <div className="brand-logo">
            <img src="./icon_512.png" alt="logo" />
            <span>
              <h2>Linkefy</h2>
            </span>
          </div>
          <div className="card signin">
            <div className="card-title">Set a username</div>
            <div className="card-body">
              <input
                type="text"
                name="username"
                className="form-input"
                placeholder="Username"
                onChange={this.handleInput}
              />
              {this.state.notAvail ? <div className="error">Username not available.</div> : null}
              <button className="button center" onClick={this.registerUser}>
                Set username
              </button>
            </div>
          </div>
        </main>
      );
    }
    return (
      <main className="signin">
        <div className="brand-logo">
          <img src="./icon_512.png" alt="logo" />
          <span>
            <h2>Linkefy</h2>
          </span>
        </div>
        <div className="card signin">
          <div className="card-title">Continue with</div>
          <div className="card-body">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          </div>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: (uid, username) => dispatch(register(uid, username))
  };
};

export default connect(
  ({ logedin, user }) => ({
    logedin,
    user
  }),
  mapDispatchToProps
)(Signin);
