import { USER_REGISTERED, LINKS_UPDATE, REQUST_ERROR } from './../actions/types';
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

const rootReducer = (state = DEFAULT_STATE, action) => {
  console.log('action happned: ', action);
  switch (action.type) {
    case REQUST_ERROR:
      return { ...state, success: false, error: true, message: action.message };
    case USER_LOGIN:
      return { ...state, logedin: true, user: action.user };
    case USER_REGISTERED:
      return { ...state, user: { ...state.user, username: action.username } };
    case USER_LOGOUT:
      return { ...DEFAULT_STATE };
    case LINKS_UPDATE:
      return {
        ...state,
        user: { ...state.user, links: action.links },
        success: true,
        message: action.message
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
