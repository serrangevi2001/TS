import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import { closeEditTimeSheetModal, getTimeSheetDetails, openEditTimeSheetModal } from '../../../store/apps/timeSheet/action';
import VWModel from '../../../components/vwModal/vwModal';
import EditTimeSheetMaster from './timeSheetUpdate'

const timeSheetDetails = (props) => {//eslint-disable-next-line
  const params = useParams();
  const { id } = params;
  //eslint-disable-next-line
  useEffect(() => {
    props.getTimeSheetDetailsAction(id);
  }, [props.getTimeSheetDetailsAction, id]);

  console.log("TimeSheetDetails:", props.TimeSheetDetails)

  const handleOpenEditTimesheetModel = () => {
    const { openEditTimeSheetModalAction } = props;
    openEditTimeSheetModalAction();
  };

  const handleCloseEditTimeSheetModel = () => {
    const { closeEditTimeSheetModalAction } = props;
    closeEditTimeSheetModalAction();
  };

  console.log("isEditTimeSheetModalOpen:", props.isEditTimeSheetModalOpen)
  return (
    <>
      <Card>
        <CardTitle
          tag="h4"
          className="border-bottom px-4 py-3 mb-0 d-flex justify-content-between align-items-center"
        >
          Timesheet Details
          <Link type="button" className="btn btn-sm btn-outline-dark-success"
            onClick={handleOpenEditTimesheetModel}
          >
            Edit
          </Link>
        </CardTitle>
        <CardBody className="p-4">


          <Row className="justify-content-center">
            <Col xl="6">
              {/* Main card */}
              <div className="card b">
                <div className="card-header">
                  <h4 className="my-2">
                    <span>{props.TimeSheetDetails && props.TimeSheetDetails.userName || "NA"}</span>
                  </h4>
                </div>
                <div className="card-body bt">
                  <div className="row pl-4">
                    <div className="col-lg-12">
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover">
                          <tbody>
                            <tr>
                              <td>
                                <strong>User Name</strong>
                              </td>
                              <td>{props.TimeSheetDetails && props.TimeSheetDetails.userName || "NA"}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Project Name</strong>
                              </td>
                              <td>{props.TimeSheetDetails && props.TimeSheetDetails.projectName || "NA"}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Task Name</strong>
                              </td>
                              <td>{props.TimeSheetDetails && props.TimeSheetDetails.taskName || "NA"}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Type</strong>
                              </td>
                              <td>{props.TimeSheetDetails && props.TimeSheetDetails.type || "NA"}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Work Hours</strong>
                              </td>
                              <td>{`${props.TimeSheetDetails && props.TimeSheetDetails.workHours} hrs` || "NA"}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Work Date</strong>
                              </td>
                              <td>{props.TimeSheetDetails && props.TimeSheetDetails.workDate ? moment(props.TimeSheetDetails && props.TimeSheetDetails.workDate).format('DD MMM YYYY') : 'NA' || "NA"}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Created Date</strong>
                              </td>
                              <td>{props.TimeSheetDetails && props.TimeSheetDetails.createdDateTime ? moment(props.TimeSheetDetails && props.TimeSheetDetails.createdDateTime).format('DD MMM YYYY') : 'NA'}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Created By</strong>
                              </td>
                              <td>{props.TimeSheetDetails && props.TimeSheetDetails.createdBy || 'NA'}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Reason</strong>
                              </td>
                              <td>{props.TimeSheetDetails && props.TimeSheetDetails.reason || 'NA'}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Status</strong>
                              </td>
                              <td>{props.TimeSheetDetails && props.TimeSheetDetails.status || 'NA'}</td>
                            </tr>


                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
        <VWModel
          header="UPDATE TIMESHEET"
          isOpen={props.isEditTimeSheetModalOpen}
          handleClose={handleCloseEditTimeSheetModel}
        >
          <EditTimeSheetMaster handleClose={handleCloseEditTimeSheetModel} />
        </VWModel>
      </Card>
    </>
  )
}
const mapStateToProps = (state) => ({
  TimeSheetDetails: state.TimeSheet.timeSheetDetails,
  isEditTimeSheetModalOpen: state.TimeSheet.isEditTimeSheetModalOpen
});

const mapDispatchToProps = (dispatch) => ({
  getTimeSheetDetailsAction: (Id) => dispatch(getTimeSheetDetails(Id)),
  openEditTimeSheetModalAction: () => dispatch(openEditTimeSheetModal()),
  closeEditTimeSheetModalAction: () => dispatch(closeEditTimeSheetModal())
});
export default connect(mapStateToProps, mapDispatchToProps)(timeSheetDetails)