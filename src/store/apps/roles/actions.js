/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import agent from '../../../services/agent';
import { getToken, modifyRolesList } from '../../../helpers/common';
import {
  CLEAR_ROLE_ERROR,
  CLOSE_CREATE_ROLE_MODAL,
  CREATE_ROLE_ERROR,
  CREATE_ROLE_PENDING,
  CREATE_ROLE_SUCCESS,
  OPEN_CREATE_ROLE_MODAL,
  SET_INITIAL_STATE,
  SET_ROLES_LIST,
  SET_ROLES_PENDING,
} from './constants';
import { clearForm } from '../../core/form/actions';
import { showSnackbarStatus } from '../../core/snackbar/actions';

export const createRolePending = () => ({
  type: CREATE_ROLE_PENDING,
});

export const createRoleSuccess = () => ({
  type: CREATE_ROLE_SUCCESS,
});

export const createRoleError = (errorMessage) => ({
  type: CREATE_ROLE_ERROR,
  payload: { errorMessage },
});

export const clearCreateRoleError = () => ({
  type: CLEAR_ROLE_ERROR,
});

export const setUserFormInitialState = () => ({
  type: SET_INITIAL_STATE,
});

export const openCreateRoleModal = () => ({
  type: OPEN_CREATE_ROLE_MODAL,
});

export const closeCreateRoleModal = () => ({
  type: CLOSE_CREATE_ROLE_MODAL,
});

export const setRolesPending = () => ({
  type: SET_ROLES_PENDING,
});

const setRolesList = (rolesOdata) => ({
  type: SET_ROLES_LIST,
  payload: { rolesOdata },
});

export const getRolesList = () => (dispatch) => {
  dispatch(setRolesPending());
  getToken(dispatch).then((accessToken) => {
    agent.Role.getRoles(accessToken)
      .then((rolesList) => {
        console.log("rolesList:",rolesList)
        dispatch(setRolesList(rolesList));
      })
      .catch((err) => {
        console.log('getRoles server error', err);
        dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
      });
  });
};

export const createRole = () => (dispatch, getState) => {
  const currentState = getState();
  const { formAddRole } = currentState && currentState.form;

  if (!formAddRole) {
    dispatch(createRoleError('Please fill required details.'));
    return;
  }

  dispatch(createRolePending());
  dispatch(clearCreateRoleError());
  getToken(dispatch).then((accessToken) => {
    agent.Role.createRole(accessToken, formAddRole)
      .then(() => {
        dispatch(createRoleSuccess());
        dispatch(clearForm());
        dispatch(closeCreateRoleModal());
        dispatch(getRolesList());
        dispatch(showSnackbarStatus('Role created successfully'));
      })
      .catch((err) => {
        if (err && err.response) {
          const { message } = err.response.body;
          dispatch(createRoleError(message));
          return;
        }
        console.log('Create role server error', err);
        dispatch(clearForm());
        dispatch(closeCreateRoleModal());
        dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
      });
  });
};

export const getRolesAsyncSelect =
  (searchValues = '', callback) =>
  (dispatch) => {
    getToken(dispatch).then((accessToken) => {
      agent.Role.getRoles(accessToken, searchValues)
        .then((rolesList) => {
          const { value } = rolesList;
          const updatedRolesList = modifyRolesList(value);
          callback && callback(updatedRolesList);
        })
        .catch((err) => {
          console.log('getAssignable Roles server error', err);
          dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
          callback && callback();
        });
    });
  };

