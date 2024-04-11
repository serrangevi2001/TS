import { SNACKBAR_MESSAGE } from "./constants";

const initialState = {
  message: '',
  isActive: false,
};

export default (localState = initialState, action) => {
  switch (action.type) {
    case SNACKBAR_MESSAGE:
      if (action.payload)
        return {
          message: action.payload,
          isActive: true,
        };
      return {
        ...localState,
        isActive: false,
      };
    default:
      return localState;
  }
};
