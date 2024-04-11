/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/state-in-constructor */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { FormFeedback, Input } from 'reactstrap';
import { connect } from 'react-redux';
import Async from 'react-select/async';
// import Select from "react-select";
import { clearForm, updateForm } from '../../../../store/core/form/actions';
import { createUser, getReviewerUserIDAsync, getRoleAsyncSelect } from '../../../../store/apps/users/actions';
import VWMessage from '../../../../components/vwMessage/vwMessage';
import FormValidator from '../../../../helpers/formValidator';
import VWButton from '../../../../components/vwButton/VWButton';


class AddUserForm extends Component {
  state = {
    isActive: true,
    roleId: '',
    searchValue: '',
    emailValid: true,
    contactNumberValid: true,
    isPasswordsNotEqual: false,
  };

  componentDidMount = () => {
    const { updateFormAction, form } = this.props;
    const { isNotify } = this.state;
    const { isActive } = this.state;

    updateFormAction({
      formAddUser: {
        ...form.formAddUser,
        isNotify,
        isActive,
      },
    });
  };

  componentWillUnmount = () => {
    const { clearFormAction } = this.props;
    clearFormAction();
  };

  validateOnChange = (event) => {
    const input = event.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;
    const { updateFormAction, form } = this.props;

    let result = FormValidator.validate(input);
    if (input.name === 'username') {
      let emailValid = true;
      if (!value.includes('@') || value.length <= 15) {
        result = 'Enter Valid Email';
        emailValid = false;
      }
      else {
        emailValid = true
      }
      if (emailValid !== this.state.emailValid) {
        this.setState({ emailValid });
      }
    }
    if (input.name === 'phone') {
      if (value.length !== 10 || !/^\d+$/.test(value)) {
        result = 'Enter Valid Contact Number'
        this.setState({ contactNumberValid: false });
      } else {
        this.setState({ contactNumberValid: true });
      }
    }
    updateFormAction({
      formAddUser: {
        ...form.formAddUser,
        [input.name]: value,
        errors: {
          ...(form.formAddUser && form.formAddUser.errors),
          [input.name]: result,
        },
      },
    });
  };

  selectOnChange = (value) => {
    console.log("value:", value)
    const { updateFormAction, form } = this.props;
    updateFormAction({
      formAddUser: {
        ...form.formAddUser,
        section: value.value,

      }
    })
  }

  hasError = (formName, inputName, method) => {
    const { form } = this.props;
    return (
      form &&
      form[formName] &&
      form[formName].errors &&
      form[formName].errors[inputName] &&
      form[formName].errors[inputName][method]
    );
  };

  handleCreateUser = () => {
    if (this.state.emailValid === true && this.state.contactNumberValid === true) {
      const { createUserAction } = this.props;
      createUserAction();
    }
  };


  onBlur = () => {
    const { form } = this.props;

    this.setState({
      ...this.state,
      isPasswordsNotEqual:
        form &&
        form.formResetPassword &&
        form.formResetPassword.password !== form.formResetPassword.confirmPassword,
    });
  };

  handleRole = (inputValue, callback) => {
    //eslint-disable-next-line
    const { getRoleAsyncSelect } = this.props;
    return getRoleAsyncSelect(inputValue.length > 2 ? inputValue : '', callback);
  };

  handleRoleSearchChange = (searchValue, action) => {
    // const { getRoleAsyncSelect } = this.props;

    if (action.action !== 'input-blur' && action.action !== 'menu-close') {
      this.setState(
        {
          searchValue,
        },
        () => {
          if (searchValue && searchValue.length < 2) {
            getRoleAsyncSelect();
          }
        },
      );
    }
  };

  handleAddRoleChange = (value) => {
    console.log("value:", value);
    const { updateFormAction, form } = this.props;
    updateFormAction({
      formAddUser: {
        ...form.formAddUser,
        roleId: value.value,
      }
    })
  }

  handleReviewerUserID = (inputValue, callback) => {
    //eslint-disable-next-line
    const { getReviewerUserIDAsyncSelect } = this.props;
    return getReviewerUserIDAsyncSelect(inputValue.length > 2 ? inputValue : '', callback);
  };

  handleSearchChange = (searchValue, action) => {
    const { getReviewerUserIDAsyncSelect } = this.props;

    if (action.action !== 'input-blur' && action.action !== 'menu-close') {
      this.setState(
        {
          searchValue,
        },
        () => {
          if (searchValue && searchValue.length < 2) {
            getReviewerUserIDAsyncSelect();
          }
        },
      );
    }
  };

  handleAddReviewerUserChange = (value) => {
    console.log("value:", value);
    const { updateFormAction, form } = this.props;
    updateFormAction({
      formAddUser: {
        ...form.formAddUser,
        reviewuserId: value.value,
      }
    })
  }

  render() {
    const { form, handleClose, isPending, errorMessage } = this.props;
    // const { roleId, searchValue,isActive } = this.state;

    console.log("form.formAddUser:", form.formAddUser)
    return (
      <>
        {errorMessage && (
          <VWMessage type="danger" defaultMessage={errorMessage} baseClassName="alert"></VWMessage>
        )}
        <form className="mb-3" name="formAddUser">
          <div className="form-group">
            <label className="col-form-label">
              First Name <span className="text-danger">*</span>
            </label>
            <Input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              invalid={this.hasError('formAddUser', 'firstName', 'required')}
              onChange={this.validateOnChange}
              data-validate='["required"]'
              value={form && form.formAddUser && form.formAddUser.firstName}
            />
            {this.hasError('formAddUser', 'firstName', 'required') && (
              <span className="invalid-feedback">firstName is required</span>
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
              invalid={this.hasError('formAddUser', 'lastName', 'required')}
              onChange={this.validateOnChange}
              data-validate='["required"]'
              value={form && form.formAddUser && form.formAddUser.lastName}
            />
            {this.hasError('formAddUser', 'lastName', 'required') && (
              <span className="invalid-feedback">Last name is required</span>
            )}
          </div>
          <div className="form-group">
            <label className="col-form-label">
              Email <span className="text-danger">*</span>
            </label>
            <Input
              type="text"
              name="username"
              placeholder="Enter Email"
              // invalid={this.hasError('formAddUser', 'username', 'required')}
              invalid={!this.state.emailValid}
              onChange={this.validateOnChange}
              data-validate='["required"]'
              value={form && form.formAddUser && form.formAddUser.username}
            // valid={
            //   form.formAddUser &&
            //   form.formAddUser.errors &&
            //   form.formAddUser.errors.username
            // }
            />
            {/* {this.hasError('formAddUser', 'username', 'required') && (
              <span className="invalid-feedback">User name is required</span>
            )} */}
            {form.formAddCustomer &&
              form.formAddUser.errors &&
              form.formAddUser.errors.username && (
                <FormFeedback>
                  {form.formAddUser.errors && form.formAddUser.errors.username}
                </FormFeedback>
              )}
          </div>
          <div className="form-group">
            <label className="col-form-label">
              Phone #
            </label>
            <Input
              type="text"
              name="phone"
              placeholder="Enter Phone #"
              onChange={this.validateOnChange}
              invalid={!this.state.contactNumberValid}
              data-validate='["required"]'
              value={form && form.formAddUser && form.formAddUser.phone}
            />
            {
              form.formAddUser && form.formAddUser.errors && form.formAddUser.errors.phone && (
                <span className="invalid-feedback">
                  {form.formAddUser.errors.phone}
                </span>
              )
            }
          </div>

          <div className="form-group">
            <label className="col-form-label">
              Password <span className="text-danger">*</span>
            </label>
            <Input
              type="password"
              id="id-password"
              name="password"
              className="border-right-0"
              placeholder=" Enter Password"
              invalid={
                this.hasError('formAddUser', 'password', 'required') ||
                this.state.isPasswordsNotEqual
              }
              onBlur={this.onBlur}
              onChange={this.validateOnChange}
              data-validate='["required"]'
              value={
                form && form.formAddUser && form.formAddUser.password
                  ? form.formAddUser.password
                  : ''
              }
            />
            <span className="invalid-feedback">
              {this.state.isPasswordsNotEqual ? '' : 'Password is required'}
            </span>
          </div>
          <div className="form-group">
            <label className="col-form-label">
              Confirm Password <span className="text-danger">*</span>
            </label>
            <Input
              type="password"
              id="id-confirmpassword"
              name="confirmPassword"
              className="border-right-0"
              placeholder=" Enter Confirm Password"
              invalid={
                this.hasError('formAddUser', 'confirmPassword', 'required') ||
                this.state.isPasswordsNotEqual
              }
              onBlur={this.onBlur}
              onChange={this.validateOnChange}
              data-validate='["required"]'
              value={
                form && form.formAddUser && form.formAddUser.confirmPassword
                  ? form.formAddUser.confirmPassword
                  : ''
              }
            />
            <span className="invalid-feedback">
              {this.state.isPasswordsNotEqual
                ? 'The passwords you have entered do not match.'
                : 'Confirm password is required'}
            </span>
          </div>
          <div className="form-group">
            <label className="col-form-label">
              Reviewer <span className="text-danger"> *</span>
            </label>
            <Async
              name="reviewuserId"
              placeholder="select Reviewer"
              className="vm-react-select"
              isSearchable
              defaultOptions
              loadOptions={this.handleReviewerUserID}
              onInputChange={this.handleSearchChange}
              onChange={this.handleAddReviewerUserChange}
              // inputValue={searchValue}
              openMenuOnFocus
            // value={selectedReviewer}
            />
          </div>
          <div className="form-group">
            <label className="col-form-label">
              Role <span className="text-danger"> *</span>
            </label>
            <Async
              name="roleId"
              placeholder="select Role"
              className="vm-react-select"
              isSearchable
              defaultOptions
              loadOptions={this.handleRole}
              onInputChange={this.handleRoleSearchChange}
              onChange={this.handleAddRoleChange}
              // inputValue={searchValue}
              openMenuOnFocus
            // value={selectedReviewer}
            />
          </div>

        </form>
        <div className="form-group">
          <VWButton
            messageKey="createUserButton"
            defaultMessage="Create User"
            buttonType="dark-success"
            baseClassName="btn"
            className="me-2"
            onClick={this.handleCreateUser}
            isLoading={isPending}
            isDisabled={isPending}
          ></VWButton>
          <VWButton
            messageKey="cancelUserButton"
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

const mapStateToProps = (state) => ({
  form: state.form,
  isPending: state.user.isPending,
  errorMessage: state.user.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  updateFormAction: (data) => dispatch(updateForm(data)),
  clearFormAction: () => dispatch(clearForm()),
  createUserAction: () => dispatch(createUser()),
  getReviewerUserIDAsyncSelect: (inputSearch, callback) => dispatch(getReviewerUserIDAsync(inputSearch, callback)),
  getRoleAsyncSelect: (inputSearch, callback) => dispatch(getRoleAsyncSelect(inputSearch, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUserForm);
