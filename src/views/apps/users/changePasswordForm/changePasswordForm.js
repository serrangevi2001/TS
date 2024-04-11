/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import { Input } from 'reactstrap';
import { connect } from 'react-redux';
import { clearForm, updateForm } from '../../../../store/core/form/actions';
import { changePassword } from '../../../../store/apps/userDetails/actions';
import VWButton from '../../../../components/vwButton/VWButton';
import VWMessage from '../../../../components/vwMessage/vwMessage';
import FormValidator from '../../../../helpers/formValidator';

const ChangePasswordForm = ({
  form,
  isPending,
  errorMessage,
  updateFormAction,
  changePasswordAction,
  handleClose,
  userDetails,
  
}) => {

 
  const validateOnChange = (event) => {
    const input = event.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;

    const result = FormValidator.validate(input);
    updateFormAction({
      formChangePassword: {
        ...form.formChangePassword,
        userName:userDetails.userName,
        [input.name]: value,
        errors: {
          ...(form.formChangePassword && form.formChangePassword.errors),
          [input.name]: result,
        },
      },
    });
  };

  const hasError = (formName, inputName, method) => {
    return (
      form &&
      form[formName] &&
      form[formName].errors &&
      form[formName].errors[inputName] &&
      form[formName].errors[inputName][method]
    );
  };

  const handleChangePassword = () => {
    changePasswordAction();
  };

  console.log("formChangePassword:",form.formChangePassword)
  console.log("userDetails:",userDetails.userName)
  return (
    <>
      {errorMessage && (
        <VWMessage type="danger" defaultMessage={errorMessage} baseClassName="alert"></VWMessage>
      )}
      <form className="mb-3" name="formChangePassword">
        <div className="form-group">
          <label className="col-form-label">
          Email <span className="text-danger">*</span>
          </label>
          <Input
            type="text"
            name="userName"
            placeholder="Enter userName"
            invalid={hasError('formChangePassword', 'userName', 'required')}
            onChange={validateOnChange}
            data-validate='["required"]'
            // value={form && form.formChangePassword && form.formChangePassword.emailId}
            defaultValue={userDetails.userName}
            disabled
          />
          {hasError('formChangePassword', 'userName', 'required') && (
            <span className="invalid-feedback">userName is required</span>
          )}
        </div>
        <div className="form-group">
          <label className="col-form-label">
            Old Password <span className="text-danger">*</span>
          </label>
          <Input
            type="password"
            name="oldPassword"
            placeholder="Enter current password"
            invalid={hasError('formChangePassword', 'oldPassword', 'required')}
            onChange={validateOnChange}
            data-validate='["required"]'
            value={form && form.formChangePassword && form.formChangePassword.oldPassword}
          />
          {hasError('formChangePassword', 'oldPassword', 'required') && (
            <span className="invalid-feedback">Old password is required</span>
          )}
        </div>
        <div className="form-group">
          <label className="col-form-label">
            New password <span className="text-danger">*</span>
          </label>
          <Input
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            invalid={hasError('formChangePassword', 'newPassword', 'required')}
            onChange={validateOnChange}
            data-validate='["required"]'
            value={form && form.formChangePassword && form.formChangePassword.newPassword}
          />
          {hasError('formChangePassword', 'newPassword', 'required') && (
            <span className="invalid-feedback">Password is required</span>
          )}
        </div>
        <div className="form-group">
          <label className="col-form-label">
            Confirm new password <span className="text-danger">*</span>
          </label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Enter confirm password"
            invalid={hasError('formChangePassword', 'confirmPassword', 'required')}
            onChange={validateOnChange}
            data-validate='["required"]'
            value={form && form.formChangePassword && form.formChangePassword.confirmPassword}
          />
          {hasError('formChangePassword', 'confirmPassword', 'required') && (
            <span className="invalid-feedback">Confirm password is required</span>
          )}
        </div>
      </form>
      <div className="form-group">
        <VWButton
          messageKey="submitChangePasswordButton"
          defaultMessage="Submit"
          buttonType="primary"
          baseClassName="btn"
          className="me-2"
          onClick={handleChangePassword}
          isLoading={isPending}
          isDisabled={isPending}
        ></VWButton>
        <VWButton
          messageKey="cancelChangePasswordButton"
          defaultMessage="Cancel"
          buttonType="secondary"
          baseClassName="btn"
          onClick={handleClose}
          isDisabled={isPending}
        ></VWButton>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  form: state.form,
  isPending: state.userDetails.isChangePasswordPending,
  errorMessage: state.userDetails.errorMessage,
  userDetails: state.userDetails.user,
});

const mapDispatchToProps = (dispatch) => ({
  updateFormAction: (data) => dispatch(updateForm(data)),
  clearFormAction: () => dispatch(clearForm()),
  changePasswordAction: () => dispatch(changePassword()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);
