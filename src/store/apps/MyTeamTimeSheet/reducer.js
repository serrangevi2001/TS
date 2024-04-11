import { CLEAR_TIMESHEET_ACTION_ERROR, CLEAR_TIMESHEET_ERROR, CLOSE_ACTION_TIMESHEET_MODAL, CREATE_MY_TEAM_TIMESHEET_SUCCESS, CREATE_TIMESHEET_PENDING, OPEN_ACTION_TIMESHEET_MODAL, SET_MY_TEAM_TIMESHEET_LIST, UPDATE_MY_TEAM_TIMESHEET_ERROR } from "./constants";

const initialState = {
  errorMessage: null,
  isActionTimeSheetModalOpen: false,
  MyTeamTimeSheetList: [],
  totalRecords: 0,
  isPending: false,
  updateMyTeamTimeSheetErrorMessage: '',

};

export default (localState = initialState, action) => {
  switch (action.type) {
    case OPEN_ACTION_TIMESHEET_MODAL: {
      return {
        ...localState,
        isActionTimeSheetModalOpen: true,
      };
    }

    case CLOSE_ACTION_TIMESHEET_MODAL: {
      return {
        ...localState,
        errorMessage: null,
        isActionTimeSheetModalOpen: false,
      };
    }

    case SET_MY_TEAM_TIMESHEET_LIST: {
      const { MyTeamTimeSheet } = action.payload;
      return {
        ...localState,
        MyTeamTimeSheetList: MyTeamTimeSheet && MyTeamTimeSheet.value,
        totalRecords: MyTeamTimeSheet["@odata.count"],
      }
    }
    case CLEAR_TIMESHEET_ACTION_ERROR: {
      return {
        ...localState,
        errorMessage: null,
      };
    }
    case CREATE_TIMESHEET_PENDING: {
      return {
        ...localState,
        isPending: true,
      };
    }
    case CLEAR_TIMESHEET_ERROR: {
      return {
        ...localState,
        errorMessage: null,
      };
    }
    case CREATE_MY_TEAM_TIMESHEET_SUCCESS: {
      return {
        ...localState,
        isPending: false,
      };
    }
    case UPDATE_MY_TEAM_TIMESHEET_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...localState,
        updateMyTeamTimeSheetErrorMessage: errorMessage,
        isPending: false,
      };
    }
    default: {
      return localState;
    }
  }
};