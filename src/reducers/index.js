import {
  USER_REGISTERED,
  LINKS_UPDATE,
  USER_UPDATE,
  SOCIAL_LINKS_UPDATE,
  THEME_UPDATE
} from './../actions/types';
import { USER_LOGIN, USER_LOGOUT } from '../actions/types';

const DEFAULT_STATE = {
  logedin: false,
  user: null,
  analytics: null,
  success: '',
  error: '',
  message: ''
};

// user: { uid, name, username, email, emailVerified, avatar, links,
//          backgroundType, backgroundValue, primaryColor, accentColor, buttonType }
// analytics: [ visits,
//              linkClicks: [
//                           { id, clicks: { date: 2, date2: 7, date3: 16 }, totalClicks },
//                           { id, clicks: { date: 2, date2: 7, date3: 16 }, totalClicks  },
//                           { id, clicks: { date: 2, date2: 7, date3: 16 }, totalClicks }
//              ]
//            ]
// link: { id, title, animation, redirect, created, shown, thumbnail }
// socialLinks: [ {type: 'facebook', link: 'http://url/'} ]

const rootReducer = (state = DEFAULT_STATE, action) => {
  //console.log('action happned: ', action);
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, logedin: true, user: action.user };
    case USER_REGISTERED:
      return { ...state, user: { ...state.user, username: action.username } };
    case USER_LOGOUT:
      return { ...DEFAULT_STATE };
    case USER_UPDATE:
      return {
        ...state,
        success: true,
        error: false,
        message: action.message,
        user: { ...state.user, ...action.user }
      };
    case LINKS_UPDATE:
      return {
        ...state,
        user: { ...state.user, links: action.links },
        success: true,
        error: false,
        message: action.message
      };
    case SOCIAL_LINKS_UPDATE:
      return {
        ...state,
        user: { ...state.user, socialLinks: action.socialLinks },
        success: true,
        error: false,
        message: action.message
      };
    case THEME_UPDATE:
      return {
        ...state,
        user: { ...state.user, ...action.theme },
        success: true,
        error: false,
        message: action.message
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
