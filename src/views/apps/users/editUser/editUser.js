/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { Input } from 'reactstrap';
import { connect } from 'react-redux';
import Async from 'react-select/async';
// import Select from "react-select";
import { getReviewerUserIDAsyncSelect, getRoleIdAsyncSelect, updateUser } from '../../../../store/apps/userDetails/actions';
import FormValidator from '../../../../helpers/formValidator';
import VWButton from '../../../../components/vwButton/VWButton';
import VWMessage from '../../../../components/vwMessage/vwMessage';



const mapStateToProps = (state) => ({
  isPending: state.userDetails.isUpdateUserPending,
  errorMessage: state.userDetails.updateUserErrorMessage,
  userDetails: state.userDetails.user,
  currentRole: state.login.profile.currentUserRoles,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserAction: (user) => dispatch(updateUser(user)),
    getReviewerUserIDAsyncSelect: (inputSearch, callback) => dispatch(getReviewerUserIDAsyncSelect(inputSearch, callback)),
    getRoleIdAsyncSelect: (inputSearch, callback) => dispatch(getRoleIdAsyncSelect(inputSearch, callback)),
});


class EditUser extends Component {
  state = {
    user: null,
    prevSection: {},
    contactNumberValid: true,
    selectedReviewer:{},
    selectedRole:{}
  };

  componentDidMount = () => {
    const { userDetails,currentRole } = this.props;
    if (userDetails) {
      console.log("userDetails:", userDetails)
      const ReviewerList = [];
      ReviewerList.push({
        label: userDetails.reviewUser,
        value: userDetails.reviewUserId,
      })
      const RoleList =[];
      RoleList.push({
        label: userDetails.role,
        value: userDetails.roleId,
      })
      this.setState({
        user: {
          ...userDetails,
          currentRole
        },
        selectedReviewer:ReviewerList,
        selectedRole:RoleList
      });
    }
    }
  

  validateOnChange = (event) => {
    const input = event.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;
    const { user } = this.state;

    let result = FormValidator.validate(input);

    if (input.name === 'phone') {
      if (value.length !== 10 || !/^\d+$/.test(value)) {
        result = 'Enter Valid Contact Number'
        this.setState({ contactNumberValid: false });
      } else {
        this.setState({ contactNumberValid: true });
      }
    }
    this.setState({
      user: {
        ...user,
        [input.name]: value,
        errors: {
          ...(user && user.errors),
          [input.name]: result,
        },

      },
    });
  };

  hasError = (formName, inputName, method) => {
    const { user } = this.state;
    return user && user.errors && user.errors[inputName] && user.errors[inputName][method];
  };

  handleUpdateUser = () => {
    const { updateUserAction } = this.props;
    const { user } = this.state;
    updateUserAction(user);
  };

  handleRoleID = (inputValue, callback) => {
    //eslint-disable-next-line
    const { getRoleIdAsyncSelect } = this.props;
    return getRoleIdAsyncSelect(inputValue.length > 2 ? inputValue : '', callback);
  };

  handleAdRoleChange = (value) => {
    console.log("value:", value);
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        roleId:value.value,
        errors: {
          ...(user && user.errors),
        },
      },
      selectedRole:value
    });
  }

  handleReviewerUserID = (inputValue, callback) => {
    //eslint-disable-next-line
    const { getReviewerUserIDAsyncSelect } = this.props;
    return getReviewerUserIDAsyncSelect(inputValue.length > 2 ? inputValue : '', callback);
  };

  handleAddReviewerUserChange = (value) => {
    console.log("value:", value);
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        reviewUserId:value.value,
        errors: {
          ...(user && user.errors),
        },
      },
      selectedReviewer:value
    });
  }



  render() {
    const { handleClose, isPending, errorMessage } = this.props;
    const { user ,selectedReviewer,selectedRole} = this.state;

    console.log("userDetails:", this.props.userDetails)
    console.log("user:", this.state.user)
    console.log("prevSection:", this.state.prevSection)
    console.log("selectedReviewer:", this.state.selectedReviewer)
    console.log("selectedRole:", this.state.selectedRole)
    console.log("currentRole:", this.props.currentRole)

    return (
      <>
        {errorMessage && (
          <VWMessage type="danger" defaultMessage={errorMessage} baseClassName="alert"></VWMessage>
        )}

        <form className="mb-3" name="formUpdateUser">
          <div className="form-group">
            <label className="col-form-label">
              First Name <span className="text-danger">*</span>
            </label>
            <Input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              invalid={this.hasError('formUpdateUser', 'firstName', 'required')}
              onChange={this.validateOnChange}
              data-validate='["required"]'
              value={user && user.firstName}
            />
            {this.hasError('formUpdateUser', 'firstName', 'required') && (
              <span className="invalid-feedback">First name is required</span>
            )}
          </div>
          <div className="form-group">
            <label className="col-form-label">
              Last Name
            </label>
            <Input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              invalid={this.hasError('formUpdateUser', 'lastName', 'required')}
              onChange={this.validateOnChange}
              data-validate='["required"]'
              value={user && user.lastName}
            />
            {this.hasError('formUpdateUser', 'lastName', 'required') && (
              <span className="invalid-feedback">Last name is required</span>
            )}
          </div>
          <div className="form-group">
            <label className="col-form-label">
               Email <span className="text-danger">*</span>
            </label>
            <Input
              type="text"
              name="userName"
              placeholder="Enter Email"
              invalid={this.hasError('formUpdateUser', 'userName', 'required')}
              onChange={this.validateOnChange}
              data-validate='["required"]'
              value={user && user.userName}
              disabled
            />
            {this.hasError('formUpdateUser', 'userName', 'required') && (
              <span className="invalid-feedback">User name is required</span>
            )}
          </div>
          <div className="form-group">
            <label className="col-form-label">Phone #</label>
            <Input
              type="number"
              name="phone"
              placeholder="Enter Phone #"
              value={user && user.phone}
              invalid={!this.state.contactNumberValid}
              data-validate='["required"]'
              // valid={user && user.errors && user.phone}
              onChange={this.validateOnChange}
            />
            {user && user.errors && user.errors.phone &&
              (
                <span className="invalid-feedback">
                  {user.errors && user.errors.phone}
                </span>
              )}
          </div>
          {(this.props && this.props.currentRole==="Administrators" || this.props && this.props.currentRole==="Manager") ?(
          <div className="form-group">
            <label className="col-form-label">
              Reviewer <span className="text-danger">*</span>
            </label>
           <Async 
            name="reviewUserId"
            placeholder="select Reviewer"
            className="vm-react-select"
            isSearchable
            defaultOptions
            loadOptions={this.handleReviewerUserID}
            // onInputChange={this.handleSearchProductCode}
            onChange={this.handleAddReviewerUserChange}
            // inputValue={searchValue}
            openMenuOnFocus
            value={selectedReviewer}
           />
          </div>
            ): <div className="form-group">
            <label className="col-form-label">
              Reviewer <span className="text-danger">*</span>
            </label>
           <Async 
            name="reviewUserId"
            placeholder="select Reviewer"
            className="vm-react-select"
            isSearchable
            defaultOptions
            // loadOptions={this.handleReviewerUserID}
            // onInputChange={this.handleSearchProductCode}
            // onChange={this.handleAddReviewerUserChange}
            // inputValue={searchValue}
            openMenuOnFocus
            value={selectedReviewer}
            isDisabled
           />
          </div>}
             {(this.props && this.props.currentRole==="Administrators" || this.props && this.props.currentRole==="Manager") ?(
          <div className="form-group">
            <label className="col-form-label">
              Role <span className="text-danger">*</span>
            </label>
           <Async 
            name="roleId"
            placeholder="select Role"
            className="vm-react-select"
            isSearchable
            defaultOptions
            loadOptions={this.handleRoleID}
            // onInputChange={this.handleSearchProductCode}
            onChange={this.handleAdRoleChange}
            // inputValue={searchValue}
            openMenuOnFocus
            value={selectedRole}
           />
          </div>
             ) :
              (<div className="form-group">
             <label className="col-form-label">
               Role <span className="text-danger">*</span>
             </label>
            <Async 
             name="roleId"
             placeholder="select Role"
             className="vm-react-select"
             isSearchable
             defaultOptions
            //  loadOptions={this.handleRoleID}
             // onInputChange={this.handleSearchProductCode}
            //  onChange={this.handleAdRoleChange}
             // inputValue={searchValue}
             openMenuOnFocus
             value={selectedRole}
             isDisabled
            />
           </div>)}
        </form>

        <div className="form-group">
          <VWButton
            messageKey="updateUserButton"
            defaultMessage="Update User"
            buttonType="primary"
            baseClassName="btn"
            className="me-2"
            onClick={this.handleUpdateUser}
            isLoading={isPending}
            isDisabled={isPending}
          ></VWButton>
          <VWButton
            messageKey="cancelUpdateUserButton"
            defaultMessage="Cancel"
            buttonType="secondary"
            baseClassName="btn"
            onClick={handleClose}
            isDisabled={isPending}
          ></VWButton>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
