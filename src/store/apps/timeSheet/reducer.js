import { CLEAR_TIMESHEET_ERROR, CLEAR_UPDATE_TIMESHEET_ERROR, CLOSE_CREATE_TIMESHEET_MODAL,  CLOSE_DELETE_TIMESHEET_MODAL, CLOSE_EDIT_TIMESHEET_MODAL, CREATE_TIMESHEET_ERROR, CREATE_TIMESHEET_PENDING, CREATE_TIMESHEET_SUCCESS, DELETE_TIMESHEET_ERROR, OPEN_CREATE_TIMESHEET_MODAL, OPEN_DELETE_TIMESHEET_MODAL, OPEN_EDIT_TIMESHEET_MODAL, SET_LOGGED_HOURS, SET_TIMESHEET_DETAILS, SET_TIMESHEET_LIST, UPDATE_TIMESHEET_ERROR, UPDATE_TIMESHEET_PENDING, UPDATE_TIMESHEET_SUCCESS } from "./costants";

const initialState = {
  errorMessage: null,
  isCreateTimeSheetModalOpen: false,
  isDeleteTimeSheetModalOpen: false,
  TimeSheetList: [],
  totalRecords: 0,
  timeSheetDetails: null,
  LoggedHours:null,
  isPending: false,
  isEditTimeSheetModalOpen: false,
  updateTimeSheetErrorMessage: '',
  isUpdateTimeSheetPending: false,
};



export default (localState = initialState, action) => {
  switch (action.type) {
    case OPEN_CREATE_TIMESHEET_MODAL: {
      return {
        ...localState,
        isCreateTimeSheetModalOpen: true,
      };
    }
    case OPEN_DELETE_TIMESHEET_MODAL: {
      return {
        ...localState,
        isDeleteTimeSheetModalOpen: true,
      };
    }
    case CLOSE_CREATE_TIMESHEET_MODAL: {
      return {
        ...localState,
        errorMessage: null,
        isCreateTimeSheetModalOpen: false,
      };
    }
    case CLOSE_DELETE_TIMESHEET_MODAL: {
      return {
        ...localState,
        errorMessage: null,
        isDeleteTimeSheetModalOpen: false,
      };
    }
    case SET_TIMESHEET_LIST: {
      const { TimeSheet } = action.payload;
      return {
        ...localState,
        TimeSheetList: TimeSheet && TimeSheet.value,
        totalRecords: TimeSheet["@odata.count"],
      }
    }
    case SET_TIMESHEET_DETAILS: {
      const { TimeSheetDetails } = action.payload;
      return {
        ...localState,
        timeSheetDetails: TimeSheetDetails,
      }
    }
    case SET_LOGGED_HOURS: {
      const { loggedHours } = action.payload;
      return {
        ...localState,
        LoggedHours: loggedHours,
      }
    }
    case CREATE_TIMESHEET_ERROR: {
      const { errorMessage } = action.payload;
      console.log("errorMessage:", errorMessage)
      return {
        ...localState,
        errorMessage,
        isPending: false,
      };
    }
    case DELETE_TIMESHEET_ERROR: {
      const { errorMessage } = action.payload;
      console.log("errorMessage:", errorMessage)
      return {
        ...localState,
        errorMessage,
        isPending: false,
      };
    }
    case CLEAR_TIMESHEET_ERROR: {
      return {
        ...localState,
        errorMessage: null,
      };
    }
    case CREATE_TIMESHEET_SUCCESS: {
      return {
        ...localState,
        isPending: false,
      };
    }
    case OPEN_EDIT_TIMESHEET_MODAL: {
      return {
        ...localState,
        isEditTimeSheetModalOpen: true,
      };
    }

    case CLOSE_EDIT_TIMESHEET_MODAL: {
      return {
        ...localState,
        isEditTimeSheetModalOpen: false,
        updateTimeSheetErrorMessage: null,
      };
    }
    case CLEAR_UPDATE_TIMESHEET_ERROR: {
      return {
        ...localState,
        updateTimeSheetErrorMessage: null,
        isUpdateTimeSheetPending: false,
      };
    }
    case UPDATE_TIMESHEET_PENDING: {
      return {
        ...localState,
        isUpdateTimeSheetPending: true,
      };
    }
    case UPDATE_TIMESHEET_SUCCESS: {
      return {
        ...localState,
        isUpdateTimeSheetPending: false,
      };
    }
    case UPDATE_TIMESHEET_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...localState,
        updateTimeSheetErrorMessage: errorMessage,
        isUpdateTimeSheetPending: false,
      };
    }
    case CREATE_TIMESHEET_PENDING: {
      return {
        ...localState,
        isPending: true,
      };
    }

    default: {
      return localState;
    }
  }
};