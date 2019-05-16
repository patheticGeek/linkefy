/* eslint-disable */
import firebase from 'firebase/app';
import firestore from 'firebase/firestore';
import auth from 'firebase/auth';
import storage from 'firebase/storage';

const config = {
  apiKey: 'AIzaSyA14hPpGo27Q6DWMvo-Y42eMrBbswuyQPA',
  authDomain: 'linkefy-14.firebaseapp.com',
  databaseURL: 'https://linkefy-14.firebaseio.com',
  projectId: 'linkefy-14',
  storageBucket: 'linkefy-14.appspot.com',
  messagingSenderId: '312256927027'
};
firebase.initializeApp(config);

export const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/signin',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

export default firebase;
