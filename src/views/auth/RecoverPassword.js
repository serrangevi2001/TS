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
  Form,
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import AuthLogo from '../../layouts/logo/AuthLogo';
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';

import { clearForm, updateForm } from '../../store/core/form/actions';
import {
  forgotPassword,
  setForgotPasswordConfirmationStatus,
} from '../../store/auth/forgotpassword/action';
import FormValidator from '../../helpers/formValidator';
import VWMessage from '../../components/vwMessage/vwMessage';
import VWButton from '../../components/vwButton/VWButton';

const RecoverPassword = (props) => {
  const [inputValues, setInputValues] = useState({ email: '', uname: '' });

  const validateOnChange = (event) => {
    const input = event.target;
    const formData = input.form;
    const { value, name } = input;
    const { updateFormAction, form } = props;

    const result = FormValidator.validate(input);
    setInputValues({ ...inputValues, [name]: value });
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
    const { forgotPasswordAction } = props;
    forgotPasswordAction(inputValues.uname, inputValues.email);
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
                    Forgot Password
                  </CardTitle>
                </div>
                <Form className="mt-3" name="formRecoverPassword">
                  {props.confirmationStatus === 'EMAIL_SENT' && (
                    <VWMessage
                      type="success"
                      defaultMessage="An email has been sent with instructions on how to reset your password."
                      baseClassName="alert"
                    ></VWMessage>
                  )}
                  {props.confirmationStatus === 'INVALID_EMAIL' && (
                    <VWMessage
                      type="danger"
                      defaultMessage="Email address not found"
                      baseClassName="alert"
                    ></VWMessage>
                  )}
                  <FormGroup>
                    <Label htmlFor="name">User Name</Label>
                    <Input
                      type="text"
                      name="uname"
                      className="border-right-0"
                      placeholder="Enter username"
                      invalid={hasError('formRecoverPassword', 'uname', 'required')}
                      onChange={validateOnChange}
                      data-validate='["required"]'
                      value={
                        props.form &&
                        props.form.formRecoverPassword &&
                        props.form.formRecoverPassword.uname
                          ? props.form.formRecoverPassword.uname
                          : ''
                      }
                    />
                    {hasError('formRecoverPassword', 'uname', 'required') && (
                      <span className="invalid-feedback">Username is required</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      className="border-right-0"
                      placeholder="Enter email address"
                      invalid={
                        hasError('formRecoverPassword', 'email', 'required') ||
                        hasError('formRecoverPassword', 'email', 'email')
                      }
                      onChange={validateOnChange}
                      data-validate='["required", "email"]'
                      value={
                        props.form &&
                        props.form.formRecoverPassword &&
                        props.form.formRecoverPassword.email
                          ? props.form.formRecoverPassword.email
                          : ''
                      }
                    />
                    {hasError('formRecoverPassword', 'email', 'required') && (
                      <span className="invalid-feedback">Email is required</span>
                    )}
                    {hasError('formRecoverPassword', 'email', 'email') && (
                      <span className="invalid-feedback">Please enter valid email</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <VWButton
                      messageKey="recoverButton"
                      defaultMessage="Recover"
                      isLoading={props.confirmationStatus === 'INPROGRESS'}
                      isDisabled={props.confirmationStatus === 'INPROGRESS'}
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
  confirmationStatus: state.forgotPassword.confirmationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  updateFormAction: (data) => dispatch(updateForm(data)),
  clearFormAction: () => dispatch(clearForm()),
  forgotPasswordAction: (userName, email) => dispatch(forgotPassword(userName, email)),
  setForgotPasswordConfirmationStatusAction: (status) =>
    dispatch(setForgotPasswordConfirmationStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);
