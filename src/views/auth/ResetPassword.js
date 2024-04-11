/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Label,
  FormGroup,
  CardTitle,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Form,
} from 'reactstrap';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import AuthLogo from '../../layouts/logo/AuthLogo';
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import FormValidator from '../../helpers/formValidator';
import { clearForm, updateForm } from '../../store/core/form/actions';
import { resetPassword } from '../../store/auth/resetpassword/action';
import VWMessage from '../../components/vwMessage/vwMessage';
import VWButton from '../../components/vwButton/VWButton';

const ResetPassword = (props) => {
  const [isPasswordsNotEqual, setIsPasswordNotEqual] = useState(false);
  const params = useParams();
  const { code } = params;

  const validateOnChange = (event) => {
    const input = event.target;
    const formData = input.form;
    const { value } = input;
    const { updateFormAction, form } = props;

    const result = FormValidator.validate(input);
    updateFormAction({
      [formData.name]: {
        ...form[formData.name],
        [input.name]: value,
        errors: {
          ...(form[formData.name] && form[formData.name].errors),
          [input.name]: result,
        },
      },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { resetPasswordAction } = props;
    console.log("Code:",code)
    resetPasswordAction(code);
  };

  const onBlur = () => {
    const { form } = props;
    setIsPasswordNotEqual(
      form &&
        form.formResetPassword &&
        form.formResetPassword.password !== form.formResetPassword.confirmPassword,
    );
  };

  const hasError = (formName, inputName, method) => {
    const { form } = props;
    return (
      form[formName] &&
      form[formName].errors &&
      form[formName].errors[inputName] &&
      form[formName].errors[inputName][method]
    );
  };
console.log("form:",props.form)
  return (
    <div className="loginBox">
      <LeftBg className="position-absolute left bottom-0" />
      <RightBg className="position-absolute end-0 top" />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <AuthLogo />
            <Card>
              <CardBody className="p-4 m-1">
                <div className="text-center">
                  <CardTitle tag="h4" className="mt-2">
                    Reset Password
                  </CardTitle>
                </div>
                <Form className="mt-3" name="formResetPassword">
                  {props.errorMessage && (
                    <VWMessage
                      type="danger"
                      defaultMessage={props.errorMessage}
                      baseClassName="alert"
                    ></VWMessage>
                  )}
                  <FormGroup>
                    <Label htmlFor="name">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      className="border-right-0"
                      placeholder="Enter email address"
                      invalid={
                        hasError('formResetPassword', 'email', 'required') ||
                        hasError('formResetPassword', 'email', 'email')
                      }
                      onChange={validateOnChange}
                      data-validate='["required", "email"]'
                      value={
                        props.form &&
                        props.form.formResetPassword &&
                        props.form.formResetPassword.email
                          ? props.form.formResetPassword.email
                          : ''
                      }
                    />
                    {hasError('formResetPassword', 'email', 'required') && (
                      <span className="invalid-feedback">Email is required</span>
                    )}
                    {hasError('formResetPassword', 'email', 'email') && (
                      <span className="invalid-feedback">Please enter valid email</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="name">Password</Label>
                    <Input
                      type="password"
                      id="id-password"
                      name="password"
                      className="border-right-0"
                      placeholder="Password"
                      invalid={
                        hasError('formResetPassword', 'password', 'required') || isPasswordsNotEqual
                      }
                      onBlur={onBlur}
                      onChange={validateOnChange}
                      data-validate='["required"]'
                      value={
                        props.form &&
                        props.form.formResetPassword &&
                        props.form.formResetPassword.password
                          ? props.form.formResetPassword.password
                          : ''
                      }
                    />
                    <span className="invalid-feedback">
                      {isPasswordsNotEqual ? '' : 'Password is required'}
                    </span>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="email">Confirm Password</Label>
                    <Input
                      type="password"
                      id="id-confirmpassword"
                      name="confirmPassword"
                      className="border-right-0"
                      placeholder="Confirm password"
                      invalid={
                        hasError('formResetPassword', 'confirmPassword', 'required') ||
                        isPasswordsNotEqual
                      }
                      onBlur={onBlur}
                      onChange={validateOnChange}
                      data-validate='["required"]'
                      value={
                        props.form &&
                        props.form.formResetPassword &&
                        props.form.formResetPassword.confirmPassword
                          ? props.form.formResetPassword.confirmPassword
                          : ''
                      }
                    />
                    <span className="invalid-feedback">
                      {isPasswordsNotEqual
                        ? 'The passwords you have entered do not match.'
                        : 'Confirm password is required'}
                    </span>
                  </FormGroup>
                  <FormGroup>
                    <VWButton
                      messageKey="resetButton"
                      defaultMessage="Reset"
                      isLoading={props.isPending}
                      isDisabled={props.isPending}
                      buttonType="dark-success"
                      buttonLength="full"
                      baseClassName="btn"
                      className="mt-3"
                      onClick={onSubmit}
                    ></VWButton>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  form: state.form,
  isAuth: state.login.isAuth,
  isPending: state.resetPassword.isPending,
  errorMessage: state.resetPassword.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  updateFormAction: (data) => dispatch(updateForm(data)),
  clearFormAction: () => dispatch(clearForm()),
  resetPasswordAction: (code) => dispatch(resetPassword(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
