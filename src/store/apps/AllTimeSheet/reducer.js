import { SET_ALL_TIMESHEET_LIST } from "./constants";

const initialState = {
  AllTimeSheetList: [],
  totalRecords: 0,
};
export default (localState = initialState, action) => {
  switch (action.type) {
    case SET_ALL_TIMESHEET_LIST: {
      const { AllTimeSheet } = action.payload;
      return {
        ...localState,
        AllTimeSheetList: AllTimeSheet && AllTimeSheet.value,
        totalRecords: AllTimeSheet["@odata.count"],
      }
    }
    default: {
      return localState;
    }
  }
};