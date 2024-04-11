import { SET_DASHBOARD } from "./constants";

const initialState = {
    DashboardCounts: {},
  };
  export default (localState = initialState, action) => {
    switch (action.type) {
      case SET_DASHBOARD: {
        const { dashboard } = action.payload;
        return {
          ...localState,
          DashboardCounts: dashboard,
        }
      }
    
      default: {
        return localState;
      }
    }
  };