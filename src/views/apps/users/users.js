/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-table-v6/react-table.css';
import { Card, CardBody, CardFooter, CardTitle, Container, Input } from 'reactstrap';
// import Datatable from '../../../components/tables/datatable';
// import Select from "react-select";
import moment from 'moment';
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { closeCreateUserModal, getUsersList, openCreateUserModal } from '../../../store/apps/users/actions';
import VWModel from '../../../components/vwModal/vwModal';
import AddUser from './addUser/addUser';
import VWPagination from '../../../components/vwPagination/vwPagination';
import { getPager } from '../../../helpers/common';
import { USERLIST_EXPORT_HEADERS } from '../../../store/apps/users/constants';


const mapStateToProps = (state) => ({
  userList: state.user.users,
  totalCount: state.user.totalRecords,
  isCreateUserModalOpen:state.user.isCreateUserModalOpen
});

const mapDispatchToProps = (dispatch) => ({
  getUsersAction:(page,PageSize,searchFirstName,searchLastName,searchDisplayName,searchReviewUser,searchCreatedTimeStamp,searchUserName,searchPhone,searchRole) => dispatch(getUsersList(page,PageSize,searchFirstName,searchLastName,searchDisplayName,searchReviewUser,searchCreatedTimeStamp,searchUserName,searchPhone,searchRole)),
  closeCreateUserModalAction:()=>dispatch(closeCreateUserModal()),
  openCreateUserModalAction:()=>dispatch(openCreateUserModal())
});

const Users = (props) => {
  
  const [PageSize] = useState(20);
  const [Pager, setPager] = useState({currentPage : 1})
  const [filter, setFilter] = useState({});

  const buildQueryFirstName = () => {
    const { FirstName } = filter;
    let searchFirstName = '';
    if (FirstName) {
      searchFirstName += `${FirstName}`;
    }
    return searchFirstName
  }
  const buildQueryLastName = () => {
    const { LastName } = filter;
    let searchLastName = '';
    if (LastName) {
      searchLastName += `${LastName}`;
    }
    return searchLastName
  }
  const buildQueryDisplayName = () => {
    const { DisplayName } = filter;
    let searchDisplayName = '';
    if (DisplayName) {
      searchDisplayName += `${DisplayName}`;
    }
    return searchDisplayName
  }
  const buildQueryUserName = () => {
    const { UserName } = filter;
    let searchUserName = '';
    if (UserName) {
      searchUserName += `${UserName}`;
    }
    return searchUserName
  }
  const buildQueryPhone = () => {
    const { Phone } = filter;
    let searchPhone = '';
    if (Phone) {
      searchPhone += `${Phone}`;
    }
    return searchPhone
  }
  const buildQueryRole = () => {
    const { Role } = filter;
    let searchRole = '';
    if (Role) {
      searchRole += `${Role}`;
    }
    return searchRole
  }

  const buildQueryReviewUser = () => {
    const { ReviewUser } = filter;
    let searchReviewUser = '';
    if (ReviewUser) {
      searchReviewUser += `${ReviewUser}`;
    }
    return searchReviewUser
  }
  const buildQueryCreatedTimeStamp = () => {
    const { CreatedTimeStamp } = filter;
    let searchCreatedTimeStamp = '';
    if (CreatedTimeStamp) {
      searchCreatedTimeStamp += `${CreatedTimeStamp}`;
    }
    return searchCreatedTimeStamp
  }

  const setPage = (page = 1) => {
    props.getUsersAction(page, PageSize,buildQueryFirstName(),buildQueryLastName(),buildQueryDisplayName(),buildQueryReviewUser(),buildQueryCreatedTimeStamp(),buildQueryUserName(),buildQueryPhone(),buildQueryRole());

    setPager(prevPager => {
      const totalPages = Math.ceil(props.totalCount / PageSize );
      const visiblePages = 4;
      const pageOffset = Math.max(0,Math.floor((page -1 ) / visiblePages) * visiblePages);
      const newPages = [];
      for(let i = pageOffset + 1; i <= Math.min(totalPages, pageOffset +  visiblePages); i++){
        newPages.push(i);
      }

      return {
        ...prevPager,
        currentPage: page,
        totalPages,
        pages: newPages,
      }
    })
  }
  //eslint-disable-next-line
  useEffect(()=>{
    const currentPager=getPager(props.totalCount,1,PageSize)
    setPager(currentPager)
  },[props.totalCount])

//eslint-disable-next-line
  useEffect(() =>{
    const currentPageNumber = Pager && Pager.currentPage;
    setPage(currentPageNumber);
  },[])

    // eslint-disable-next-line no-unused-vars
    const [dtOptions, _setDtOptions] = useState({
      searching: false,
      paging: false,
      ordering:true,
      info: false,
      responsive: true,
      scrollY: '650px',
    });

    const handleClose = () => {
      props.closeCreateUserModalAction();
    };

    const handleOpenCreateUser = () => {
      props.openCreateUserModalAction();
    };
    //-------------------------------------------filter-----------------------------------------------//

    const searchInputValidation = (event) => {
      const { value, name } = event.target;
      setFilter({
        ...filter,
        [name]: value,
      })
    }
    console.log("Filter:", filter)
  
    const handleSearchClick = () => {
      setPage();
    }
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearchClick();
      }
    }
    const searchInputValidationDate = (event) => {
      const { value, name } = event.target;
      setFilter({
        ...filter,
        [name]: value,
      })
    
    }
   //eslint-disable-next-line
      useEffect(()=>{
        handleSearchClick();
      },[filter.CreatedTimeStamp])

    //-------------------Export-----------------------------------------------------------------------//
    const handleExports = () => {

      const UserListsExports = [];
  
      props.userList.forEach((element) => {
        UserListsExports.push({
          FirstName: element.FirstName || "NA",
          LastName: element.LastName || "NA",
          DisplayName: element.DisplayName || "NA",
          UserName: element.UserName || "NA",
          Phone: element.Phone || "NA",
          ReviewerUser:element.ReviewUser || "NA",
          CreatedDate:element.CreatedTimeStamp ? moment(element.CreatedTimeStamp).format('DD MMM YYYY') : 'NA',
                });
      });
      console.log(UserListsExports)
      const wsa = XLSX.utils.aoa_to_sheet([USERLIST_EXPORT_HEADERS]);  
      const ws: XLSX.WorkSheet = XLSX.utils.sheet_add_json(
        wsa,
        UserListsExports,
        { skipHeader: true, origin: "A2" }
      );
      const wb: XLSX.WorkBook = { Sheets: {}, SheetNames: ["data"] };
      wb.Sheets.data = ws;
      const excelBuffer: any = XLSX.write(wb, {
        bookType: "biff8",
        type: "array",
      });
      const data: Blob = new Blob([excelBuffer]);
      FileSaver.saveAs(data, "users.xls");
    }
   
  console.log("userList:", props.userList)
  console.log("props.totalCount", props.totalCount)
  console.log("prevPager:",Pager )

  return (
    <>
    <Container>
      <Card>
        <CardTitle
          tag="h4"
          className="border-bottom px-4 py-3 mb-0 d-flex justify-content-between align-items-center" >
          Users
          <div className="ml-auto">
          <Link
                  type="button"
                  className="btn btn-sm btn-outline-dark-success"
                  onClick={handleOpenCreateUser}
                >
                  Create    
                </Link>&nbsp;
                <button
                  type="button"
                  className="btn btn-sm btn-outline-dark-success"
                  onClick={handleExports}
                >
                  Export
                </button>
          </div>
        </CardTitle>
        <CardBody className="p-4">
          <div style={{ maxHeight: "500px", overflowX: "auto", maxWidth: "1600px" }}>
        
           {/* <Datatable options={dtOptions}> */}
            <table className="table table-striped table-hover w-100">
              <thead>
                <tr>
                  <th>
                    First Name
                  </th>
                  <th>
                  Last Name
                  </th>
                  <th>
                  Display Name
                  </th>
                  <th>
                     Email
                  </th>
                  <th>
                    Phone #
                  </th>
                  <th>
                    Role
                  </th>
                  <th>
                  Reviewer
                  </th>
                  <th>
                  Created Date
                  </th>
                  <th>
                    View
                  </th>
                </tr>
                <tr>
                <th><Input  
                style={{ width: '100px' }}
                type='text' 
                placeholder='Search'
                 name='FirstName' 
                 onChange={searchInputValidation} 
                 value={filter && filter.FirstName} 
                 onKeyPress={handleKeyPress} 
                 />
                 </th>
                <th><Input  
                style={{ width: '100px' }}
                type='text' 
                placeholder='Search'
                 name='LastName' 
                 onChange={searchInputValidation} 
                 value={filter && filter.LastName} 
                 onKeyPress={handleKeyPress} 
                 />
                 </th>
                <th><Input  
                style={{ width: '100px' }}
                type='text' 
                placeholder='Search'
                 name='DisplayName' 
                 onChange={searchInputValidation} 
                 value={filter && filter.DisplayName} 
                 onKeyPress={handleKeyPress}
                  />
                 </th>
                <th><Input  
                type='text' 
                placeholder='Search'
                 name='UserName' 
                 onChange={searchInputValidation} 
                 value={filter && filter.UserName} 
                 onKeyPress={handleKeyPress}
                  />
                 </th>
                <th><Input  
                   style={{ width: '130px' }}
                type='text' 
                placeholder='Search'
                 name='Phone' 
                 onChange={searchInputValidation} 
                 value={filter && filter.Phone} 
                 onKeyPress={handleKeyPress}
                  />
                 </th>
               
                 <th><Input  
                type='text' 
                placeholder='Search'
                 name='Role' 
                 onChange={searchInputValidation} 
                 value={filter && filter.Role} 
                 onKeyPress={handleKeyPress}
                  />
                 </th>
                 <th><Input  
                type='text' 
                placeholder='Search'
                 name='ReviewUser' 
                 onChange={searchInputValidation} 
                 value={filter && filter.ReviewUser} 
                 onKeyPress={handleKeyPress}
                  />
                 </th>
                 <th><Input 
                 style={{ width: '140px' }}
                type='date' 
                placeholder='Search'
                 name='CreatedTimeStamp' 
                 onChange={searchInputValidationDate} 
                 value={filter && filter.CreatedTimeStamp} 
                 onKeyPress={handleKeyPress} 
                 />
                 </th>
                </tr>
              </thead>
              {props.userList && props.userList.length>0?
              props.userList && props.userList.map((data)=>(
              <tbody>
                <tr>
                  <td>{data.FirstName || "NA"}</td>
                  <td>{data.LastName || "NA"}</td>
                  <td>{data.DisplayName || "NA"}</td>
                  <td>{data.UserName || "NA"}</td>
                  <td>{data.Phone || "NA"}</td>
                  <td>{data.Role || "NA"}</td>
                  <td>{data.ReviewUser || "NA"}</td>
                  <td>{data.CreatedTimeStamp? moment(data.CreatedTimeStamp).format('DD MMM YYYY'):'NA'}</td>
                  <td>
                  <Link
                            type="button"
                            className="btn btn-sm btn-outline-dark-success"
                            to={`/app/users/details/${data.Id}`}
                          >
                            <i className="bi bi-search"></i>
                          </Link>
                  </td>
                </tr>
              </tbody>
              )):''}
            </table>
             {/* </Datatable> */}
          
          </div>
        </CardBody>
        <CardFooter>
        {/* <span >&copy; {new Date().getFullYear()} TPT</span> */}
            <VWPagination pager={Pager} setPage={setPage} />
          </CardFooter>
      </Card>
      <VWModel
          
          header="CREATE USER"
          isOpen={props.isCreateUserModalOpen}
          handleClose={handleClose}
        >
          <AddUser handleClose={handleClose} />
        </VWModel>
      </Container>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
