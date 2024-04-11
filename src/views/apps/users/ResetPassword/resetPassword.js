/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import { clearForm, updateForm } from '../../../../store/core/form/actions';
import FormValidator from '../../../../helpers/formValidator';
import VWMessage from '../../../../components/vwMessage/vwMessage';
import VWButton from '../../../../components/vwButton/VWButton';
import { resetPasswordAction } from '../../../../store/apps/userDetails/actions';



const ResetPassword = ({
     form,
    isPending,
    errorMessage,
    updateFormAction,
    resetPasswordActionModal,
    handleClose,
    userDetails}) => {

        const validateOnChange = (event) => {
            const input = event.target;
            const value = input.type === 'checkbox' ? input.checked : input.value;
        
            const result = FormValidator.validate(input);
            updateFormAction({
              formResetPassword: {
                ...form.formResetPassword,
                userName:userDetails.userName,
                [input.name]: value,
                errors: {
                  ...(form.formResetPassword && form.formResetPassword.errors),
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
        
          const handleResetPassword = () => {
            console.log("Password Reset")
            resetPasswordActionModal();
          };
        
          console.log("formResetPassword:",form.formResetPassword)
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
            defaultValue={userDetails.userName}
            disabled
          />
        </div>
        <div className="form-group">
          <label className="col-form-label">
            New password <span className="text-danger">*</span>
          </label>
          <Input
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            onChange={validateOnChange}
          />
        </div>
        <div className="form-group">
          <label className="col-form-label">
            Confirm new password <span className="text-danger">*</span>
          </label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Enter confirm password"
            onChange={validateOnChange}
          />
        </div>
      </form>
      <div className="form-group">
        <VWButton
          messageKey="submitResetPasswordButton"
          defaultMessage="Submit"
          buttonType="primary"
          baseClassName="btn"
          className="me-2"
          onClick={handleResetPassword}
          isLoading={isPending}
          isDisabled={isPending}
        ></VWButton>
        <VWButton
          messageKey="cancelResetPasswordButton"
          defaultMessage="Cancel"
          buttonType="secondary"
          baseClassName="btn"
          onClick={handleClose}
          isDisabled={isPending}
        ></VWButton>
      </div>
    </>
  )
}
const mapStateToProps = (state) => ({
    form: state.form,
    isPending: state.userDetails.resetPasswordPending,
    errorMessage: state.userDetails.errorMessage,
    userDetails: state.userDetails.user,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    updateFormAction: (data) => dispatch(updateForm(data)),
    clearFormAction: () => dispatch(clearForm()),
    resetPasswordActionModal: () => dispatch(resetPasswordAction()),
  });
export default connect (mapStateToProps,mapDispatchToProps)(ResetPassword);