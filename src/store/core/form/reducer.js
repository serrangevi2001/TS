import { FORM_CLEAR, FORM_UPDATE } from './constants';

const initialState = {};

const formReducer = (localState = initialState, action) => {
  switch (action.type) {
    case FORM_UPDATE:
      if (action.payload)
        return {
          ...localState,
          ...action.payload,
        };
      return initialState;
    case FORM_CLEAR:
      return initialState;
    default:
      return localState;
  }
};

export default formReducer;
