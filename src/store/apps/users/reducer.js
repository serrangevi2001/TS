import {
  CREATE_USER_ERROR,
  CREATE_USER_PENDING,
  CREATE_USER_SUCCESS,
  CLEAR_USER_ERROR,
  SET_INITIAL_STATE,
  OPEN_CREATE_USER_MODAL,
  CLOSE_CREATE_USER_MODAL,
  SET_USERS_PENDING,
  SET_USERS_LIST,
} from './constants';

const initialState = {
  errorMessage: null,
  isPending: false,
  isCreateUserModalOpen: false,
  isGetUserPending: false,
  users: [],
  rolesListAsync: [],
  searchValueAsync: '',
  totalRecords : 0,
};

export default (localState = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_STATE: {
      return {
        ...initialState,
        isCreateUserModalOpen: true,
      };
    }
    case CREATE_USER_SUCCESS: {
      return {
        ...localState,
        isPending: false,
      };
    }
    case CREATE_USER_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...localState,
        errorMessage,
        isPending: false,
      };
    }
    case CREATE_USER_PENDING: {
      return {
        ...localState,
        isPending: true,
      };
    }
    case CLEAR_USER_ERROR: {
      return {
        ...localState,
        errorMessage: null,
      };
    }
    case OPEN_CREATE_USER_MODAL: {
      return {
        ...localState,
        isCreateUserModalOpen: true,
      };
    }
    case CLOSE_CREATE_USER_MODAL: {
      return {
        ...localState,
        errorMessage: null,
        isCreateUserModalOpen: false,
      };
    }
    case SET_USERS_PENDING: {
      return {
        ...localState,
        isGetUserPending: true,
      };
    }
    case SET_USERS_LIST: {
      const { usersOdata } = action.payload;
      console.log("usersOdata:",usersOdata.value)
            return {
        ...localState,
        isGetUserPending: false,
        users: usersOdata && usersOdata.value,
        totalRecords: usersOdata["@odata.count"],
      };
    }
    default: {
      return localState;
    }
  }
};
