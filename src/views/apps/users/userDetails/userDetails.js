// /* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {  Link, useParams } from 'react-router-dom';
import {  Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import VWButton from '../../../../components/vwButton/VWButton';
import VWModel from '../../../../components/vwModal/vwModal';
import VWSkeleton from '../../../../components/vwSkeleton/vwSkeleton';
import {
  closeChangePasswordModal,
  closeEditUserModal,
  closeResetPasswordModal,
  // closeChangePasswordModal,
  // closeEditUserModal,
  getUserDetails, openChangePasswordModal, openEditUserModal, openResetPasswordModalAction,
  // openChangePasswordModal,
  // openEditUserModal,
  // sendResetPasswordEmail,
} from '../../../../store/apps/userDetails/actions';
import ChangePasswordForm from '../changePasswordForm/changePasswordForm';
import ResetPasswordForm from '../ResetPassword/resetPassword'
import EditUser from '../editUser/editUser';
import { clearForm } from '../../../../store/core/form/actions';



const UserDetails = (props) => {
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    props.getUserDetailsAction(id);
  }, [props.getUserDetailsAction, id]);

  // const handleResetPassword = () => {
  //   const { sendResetPasswordEmailAction, userDetails } = props;
  //   if (userDetails && userDetails.email && userDetails.displayName){ 
  //     const forgotPassword={"email":userDetails.email,"username":userDetails.userName}
  //     sendResetPasswordEmailAction(forgotPassword);
  //   }
  // };

  const handleCloseChangePasswordModel = () => {
    const { closeChangePasswordModalAction, clearFormAction } = props;
    clearFormAction();
    closeChangePasswordModalAction();
  };
  const handleCloseResetPasswordModel = () => {
    const { closeResetPasswordModalAction, clearFormAction } = props;
    clearFormAction();
    closeResetPasswordModalAction();
  };

  const handleOpenChangePasswordModel = () => {
    const { openChangePasswordModalAction } = props;
    openChangePasswordModalAction();
  };
  const handleOpenResetPasswordModel = () => {
    const { openResetPasswordModal } = props;
    openResetPasswordModal();
  };

  const handleCloseEditUserModel = () => {
    const { closeEditUserModalAction} = props;
   
    closeEditUserModalAction();
  };

  const handleOpenEditUserModel = () => {
    const { openEditUserModalAction } = props;
    openEditUserModalAction();
  };

 console.log("userDetails :",props.userDetails)
 console.log("LoginUserId :",props.LoginUserId)
 console.log("isResetPasswordModalOpen :",props.isResetPasswordModalOpen)
 console.log("props.LoginUserId === props.userDetails && props.userDetails.id:",((props.currentRole)===(props.userDetails && props.userDetails.role) && (props.LoginUserId) === (props.userDetails && props.userDetails.id)))
  return (
    <Card>
      <CardTitle
        tag="h4"
        className="border-bottom px-4 py-3 mb-0 d-flex justify-content-between align-items-center"
      >
        User Details
        {/* {(props.currentRole && props.currentRole.roleDisplayName === 'Admin') ?( */}
          <Link
            type="button"
            className="btn btn-sm btn-outline-dark-success"
            onClick={handleOpenEditUserModel}
          >
            Edit
          </Link>
           {/* ) : ""} */}
      </CardTitle>
      <CardBody className="p-4">
        {props.isGetUserDetailsPending ? (
          <>
            <VWSkeleton type="base" />
          </>
        ) : (
          props.userDetails && (
            <Row className="justify-content-center">
              <Col xl="6">
                {/* Main card */}
                <div className="card b">
                  <div className="card-header">
                    <h4 className="my-2">
                      <span>{props.userDetails.displayName.toUpperCase()}</span>
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
                                  <strong>First Name</strong>
                                </td>
                                <td>{props.userDetails.firstName || "NA"}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Last Name</strong>
                                </td>
                                <td>{props.userDetails.lastName || "NA"}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Display Name</strong>
                                </td>
                                <td>{props.userDetails.displayName || "NA"}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong> Email</strong>
                                </td>
                                <td>{props.userDetails.userName}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Phone #</strong>
                                </td>
                                <td>{props.userDetails.phone || 'NA'}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Reviewer</strong>
                                </td>
                                <td>{props.userDetails && props.userDetails.reviewUser || 'NA'}</td>
                              </tr>
                              
                              <tr>
                                <td>
                                  <strong>Role</strong>
                                </td>
                                <td>{props.userDetails && props.userDetails.role || 'NA'}</td>
                              </tr>
                              <tr>
                              <td>
                                  <strong>Created Date</strong>
                                </td>
                              <td>{props.userDetails? moment(props.userDetails.createdTimeStamp).format('DD MMM YYYY'):'NA'}</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                   </div>
                  {(props.currentRole)===(props.userDetails && props.userDetails.role) && (props.LoginUserId) === (props.userDetails && props.userDetails.id)?
                  <div className="card-body bt">
                  <div className="row pl-4">
                    <div className="col-lg-12">
                          <h4>Change Password</h4>
                          <small className="text-muted subheader text-sm">
                            In order to change a password you will need to provide your current
                            password.
                          </small>
                          <div className="mt-2">
                            <VWButton
                              messageKey="changePasswordButton"
                              defaultMessage="Change Password"
                              buttonType="info"
                              baseClassName="btn btn-outline-info"
                              className="btn-oval"
                              onClick={handleOpenChangePasswordModel}
                            ></VWButton>
                          </div>
                    </div>
                  </div>
                 </div>
                  :
                  <div className="card-body bt">
                    <div className="row pl-4">
                      <div className="col-lg-12">
                            <h4>Reset Password</h4>
                            <div className="mt-2">
                              <VWButton
                                messageKey="resetPasswordButton"
                                defaultMessage="Reset Password"
                                buttonType="info"
                                baseClassName="btn btn-outline-info"
                                className="btn-oval"
                                onClick={handleOpenResetPasswordModel}
                              ></VWButton>
                            </div>
                      </div>
                    </div>
                  </div>
                  }
 
                </div>
              </Col>
            </Row>
          )
        )}
      </CardBody>
      <VWModel
        header="RESET PASSWORD"
        isOpen={props.isResetPasswordModalOpen}
        handleClose={handleCloseResetPasswordModel}
      >
        <ResetPasswordForm handleClose={handleCloseResetPasswordModel} />
      </VWModel>
      <VWModel
        header="CHANGE PASSWORD"
        isOpen={props.isChangePasswordModalOpen}
        handleClose={handleCloseChangePasswordModel}
      >
        <ChangePasswordForm handleClose={handleCloseChangePasswordModel} />
      </VWModel>
      <VWModel
        header="UPDATE USER"
        isOpen={props.isEditUserModalOpen}
        handleClose={handleCloseEditUserModel}
      >
        <EditUser handleClose={handleCloseEditUserModel} />
      </VWModel>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  form: state.form,
  userDetails: state.userDetails.user,
//   isGetUserDetailsPending: state.userDetails.isGetUserDetailsPending,
//   isResetPasswordPending: state.userDetails.isResetPasswordPending,
  isChangePasswordModalOpen: state.userDetails.isChangePasswordModalOpen,
  isResetPasswordModalOpen: state.userDetails.isResetPasswordModalOpen,
  isEditUserModalOpen: state.userDetails.isEditUserModalOpen,
  currentRole: state.login.profile.currentUserRoles,
  LoginUserId: state.login.profile.UserId,
});

const mapDispatchToProps = (dispatch) => ({
  getUserDetailsAction: (userId) => dispatch(getUserDetails(userId)),
//   sendResetPasswordEmailAction: (email) => dispatch(sendResetPasswordEmail(email)),
  closeChangePasswordModalAction: () => dispatch(closeChangePasswordModal()),
  closeResetPasswordModalAction: () => dispatch(closeResetPasswordModal()),
  openEditUserModalAction: () => dispatch(openEditUserModal()),
  openChangePasswordModalAction: () => dispatch(openChangePasswordModal()),
  openResetPasswordModal: () => dispatch(openResetPasswordModalAction()),
clearFormAction: () => dispatch(clearForm()),
  closeEditUserModalAction: () => dispatch(closeEditUserModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);


