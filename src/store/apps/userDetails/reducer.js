import {
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_PENDING,
  CHANGE_PASSWORD_SUCCESS,
  CLEAR_CHANGE_PASSWORD_ERROR,
  CLEAR_RESET_PASSWORD_ERROR,
  CLEAR_UPDATE_USER_ERROR,
  CLOSE_CHANGE_PASSWORD_MODAL,
  CLOSE_EDIT_USER_MODAL,
  CLOSE_RESET_PASSWORD_MODAL,
  GET_USER_DETAILS_PENDING,
  GET_USER_DETAILS_SUCCESS,
  OPEN_CHANGE_PASSWORD_MODAL,
  OPEN_EDIT_USER_MODAL,
  OPEN_RESET_PASSWORD_MODAL,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_PENDING,
  RESET_PASSWORD_SUCCESS,
  SEND_RESET_PASSWORD_ERROR,
  SEND_RESET_PASSWORD_PENDING,
  SEND_RESET_PASSWORD_SUCCESS,
  SET_USER_DETAILS,
  SET_USER_DETAILS_INITIAL_STATE,
  UPDATE_USER_ERROR,
  UPDATE_USER_PENDING,
  UPDATE_USER_SUCCESS,
} from './constants';

const initialState = {
  isGetUserDetailsPending: false,
  isResetPasswordPending: false,
  isResetPasswordModalOpen: false,
  isChangePasswordModalOpen: false,
  isChangePasswordPending: false,
  isEditUserModalOpen: false,
  errorMessage: '',
  updateUserErrorMessage: '',
  isUpdateUserPending: false,
  user: null,

};

export default (localState = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS_INITIAL_STATE: {
      return {
        ...initialState,
      };
    }
    case SET_USER_DETAILS: {
      return {
        ...localState,
        user: action.payload,
      };
    }
    case GET_USER_DETAILS_PENDING: {
      return {
        ...localState,
        isGetUserDetailsPending: true,
      };
    }
    case GET_USER_DETAILS_SUCCESS: {
      return {
        ...localState,
        isGetUserDetailsPending: false,
      };
    }
    case SEND_RESET_PASSWORD_PENDING: {
      return {
        ...localState,
        isResetPasswordPending: true,
      };
    }
    case SEND_RESET_PASSWORD_SUCCESS: {
      return {
        ...localState,
        isResetPasswordPending: false,
      };
    }
    case SEND_RESET_PASSWORD_ERROR: {
      return {
        ...localState,
        isResetPasswordPending: false,
      };
    }
    case OPEN_RESET_PASSWORD_MODAL: {
      return {
        ...localState,
        isResetPasswordModalOpen: true,
      };
    }
    case OPEN_CHANGE_PASSWORD_MODAL: {
      return {
        ...localState,
        isChangePasswordModalOpen: true,
      };
    }
    case CLOSE_CHANGE_PASSWORD_MODAL: {
      return {
        ...localState,
        isChangePasswordModalOpen: false,
        errorMessage: null,
      };
    }
    case CLOSE_RESET_PASSWORD_MODAL: {
      return {
        ...localState,
        isResetPasswordModalOpen: false,
        errorMessage: null,
      };
    }
    case CHANGE_PASSWORD_PENDING: {
      return {
        ...localState,
        isChangePasswordPending: true,
      };
    }
    case RESET_PASSWORD_PENDING: {
      return {
        ...localState,
        isResetPasswordPending: true,
      };
    }
    case CHANGE_PASSWORD_SUCCESS: {
      return {
        ...localState,
        isChangePasswordPending: false,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...localState,
        isResetPasswordPending: false,
      };
    }
    case CHANGE_PASSWORD_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...localState,
        errorMessage,
        isChangePasswordPending: false,
      };
    }
    case RESET_PASSWORD_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...localState,
        errorMessage,
        isResetPasswordPending: false,
      };
    }
    case CLEAR_RESET_PASSWORD_ERROR: {
      return {
        ...localState,
        errorMessage: null,
        isResetPasswordPending: false,
      };
    }
    case CLEAR_CHANGE_PASSWORD_ERROR: {
      return {
        ...localState,
        errorMessage: null,
        isChangePasswordPending: false,
      };
    }
    case OPEN_EDIT_USER_MODAL: {
      return {
        ...localState,
        isEditUserModalOpen: true,
      };
    }
    case CLOSE_EDIT_USER_MODAL: {
      return {
        ...localState,
        isEditUserModalOpen: false,
        updateUserErrorMessage: null,
      };
    }
    case UPDATE_USER_PENDING: {
      return {
        ...localState,
        isUpdateUserPending: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...localState,
        isUpdateUserPending: false,
      };
    }
    case UPDATE_USER_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...localState,
        updateUserErrorMessage: errorMessage,
        isUpdateUserPending: false,
      };
    }
    case CLEAR_UPDATE_USER_ERROR: {
      return {
        ...localState,
        updateUserErrorMessage: null,
        isUpdateUserPending: false,
      };
    }
    default: {
      return localState;
    }
  }
};
