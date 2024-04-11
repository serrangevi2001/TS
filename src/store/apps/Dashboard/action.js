import { getToken } from "../../../helpers/common";
import agent from "../../../services/agent";
import { SET_DASHBOARD } from "./constants";

export const setDashboard = (dashboard) => ({
    type: SET_DASHBOARD,
    payload: { dashboard },
  });

  export const getDashboardCounts = () => (dispatch) => {

    getToken(dispatch).then((accessToken) => {
      agent.Dashboard.getDashboardCounts(accessToken)
        .then((dashboardCounts) => {
          console.log("Dashboard :", dashboardCounts);
          dispatch(setDashboard(dashboardCounts));
        }).catch(err => {
          console.log(err);
        })
    })
  }