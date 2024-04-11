import { SNACKBAR_MESSAGE } from "./constants";

export const setSnackbarStatus = (status) => ({
  type: SNACKBAR_MESSAGE,
  payload: status,
});

export const showSnackbarStatus = (status) => (dispatch) => {
  console.log("status:",status);
  dispatch(setSnackbarStatus(status));
  setTimeout(() => {
    dispatch(setSnackbarStatus());
  }, 2000);
};

export const snackbar = (status) => (dispatch)=> {
  dispatch(setSnackbarStatus(status));
  alert(' Created Sucessfully')
}