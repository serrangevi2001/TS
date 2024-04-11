import { SET_FORGOT_PASSWORD_CONFIRMATION_STATUS } from './constants';

const initialState = {
  confirmationStatus: '',
};

export default (localState = initialState, action) => {
  switch (action.type) {
    case SET_FORGOT_PASSWORD_CONFIRMATION_STATUS: {
      return {
        ...localState,
        confirmationStatus: action.payload,
      };
    }
    default: {
      return localState;
    }
  }
};
