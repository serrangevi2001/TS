/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import agent from '../../../services/agent';
import { getToken } from '../../../helpers/common';
import {
  CLEAR_ORGANISATION_ERROR,
  CLOSE_CREATE_ORGANISATION_MODAL,
  CREATE_ORGANISATION_ERROR,
  CREATE_ORGANISATION_PENDING,
  CREATE_ORGANISATION_SUCCESS,
  OPEN_CREATE_ORGANISATION_MODAL,
  SET_INITIAL_STATE,
  SET_ORGANISATIONS_LIST,
  SET_ORGANISATIONS_PENDING,
} from './constants';
import { clearForm } from '../../core/form/actions';
import { showSnackbarStatus } from '../../core/snackbar/actions';

export const createOrganisationPending = () => ({
  type: CREATE_ORGANISATION_PENDING,
});

export const createOrganisationSuccess = () => ({
  type: CREATE_ORGANISATION_SUCCESS,
});

export const createOrganisationError = (errorMessage) => ({
  type: CREATE_ORGANISATION_ERROR,
  payload: { errorMessage },
});

export const clearCreateOrganisationError = () => ({
  type: CLEAR_ORGANISATION_ERROR,
});

export const setUserFormInitialState = () => ({
  type: SET_INITIAL_STATE,
});

export const openCreateOrganisationModal = () => ({
  type: OPEN_CREATE_ORGANISATION_MODAL,
});

export const closeCreateOrganisationModal = () => ({
  type: CLOSE_CREATE_ORGANISATION_MODAL,
});

export const setOrganisationsPending = () => ({
  type: SET_ORGANISATIONS_PENDING,
});

const setOrganisationsList = (organisationsOdata) => ({
  type: SET_ORGANISATIONS_LIST,
  payload: { organisationsOdata },
});

export const getOrganisationsList = (page, pageSize) => (dispatch) => {
  dispatch(setOrganisationsPending());
  getToken(dispatch).then((accessToken) => {
    agent.Organisation.getOrganisations(accessToken, page, pageSize)
      .then((organisationsList) => {
        dispatch(setOrganisationsList(organisationsList));
      })
      .catch((err) => {
        console.log('getOrganisations server error', err);
        dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
      });
  });
};

export const createOrganisation = () => (dispatch, getState) => {
  const currentState = getState();
  const { formAddOrganisation } = currentState && currentState.form;

  if (!formAddOrganisation) {
    dispatch(createOrganisationError('Please fill required details.'));
    return;
  }

  dispatch(createOrganisationPending());
  dispatch(clearCreateOrganisationError());
  getToken(dispatch).then((accessToken) => {
    agent.Organisation.createOrganisation(accessToken, formAddOrganisation)
      .then(() => {
        dispatch(createOrganisationSuccess());
        dispatch(clearForm());
        dispatch(closeCreateOrganisationModal());
        dispatch(getOrganisationsList());
        dispatch(showSnackbarStatus('Organisation created successfully'));
      })
      .catch((err) => {
        if (err && err.response) {
          const { message } = err.response.body;
          dispatch(createOrganisationError(message));
          return;
        }
        console.log('Create organisation server error', err);
        dispatch(clearForm());
        dispatch(closeCreateOrganisationModal());
        dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
      });
  });
};
