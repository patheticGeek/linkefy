import React, { Component } from 'react';

export default class SocialLink extends Component {
  state = {
    link: this.props.link.link ? this.props.link.link : '',
    key: this.props.link.key ? this.props.link.key : '',
    edited: false
  };

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
      edited: true
    });
  };

  updateLink = () => {
    this.setState({ edited: false });
    this.props.update(this.state.key, this.state.link);
  };

  deleteLink = () => {
    this.props.delete(this.state.key);
  };

  render() {
    return (
      <div className="input-group">
        <label htmlFor="link">{this.state.key}: </label>
        <input
          type="text"
          name="link"
          className="form-input limit-width"
          placeholder="http://url (Keep empty to not show)"
          defaultValue={this.state.link}
          onChange={this.handleInput}
        />
        <button
          className="primary"
          onClick={this.updateLink}
          style={{
            display: this.state.edited ? 'inline-block' : 'none'
          }}
        >
          Update
        </button>
        <button
          className="primary"
          onClick={this.deleteLink}
          style={{
            display: this.state.link === '' ? 'inline-block' : 'none'
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}
