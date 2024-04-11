import { getToken } from "../../../helpers/common";
import agent from "../../../services/agent";
import { clearForm } from "../../core/form/actions";
import { showSnackbarStatus } from "../../core/snackbar/actions";
import { CLEAR_TIMESHEET_ACTION_ERROR, CLEAR_TIMESHEET_ERROR, CLOSE_ACTION_TIMESHEET_MODAL, CREATE_MY_TEAM_TIMESHEET_SUCCESS, CREATE_TIMESHEET_PENDING, OPEN_ACTION_TIMESHEET_MODAL, SET_MY_TEAM_TIMESHEET_LIST, UPDATE_MY_TEAM_TIMESHEET_ERROR } from "./constants";

export const setMyTeamTimeSheetList = (MyTeamTimeSheet) => ({
  type: SET_MY_TEAM_TIMESHEET_LIST,
  payload: { MyTeamTimeSheet },
})

export const openActionTimeSheetModal = () => ({
  type: OPEN_ACTION_TIMESHEET_MODAL,
});

export const closeActionMTimeSheetModal = () => ({
  type: CLOSE_ACTION_TIMESHEET_MODAL,
});

export const clearTimeSheetActionError = () => ({
  type: CLEAR_TIMESHEET_ACTION_ERROR,
});

export const createTimeSheetPending = () => ({
  type: CREATE_TIMESHEET_PENDING,
});

export const clearCreateTimeSheetError = () => ({
  type: CLEAR_TIMESHEET_ERROR,
});
export const createTimeSheetSuccess = () => ({
  type: CREATE_MY_TEAM_TIMESHEET_SUCCESS,
});


export const updateTimeSheetError = (errorMessage) => ({
  type: UPDATE_MY_TEAM_TIMESHEET_ERROR,
  payload: { errorMessage },
});
export const getMyTeamTimeSheetListActionModal = (page, PageSize, searchuserName, searchprojectName, searchtaskName, searchType, searchworkHours, searchworkDate, searchcreatedDateTime, searchcreatedBy, searchUpdatedDateTime, searchStatus, searchReason) => (dispatch) => {
  getToken(dispatch).then((accessToken) => {
    agent.MyTeamTimeSheet.getMyTeamTimeSheetList(accessToken, page, PageSize, searchuserName, searchprojectName, searchtaskName, searchType, searchworkHours, searchworkDate, searchcreatedDateTime, searchcreatedBy, searchUpdatedDateTime, searchStatus, searchReason)
      .then((MyTeamTimeSheetLists) => {
        console.log("MyTeamTimeSheetLists:", MyTeamTimeSheetLists)
        dispatch(setMyTeamTimeSheetList(MyTeamTimeSheetLists));
      })
      .catch((err) => {
        console.log('getMyTeamTimeSheetListActionModal server error', err);
        dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
      });
  });
}

export const updateTimeSheetActionList = (timeSheetAction) => (dispatch) => {
  console.log("timeSheetAction:", timeSheetAction);
  dispatch(createTimeSheetPending());
  dispatch(clearCreateTimeSheetError());
  getToken(dispatch).then((accessToken) => {
    agent.MyTeamTimeSheet.createTimeSheetAction(accessToken, timeSheetAction)
      .then((response) => {
        console.log("response:", response)
        console.log("TimeSheet Action Created Successfully")
        dispatch(createTimeSheetSuccess());
        dispatch(clearForm());
        dispatch(closeActionMTimeSheetModal());
        dispatch(getMyTeamTimeSheetListActionModal());
        window.location.reload()
        // dispatch(showSnackbarStatus('TimeSheet Action created successfully'));
      
      })
      .catch((err) => {
        if (err && err.response) {
          console.log("error message:", err.response)
          console.log("error message:", err.response.text)
          dispatch(updateTimeSheetError(err.response && err.response.text));
          return;
        }
        dispatch(clearForm());
        dispatch(closeActionMTimeSheetModal());
        dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
      });
  });

}