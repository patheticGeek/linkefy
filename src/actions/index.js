import {
  USER_LOGIN,
  USER_REGISTERED,
  USER_LOGOUT,
  LINKS_UPDATE,
  USER_UPDATE,
  SOCIAL_LINKS_UPDATE,
  THEME_UPDATE
} from './types.js';
import firebase from '../firebase.js';

export const login = user => dispatch => {
  return firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        const {
          name, avatar, email, username, links,
          emailVerified,
          primaryColor,
          secondaryColor,
          buttonType,
          backgroundType,
          backgroundColor,
          backgroundGradient,
          backgroundImage,
          socialLinks
        } = doc.data(); //prettier-ignore
        dispatch({ type: USER_LOGIN, user: { 
          uid: user.uid, name, avatar, 
          email, username, links, emailVerified,
          primaryColor, secondaryColor,
          buttonType, backgroundType,
          backgroundColor, backgroundGradient,
          backgroundImage, socialLinks }
        }); //prettier-ignore
      } else {
        const { name, email, avatar, uid, emailVerified } = user;
        firebase.firestore().collection('users').doc(uid).set({
          name, avatar, email, username: '', links: [], emailVerified,
          primaryColor: '#3d3d3d',
          secondaryColor: '#fff',
          shadowColor: '#3d3d3d4d',
          buttonType: 'solid',
          backgroundType: 'color',
          backgroundColor: '#fff',
          backgroundGradient: '',
          backgroundImage: '', socialLinks: []
          }); //prettier-ignore
        dispatch({
          type: USER_LOGIN,
          user: {uid, name, avatar, email, username: '', links: [], emailVerified,
          primaryColor: '#3d3d3d',
          secondaryColor: '#fff',
          shadowColor: '#3d3d3d4d',
          buttonType: 'solid',
          backgroundType: 'color',
          backgroundColor: '#fff',
          backgroundGradient: '',
          backgroundImage: '', socialLinks: []}
        }); //prettier-ignore
      }
    });
};

export const logout = () => dispatch => {
  return firebase
    .auth()
    .signOut()
    .then(function() {
      dispatch({ type: USER_LOGOUT });
    });
};

export const register = (uid, username) => dispatch => {
  return firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .update({ username })
    .then(function() {
      dispatch({ type: USER_REGISTERED, username });
    }); // prettier-ignore
};

export const updateLinks = (uid, links) => dispatch => {
  return firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .update({ links })
    .then(function() {
      dispatch({ type: LINKS_UPDATE, links, message: 'Links updated' });
    });
};

export const updateUser = (uid, user) => dispatch => {
  return firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .update({ ...user })
    .then(function() {
      dispatch({ type: USER_UPDATE, message: 'Profile updated', user });
      setTimeout(() => dispatch({ type: 'reset' }), 3500);
    });
};

export const updateSocialLinks = (uid, socialLinks) => dispatch => {
  return firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .update({ socialLinks })
    .then(function() {
      dispatch({ type: SOCIAL_LINKS_UPDATE, message: 'Social links updated', socialLinks });
      setTimeout(() => dispatch({ type: 'reset' }), 3500);
    });
};

export const updateTheme = (uid, theme) => dispatch => {
  return firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .update({ ...theme })
    .then(function() {
      dispatch({ type: THEME_UPDATE, message: 'Theme updated', theme });
      setTimeout(() => dispatch({ type: 'reset' }), 3500);
    });
};
