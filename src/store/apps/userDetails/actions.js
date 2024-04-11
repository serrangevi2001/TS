import agent from '../../../services/agent';
import { getToken, modifyReviewerList, modifyRolesList } from '../../../helpers/common';
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
  UPDATE_USER_ERROR,
  UPDATE_USER_PENDING,
  UPDATE_USER_SUCCESS,
} from './constants';
import { clearForm } from '../../core/form/actions';
import { showSnackbarStatus } from '../../core/snackbar/actions';

export const getUserDetailsPending = () => ({
  type: GET_USER_DETAILS_PENDING,
});

export const setUserDetails = (userData) => ({
  type: SET_USER_DETAILS,
  payload: userData,
});

export const getUserDetailsSuccess = () => ({
  type: GET_USER_DETAILS_SUCCESS,
});

export const sendResetPasswordPending = () => ({
  type: SEND_RESET_PASSWORD_PENDING,
});

export const sendResetPasswordSuccess = () => ({
  type: SEND_RESET_PASSWORD_SUCCESS,
});

export const sendResetPasswordError = () => ({
  type: SEND_RESET_PASSWORD_ERROR,
});

export const closeChangePasswordModal = () => ({
  type: CLOSE_CHANGE_PASSWORD_MODAL,
});
export const closeResetPasswordModal = () => ({
  type: CLOSE_RESET_PASSWORD_MODAL,
});

export const openChangePasswordModal = () => ({
  type: OPEN_CHANGE_PASSWORD_MODAL,
});
export const openResetPasswordModalAction = () => ({
  type: OPEN_RESET_PASSWORD_MODAL,
});

export const changePasswordPending = () => ({
  type: CHANGE_PASSWORD_PENDING,
});
export const resetPasswordPending = () => ({
  type: RESET_PASSWORD_PENDING,
});

export const changePasswordSuccess = () => ({
  type: CHANGE_PASSWORD_SUCCESS,
});
export const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS,
});

export const changePasswordError = (errorMessage) => ({
  type: CHANGE_PASSWORD_ERROR,
  payload: { errorMessage },
});

export const resetPasswordError = (errorMessage) => ({
  type: RESET_PASSWORD_ERROR,
  payload: { errorMessage },
});

export const clearChangePasswordError = () => ({
  type: CLEAR_CHANGE_PASSWORD_ERROR,
});
export const clearResetPasswordError = () => ({
  type: CLEAR_RESET_PASSWORD_ERROR,
});

export const closeEditUserModal = () => ({
  type: CLOSE_EDIT_USER_MODAL,
});

export const openEditUserModal = () => ({
  type: OPEN_EDIT_USER_MODAL,
});

export const updateUserPending = () => ({
  type: UPDATE_USER_PENDING,
});

export const updateUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS,
});

export const updateUserError = (errorMessage) => ({
  type: UPDATE_USER_ERROR,
  payload: { errorMessage },
});

export const clearUpdateUserError = () => ({
  type: CLEAR_UPDATE_USER_ERROR,
});

export const getUserDetails = (userId) => (dispatch) => {
  dispatch(getUserDetailsPending());
  getToken(dispatch).then((accessToken) => {
    agent.User.getUserDetails(accessToken, userId)
      .then((userDetails) => {
        console.log("userDetails:", userDetails)
        dispatch(setUserDetails(userDetails));
        dispatch(getUserDetailsSuccess());
      })
      .catch((err) => {
        console.log('setUserDetails server error', err);
      });
  });
};

export const sendResetPasswordEmail = (email) => (dispatch) => {
  dispatch(sendResetPasswordPending());
  agent.User.sendResetPasswordEmail(email)
    .then(() => {
      dispatch(sendResetPasswordSuccess());
      console.log("RESET PASSWORD EMAIL SEND SUCCESSFULLY")
      dispatch(showSnackbarStatus('Password reset link sent successfully.'));
    })
    .catch((err) => {
      dispatch(sendResetPasswordError());
      console.log('setUserDetails server error', err);
      dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
    });
};

export const changePassword = () => (dispatch, getState) => {
  const currentState = getState();
  console.log("currentState:", currentState)
  const { formChangePassword } = currentState && currentState.form;
  if (!formChangePassword) {
    dispatch(changePasswordError('Please fill all required details.'));
    return;
  }
  console.log("formChangePassword:", formChangePassword)
  const changePasswordData = {
    oldPassword: formChangePassword.oldPassword,
    newPassword: formChangePassword.newPassword,
    confirmPassword: formChangePassword.confirmPassword,
    userName: formChangePassword.userName
  };
  console.log("changePasswordData:", changePasswordData)
  dispatch(clearChangePasswordError());
  dispatch(changePasswordPending());
  getToken(dispatch).then((accessToken) => {
    agent.User.changePassword(accessToken, changePasswordData)
      .then(() => {
        dispatch(changePasswordSuccess());
        dispatch(clearForm());
        dispatch(closeChangePasswordModal());
        dispatch(showSnackbarStatus('Password Changed Successfully'));
      })
      .catch((err) => {
        if (err && err.response) {
          console.log("err.response:", err.response)
          const { text } = err.response;
          dispatch(changePasswordError(text));
          return;
        }
        console.log('changePassword server error', err);
        dispatch(clearForm());
        dispatch(changePasswordError(null));
        dispatch(closeChangePasswordModal());
        dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
      }
      );
  });
};
export const resetPasswordAction = () => (dispatch, getState) => {
  const currentState = getState();
  console.log("currentState:", currentState)
  const { formResetPassword } = currentState && currentState.form;
  if (!formResetPassword) {
    dispatch(resetPasswordError('Please fill all required details.'));
    return;
  }
  console.log("formResetPassword:", formResetPassword)
  const ResetPasswordData = {
    newPassword: formResetPassword.newPassword,
    confirmPassword: formResetPassword.confirmPassword,
    userName: formResetPassword.userName
  };
  console.log("ResetPasswordData:", ResetPasswordData)
  dispatch(clearResetPasswordError());
  dispatch(resetPasswordPending());
  getToken(dispatch).then((accessToken) => {
    agent.User.resetPassword(accessToken, ResetPasswordData)
      .then(() => {
        dispatch(resetPasswordSuccess());
        dispatch(clearForm());
        dispatch(closeResetPasswordModal());
        dispatch(showSnackbarStatus('Password Changed Successfully'));
      })
      .catch((err) => {
        if (err && err.response) {
          console.log("err.response:", err.response)
          const { text } = err.response;
          dispatch(resetPasswordError(text));
          return;
        }
        console.log('changePassword server error', err);
        dispatch(clearForm());
        dispatch(resetPasswordError(null));
        dispatch(closeResetPasswordModal());
        dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
      }
      );
  });
};

export const updateUser = (user) => (dispatch) => {
  dispatch(clearUpdateUserError());
  dispatch(updateUserPending());
  console.log("user:", user);
  if (user && user.currentRole === "Developer" || user && user.currentRole === "Clients") {
    const dataToSend = { ...user, reviewUserId: 0, roleId: 0 };
    console.log("dataToSend:", dataToSend);
    getToken(dispatch).then((accessToken) => {
      agent.User.updateUser(accessToken, dataToSend)
        .then(() => {
          dispatch(updateUserSuccess());
          dispatch(closeEditUserModal());
          dispatch(getUserDetails(user.id));
          dispatch(showSnackbarStatus('User details updated successfully'));
        })
        .catch((err) => {
          if (err && err.response) {
            const { text } = err.response;
            console.log("error:", err && err.response)
            dispatch(updateUserError(text));
            return;
          }
          console.log('Update user server error', err);
          dispatch(updateUserError(null));
          dispatch(closeEditUserModal());
          dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
        });
    });
  }
  else {

    getToken(dispatch).then((accessToken) => {
      agent.User.updateUser(accessToken, user)
        .then(() => {
          dispatch(updateUserSuccess());
          dispatch(closeEditUserModal());
          dispatch(getUserDetails(user.id));
          dispatch(showSnackbarStatus('User details updated successfully'));
        })
        .catch((err) => {
          if (err && err.response) {
            const { text } = err.response;
            console.log("error:", err && err.response)
            dispatch(updateUserError(text));
            return;
          }
          console.log('Update user server error', err);
          dispatch(updateUserError(null));
          dispatch(closeEditUserModal());
          dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
        });
    });
  }
};

export const getReviewerUserIDAsyncSelect = (searchValue, callback) => (dispatch) => {
  getToken(dispatch).then((accessToken) => {
    console.log("accessToken:", accessToken)
    agent.User.getReviewerUserList(accessToken, searchValue)
      .then((ReviewerList) => {
        console.log("ReviewerList:", ReviewerList)
        const { value } = ReviewerList;
        const ReviewerUserIDList = modifyReviewerList(value);
        console.log("ReviewerUserIDList:", ReviewerUserIDList)//eslint-disable-next-line
        callback && callback(ReviewerUserIDList);
      })
      .catch((err) => {
        console.log('getReviewerUserIDAsyncSelect server error', err);
        dispatch(showSnackbarStatus('Something went wrong. Please try again later'));//eslint-disable-next-line
        callback && callback();
      });

  })
}
export const getRoleIdAsyncSelect = (searchValue, callback) => (dispatch) => {
  getToken(dispatch).then((accessToken) => {
    console.log("accessToken:", accessToken)
    agent.User.getRoleList(accessToken, searchValue)
      .then((RoleList) => {
        console.log("RoleList:", RoleList)
        const { value } = RoleList;
        const RolesList = modifyRolesList(value);
        console.log("RolesList:", RolesList)//eslint-disable-next-line
        callback && callback(RolesList);
      })
      .catch((err) => {
        console.log('getRoleIdAsyncSelect server error', err);
        dispatch(showSnackbarStatus('Something went wrong. Please try again later'));//eslint-disable-next-line
        callback && callback();
      });

  })
}