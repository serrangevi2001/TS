/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import agent from '../../../services/agent';
import { getToken, modifyReviewerList, modifyRolesList } from '../../../helpers/common';
import {
  CLEAR_USER_ERROR,
  CLOSE_CREATE_USER_MODAL,
  CREATE_USER_ERROR,
  CREATE_USER_PENDING,
  CREATE_USER_SUCCESS,
  OPEN_CREATE_USER_MODAL,
  SET_INITIAL_STATE,
  SET_ROLES_LIST_ASYNC,
  SET_USERS_LIST,
  SET_USERS_PENDING,
} from './constants';
import { clearForm } from '../../core/form/actions';
import { showSnackbarStatus } from '../../core/snackbar/actions';

export const createUserPending = () => ({
  type: CREATE_USER_PENDING,
});

export const createUserSuccess = () => ({
  type: CREATE_USER_SUCCESS,
});

export const createUserError = (errorMessage) => ({
  type: CREATE_USER_ERROR,
  payload: { errorMessage },
});

export const clearCreateUserError = () => ({
  type: CLEAR_USER_ERROR,
});

export const setUserFormInitialState = () => ({
  type: SET_INITIAL_STATE,
});

export const openCreateUserModal = () => ({
  type: OPEN_CREATE_USER_MODAL,
});

export const closeCreateUserModal = () => ({
  type: CLOSE_CREATE_USER_MODAL,
});

export const setUsersPending = () => ({
  type: SET_USERS_PENDING,
});

const setUsersList = (usersOdata) => ({
  type: SET_USERS_LIST,
  payload: { usersOdata },
});


export const getUsersList = (page, PageSize, searchFirstName, searchLastName, searchDisplayName, searchReviewUser, searchCreatedTimeStamp, searchUserName, searchPhone,searchRole) => (dispatch) => {
  dispatch(setUsersPending());
  getToken(dispatch).then((accessToken) => {
    agent.User.getUsers(accessToken, page, PageSize, searchFirstName, searchLastName, searchDisplayName, searchReviewUser, searchCreatedTimeStamp, searchUserName, searchPhone,searchRole)
      .then((usersList) => {
        console.log("usersList:", usersList)
        dispatch(setUsersList(usersList));
      })
      .catch((err) => {
        console.log('getUsers server error', err);
        // dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
      });
  });
};

export const createUser = () => (dispatch, getState) => {
  const currentState = getState();
  const { formAddUser } = currentState && currentState.form;

  if (!formAddUser) {
    dispatch(createUserError('Please fill required details.'));
    return;
  }

  dispatch(createUserPending());
  dispatch(clearCreateUserError());
  getToken(dispatch).then((accessToken) => {
    agent.User.createUser(accessToken, formAddUser)
      .then(() => {
        dispatch(createUserSuccess());
        dispatch(clearForm());
        dispatch(closeCreateUserModal());
        dispatch(getUsersList());
        dispatch(showSnackbarStatus('User created successfully'));
      })
      .catch((err) => {
        if (err && err.response) {
          dispatch(createUserError(err && err.response && err.response.text));
          return;
        }
        console.log('Create user server error', err);
        dispatch(clearForm());
        dispatch(closeCreateUserModal());
        dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
      });
  });
};

export const getReviewerUserIDAsync = (searchValue, callback) => (dispatch) => {
  getToken(dispatch).then((accessToken) => {
    console.log("accessToken:", accessToken)
    agent.User.getReviewerUserList(accessToken, searchValue)
      .then((ReviewerList) => {
        console.log("ReviewerList:", ReviewerList)
        const { value } = ReviewerList;
        const ReviewerUserIDList = modifyReviewerList(value);
        console.log("ReviewerUserIDList:", ReviewerUserIDList)
        callback && callback(ReviewerUserIDList);
      })
      .catch((err) => {
        console.log('getReviewerUserIDAsync server error', err);
        dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
        callback && callback();
      });

  })
}
export const getRoleAsyncSelect = (searchValue, callback) => (dispatch) => {
  getToken(dispatch).then((accessToken) => {
    console.log("accessToken:", accessToken)
    agent.User.getRoleList(accessToken, searchValue)
      .then((RoleList) => {
        console.log("RoleList:", RoleList)
        const { value } = RoleList;
        const RolesList = modifyRolesList(value);
        console.log("RolesList:", RolesList)
        callback && callback(RolesList);
      })
      .catch((err) => {
        console.log('getRoleAsyncSelect server error', err);
        dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
        callback && callback();
      });

  })
}