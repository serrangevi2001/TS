/* eslint-disable import/prefer-default-export */
import agent from '../../../services/agent';
import { clearForm } from '../../core/form/actions';
import { showSnackbarStatus } from '../../core/snackbar/actions';
// import { userLogin } from '../login/action';
import {
  CLEAR_RESET_PASSWORD_ERROR,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_PENDING,
  RESET_PASSWORD_PENDING_SUCCESS,
} from './constants';

export const resetPasswordError = (errorMessage) => ({
  type: RESET_PASSWORD_ERROR,
  payload: { errorMessage },
});

export const resetPasswordPending = () => ({
  type: RESET_PASSWORD_PENDING,
});

export const resetPasswordPendingSuccess = () => ({
  type: RESET_PASSWORD_PENDING_SUCCESS,
});

export const clearResetPasswordError = () => ({
  type: CLEAR_RESET_PASSWORD_ERROR,
});

export const resetPassword = (code) => (dispatch, getState) => {
  const currentState = getState();
  console.log("currentState:",currentState)
  const { formResetPassword } = currentState && currentState.form;
  console.log("code:",code)
  console.log("formResetPassword:",formResetPassword)
  dispatch(clearResetPasswordError());
  dispatch(resetPasswordPending());
  agent.Auth.resetPassword(formResetPassword, code)
    .then((result) => {
      console.log("result:",result)
      // dispatch(userLogin(result, formResetPassword.password));
      dispatch(resetPasswordPendingSuccess());
      dispatch(showSnackbarStatus('Password Reseted Successfully'));
      dispatch(clearForm());
    })
    .catch((err) => {
      if (err && err.response) {
        const { message } = err.response.body;
        dispatch(resetPasswordError(message));
        return;
      }
      console.log('reset password error', err);
      dispatch(resetPasswordError(null));
      dispatch(clearForm());
      dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
    });
};
