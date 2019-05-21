import React, { Component } from 'react';

export default class EditableLink extends Component {
  constructor() {
    super();
    this.state = {
      unsaved: false, key: 0, title: '',
      animation: '', redirect: '',
      created: '', shown: '',
      thumbnail: '',
      newTitle: '', newRedirect: '',
      newShown: '', newThumbnail: '',
      editOption: ''
    }; //prettier-ignore
  }

  componentDidMount() {
    const { title, animation, redirect, created, shown, thumbnail } = this.props.link;
    this.setState({
      key: this.props.id,
      title, animation, redirect, created, shown, thumbnail
    }); //prettier-ignore
  }

  componentWillReceiveProps(newProps) {
    const { title, animation, redirect, created, shown, thumbnail } = newProps.link;
    this.setState({
      title, animation, redirect, created, shown, thumbnail
    }); //prettier-ignore
  }

  handleInput = event => {
    this.setState({ unsaved: true });
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheck = event => {
    this.setState({ unsaved: true });
    this.setState({ [event.target.name]: event.target.checked });
  };

  showSection = event => {
    this.setState({
      editOption: this.state.editOption === event.target.title ? '' : event.target.title
    });
  };

  updateLink = () => {
    const {
      title, animation, redirect, created, shown, thumbnail,
      newTitle, newRedirect, newThumbnail
    } = this.state; //prettier-ignore
    const link = {
      title: newTitle === '' ? title : newTitle,
      animation,
      redirect: newRedirect === '' ? redirect : newRedirect,
      created, shown,
      thumbnail: newThumbnail === '' ? thumbnail : newThumbnail
    }; //prettier-ignore
    const linkObj = { key: this.state.key, link };
    this.setState({ unsaved: false });
    this.props.update(linkObj);
  };

  deleteLink = () => {
    this.props.delete(this.state.key);
  };

  render() {
    return (
      <div className="card link-edit">
        <div className="card-body">
          <div className="linkProp">
            <input
              type="text"
              name="newTitle"
              className="editableInput title"
              placeholder="Title"
              defaultValue={this.state.title}
              onChange={this.handleInput}
            />
            <input
              type="text"
              name="newRedirect"
              className="editableInput redirect"
              placeholder="http://url"
              defaultValue={this.state.redirect}
              onChange={this.handleInput}
            />
          </div>
          <div className="shownSwitch">
            <div className="shown switch-div">
              <input
                type="checkbox"
                id={`shown-${this.state.key}`}
                name="shown"
                checked={this.state.shown}
                onChange={this.handleCheck}
              />
              <div className="checkbox-label">
                <label htmlFor={`shown-${this.state.key}`} />
              </div>
            </div>
          </div>
        </div>
        <div className={'editOption ' + (this.state.editOption === 'Animation' ? 'shown' : '')}>
          <div className="input-group">
            <label htmlFor="animation">Animation: </label>
            <select
              name="animation"
              onChange={this.handleInput}
              value={this.state.animation}
              className="form-input limit-width"
            >
              <option value="none">None</option>
              <option value="bounce">Bounce</option>
              <option value="flash">Flash</option>
              <option value="pulse">Pulse</option>
              <option value="rubberband">RubberBand</option>
              <option value="shake">Shake</option>
              <option value="swing">Swing</option>
              <option value="tada">Tada</option>
              <option value="wobble">Wobble</option>
              <option value="jello">Jello</option>
              <option value="heartbeat">Heartbeat</option>
              <option value="fadein">FadeIn</option>
            </select>
          </div>
        </div>
        <div className={'editOption ' + (this.state.editOption === 'Thumbnail' ? 'shown' : '')}>
          <div className="input-group">
            <label htmlFor="newThumbnail">Thumbnail: </label>
            <input
              type="text"
              name="newThumbnail"
              className="form-input limit-width"
              placeholder="http://url/to/image"
              defaultValue={this.state.thumbnail}
              onChange={this.handleInput}
            />
          </div>
        </div>
        <div className={'editOption ' + (this.state.editOption === 'Delete' ? 'shown' : '')}>
          <span className="message">This will delete the link</span>
          <button className="warning updateLinkBtn" onClick={this.deleteLink}>
            Delete
          </button>
        </div>
        <div className="card-action">
          <div className="editOptions">
            <div className="icon animation" title="Animation" onClick={this.showSection} />
            <div className="icon thumbnail" title="Thumbnail" onClick={this.showSection} />
            <div className="icon delete" title="Delete" onClick={this.showSection} />
          </div>
          <button
            className="updateLinkBtn"
            style={{ display: this.state.unsaved ? 'inline-block' : 'none' }}
            onClick={this.updateLink}
          >
            Update link
          </button>
        </div>
      </div>
    );
  }
}
