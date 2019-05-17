import { updateSocialLinks } from './../actions/index';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SocialLink from './SocialLink';

class SocialLinks extends Component {
  state = {
    uid: this.props.uid ? this.props.uid : {},
    socialLinks: this.props.socialLinks ? this.props.socialLinks : {},
    newSocialLink: 'none',
    editied: false,
    dublicateAdd: false
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addLink = () => {
    let socialLinks = this.state.socialLinks;
    if (socialLinks[this.state.newSocialLink] === undefined) {
      socialLinks[this.state.newSocialLink] = '';
      this.setState({ socialLinks, dublicateAdd: false });
      this.props.updateSocialLinks(this.state.uid, socialLinks);
    } else {
      this.setState({ dublicateAdd: true });
    }
  };

  updateLink = (key, link) => {
    let socialLinks = this.state.socialLinks;
    socialLinks[key] = link;
    this.props.updateSocialLinks(this.state.uid, socialLinks);
    this.setState({ socialLinks });
  };

  deleteLink = key => {
    let socialLinks = this.state.socialLinks;
    delete socialLinks[key];
    this.props.updateSocialLinks(this.state.uid, socialLinks);
    this.setState({ socialLinks });
  };

  render() {
    return (
      <div className="card">
        <div className="card-title">
          <h2>Social Links</h2>
        </div>
        <div className="card-body">
          {Object.entries(this.state.socialLinks).map(([key, link]) => {
            return (
              <SocialLink
                key={key}
                link={{ key, link }}
                update={this.updateLink}
                delete={this.deleteLink}
              />
            );
          })}
          <div className="error" style={{ display: this.state.dublicateAdd ? 'block' : 'none' }}>
            The link is already added
          </div>
        </div>
        <div className="card-action">
          <div className="input-group">
            <label htmlFor="newSocialLink">Add new link: </label>
            <select
              name="newSocialLink"
              onChange={this.handleInput}
              className="form-input limit-width"
            >
              <option value="none" default>
                Select one
              </option>
              <option value="facebook">Facebook</option>
              <option value="whatsapp">Whatsapp</option>
              <option value="instagram">Instagram</option>
              <option value="snapchat">Snapchat</option>
              <option value="youtube">Youtube</option>
              <option value="tumblr">Tumblr</option>
              <option value="youtube">Youtube</option>
              <option value="soundcloud">Soundcloud</option>
              <option value="slideshare">Slideshare</option>
              <option value="googledrive">Googledrive</option>
              <option value="twitch">Twitch</option>
              <option value="dribble">Dribble</option>
              <option value="telegram">Telegram</option>
              <option value="github">Github</option>
              <option value="pintrest">Pintrest</option>
              <option value="twitter">Twitter</option>
              <option value="reddit">Reddit</option>
              <option value="kickstarter">Kickstarter</option>
              <option value="linkedin">Linkedin</option>
              <option value="spotify">Spotify</option>
              <option value="behance">Behance</option>
            </select>
            <button className="button" onClick={this.addLink}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSocialLinks: (uid, socialLinks) => dispatch(updateSocialLinks(uid, socialLinks))
  };
};

export default connect(
  ({ user: { uid, socialLinks } }) => ({
    uid,
    socialLinks
  }),
  mapDispatchToProps
)(SocialLinks);
