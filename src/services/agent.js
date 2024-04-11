/* eslint-disable no-underscore-dangle */
import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import createStore from '../store/store';
import { USER_LOGOUT } from '../store/auth/login/constants';
// import { filter } from 'jszip';

const superagent = superagentPromise(_superagent, Promise);

const responseBody = (res) => res.body;
const apiUrl = window.__ENV && window.__ENV.apiUrl;

const handleErrors = (err) => {
  if (err && err.status === 401) {
    const store = createStore();
    store.dispatch({ type: USER_LOGOUT });
  }
};

const requests = {
  post: (url, body) =>
    superagent
      .post(url, body)
      .set('Content-Type', 'application/json')
      .on('error', handleErrors)
      .then(responseBody),
  get: (url, body) =>
    superagent
      .get(url, body)
      .redirects(0)
      .ok((res) => {
        if (res.status === 302) console.log(res);
      })
      .end(),
  postData: (url, body) =>
    superagent
      .post(url, body)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .on('error', handleErrors)
      .then(responseBody),
  getWithToken: (url, token) =>
    superagent
      .get(url)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .on('error', handleErrors)
      .then(responseBody),
  getWithTokenData: (url,body, token) =>
    superagent
      .get(url,body)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .on('error', handleErrors)
      .then(responseBody),
  
  postWithToken: (url, body, token) =>
    superagent
      .post(url, body)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .on('error', handleErrors)
      .then(responseBody),
  deleteWithToken: (url, token) =>
    superagent
      .del(url, token)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .on('error', handleErrors)
      .then(responseBody),
  putWithToken: (url, body, token) =>
    superagent
      .put(url, body, token)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .on('error', handleErrors)
      .then(responseBody),
  uploadWithToken: (url, data, token) =>
    superagent
      .post(url, data)
      .set('Authorization', `Bearer ${token}`)
      .on('error', handleErrors)
      .then(responseBody),
};

const Auth = {
  login: (email, Password) => {
    const formData = {
      username: email,
      password: Password
    }
    console.log("formData:", formData)
    return requests.post(`${apiUrl}/api/Auth`, formData);
  },
  getCurrentUser: (accessToken) => {
    return requests.getWithToken(`${apiUrl}/api/Auth/UserProfile`, accessToken);
  },
  enableAccount: (data, code) => {
    const { password, confirmPassword } = data;
    return requests.postData(`${apiUrl}/api/user/enableuser`, {
      password,
      confirmPassword,
      code,
    });
  },
  forgotPassword: (username, emailId) => {
    return requests.post(`${apiUrl}/api/User/forgotpassword`, {
      username,
      emailId,
    });
  },
  resetPassword: (data, code) => {
    const { password, confirmPassword, email } = data;
    console.log("apiUrl:", apiUrl)
    console.log("code:", code)
    return requests.postData(`${apiUrl}/api/user/resetpassword`, {
      password,
      confirmPassword,
      code,
      email,
    });
  },
};

const User = {
  getUsers: (accessToken, currentPage, PageSize = 20, searchFirstName, searchLastName, searchDisplayName, searchReviewUser, searchCreatedTimeStamp, searchUserName, searchPhone,searchRole) => {
    console.log("page:", currentPage, "PageSize:", PageSize)
    currentPage = parseInt(currentPage, 10);
    if (Number.isNaN(currentPage) || currentPage < 1) {
      currentPage = 1;
    }
    let url = `${apiUrl}/odata/UserList?$count=true&$skip=${(currentPage - 1) * PageSize}&$top=${PageSize}&orderby=CreatedTimeStamp desc`;
    if (searchFirstName || searchLastName || searchDisplayName || searchReviewUser || searchCreatedTimeStamp || searchUserName || searchPhone || searchRole) {
      url += `&$filter=`;
      const filterArray = [];
      if (searchFirstName) {
        if (searchFirstName.toLowerCase() === 'na') {
          filterArray.push('FirstName eq \'\'');
        } else {
          filterArray.push(`contains(FirstName,'${searchFirstName}')`);
        }
      }
      if (searchLastName) {
        if (searchLastName.toLowerCase() === 'na') {
          filterArray.push('LastName eq \'\'');
        } else {
          filterArray.push(`contains(LastName,'${searchLastName}')`);
        }
      }
      if (searchDisplayName) {
        if (searchDisplayName.toLowerCase() === 'na') {
          filterArray.push('DisplayName eq \'\'');
        } else {
          filterArray.push(`contains(DisplayName,'${searchDisplayName}')`);
        }
      }
      if (searchUserName) {
        if (searchUserName.toLowerCase() === 'na') {
          filterArray.push('UserName eq \'\'');
        } else {
          filterArray.push(`contains(UserName,'${searchUserName}')`);
        }
      }
      if (searchPhone) {
        if (searchPhone.toLowerCase() === 'na') {
          filterArray.push('Phone eq \'\'');
        } else {
          filterArray.push(`contains(Phone,'${searchPhone}')`);
        }
      }
      if (searchReviewUser) {
        if (searchReviewUser.toLowerCase() === 'na') {
          filterArray.push('ReviewUser eq null');
        } else {
          filterArray.push(`contains(ReviewUser,'${searchReviewUser}')`);
        }
      }
      if (searchRole) {
        if (searchRole.toLowerCase() === 'na') {
          filterArray.push('Role eq null');
        } else {
          filterArray.push(`contains(Role,'${searchRole}')`);
        }
      }
      if (searchCreatedTimeStamp) {
        if (searchCreatedTimeStamp.toLowerCase() === 'na') {
          filterArray.push('CreatedTimeStamp eq null');
        } else {
          filterArray.push(`CreatedTimeStamp eq ${searchCreatedTimeStamp}`);
        }
      }
      console.log("filterArray", filterArray);
      let searchTerm = "";
      if (filterArray.length > 0) {
        searchTerm = filterArray.join(' and ');
      }
      console.log("searchterm:", searchTerm);
      if (searchTerm.length > 0)
        url += `${searchTerm}`;
      console.log(url)
    }
    console.log("url:", url)
    return requests.getWithToken(url, accessToken);
  },

  getRoleList: (accessToken, searchValue) => {
    console.log(searchValue)
    console.log('accessToken:', accessToken)
    let url = `${apiUrl}/odata/RoleList?$count=true`
    if (searchValue.length > 0) {
      url = `${apiUrl}/odata/RoleList?$count=true&$filter=RoleName ne null and RoleName ne '' and contains(RoleName, '${searchValue}')`;
    }
    return requests.getWithToken(url, accessToken);
  },

  createUser: (accessToken, user) => {
    console.log("user:", user)
    // const { userName, firstName, lastName, password, confirmPassword, email, newUserRole } = user;
    return requests.postWithToken(
      `${apiUrl}/api/User/Create`,
      // {
      //   username: userName,
      //   firstName,
      //   lastName,
      //   password,
      //   confirmPassword,
      //   email,
      //   notifyUser: true,
      //   roleId: [newUserRole && newUserRole.value],
      // },
      user,
      accessToken,
    );
  },

  getUserDetails: (accessToken, userId) => {
    console.log("userId:", userId, "accessToken:", accessToken)
    return requests.getWithToken(`${apiUrl}/api/User/details?UserId=${userId}`, accessToken);
  },

  sendResetPasswordEmail: (email) => {
    console.log("email:", email)
    return requests.post(`${apiUrl}/api/user/forgotpassword`, email);

  },

  changePassword: (accessToken, data) => {
    return requests.postWithToken(`${apiUrl}/api/User/ChangePassword`, data, accessToken);
  },
  resetPassword: (accessToken, data) => {
    return requests.postWithToken(`${apiUrl}/api/User/ResetPassword`, data, accessToken);
  },

  updateUser: (accessToken, data) => {
    data = {
      ...data,
      // roleId: data.roles && data.roles.roleId,
    };
    return requests.postWithToken(`${apiUrl}/api/User/Update`, data, accessToken);
  },

  getReviewerUserList: (accessToken, searchValue) => {
    console.log(searchValue)
    console.log('accessToken:', accessToken)
    let url = `${apiUrl}/odata/UserList?$count=true&orderby=DisplayName asc`
    if (searchValue.length > 0) {
      url = `${apiUrl}/odata/UserList?$count=true&$filter=DisplayName ne null and DisplayName ne '' and contains(DisplayName, '${searchValue}')`;
    }
    return requests.getWithToken(url, accessToken);
  }
};

const TimeSheet = {
  getProjectlist: (accessToken) => {
    const url = `${apiUrl}/odata/ProjectList?$count=true`;
    return requests.getWithToken(url, accessToken);
  },
  getTasklist: (accessToken, ProjectID, searchValue) => {
    console.log("ProjectID:", ProjectID, "searchValue:", searchValue)
    const url = `${apiUrl}/odata/TaskList?$filter=ProjectId eq ${ProjectID}`;
    return requests.getWithToken(url, accessToken);
  },
  getTimeSheetList: (accessToken, currentPage, PageSize = 15, searchuserName, searchprojectName, searchtaskName, searchType, searchworkHours, searchworkDate, searchcreatedDateTime, searchcreatedBy, searchStatus) => {
    currentPage = parseInt(currentPage, 10);
    if (Number.isNaN(currentPage) || currentPage < 1) {
      currentPage = 1;
    }
    let url = `${apiUrl}/odata/TimeSheetList?$count=true&$skip=${(currentPage - 1) * PageSize}&$top=${PageSize}&$orderby=createdDateTime desc`;
    if (searchuserName || searchprojectName || searchtaskName || searchType || searchworkHours || searchworkDate || searchcreatedDateTime || searchcreatedBy || searchStatus) {
      url += `&$filter=`;
      const filterArray = [];
      if (searchuserName) {
        if (searchuserName.toLowerCase() === 'na') {
          filterArray.push('userName eq \'\'');
        } else {
          filterArray.push(`contains(userName,'${searchuserName}')`);
        }
      }
      if (searchprojectName) {
        if (searchprojectName.toLowerCase() === 'na') {
          filterArray.push('projectName eq \'\'');
        } else {
          filterArray.push(`contains(projectName,'${searchprojectName}')`);
        }
      }
      if (searchtaskName) {
        if (searchtaskName.toLowerCase() === 'na') {
          filterArray.push('taskName eq \'\'');
        } else {
          filterArray.push(`contains(taskName,'${searchtaskName}')`);
        }
      }
      if (searchType) {
        if (searchType.toLowerCase() === 'na') {
          filterArray.push('Type eq \'\'');
        } else {
          filterArray.push(`contains(Type,'${searchType}')`);
        }
      }
      if (searchworkHours) {
        if (searchworkHours.toLowerCase() === 'na') {
          filterArray.push('WorkHours eq null');
        } else {
          filterArray.push(`contains(WorkHours,'${searchworkHours}')`);
        }
      }
      if (searchworkDate) {
        if (searchworkDate.toLowerCase() === 'na') {
          filterArray.push('workDate eq \'\'');
        } else {
          filterArray.push(`workDate eq ${searchworkDate}`);
        }
      }
      if (searchcreatedDateTime) {
        if (searchcreatedDateTime.toLowerCase() === 'na') {
          filterArray.push('createdDateTime eq null');
        } else {
          filterArray.push(`createdDateTime eq ${searchcreatedDateTime}`);
        }
      }
      if (searchcreatedBy) {
        if (searchcreatedBy.toLowerCase() === 'na') {
          filterArray.push('createdBy eq null');
        } else {
          filterArray.push(`contains(createdBy,'${searchcreatedBy}')`);
        }
      }
      if (searchStatus) {
        if (searchStatus.toLowerCase() === 'na') {
          filterArray.push('Status eq null');
        } else {
          filterArray.push(`contains(Status,'${searchStatus}')`);
        }
      }
      console.log("filterArray", filterArray);
      let searchTerm = "";
      if (filterArray.length > 0) {
        searchTerm = filterArray.join(' and ');
      }
      console.log("searchterm:", searchTerm);
      if (searchTerm.length > 0)
        url += `${searchTerm}`;
      console.log(url)

    }
    return requests.getWithToken(url, accessToken);
  },
  getTimeSheetsDetails: (accessToken, id) => {
    return requests.getWithToken(`${apiUrl}/api/TimeSheet/Details?timeSheetId=${id}`, accessToken);
  },
  getTimeSheetLoggedHours: (accessToken, date) => {
    console.log("date:",date);
    return requests.getWithToken(`${apiUrl}/api/LoggedHour?inputdate=${date}`,accessToken);
  },
  getDeleteTimeSheetList: (accessToken, id) => {
    const {timesheetId}=id;
    console.log("id:",timesheetId);
    return requests.deleteWithToken(`${apiUrl}/api/TimeSheet/Remove?timesheetId=${timesheetId}`, accessToken);
  },
  createTimeSheet: (accessToken, data) => {
    return requests.postWithToken(`${apiUrl}/api/TimeSheet/Create`, data, accessToken);
  },
  editTimeSheet: (accessToken, data) => {
    return requests.postWithToken(`${apiUrl}/api/TimeSheet/Update`, data, accessToken);
  }

}
const MyTeamTimeSheet = {
  getMyTeamTimeSheetList: (accessToken, currentPage, PageSize = 15, searchuserName, searchprojectName, searchtaskName, searchType, searchworkHours, searchworkDate, searchcreatedDateTime, searchcreatedBy, searchUpdatedDateTime, searchStatus, searchReason) => {
    currentPage = parseInt(currentPage, 10);
    if (Number.isNaN(currentPage) || currentPage < 1) {
      currentPage = 1;
    }
    let url = `${apiUrl}/odata/ReviewerTimesheetList?$count=true&$skip=${(currentPage - 1) * PageSize}&$top=${PageSize}&$orderby=createdDateTime desc`;
    if (searchuserName || searchprojectName || searchtaskName || searchType || searchworkHours || searchworkDate || searchcreatedDateTime || searchcreatedBy || searchUpdatedDateTime || searchStatus || searchReason) {
      url += `&$filter=`;
      const filterArray = [];
      if (searchuserName) {
        if (searchuserName.toLowerCase() === 'na') {
          filterArray.push('UserName eq \'\'');
        } else {
          filterArray.push(`contains(UserName,'${searchuserName}')`);
        }
      }
      if (searchprojectName) {
        if (searchprojectName.toLowerCase() === 'na') {
          filterArray.push('ProjectName eq \'\'');
        } else {
          filterArray.push(`contains(ProjectName,'${searchprojectName}')`);
        }
      }
      if (searchtaskName) {
        if (searchtaskName.toLowerCase() === 'na') {
          filterArray.push('TaskName eq \'\'');
        } else {
          filterArray.push(`contains(TaskName,'${searchtaskName}')`);
        }
      }
      if (searchType) {
        if (searchType.toLowerCase() === 'na') {
          filterArray.push('Type eq \'\'');
        } else {
          filterArray.push(`contains(Type,'${searchType}')`);
        }
      }
      if (searchworkHours) {
        if (searchworkHours.toLowerCase() === 'na') {
          filterArray.push('WorkHours eq null');
        } else {
          filterArray.push(`contains(WorkHours,'${searchworkHours}')`);
        }
      }
      if (searchworkDate) {
        if (searchworkDate.toLowerCase() === 'na') {
          filterArray.push('workDate eq \'\'');
        } else {
          filterArray.push(`workDate eq ${searchworkDate}`);
        }
      }
      if (searchcreatedDateTime) {
        if (searchcreatedDateTime.toLowerCase() === 'na') {
          filterArray.push('CreatedDateTime eq null');
        } else {
          filterArray.push(`CreatedDateTime eq ${searchcreatedDateTime}`);
        }
      }
      if (searchUpdatedDateTime) {
        if (searchUpdatedDateTime.toLowerCase() === 'na') {
          filterArray.push('UpdatedTimeStamp eq null');
        } else {
          filterArray.push(`UpdatedTimeStamp eq ${searchUpdatedDateTime}`);
        }
      }
      if (searchcreatedBy) {
        if (searchcreatedBy.toLowerCase() === 'na') {
          filterArray.push('CreatedBy eq null');
        } else {
          filterArray.push(`contains(CreatedBy,'${searchcreatedBy}')`);
        }
      }
      if (searchStatus) {
        if (searchStatus.toLowerCase() === 'na') {
          filterArray.push('Status eq null');
        } else {
          filterArray.push(`contains(Status,'${searchStatus}')`);
        }
      }
      if (searchReason) {
        if (searchReason.toLowerCase() === 'na') {
          filterArray.push('Reason eq null');
        } else {
          filterArray.push(`contains(Reason,'${searchReason}')`);
        }
      }
      console.log("filterArray", filterArray);
      let searchTerm = "";
      if (filterArray.length > 0) {
        searchTerm = filterArray.join(' and ');
      }
      console.log("searchterm:", searchTerm);
      if (searchTerm.length > 0)
        url += `${searchTerm}`;
      console.log(url)
    }
    return requests.getWithToken(url, accessToken);
  },
  createTimeSheetAction: (accessToken, data) => {
    return requests.postWithToken(`${apiUrl}/api/TimeSheet/Updatestatus`, data, accessToken);
  },
}
const AllTimeSheet = {
  getAllTasklist: (accessToken, currentPage, PageSize, searchuserName, searchprojectName, searchtaskName, searchworkDate, searchworkHours, searchType, searchcreatedBy, searchcreatedDateTime, searchStatus, searchUpdatedBy, searchUpdatedDateTime) => {
    let url = `${apiUrl}/odata/OverAllTimesheetList?$count=true&$skip=${(currentPage - 1) * PageSize}&$top=${PageSize}&$orderby=CreatedDateTime desc`;
    if (searchuserName || searchprojectName || searchtaskName || searchType || searchworkHours || searchworkDate || searchcreatedDateTime || searchcreatedBy || searchUpdatedDateTime || searchStatus || searchUpdatedBy) {
      url += `&$filter=`;
      const filterArray = [];
      if (searchuserName) {
        if (searchuserName.toLowerCase() === 'na') {
          filterArray.push('UserName eq \'\'');
        } else {
          filterArray.push(`contains(UserName,'${searchuserName}')`);
        }
      }
      if (searchprojectName) {
        if (searchprojectName.toLowerCase() === 'na') {
          filterArray.push('ProjectName eq \'\'');
        } else {
          filterArray.push(`contains(ProjectName,'${searchprojectName}')`);
        }
      }
      if (searchtaskName) {
        if (searchtaskName.toLowerCase() === 'na') {
          filterArray.push('TaskName eq \'\'');
        } else {
          filterArray.push(`contains(TaskName,'${searchtaskName}')`);
        }
      }
      if (searchType) {
        if (searchType.toLowerCase() === 'na') {
          filterArray.push('Type eq \'\'');
        } else {
          filterArray.push(`contains(Type,'${searchType}')`);
        }
      }
      if (searchworkHours) {
        if (searchworkHours.toLowerCase() === 'na') {
          filterArray.push('WorkHours eq null');
        } else {
          // filterArray.push(`workHours eq ${searchworkHours}`);
          filterArray.push(`contains(WorkHours,'${searchworkHours}')`);
        }
      }
      if (searchworkDate) {
        if (searchworkDate.toLowerCase() === 'na') {
          filterArray.push('workDate eq \'\'');
        } else {
          filterArray.push(`workDate eq ${searchworkDate}`);
        }
      }
      if (searchcreatedDateTime) {
        if (searchcreatedDateTime.toLowerCase() === 'na') {
          filterArray.push('CreatedDateTime eq null');
        } else {
          filterArray.push(`CreatedDateTime eq ${searchcreatedDateTime}`);
        }
      }
      if (searchUpdatedDateTime) {
        if (searchUpdatedDateTime.toLowerCase() === 'na') {
          filterArray.push('UpdatedTimeStamp eq null');
        } else {
          filterArray.push(`UpdatedTimeStamp eq ${searchUpdatedDateTime}`);
        }
      }
      if (searchcreatedBy) {
        if (searchcreatedBy.toLowerCase() === 'na') {
          filterArray.push('CreatedBy eq null');
        } else {
          filterArray.push(`contains(CreatedBy,'${searchcreatedBy}')`);
        }
      }
      if (searchStatus) {
        if (searchStatus.toLowerCase() === 'na') {
          filterArray.push('Status eq null');
        } else {
          filterArray.push(`contains(Status,'${searchStatus}')`);
        }
      }
      if (searchUpdatedBy) {
        if (searchUpdatedBy.toLowerCase() === 'na') {
          filterArray.push('UpdatedBy eq null');
        } else {
          filterArray.push(`contains(UpdatedBy,'${searchUpdatedBy}')`);
        }
      }
      console.log("filterArray", filterArray);
      let searchTerm = "";
      if (filterArray.length > 0) {
        searchTerm = filterArray.join(' and ');
      }
      console.log("searchterm:", searchTerm);
      if (searchTerm.length > 0)
        url += `${searchTerm}`;
      console.log(url)
    }
    return requests.getWithToken(url, accessToken);
  },
}
const Dashboard ={
  getDashboardCounts: (accessToken) => {
    console.log("Token", accessToken)
    return requests.getWithToken(`${apiUrl}/api/DashBoard/DashBoardCount?$count=true`, accessToken)
  },
}

export default {
  Auth,
  User,
  TimeSheet,
  MyTeamTimeSheet,
  AllTimeSheet,
  Dashboard
}