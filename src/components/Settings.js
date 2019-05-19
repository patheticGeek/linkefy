import { logout, updateUser, updateTheme } from './../actions/index';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../firebase.js';
import FileUploader from 'react-firebase-file-uploader';
import '../assets/userProfile.css';
import SocialLinks from './SocialLinks';
import ThemeSettings from './ThemeSettings';

class Settings extends Component {
  state = {
    uid: '',
    username: '',
    name: '',
    avatar: '',
    avatarUploading: false,
    avtarProgress: false,
    avatarError: false,
    userNotUpdated: false
  };

  componentDidMount() {
    const user = { ...this.props.user };
    this.setState({ ...user });
  }

  handleInput = event => {
    if (
      event.target.name === 'username' ||
      event.target.name === 'name' ||
      event.target.name === 'avatar'
    ) {
      this.setState({ [event.target.name]: event.target.value, userNotUpdated: true });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  handleCheck = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  updateUser = () => {
    if (this.state.userNotUpdated) {
      const { uid, username, avatar, name } = this.state;
      this.props.updateUser(uid, { username, avatar, name });
      this.setState({ userNotUpdated: false });
    }
  };

  handleAvatarUploadStart = () =>
    this.setState({ avatarUploading: true, avatarProgress: 0, avatarError: false });

  handleAvatarProgress = avatarProgress => this.setState({ avatarProgress });

  handleAvatarUploadError = error => {
    this.setState({ avatarUploading: false, avatarError: true });
  };

  handleAvatarUploadSuccess = filename => {
    this.setState({
      avatar: filename,
      avatarProgress: 100,
      avatarUploading: false,
      avatarError: false
    });
    firebase
      .storage()
      .ref('avatar')
      .child(filename)
      .getDownloadURL()
      .then(avatar => this.setState({ avatar, userNotUpdated: true }));
  };

  render() {
    return (
      <main className="settings">
        <div className="card">
          <div className="card-title">
            <h2>User Profile</h2>
          </div>
          <div className="card-body">
            <div className="input-group">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="username"
                className="form-input limit-width"
                placeholder="Your username"
                defaultValue={this.state.username}
                onChange={this.handleInput}
              />
            </div>

            <div className="input-group">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                name="name"
                className="form-input limit-width"
                placeholder="Your name"
                defaultValue={this.state.name}
                onChange={this.handleInput}
              />
            </div>

            <div className="avatar-settings">
              <img src={this.state.avatar} className="avatar" alt="user" />
              <div className="edit">
                <label htmlFor="avatar">Avatar: </label>
                <div className="uploadButtonWrapper">
                  <button>Upload new image</button>
                  <FileUploader
                    accept="image/png,image/jpeg"
                    name="avatar"
                    filename={this.state.uid}
                    storageRef={firebase.storage().ref('avatar')}
                    onUploadStart={this.handleAvatarUploadStart}
                    onUploadError={this.handleAvatarUploadError}
                    onUploadSuccess={this.handleAvatarUploadSuccess}
                    onProgress={this.handleAvatarProgress}
                  />
                </div>
                {this.state.avatarUploading ? (
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: this.state.avatarProgress + '%' }}
                    />
                  </div>
                ) : null}
                {this.state.avatarError ? (
                  <div className="error-text">Cannot upload avatar</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="card-action">
            {this.state.userNotUpdated && (
              <button className="primary" onClick={this.updateUser}>
                Update profile
              </button>
            )}
            <button className="warning" onClick={this.props.logout}>
              Logout
            </button>
          </div>
        </div>
        <ThemeSettings />
        <SocialLinks />
      </main>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    updateUser: (uid, user) => dispatch(updateUser(uid, user)),
    updateTheme: (uid, theme) => dispatch(updateTheme(uid, theme))
  };
};

export default connect(
  ({ user }) => ({
    user
  }),
  mapDispatchToProps
)(Settings);
