import {
  CREATE_ORGANISATION_ERROR,
  CREATE_ORGANISATION_PENDING,
  CREATE_ORGANISATION_SUCCESS,
  CLEAR_ORGANISATION_ERROR,
  SET_INITIAL_STATE,
  OPEN_CREATE_ORGANISATION_MODAL,
  CLOSE_CREATE_ORGANISATION_MODAL,
  SET_ORGANISATIONS_PENDING,
  SET_ORGANISATIONS_LIST,
} from './constants';

const initialState = {
  errorMessage: null,
  isPending: false,
  isCreateOrganisationModalOpen: false,
  isGetOrganisationPending: false,
  organisations: [],
  totalRecords : 0,
};

export default (localState = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_STATE: {
      return {
        ...initialState,
        isCreateOrganisationModalOpen: true,
      };
    }
    case CREATE_ORGANISATION_SUCCESS: {
      return {
        ...localState,
        isPending: false,
      };
    }
    case CREATE_ORGANISATION_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...localState,
        errorMessage,
        isPending: false,
      };
    }
    case CREATE_ORGANISATION_PENDING: {
      return {
        ...localState,
        isPending: true,
      };
    }
    case CLEAR_ORGANISATION_ERROR: {
      return {
        ...localState,
        errorMessage: null,
      };
    }
    case OPEN_CREATE_ORGANISATION_MODAL: {
      return {
        ...localState,
        isCreateOrganisationModalOpen: true,
      };
    }
    case CLOSE_CREATE_ORGANISATION_MODAL: {
      return {
        ...localState,
        errorMessage: null,
        isCreateOrganisationModalOpen: false,
      };
    }
    case SET_ORGANISATIONS_PENDING: {
      return {
        ...localState,
        isGetOrganisationPending: true,
      };
    }
    case SET_ORGANISATIONS_LIST: {
      const { organisationsOdata } = action.payload;
      return {
        ...localState,
        isGetOrganisationPending: false,
        organisations: organisationsOdata && organisationsOdata.value,
        totalRecords: organisationsOdata["@odata.count"],
      };
    }
    default: {
      return localState;
    }
  }
};
