import moment from "moment";
import { getToken, modifyProjectList, modifyTaskList } from "../../../helpers/common";
import agent from "../../../services/agent";
import { clearForm } from "../../core/form/actions";
import { showSnackbarStatus } from "../../core/snackbar/actions";
import { CLEAR_TIMESHEET_ERROR, CLEAR_UPDATE_TIMESHEET_ERROR, CLOSE_CREATE_TIMESHEET_MODAL ,CLOSE_DELETE_TIMESHEET_MODAL, CLOSE_EDIT_TIMESHEET_MODAL, CREATE_TIMESHEET_ERROR, CREATE_TIMESHEET_PENDING, CREATE_TIMESHEET_SUCCESS, DELETE_TIMESHEET_ERROR, OPEN_CREATE_TIMESHEET_MODAL, OPEN_DELETE_TIMESHEET_MODAL, OPEN_EDIT_TIMESHEET_MODAL, SET_LOGGED_HOURS, SET_TIMESHEET_DETAILS, SET_TIMESHEET_LIST, UPDATE_TIMESHEET_ERROR, UPDATE_TIMESHEET_PENDING, UPDATE_TIMESHEET_SUCCESS } from "./costants";


export const openCreateTimeSheetModalAction = () => ({
  type: OPEN_CREATE_TIMESHEET_MODAL,
});

export const openActionTimeSheetDeleteModalAction = () => ({
  type: OPEN_DELETE_TIMESHEET_MODAL,
});

export const closeCreateTimeSheetModal = () => ({
  type: CLOSE_CREATE_TIMESHEET_MODAL,
});

export const closeActionTimeSheetDeleteModalAction = () => ({
  type: CLOSE_DELETE_TIMESHEET_MODAL,
});

export const setTimeSheetList = (TimeSheet) => ({
  type: SET_TIMESHEET_LIST,
  payload: { TimeSheet },
})
export const setTimeSheetDetails = (TimeSheetDetails) => ({
  type: SET_TIMESHEET_DETAILS,
  payload: { TimeSheetDetails },
})
export const setLoggedHours = (loggedHours) => ({
  type: SET_LOGGED_HOURS,
  payload: { loggedHours },
})

export const createTimeSheetError = (errorMessage) => ({
  type: CREATE_TIMESHEET_ERROR,
  payload: { errorMessage },
});
export const deleteTimeSheetError = (errorMessage) => ({
  type: DELETE_TIMESHEET_ERROR,
  payload: { errorMessage },
});

export const createTimeSheetPending = () => ({
  type: CREATE_TIMESHEET_PENDING,
});

export const clearCreateTimeSheetError = () => ({
  type: CLEAR_TIMESHEET_ERROR,
});

export const createTimeSheetSuccess = () => ({
  type: CREATE_TIMESHEET_SUCCESS,
});
export const openEditTimeSheetModal = () => ({
  type: OPEN_EDIT_TIMESHEET_MODAL,
});

export const closeEditTimeSheetModal = () => ({
  type: CLOSE_EDIT_TIMESHEET_MODAL,
});

export const clearUpdateTimeSheetError = () => ({
  type: CLEAR_UPDATE_TIMESHEET_ERROR,
});

export const updateTimeSheetPending = () => ({
  type: UPDATE_TIMESHEET_PENDING,
});
export const updateTimeSheetSuccess = () => ({
  type: UPDATE_TIMESHEET_SUCCESS,
});

export const updateTimeSheetError = (errorMessage) => ({
  type: UPDATE_TIMESHEET_ERROR,
  payload: { errorMessage },
});

export const getProjectAsyncSelect =
  (searchValue, callback) =>
    (dispatch) => {
      getToken(dispatch).then((accessToken) => {
        agent.TimeSheet.getProjectlist(accessToken, searchValue)
          .then((ProjectList) => {
            console.log("ProjectList:", ProjectList)
            const { value } = ProjectList;
            const updatedProjectList = modifyProjectList(value);
            console.log("updatedProjectList:", updatedProjectList)
            //eslint-disable-next-line
            callback && callback(updatedProjectList);
          })
          .catch((err) => {
            console.log('getProjectAsyncSelect server error', err);
            dispatch(showSnackbarStatus('Something went wrong. Please try again later'));//eslint-disable-next-line
            callback && callback();
          });
      });
    };
export const getTaskListSelect =
  (ProjectID, searchValue, callback) =>
    (dispatch) => {
      console.log("ProjectID:", ProjectID);
      getToken(dispatch).then((accessToken) => {
        agent.TimeSheet.getTasklist(accessToken, ProjectID, searchValue)
          .then((TaskList) => {
            console.log("TaskList:", TaskList)
            const { value } = TaskList;
            const updatedTaskList = modifyTaskList(value);
            console.log("updatedTaskList:", updatedTaskList)
            //eslint-disable-next-line
            callback && callback(updatedTaskList);
          })
          .catch((err) => {
            console.log('getProjectAsyncSelect server error', err);
            dispatch(showSnackbarStatus('Something went wrong. Please try again later'));//eslint-disable-next-line
            callback && callback();
          });
      });
    };

export const getTimeSheetListActionModal = (page, PageSize, searchuserName, searchprojectName, searchtaskName, searchType, searchworkHours, searchworkDate, searchcreatedDateTime, searchcreatedBy, searchStatus) => (dispatch) => {
  getToken(dispatch).then((accessToken) => {
    agent.TimeSheet.getTimeSheetList(accessToken, page, PageSize, searchuserName, searchprojectName, searchtaskName, searchType, searchworkHours, searchworkDate, searchcreatedDateTime, searchcreatedBy, searchStatus)
      .then((TimeSheetLists) => {
        dispatch(setTimeSheetList(TimeSheetLists));
      })
      .catch((err) => {
        console.log('getTimeSheet server error', err);
        dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
      });
  });
}

export const getTimeSheetDetails = (id) => (dispatch) => {
  getToken(dispatch).then((accessToken) => {
    console.log("accessToken:", accessToken)
    agent.TimeSheet.getTimeSheetsDetails(accessToken, id).then(
      (timesheetDetails) => {
        console.log("timesheetDetails:", timesheetDetails)
        dispatch(setTimeSheetDetails(timesheetDetails))
      }
    )
  })
}
export const deleteTimeSheetAction = (id) => (dispatch) => {
  getToken(dispatch).then((accessToken) => {
    console.log("accessToken:", accessToken)
    agent.TimeSheet.getDeleteTimeSheetList(accessToken, id).then(
      (timesheetListDeleted) => {
        console.log("timesheetDetails:", timesheetListDeleted)
        dispatch(closeActionTimeSheetDeleteModalAction());
        dispatch(getTimeSheetListActionModal());
        window.location.reload()
        
      }
    ).catch((err)=>{
      console.log("err:",err.response && err.response.text);
      console.log('getDeleteTimeSheetList server error', err);
      dispatch(showSnackbarStatus(err.response && err.response.text));
      dispatch(deleteTimeSheetError(err.response && err.response.text));
    })
  })
}
export const getLoggedHoursAction = (date) => (dispatch) => {
  // const Date={
  //   date:moment(date).utcOffset("+05:30").format()
  // }
  const Date=moment(date).format('DD-MM-YYYY')
  
  console.log("Date:",Date);
  getToken(dispatch).then((accessToken) => {
    console.log("accessToken:", accessToken)
    agent.TimeSheet.getTimeSheetLoggedHours(accessToken, Date).then(
      (loggedHours) => {
        console.log("loggedHours:", loggedHours)
        dispatch(setLoggedHours(loggedHours))
      }
    ).catch((err)=>{
      console.log('getLoggedHoursAction server error', err);
      dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
    })
  })
}

export const createTimeSheet = (formFields) => (dispatch) => {
  if (!formFields) {
    dispatch(createTimeSheetError('Please fill required details.'));
    return;
  }
  console.log("formfields:", formFields)
  console.log("taskID:", typeof (formFields.taskValue && formFields.taskValue.value))
  let dataToSend;
  if (formFields) {
    dataToSend = [];
    formFields.map((data) => {
      // const Time = Number(`${data.Hours}.${data.Mint}` )
      console.log("data:", data)
      if (data && data.projectName !== '' && data.taskValue.value !== '' && data.type !== '') {
        return (
          dataToSend.push({
            userId: data && data.userId,
            projectId: data && data.projectName,
            taskId: data && data.taskValue && data.taskValue.value,
            workDate: data && data.workDate,
            // time: parseFloat(Time.toFixed(2)),
            hours: Number(data && data.Hours),
            mint: Number(data && data.Mint),
            // mint:data && data.Mint === "00" ? 0 : parseFloat(`0.${data && data.Mint}`),
            type: data && data.type
          })
        )
      }
      return (
        dataToSend.push({
          userId: data && data.userId,
          projectId: Number(data && data.projectName),
          // taskId:Number(data && data.taskId),
          taskId: Number(data && data.taskValue && data.taskValue.value),
          workDate: data && data.workDate,
          // time: parseFloat(Time.toFixed(2)),
          hours: Number(data && data.Hours),
          mint: Number(data && data.Mint),
          // mint:data && data.Mint === "00" ? 0 : parseFloat(`0.${data && data.Mint}`),
          type: data && data.type
        })
      )
    })
  }
  console.log("dataToSend:", dataToSend);
  dispatch(createTimeSheetPending());
  dispatch(clearCreateTimeSheetError());
  getToken(dispatch).then((accessToken) => {
    console.log("formAddTimeSheet:", dataToSend)
    console.log("accessToken:", accessToken)
    agent.TimeSheet.createTimeSheet(accessToken, dataToSend)
      .then((response) => {
        console.log("response:", response)
        console.log("TimeSheet Created Successfully")
        dispatch(createTimeSheetSuccess());
        dispatch(clearForm());
        dispatch(closeCreateTimeSheetModal());
        dispatch(getTimeSheetListActionModal());
        dispatch(showSnackbarStatus('TimeSheet created successfully'));
      })
      .catch((err) => {
        if (err && err.response) {
          console.log("error message:", err.response)
          console.log("error message:", err.response.text)
          dispatch(createTimeSheetError(err.response && err.response.text));
          return;
        }
        dispatch(clearForm());
        dispatch(closeCreateTimeSheetModal());
        dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
      });
  });
};

export const updateTimeSheet = (formFields) => (dispatch) => {
  const dataToSend = {
    ...formFields,
    hours: Number(formFields && formFields.hours),
    // mint:formFields && formFields.mint === "00" ? 0 : parseFloat(`0.${formFields && formFields.mint}`),
    mint: Number(formFields && formFields.mint)
  }
  console.log("TimeSheet update:", dataToSend)
  dispatch(clearUpdateTimeSheetError());
  dispatch(updateTimeSheetPending());
  getToken(dispatch).then((accessToken) => {
    console.log("dataToSend:", dataToSend);
    agent.TimeSheet.editTimeSheet(accessToken, dataToSend)
      .then(() => {
        dispatch(updateTimeSheetSuccess());
        dispatch(closeEditTimeSheetModal());
        dispatch(getTimeSheetDetails(formFields.id));
        dispatch(showSnackbarStatus('TimeSheet details updated successfully'));
      })
      .catch((err) => {
        if (err && err.response) {
          // const { message } = err.response.body;
          console.log("err:", err && err.response && err.response.text)
          dispatch(updateTimeSheetError(err && err.response && err.response.text));
          return;
        }
        console.log('Update TimeSheet server error', err);
        dispatch(updateTimeSheetError(null));
        dispatch(closeEditTimeSheetModal());
        dispatch(showSnackbarStatus('Something went wrong. Please try again later'));
      });
  });
};