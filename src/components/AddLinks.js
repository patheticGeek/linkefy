import { logout, updateLinks } from './../actions/index';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditableLink from './EditableLink';

class AddLinks extends Component {
  // links: { id, title, animation, redirect, created, shown, thumbnail }
  state = {
    uid: '',
    links: {},
    linkRedirect: '',
    linkTitle: '',
    linkThumbnail: '',
    linkAnimation: 'none',
    titleEmpty: false,
    redirectEmpty: false
  };

  componentDidMount() {
    let orderedLinks = {};
    Object.keys(this.props.user.links)
      .sort((a, b) => b - a)
      .forEach(key => {
        orderedLinks[key] = this.props.user.links[key];
      });
    this.setState({ uid: this.props.user.uid, links: orderedLinks });
  }

  componentWillReceiveProps(newProps) {
    if (this.state.links !== newProps.user.links) {
      let orderedLinks = {};
      Object.keys(newProps.user.links)
        .sort((a, b) => b - a)
        .forEach(key => {
          orderedLinks[key] = newProps.user.links[key];
        });
      this.setState({ links: orderedLinks });
    }
  }

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createNewLink = () => {
    this.setState({
      titleEmpty: this.state.linkTitle === '',
      redirectEmpty: this.state.linkRedirect === ''
    });
    if (this.state.linkTitle !== '' && this.state.linkRedirect !== '') {
      const created = new Date(new Date().toString().split('GMT')[0] + ' UTC')
        .toISOString()
        .split('.')[0]
        .replace('T', ' ');
      const timestamp = new Date().getTime();
      let redirect = this.state.linkRedirect;
      if (!redirect.includes('https://') & !redirect.includes('http://')) {
        redirect = 'https://' + redirect;
      }
      const newLink = {
        title: this.state.linkTitle,
        animation: this.state.linkAnimation,
        redirect,
        created,
        shown: true,
        thumbnail: this.state.linkThumbnail
      };
      let links = this.state.links;
      links[timestamp] = newLink;
      let orderedLinks = {};
      Object.keys(links)
        .sort((a, b) => b - a)
        .forEach(key => {
          orderedLinks[key] = links[key];
        });
      this.setState({ links: orderedLinks });
      this.props.updateLinks(this.state.uid, orderedLinks);
    }
  };

  compareMaps(map1, map2) {
    for (var key in map1) {
      if (map1[key] !== map2[key]) {
        return false;
      }
    }
    return true;
  }

  updateLink = linkObj => {
    if (!this.compareMaps(linkObj.link, this.state.links[linkObj.key])) {
      let links = this.state.links;
      links[linkObj.key] = linkObj.link;
      this.setState({ links });
      this.props.updateLinks(this.state.uid, links);
    }
  };

  deleteLink = linkKey => {
    let links = this.state.links;
    delete links[linkKey];
    this.setState({ links });
    this.props.updateLinks(this.state.uid, links);
  };

  render() {
    return (
      <main className='addLinks'>
        <div className='card'>
          <div className='card-title'>
            <h1 className={'animated ' + this.state.linkAnimation}>Add link</h1>
            <div className='placeholder' />
          </div>
          <div className='card-body'>
            <div className='input-group'>
              <label htmlFor='linkText'>Title: </label>
              <input
                type='text'
                name='linkTitle'
                className={this.state.titleEmpty ? 'form-input limit-width error' : 'form-input limit-width'}
                placeholder='Title'
                onChange={this.handleInput}
              />
            </div>
            <div className='input-group'>
              <label htmlFor='linkText'>URL: </label>
              <input
                type='text'
                name='linkRedirect'
                className={
                  this.state.redirectEmpty ? 'form-input limit-width error' : 'form-input limit-width'
                }
                placeholder='http://url'
                onChange={this.handleInput}
              />
            </div>
            <div className='input-group'>
              <label htmlFor='linkAnimation'>Animation: </label>
              <select
                name='linkAnimation'
                onChange={this.handleInput}
                defaultValue={this.state.linkAnimation}
                className='form-input limit-width'
              >
                <option value='none'>None</option>
                <optgroup label='Attention Seekers'>
                  <option value='bounce'>bounce</option>
                  <option value='flash'>flash</option>
                  <option value='pulse'>pulse</option>
                  <option value='rubberBand'>rubberBand</option>
                  <option value='shake'>shake</option>
                  <option value='swing'>swing</option>
                  <option value='tada'>tada</option>
                  <option value='wobble'>wobble</option>
                  <option value='jello'>jello</option>
                  <option value='heartBeat'>heartBeat</option>
                </optgroup>
                <optgroup label='Bouncing Entrances'>
                  <option value='bounceIn'>bounceIn</option>
                  <option value='bounceInDown'>bounceInDown</option>
                  <option value='bounceInLeft'>bounceInLeft</option>
                  <option value='bounceInRight'>bounceInRight</option>
                  <option value='bounceInUp'>bounceInUp</option>
                </optgroup>
                <optgroup label='Zoom Entrances'>
                  <option value='zoomIn'>zoomIn</option>
                  <option value='zoomInDown'>zoomInDown</option>
                  <option value='zoomInLeft'>zoomInLeft</option>
                  <option value='zoomInRight'>zoomInRight</option>
                  <option value='zoomInUp'>zoomInUp</option>
                </optgroup>
                <optgroup label='Specials'>
                  <option value='jackInTheBox'>jackInTheBox</option>
                  <option value='rollIn'>rollIn</option>
                </optgroup>
              </select>
            </div>
            <button className='button primary right' onClick={this.createNewLink}>
              Add
            </button>
          </div>
        </div>
        <div className='created-links'>
          {this.compareMaps(this.state.links, {}) ? (
            <div className='addLinks-message'>No links yet, start adding links!</div>
          ) : null}
          {Object.entries(this.state.links).map(([key, link]) => {
            return (
              <EditableLink
                id={key}
                link={link}
                key={key}
                update={this.updateLink}
                delete={this.deleteLink}
              />
            );
          })}
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    updateLinks: (uid, links) => dispatch(updateLinks(uid, links))
  };
};

export default connect(
  ({ user }) => ({
    user
  }),
  mapDispatchToProps
)(AddLinks);
