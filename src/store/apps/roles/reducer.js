import {
  CREATE_ROLE_ERROR,
  CREATE_ROLE_PENDING,
  CREATE_ROLE_SUCCESS,
  CLEAR_ROLE_ERROR,
  SET_INITIAL_STATE,
  OPEN_CREATE_ROLE_MODAL,
  CLOSE_CREATE_ROLE_MODAL,
  SET_ROLES_PENDING,
  SET_ROLES_LIST,
} from './constants';

const initialState = {
  errorMessage: null,
  isPending: false,
  isCreateRoleModalOpen: false,
  isGetRolePending: false,
  roles: [],
  totalRecords : 0,
};

export default (localState = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_STATE: {
      return {
        ...initialState,
        isCreateRoleModalOpen: true,
      };
    }
    case CREATE_ROLE_SUCCESS: {
      return {
        ...localState,
        isPending: false,
      };
    }
    case CREATE_ROLE_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...localState,
        errorMessage,
        isPending: false,
      };
    }
    case CREATE_ROLE_PENDING: {
      return {
        ...localState,
        isPending: true,
      };
    }
    case CLEAR_ROLE_ERROR: {
      return {
        ...localState,
        errorMessage: null,
      };
    }
    case OPEN_CREATE_ROLE_MODAL: {
      return {
        ...localState,
        isCreateRoleModalOpen: true,
      };
    }
    case CLOSE_CREATE_ROLE_MODAL: {
      return {
        ...localState,
        errorMessage: null,
        isCreateRoleModalOpen: false,
      };
    }
    case SET_ROLES_PENDING: {
      return {
        ...localState,
        isGetRolePending: true,
      };
    }
    case SET_ROLES_LIST: {
      const { rolesOdata } = action.payload;
      return {
        ...localState,
        isGetRolePending: false,
        roles: rolesOdata && rolesOdata.value,
        totalRecords: rolesOdata["@odata.count"],
      };
    }
    default: {
      return localState;
    }
  }
};
