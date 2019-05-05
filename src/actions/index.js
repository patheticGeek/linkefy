import { USER_LOGIN, USER_REGISTERED, USER_LOGOUT, LINKS_UPDATE, REQUST_ERROR } from './types.js';
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
    })
    .catch(function(error) {
      console.log(error);
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
    })
    .catch(error => {
      console.log('error', error);
      dispatch({ type: REQUST_ERROR, message: 'Cannot update links' });
    });
};
