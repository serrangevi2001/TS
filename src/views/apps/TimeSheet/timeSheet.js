import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import moment from 'moment';
import Badge from '@mui/material/Badge';
import {  Button, Card, CardBody, CardFooter, CardTitle, Input } from 'reactstrap'
import { closeActionTimeSheetDeleteModalAction, closeCreateTimeSheetModal, getTimeSheetListActionModal, openActionTimeSheetDeleteModalAction, openCreateTimeSheetModalAction } from '../../../store/apps/timeSheet/action';
import VWModel from '../../../components/vwModal/vwModal';
import AddTimeSheet from './timeSheetCreate'
import TimeSheetDelete from './timeSheetDelete';
import VWPagination from '../../../components/vwPagination/vwPagination'
import { getPager } from '../../../helpers/common';

const timeSheet = (props) => {
   //eslint-disable-next-line
   const [all, setAll] = useState(true);
   //eslint-disable-next-line
   const [Submitted, setSubmitted] = useState(false);
   //eslint-disable-next-line
   const [approved, setApproved] = useState(false);
   //eslint-disable-next-line
   const [rejected, setRejected] = useState(false);
  //eslint-disable-next-line
  const [deleteList, setDeleteList] = useState({})
  //eslint-disable-next-line
  const [PageSize] = useState(20);//eslint-disable-next-line
  const [Pager, setPager] = useState({ currentPage: 1 })//eslint-disable-next-line
  const [filter, setFilter] = useState({});

  const buildQueryuserName = () => {
    const { UserName } = filter;
    let searchuserName = '';
    if (UserName) {
      searchuserName += `${UserName}`;
    }
    return searchuserName
  }
  const buildQueryprojectName = () => {
    const { ProjectName } = filter;
    let searchprojectName = '';
    if (ProjectName) {
      searchprojectName += `${ProjectName}`;
    }
    return searchprojectName
  }
  const buildQuerytaskName = () => {
    const { TaskName } = filter;
    let searchtaskName = '';
    if (TaskName) {
      searchtaskName += `${TaskName}`;
    }
    return searchtaskName
  }
  const buildQueryType = () => {
    const { Type } = filter;
    let searchType = '';
    if (Type) {
      searchType += `${Type}`;
    }
    return searchType
  }
  const buildworkHours = () => {
    const { WorkHours } = filter;
    let searchworkHours = '';
    if (WorkHours) {
      searchworkHours += `${WorkHours}`;
    }
    return searchworkHours
  }
  const buildworkDate = () => {
    const { WorkDate } = filter;
    let searchworkDate = '';
    if (WorkDate) {
      searchworkDate += `${WorkDate}`;
    }
    return searchworkDate
  }
  const buildcreatedDateTime = () => {
    const { CreatedDateTime } = filter;
    let searchcreatedDateTime = '';
    if (CreatedDateTime) {
      searchcreatedDateTime += `${CreatedDateTime}`;
    }
    return searchcreatedDateTime
  }
  const buildcreatedBy = () => {
    const { CreatedBy } = filter;
    let searchcreatedBy = '';
    if (CreatedBy) {
      searchcreatedBy += `${CreatedBy}`;
    }
    return searchcreatedBy
  }
  const buildStatus = () => {
    const { Status } = filter;
    let searchStatus = '';
    if (Status) {
      searchStatus += `${Status}`;
    }
    return searchStatus
  }

  const setPage = (page = 1) => {
    props.getTimeSheetListAction(page, PageSize, buildQueryuserName(), buildQueryprojectName(), buildQuerytaskName(), buildQueryType(), buildworkHours(), buildworkDate(), buildcreatedDateTime(), buildcreatedBy(), buildStatus());

    setPager(prevPager => {
      const totalPages = Math.ceil(props.totalCount / PageSize);
      const visiblePages = 4;
      const pageOffset = Math.max(0, Math.floor((page - 1) / visiblePages) * visiblePages);
      const newPages = [];
      for (let i = pageOffset + 1; i <= Math.min(totalPages, pageOffset + visiblePages); i++) {
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
  useEffect(() => {
    const currentPager = getPager(props.totalCount, 1, PageSize)
    setPager(currentPager)
  }, [props.totalCount])

  //eslint-disable-next-line
  useEffect(() => {
    const currentPageNumber = Pager && Pager.currentPage;
    setPage(currentPageNumber);
  }, [])

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
  useEffect(() => {
    handleSearchClick();
  }, [filter.CreatedDateTime, filter.WorkDate,filter.Status])

  //-----------------------------------------Modal open & close-----------------------------------------------------

  const handleOpenTimeSheet = () => {
    console.log("isCreateTimeSheetModalOpen:", props.isCreateTimeSheetModalOpen)
    props.openCreateTimeSheetModalAction();
  };
  const handleClose = () => {
    props.closeCreateTimeSheetModalAction();
    props.closeActionTimeSheetDeleteModalAction()
  };

  //---------------------------------------Delete List-------------------------------------------------------------

  const selectOnChange = (value, Id) => {
    console.log("value:", value);
    setDeleteList({
      ...deleteList,
      timesheetId: Id
    })
    console.log("Id:", Id);
    props.openActionTimeSheetDeleteModal();
  }
  //------------------------------------------Status filter -----------------------------------------------------
  const handleAllAction = () => {
    setAll(true);
    setRejected(false);
    setApproved(false);
    setSubmitted(false);
    setFilter({
      ...filter,
      Status: "",
    })

  };
  const handleSubmittedAction = () => {
    setAll(false);
    setRejected(false);
    setApproved(false);
    setSubmitted(true);
    setFilter({
      ...filter,
      Status: "Submitted",
    })
  };
  const handleRejectedAction = () => {
    setAll(false);
    setRejected(true);
    setApproved(false);
    setSubmitted(false);
    setFilter({
      ...filter,
      Status: "Rejected",
    })
  };
  const handleApprovedAction = () => {
    setAll(false);
    setRejected(false);
    setApproved(true);
    setSubmitted(false);
    setFilter({
      ...filter,
      Status: "Approved",
    })
  };
  //--------------------------------------------------------------------------------------------------------------
  console.log("isCreateTimeSheetModalOpen:", props.isCreateTimeSheetModalOpen)
  console.log("TimeSheetList:", props.TimeSheetList)
  console.log("isDeleteTimeSheetModalOpen:", props.isDeleteTimeSheetModalOpen)
  console.log("isDeleteTimeSheetModalOpen:", props.isDeleteTimeSheetModalOpen)
  console.log("totalCount:", props.totalCount)
  return (
    <>
      {/* <Container> */}
        <Card>
          <CardTitle
            tag="h4"
            className=" px-4 py-3 mb-0 d-flex justify-content-between align-items-center" >
            My Timesheet
            <div className="ml-auto">
              <Link
                type="button"
                className="btn btn-sm btn-outline-dark-success"
                onClick={handleOpenTimeSheet}
              >
                Create
              </Link>&nbsp;
            </div>
          </CardTitle>
          
          <CardTitle className="border-bottom px-4 py-3 ">
            <Badge  badgeContent={ props.totalCount} color="primary" invisible = { all !== true}>
              <Button
                style={{ width: '100px' }}
                onClick={handleAllAction}
                className={all !== true ? "btn btn-outline-secondary" : 'btn btn-outline-secondary active'}
                outline color="secondary"
              ><b>All</b>
              </Button>
            </Badge>&nbsp;
            <Badge badgeContent={props.totalCount} color="primary"  invisible = { Submitted !== true}>
              <Button
                style={{ width: '100px' }}
                onClick={handleSubmittedAction}
                className={Submitted !== true ? "btn btn-outline-primary " : 'btn btn-outline-primary  active'}
                outline color="primary"
              ><b>Submitted</b>
              </Button>
            </Badge>&nbsp;
            <Badge badgeContent={props.totalCount} color="primary" invisible = { approved !== true}>
              <Button
                style={{ width: '100px' }}
                onClick={handleApprovedAction}
                className={approved !== true ? "btn btn-outline-success" : 'btn btn-outline-success active'}
                outline color="success"
              ><b>Approved</b>
              </Button>
            </Badge>&nbsp;
            <Badge badgeContent={props.totalCount} color="primary" invisible = { rejected !== true}>
              <Button
                style={{ width: '100px' }}
                onClick={handleRejectedAction}
                className={rejected !== true ? "btn btn-outline-danger " : 'btn btn-outline-danger  active'}
                outline color="danger"
              ><b>Rejected</b>
              </Button>
            </Badge>&nbsp;
          </CardTitle>
          {/* </Card>
          <Card> */}
          <CardBody className="p-4">
            <div style={{ minHeight: "400px", overflowX: "auto", maxWidth: "1390px" }}>
              <table className="table table-striped table-hover w-100">
                <thead>
                  <tr>
                    <th >
                      Username
                    </th>
                    <th>
                      Project Name
                    </th>
                    <th>
                      Task Name
                    </th>
                    <th>Type</th>
                    <th>
                      Work Date
                    </th>
                    <th>
                      Created Date
                    </th>
                    <th>
                      Created By
                    </th>
                    <th>
                      Status
                    </th>
                    <th>
                      Work Hours
                    </th>
                    <th>
                      View
                    </th>
                    <th>
                      Delete
                    </th>
                  </tr>
                  <tr>
                    <th><Input style={{ width: '100px' }} type='text' placeholder='Search' name='UserName' onChange={searchInputValidation} value={filter && filter.UserName} onKeyPress={handleKeyPress} /></th>
                    <th><Input style={{ width: '100px' }} type='text' placeholder='Search' name='ProjectName' onChange={searchInputValidation} value={filter && filter.ProjectName} onKeyPress={handleKeyPress} /></th>
                    <th><Input style={{ width: '100px' }} type='text' placeholder='Search' name='TaskName' onChange={searchInputValidation} value={filter && filter.TaskName} onKeyPress={handleKeyPress} /></th>
                    <th><Input style={{ width: '100px' }} type='text' placeholder='Search' name='Type' onChange={searchInputValidation} value={filter && filter.Type} onKeyPress={handleKeyPress} /></th>
                    <th><Input style={{ width: '140px' }} type='date' placeholder='Search' name='WorkDate' onChange={searchInputValidation} value={filter && filter.WorkDate} onKeyPress={handleKeyPress} /></th>
                    <th><Input style={{ width: '140px' }} type='date' placeholder='Search' name='CreatedDateTime' onChange={searchInputValidationDate} value={filter && filter.CreatedDateTime} onKeyPress={handleKeyPress} /></th>
                    <th><Input style={{ width: '100px' }} type='text' placeholder='Search' name='CreatedBy' onChange={searchInputValidation} value={filter && filter.CreatedBy} onKeyPress={handleKeyPress} /></th>
                    <th><Input style={{ width: '90px' }} type='text' placeholder='Search' name='Status' onChange={searchInputValidation} value={filter && filter.Status} onKeyPress={handleKeyPress} /></th>
                    <th><Input style={{ width: '90px' }} type='text' placeholder='Search' name='WorkHours' onChange={searchInputValidation} value={filter && filter.WorkHours} onKeyPress={handleKeyPress} /></th>
                  </tr>
                </thead>
                {props.TimeSheetList && props.TimeSheetList.length > 0 ?
                  props.TimeSheetList && props.TimeSheetList.map((data) => (
                    <tbody>
                      <tr>
                        <td>{data.UserName || "NA"}</td>
                        <td>{data.ProjectName || "NA"}</td>
                        <td>{data.TaskName || "NA"}</td>
                        <td>{data.Type || "NA"}</td>
                        <td>{data.WorkDate ? moment(data.WorkDate).format('DD MMM YYYY') : 'NA'}</td>
                        <td>{data.CreatedDateTime ? moment(data.CreatedDateTime).format('DD MMM YYYY') : 'NA'}</td>
                        <td>{data.CreatedBy || "NA"}</td>
                        <td>{data.Status || "NA"}</td>
                        <td>{`${data.WorkHours} hrs` || "NA"}</td>
                        <td> <Link
                          type="button"
                          className="btn btn-sm btn-outline-dark-success"
                          to={`/app/timesheet/details/${data.Id}`}
                        >
                          <i className="bi bi-search"></i>
                        </Link></td>
                        <td>
                          <Button className="btn btn-sm  btn-danger"
                            onClick={(e) => { selectOnChange(e, data.Id) }}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  ))
                  : ""}
              </table>
            </div>
          </CardBody>
          <CardFooter>
            <VWPagination pager={Pager} setPage={setPage} />
          </CardFooter>
        </Card>
        <VWModel modalSize='extra-large'

          header="CREATE TIMESHEET"
          isOpen={props.isCreateTimeSheetModalOpen}
          handleClose={handleClose}
        >
          <AddTimeSheet handleClose={handleClose} />
        </VWModel>
        <VWModel
         //eslint-disable-next-line
          centered={true}
          header="DELETE TIMESHEET"
          isOpen={props.isDeleteTimeSheetModalOpen}
          handleClose={handleClose}
        >
          <TimeSheetDelete data={deleteList} handleClose={handleClose} />
        </VWModel>
      {/* </Container> */}
    </>
  )
}
const mapStateToProps = (state) => ({
  isCreateTimeSheetModalOpen: state.TimeSheet.isCreateTimeSheetModalOpen,
  isDeleteTimeSheetModalOpen: state.TimeSheet.isDeleteTimeSheetModalOpen,
  TimeSheetList: state.TimeSheet.TimeSheetList,
  totalCount: state.TimeSheet.totalRecords,
});

const mapDispatchToProps = (dispatch) => ({
  getTimeSheetListAction: (page, PageSize, searchuserName, searchprojectName, searchtaskName, searchType, searchworkHours, searchworkDate, searchcreatedDateTime, searchcreatedBy, searchStatus) => dispatch(getTimeSheetListActionModal(page, PageSize, searchuserName, searchprojectName, searchtaskName, searchType, searchworkHours, searchworkDate, searchcreatedDateTime, searchcreatedBy, searchStatus)),
  closeCreateTimeSheetModalAction: () => dispatch(closeCreateTimeSheetModal()),
  openCreateTimeSheetModalAction: () => dispatch(openCreateTimeSheetModalAction()),
  closeActionTimeSheetDeleteModalAction: () => dispatch(closeActionTimeSheetDeleteModalAction()),
  openActionTimeSheetDeleteModal: () => dispatch(openActionTimeSheetDeleteModalAction()),

});

export default connect(mapStateToProps, mapDispatchToProps)(timeSheet)

