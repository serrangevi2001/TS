/* eslint-disable camelcase */
import moment from 'moment';
import agent from '../../../services/agent';
import {
  CLEAR_ENABLE_USER_ERROR,
  CLEAR_LOGIN_ERROR,
  ENABLE_USER_ERROR,
  ENABLE_USER_PENDING,
  ENABLE_USER_PENDING_ERROR,
  ENABLE_USER_PENDING_SUCCESS,
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_PENDING_ERROR,
  LOGIN_PENDING_SUCCESS,
  LOGIN_SUCCESS,
  SET_LOGGEDIN_PROFILE,
  USER_LOGOUT,
} from './constants';
import { showSnackbarStatus } from '../../core/snackbar/actions';

export const loginUserPending = () => ({
  type: LOGIN_PENDING,
});

export const loginUserPendingError = () => ({
  type: LOGIN_PENDING_ERROR,
});

export const loginUserPendingSuccess = () => ({
  type: LOGIN_PENDING_SUCCESS,
});

export const loginUserSuccess = (email, token, expires) => ({
  type: LOGIN_SUCCESS,
  payload: { email, token, expires },
});

export const logoutUser = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
};

export const loginUserError = (errorMessage) => ({
  type: LOGIN_ERROR,
  payload: { errorMessage },
});

export const clearLoginUserError = () => ({
  type: CLEAR_LOGIN_ERROR,
});

export const enableUserError = (errorMessage) => ({
  type: ENABLE_USER_ERROR,
  payload: { errorMessage },
});

export const enableUserPending = () => ({
  type: ENABLE_USER_PENDING,
});

export const enableUserPendingSuccess = () => ({
  type: ENABLE_USER_PENDING_SUCCESS,
});

export const clearEnableUserError = () => ({
  type: CLEAR_ENABLE_USER_ERROR,
});

export const enableUserPendingError = () => ({
  type: ENABLE_USER_PENDING_ERROR,
});

const setLoggedInProfile = (currentProfile) => ({
    type: SET_LOGGEDIN_PROFILE,
    payload: currentProfile,
  });

export const setTokenDetails = (authData) => {
  const { accessToken, expiresInSeconds, tokenType } = authData;
  const expires = moment().unix() + expiresInSeconds;
  sessionStorage.setItem('token', accessToken);
  // set the expired time as (now + value from server)
  sessionStorage.setItem('expires_in', expires);
  sessionStorage.setItem('token_type', tokenType);
};

export const userLogin = (userName, password) => (dispatch) => {
  dispatch(loginUserPending());
  dispatch(clearLoginUserError());
  agent.Auth.login(userName, password)
    .then((authData) => {
      setTokenDetails(authData);
      console.log("authData:",authData)
      const { accessToken, expiresInDays: expiresInSeconds } = authData;
      agent.Auth.getCurrentUser(accessToken)
        .then((currentUser) => {
          console.log("currentUser:",currentUser)
          dispatch(loginUserPendingSuccess());
          dispatch(setLoggedInProfile(currentUser));
          dispatch(loginUserSuccess(currentUser.email, accessToken, expiresInSeconds));
        })
        .catch((err) => {
          dispatch(loginUserPendingError());
          console.log('Get Current User server error', err);
        });
    })
    .catch(() => {
      dispatch(loginUserPendingError());
      // if (err && err.response) {
      //   const { error } = err.response.body;
      //   dispatch(loginUserError(error));
      // } else {
      //   console.log('User login server error', err);
      // }
      dispatch(loginUserError("Invalid email or password"));
      dispatch(showSnackbarStatus("Invalid email or password"));
    });
};
