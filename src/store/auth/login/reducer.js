import moment from 'moment';
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_PENDING_SUCCESS,
  LOGIN_PENDING_ERROR,
  CLEAR_LOGIN_ERROR,
  CLEAR_ENABLE_USER_ERROR,
  ENABLE_USER_PENDING_SUCCESS,
  ENABLE_USER_PENDING,
  ENABLE_USER_ERROR,
  ENABLE_USER_PENDING_ERROR,
  SET_LOGGEDIN_PROFILE,
} from './constants';

const initialState = {
  isAuth: false,
  token: null,
  expires: null,
  email: null,
  errorMessage: null,
  isPending: false,
  isEnableUserPending: false,
  enableUserErrorMessage: null,
  profile: {},
};

export default (localState = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const { email, token, expires } = action.payload;
      return {
        ...localState,
        email,
        token,
        expires: moment().unix() + expires,
        isAuth: true,
        errorMessage: null,
        isPending: false,
      };
    }
    case LOGIN_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...localState,
        errorMessage,
        isPending: false,
      };
    }
    case LOGIN_PENDING: {
      return {
        ...localState,
        isPending: true,
      };
    }
    case LOGIN_PENDING_SUCCESS: {
      return {
        ...localState,
        isPending: false,
      };
    }
    case LOGIN_PENDING_ERROR: {
      return {
        ...localState,
        isPending: false,
      };
    }
    case CLEAR_LOGIN_ERROR: {
      return {
        ...localState,
        errorMessage: null,
        //isPending: false,
      };
    }
    case ENABLE_USER_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...localState,
        enableUserErrorMessage: errorMessage,
        isEnableUserPending: false,
      };
    }
    case ENABLE_USER_PENDING: {
      return {
        ...localState,
        isEnableUserPending: true,
      };
    }
    case ENABLE_USER_PENDING_ERROR: {
      return {
        ...localState,
        isEnableUserPending: false,
      };
    }
    case ENABLE_USER_PENDING_SUCCESS: {
      return {
        ...localState,
        isEnableUserPending: false,
      };
    }
    case CLEAR_ENABLE_USER_ERROR: {
      return {
        ...localState,
        enableUserErrorMessage: null,
      };
    }
    case SET_LOGGEDIN_PROFILE: {
      const { displayName, email,firstName,lastName,phone,id,roleName} = action.payload;
      return {
        ...localState,
        profile: {
          ...localState.profile,
          displayName,
          email,
          firstName,
          lastName,
          phone,
          currentUserRoles: roleName,
          UserId:id
        },
      };
    }
    default: {
      return localState;
    }
  }
};
