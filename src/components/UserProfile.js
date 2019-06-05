import React, { Component, Suspense, lazy } from 'react';
import Buttons from './Buttons';
import loadingSvg from '../assets/loading.svg';
import firebase from '../firebase.js';
import '../assets/userProfile.css';
const NotFound = lazy(() => import('./NotFound'));

export default class UserProfile extends Component {
  state = {
    username: this.props.match.params.username,
    name: '',
    avatar: '',
    links: {},
    primaryColor: '',
    secondaryColor: '',
    shadowColor: '',
    buttonType: '',
    backgroundType: '',
    backgroundColor: '',
    backgroundGradient: '',
    backgroundImage: '',
    socialLinks: [],
    notFound: false,
    loaded: false
  };

  componentDidMount() {
    const that = this;
    firebase
      .firestore()
      .collection('users')
      .where('username', '==', this.state.username)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.empty) {
          that.setState({ notFound: true, loaded: true });
        } else {
          let userData = { ...querySnapshot.docs[0].data() };
          let orderedLinks = {};
          Object.keys(userData.links)
            .sort((a, b) => b - a)
            .forEach(key => {
              orderedLinks[key] = userData.links[key];
            });
          document.querySelector('title').innerText = userData.name;
          document.querySelector('link').setAttribute('href', userData.avatar);
          that.setState({ ...userData, links: orderedLinks, loaded: true, uid: 'none' });
        }
      });
  }

  render() {
    if (!this.state.loaded) {
      return (
        <main className='user-profile'>
          <img className='loading' src={loadingSvg} alt='loading' />
        </main>
      );
    }

    if (this.state.notFound) {
      return (
        <Suspense fallback={<p>Not Found</p>}>
          <NotFound />
        </Suspense>
      );
    }

    let backgroundImage = '';
    if (this.state.backgroundType === 'gradient') {
      backgroundImage =
        'linear-gradient(' +
        this.state.gradientDirection +
        ', ' +
        this.state.gradientStartColor +
        ', ' +
        this.state.gradientStopColor +
        ')';
    } else if (this.state.backgroundType === 'image') {
      backgroundImage = 'url("' + this.state.backgroundImage + '")';
    }

    return (
      <main
        className='user-profile'
        style={{
          backgroundColor: this.state.backgroundType === 'color' && this.state.backgroundColor,
          backgroundImage,
          '--primary-color': this.state.primaryColor,
          '--secondary-color': this.state.secondaryColor,
          '--shadow-color': this.state.shadowColor
        }}
      >
        <div className='user'>
          <img src={this.state.avatar} alt='user' />
          <h2>{this.state.name}</h2>
        </div>
        <div className='user-buttons'>
          {Object.entries(this.state.links).map(([key, link]) => {
            return <Buttons link={link} buttonType={this.state.buttonType} key={key} />;
          })}
        </div>
        <div className='user-socialLinks'>
          {Object.entries(this.state.socialLinks).map(([key, link]) => {
            if (link === '' || !link) return null;
            return (
              <a className='user-social' href={link} key={key}>
                <i className={'flaticon ' + key} />
              </a>
            );
          })}
        </div>
      </main>
    );
  }
}
