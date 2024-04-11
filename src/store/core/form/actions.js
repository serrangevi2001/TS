import { FORM_CLEAR, FORM_UPDATE } from './constants';

export const updateForm = (data) => ({
  type: FORM_UPDATE,
  payload: data,
});

export const clearForm = () => ({
  type: FORM_CLEAR,
});
