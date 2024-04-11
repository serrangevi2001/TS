import agent from '../../../services/agent';
import { clearForm } from '../../core/form/actions';
import { SET_FORGOT_PASSWORD_CONFIRMATION_STATUS } from './constants';
import { showSnackbarStatus } from '../../core/snackbar/actions';

export const setForgotPasswordConfirmationStatus = (status) => ({
  type: SET_FORGOT_PASSWORD_CONFIRMATION_STATUS,
  payload: status,
});

export const forgotPassword = (userName, email) => (dispatch) => {
  dispatch(setForgotPasswordConfirmationStatus('INPROGRESS'));
  console.log("userName:",userName,"email:",email)
  agent.Auth.forgotPassword(userName, email)
    .then(() => {  
      dispatch(setForgotPasswordConfirmationStatus('EMAIL_SENT'));
      dispatch(showSnackbarStatus("RESET PASSWORD SENT YOUR EMAIL SUCCESSFULLY"))
      dispatch(clearForm());
    })
    .catch(() => {
      dispatch(setForgotPasswordConfirmationStatus('INVALID_EMAIL'));
      dispatch(showSnackbarStatus("INVALID EMAIL OR USERNAME"))
    });
};
