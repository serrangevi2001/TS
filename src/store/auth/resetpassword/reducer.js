import {
  CLEAR_RESET_PASSWORD_ERROR,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_PENDING,
  RESET_PASSWORD_PENDING_SUCCESS,
} from './constants';

const initialState = {
  errorMessage: null,
  isPending: false,
};

export default (localState = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...localState,
        errorMessage,
        isPending: false,
      };
    }
    case RESET_PASSWORD_PENDING: {
      return {
        ...localState,
        isPending: true,
      };
    }
    case RESET_PASSWORD_PENDING_SUCCESS: {
      return {
        ...localState,
        isPending: false,
      };
    }
    case CLEAR_RESET_PASSWORD_ERROR: {
      return {
        ...localState,
        isPending: false,
        errorMessage: '',
      };
    }
    default: {
      return localState;
    }
  }
};
