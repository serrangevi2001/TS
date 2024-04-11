/* eslint-disable react/prop-types */
import React from 'react';
import {
  Label,
  Form,
  FormGroup,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Input,
  CardTitle,
} from 'reactstrap';
import {  Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthLogo from '../../layouts/logo/AuthLogo';
import NEWIMG from '../../assets/images/background/active-bg.png';
import { clearForm, updateForm } from '../../store/core/form/actions';
import { clearLoginUserError, userLogin } from '../../store/auth/login/action';
import FormValidator from '../../helpers/formValidator';
import VWButton from '../../components/vwButton/VWButton';
import VWMessage from '../../components/vwMessage/vwMessage';


const Login = ({ form, updateFormAction, userLoginAction, isAuth, isPending, errorMessage }) => {
  const validateOnChange = (event) => {
    const input = event.target;
    const formData = input.form;
    const value = input.type === 'checkbox' ? input.checked : input.value;

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
    userLoginAction(form.formLogin && form.formLogin.userName, form.formLogin && form.formLogin.password);
  };

  /* Simplify error check */
  const hasError = (formName, inputName, method) => {
    return (
      form[formName] &&
      form[formName].errors &&
      form[formName].errors[inputName] &&
      form[formName].errors[inputName][method]
    );
  };

  return isAuth ? (
    <Navigate to="/app" />
    // <Navigate to="/app/stockreport" />
  ) : (
    <div className="loginBox " style={{backgroundImage:`url(${NEWIMG})`}}>
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <AuthLogo />
            <Card>
              <CardBody className="p-4 m-1">
                <div className="text-center">
                  <CardTitle tag="h4" className="mt-2">
                    Visionware -  Login
                  </CardTitle>
                </div>
                {errorMessage && (
                  <VWMessage
                    type="danger"
                    defaultMessage={errorMessage}
                    baseClassName="alert"
                  ></VWMessage>
                )}
                <Form name="formLogin">
                  <FormGroup>
                    <Label htmlFor="exampleEmail12">Email</Label>
                    <Input
                      type="userName"
                      name="userName"
                      placeholder="email"
                      invalid={hasError('formLogin', 'userName', 'required')}
                      onChange={validateOnChange}
                      data-validate='["required"]'
                      value={
                        form && form.formLogin && form.formLogin.userName
                          ? form.formLogin.userName
                          : ''
                      }
                    />
                    {hasError('formLogin', 'userName', 'required') && (
                      <span className="invalid-feedback">Email is required</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="examplePassword2">Password</Label>
                    <Input
                      type="password"
                      id="id-password"
                      name="password"
                      className="border-right-0"
                      placeholder="password"
                      invalid={hasError('formLogin', 'password', 'required')}
                      onChange={validateOnChange}
                      data-validate='["required"]'
                      value={
                        form && form.formLogin && form.formLogin.password
                          ? form.formLogin.password
                          : ''
                      }
                    />
                    <span className="invalid-feedback">Password is required</span>
                  </FormGroup>
                  {/* <FormGroup className="form-check d-flex" inline>
                    <Label check>
                      <Input type="checkbox" />
                      Remember me
                    </Label>
                    {/* <Link className="ms-auto text-decoration-none" to="/recoverpwd">
                      <small>Forgot Password?</small>
                    </Link> */}
                  {/* </FormGroup>  */}
                  <FormGroup>
                    <VWButton
                      messageKey="loginButton"
                      defaultMessage="Login"
                      isLoading={isPending}
                      isDisabled={isPending}
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
  isPending: state.login.isPending,
  errorMessage: state.login.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  updateFormAction: (data) => dispatch(updateForm(data)),
  clearFormAction: () => dispatch(clearForm()),
  userLoginAction: (email, password) => dispatch(userLogin(email, password)),
  clearLoginUserError: () => dispatch(clearLoginUserError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
