import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/loader/Loadable';
/****Layouts*****/
const BlankLayout = Loadable(lazy(() => import('../layouts/BlankLayout')));
const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));
/***** Pages ****/
const Classic = Loadable(lazy(() => import('../views/dashboards/Classic')));

const Users = Loadable(lazy(() => import('../views/apps/users/users')));
const UserDetails = Loadable(lazy(() => import('../views/apps/users/userDetails/userDetails')));
const AllTimeSheet = Loadable(lazy(() => import('../views/apps/AllTimeSheet/allTimeSheet')));
const TimeSheet =Loadable(lazy(() => import('../views/apps/TimeSheet/timeSheet')));
const TimeSheetDetails =Loadable(lazy(() => import('../views/apps/TimeSheet/timeSheetDetails')));
const MyTeamTimeSheet =Loadable(lazy(() => import('../views/apps/MyTeamTimeSheet/myteamTimeSheet')));
const Roles = Loadable(lazy(() => import('../views/apps/roles/roles')));
/***** Auth Pages ****/
const Error = Loadable(lazy(() => import('../views/auth/Error')));
const Login = Loadable(lazy(() => import('../views/auth/Login')));
const Maintanance = Loadable(lazy(() => import('../views/auth/Maintanance')));
const RecoverPassword = Loadable(lazy(() => import('../views/auth/RecoverPassword')));
const ResetPassword = Loadable(lazy(() => import('../views/auth/ResetPassword')));

/*****Routes******/

const ThemeRoutes = [
  {
    path: '/app',
    element: <FullLayout />,
    children: [
      { path: '', name: 'Home', element: <Navigate to="dashboard" /> },
      { path: 'dashboard', name: 'Classic', exact: true, element: <Classic /> },
      { path: 'users', name: 'Users', exact: true, element: <Users /> },
      { path: 'alltimesheet', name: 'AllTimeSheet', exact: true, element: <AllTimeSheet /> },
      { path: 'timesheet', name: 'TimeSheet', exact: true, element: <TimeSheet /> },
      { path: 'timesheet/details/:id', name: 'TimeSheetDetails', exact: true, element: <TimeSheetDetails /> },
      { path: 'roles', name: 'Roles', exact: true, element: <Roles /> },
      { path: 'users/details/:id', name: 'UserDetails', exact: true, element: <UserDetails /> },
      { path: 'myteamtimesheet', name: 'MyTeamTimeSheet', exact: true, element: <MyTeamTimeSheet /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '', element: <Login /> },
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/404" /> },
      { path: 'maintanance', element: <Maintanance /> },
      { path: 'recoverpwd', element: <RecoverPassword /> },
      { path: 'resetpassword/:code', element: <ResetPassword /> },
      ],
  },
];

export default ThemeRoutes;
