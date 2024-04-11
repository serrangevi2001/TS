import { getToken } from "../../../helpers/common";
import agent from "../../../services/agent";
import { showSnackbarStatus } from "../../core/snackbar/actions";
import { SET_ALL_TIMESHEET_LIST } from "./constants";

export const setAllTimeSheetList = (AllTimeSheet) => ({
  type: SET_ALL_TIMESHEET_LIST,
  payload: { AllTimeSheet },
})

export const getAllTimeSheetListActionModal = (page, PageSize, searchuserName, searchprojectName, searchtaskName, searchworkDate, searchworkHours, searchType, searchcreatedBy, searchcreatedDateTime, searchStatus, searchUpdatedBy, searchUpdatedTimeStamp) => (dispatch) => {
  getToken(dispatch).then((accessToken) => {
    agent.AllTimeSheet.getAllTasklist(accessToken, page, PageSize, searchuserName, searchprojectName, searchtaskName, searchworkDate, searchworkHours, searchType, searchcreatedBy, searchcreatedDateTime, searchStatus, searchUpdatedBy, searchUpdatedTimeStamp)
      .then((AllTaskList) => {
        console.log("AllTaskList:", AllTaskList);
        dispatch(setAllTimeSheetList(AllTaskList));
      })
      .catch((err) => {
        console.log('getAllTimeSheet server error', err);
        dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
      });
  });
};