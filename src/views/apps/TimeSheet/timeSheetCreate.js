import React, { useEffect, useState } from 'react'
import Select from "react-select";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import Async from 'react-select/async';
// import DatePicker from 'react-datepicker';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupText, Label, Row, Table } from 'reactstrap'
import moment from 'moment';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import ComponentCard from '../formGroup/formGroup';
import VWButton from '../../../components/vwButton/VWButton';
import { createTimeSheet, getLoggedHoursAction, getProjectAsyncSelect, getTaskListSelect } from '../../../store/apps/timeSheet/action';
import VWMessage from '../../../components/vwMessage/vwMessage';


const hours = [

  { value: '00', label: '00' },
  { value: '01', label: '01' },
  { value: '02', label: '02' },
  { value: '03', label: '03' },
  { value: '04', label: '04' },
  { value: '05', label: '05' },
  { value: '06', label: '06' },
  { value: '07', label: '07' },
  { value: '08', label: '08' },
  { value: '09', label: '09' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
  { value: '13', label: '13' },
  { value: '14', label: '14' },
  { value: '15', label: '15' },
  { value: '16', label: '16' },
  { value: '17', label: '17' },
  { value: '18', label: '18' },
  { value: '19', label: '19' },
  { value: '20', label: '20' },
  { value: '21', label: '21' },
  { value: '22', label: '22' },
  { value: '23', label: '23' },

]

const minutes = [
  { value: '00', label: '00' },
  { value: '01', label: '01' },
  { value: '02', label: '02' },
  { value: '03', label: '03' },
  { value: '04', label: '04' },
  { value: '05', label: '05' },
  { value: '06', label: '06' },
  { value: '07', label: '07' },
  { value: '08', label: '08' },
  { value: '09', label: '09' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
  { value: '13', label: '13' },
  { value: '14', label: '14' },
  { value: '15', label: '15' },
  { value: '16', label: '16' },
  { value: '17', label: '17' },
  { value: '18', label: '18' },
  { value: '19', label: '19' },
  { value: '20', label: '20' },
  { value: '21', label: '21' },
  { value: '22', label: '22' },
  { value: '23', label: '23' },
  { value: '24', label: '24' },
  { value: '25', label: '25' },
  { value: '26', label: '26' },
  { value: '27', label: '27' },
  { value: '28', label: '28' },
  { value: '29', label: '29' },
  { value: '30', label: '30' },
  { value: '31', label: '31' },
  { value: '32', label: '32' },
  { value: '33', label: '33' },
  { value: '34', label: '34' },
  { value: '35', label: '35' },
  { value: '36', label: '36' },
  { value: '37', label: '37' },
  { value: '38', label: '38' },
  { value: '39', label: '39' },
  { value: '40', label: '40' },
  { value: '41', label: '41' },
  { value: '42', label: '42' },
  { value: '43', label: '43' },
  { value: '44', label: '44' },
  { value: '45', label: '45' },
  { value: '46', label: '46' },
  { value: '47', label: '47' },
  { value: '48', label: '48' },
  { value: '49', label: '49' },
  { value: '50', label: '50' },
  { value: '51', label: '51' },
  { value: '52', label: '52' },
  { value: '53', label: '53' },
  { value: '54', label: '54' },
  { value: '55', label: '55' },
  { value: '56', label: '56' },
  { value: '57', label: '57' },
  { value: '58', label: '58' },
  { value: '59', label: '59' },

]

const ScopeOptions = [
  { label: 'Development', value: 'Development' },
  { label: 'Testing', value: 'Testing' },
  { label: 'Discussion', value: 'Discussion' },
  { label: 'Review', value: 'Review' },
  { label: 'Deployment', value: 'Deployment' },
  { label: 'Documentation', value: 'Documentation' },
]

const timeSheetCreate = (props) => {

  //eslint-disable-next-line
  const [number, setNumber] = useState(0);
  //eslint-disable-next-line
  const [hour, setHours] = useState('00');
  //eslint-disable-next-line
  const [minute, setMinutes] = useState('00');
  //eslint-disable-next-line
  const [currentDate, setCurrentDate] = useState(moment().format());
  console.log("currentDate: ", currentDate)
  //eslint-disable-next-line
  const [formFields, setFormFields] = useState([])
  console.log('formFields:', formFields)
  console.log('userDetails:', props.userDetails)

  //eslint-disable-next-line
  useEffect(() => {
    props.getLoggedHours(currentDate);
  }, [])

  const handleAdd = () => {
    const No = number + 1
    const object = {
      TempId: No,
      userId: props.userDetails && props.userDetails.UserId,
      workDate: currentDate,
      projectName: '',
      taskList: [{}],
      taskValue: { label: 'Select Task', value: '' },
      taskId: '',
      Hours: hour,
      Mint: minute,
      type: ''
    }
    setFormFields([...formFields, object])
    setNumber(No)

  }

  const handleChangeProjectSelect = (e, i) => {
    console.log("e:", e)
    const item = [...formFields];
    item[i].projectName = e.value;
    setFormFields(item);

    if (e.value) {
      props.getTaskListSelectAction(e.value, '', (TaskLists) => {
        console.log("TaskList:", TaskLists)
        const data = [...formFields];
        data[i].taskValue.label = 'Select Task';
        data[i].taskValue.value = '';
        data[i].taskList = TaskLists || {}
        setFormFields(data)
      })
    }
  }

  const handleChangeTaskSelect = (e, i) => {
    console.log("task selected:", e.value)
    const data = [...formFields];
    // data[i].taskId = e.value;
    data[i].taskValue.label = e.label;
    data[i].taskValue.value = e.value;
    setFormFields(data);
  }

  const handleChangeScopeSelect = (e, i) => {
    console.log("e:", e.value)
    const data = [...formFields];
    data[i].type = e.value;
    setFormFields(data);
  }

  const selectOnChangeHours = (e, i) => {
    console.log("index no", i)
    console.log("selected Values", e.value)
    const data = [...formFields];
    data[i].Hours = e.value;
    setFormFields(data);
    setHours(e.value)
  }
  const selectOnChangeMinutes = (e, i) => {
    console.log("index no", i)
    console.log("selected Values", e.value)
    const data = [...formFields];
    data[i].Mint = e.value;
    setFormFields(data);
  }
  const handleChangeDateSelect = (date) => {
    console.log("date:", date);
    setCurrentDate(date)
    const updatedFormFields = formFields.map((obj) => ({ ...obj, workDate: date }));
    setFormFields(updatedFormFields);
    props.getLoggedHours(date);
  }


  const handleDelete = (i) => {
    const updatedFormFields = [...formFields];
    updatedFormFields.splice(i, 1);
    setFormFields(updatedFormFields);
  }

  const handleLoadProject = (inputValue, callback) => {
    const { getProjectAsyncSelectAction } = props;
    return getProjectAsyncSelectAction(inputValue.length > 0 ? inputValue : '', callback);
  };

  const handleCreateTimeSheet = () => {
    props.createTimeSheetAction(formFields);
  };

  console.log("userDetails:", props.userDetails)
  console.log("formFields:", formFields)
  console.log("formFields:", props.errorMessage)
  console.log("LoggedHours:", props.LoggedHours && props.LoggedHours.total_Loggedhours)
  return (
    <>
      {props.errorMessage && (
        <VWMessage type="danger" defaultMessage={props.errorMessage} baseClassName="alert"></VWMessage>
      )}
      <Container>
        <Card>
          <CardBody className="p-4">
            <table className="table table-striped table-hover w-100">
              <tbody>
                <Row>
                  <Col md={4}>
                    <ComponentCard title="Input Addons Left Icon">
                      <Form>
                        <InputGroup>
                          <InputGroupText>
                            Date
                          </InputGroupText>
                          <Datetime
                            value={currentDate ? moment(currentDate).format('DD-MM-YYYY') : ''}
                            onChange={handleChangeDateSelect}
                            dateFormat="DD-MM-YYYY"
                            timeFormat={false}
                            inputProps={{ placeholder: 'Select Date' }}
                            //eslint-disable-next-line
                            utc={true}
                          />
                        </InputGroup>
                      </Form>
                    </ComponentCard>
                  </Col>
                  <Col md={3}>
                    <Button type="button" onClick={() => handleAdd()}>Add Task</Button>
                  </Col>
                  <Col md={3}>
                    <InputGroup>
                      <InputGroupText>
                        Total Logged Hours
                      </InputGroupText>
                      <Input type="text"
                        value={props.LoggedHours && props.LoggedHours.total_Loggedhours}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </tbody>
            </table>
            {formFields && formFields.length > 0 ? (
              <Row>
                <Container>
                  <Table  >
                    <thead>
                      <Row>
                        <Col md={2} className="text-center">
                          <Label style={{ textAlign: 'center' }}>Project Name</Label><span className="text-danger"> *</span>
                        </Col>
                        <Col md={4} className="text-center">
                          <Label> Task</Label><span className="text-danger"> *</span>
                        </Col>
                        <Col md={2} className="text-center">
                          <Label> Scope</Label><span className="text-danger"> *</span>
                        </Col>
                        <Col md={4} className="text-center">
                          <Label > Time </Label>
                        </Col>
                      </Row>
                    </thead>
                    <tbody>
                      {formFields.map((data, i) => {
                        const taskLT = data.taskList
                        const SelectedValue = data.taskValue
                        return (
                          <Row key={data.TempId}>
                            <Col md={2}>
                              <Async
                                id="selectedProject"
                                name="selectedProject"
                                placeholder="Select Project"
                                className="vm-react-select"
                                isSearchable
                                defaultOptions
                                loadOptions={handleLoadProject}
                                onChange={e => handleChangeProjectSelect(e, i)}
                              />
                            </Col>
                            <Col md={4}>
                              <Select
                                name='selectedTask'
                                placeholder='Select Task'
                                options={taskLT}
                                value={SelectedValue}
                                onChange={e => handleChangeTaskSelect(e, i)}
                              />
                            </Col>
                            <Col md={2}>
                              <Select
                                name="type"
                                placeholder="Select Scope"
                                options={ScopeOptions}
                                onChange={e => handleChangeScopeSelect(e, i)}
                              />
                            </Col>
                            <Col md={4} className='d-flex flex-row justify-content-around'>
                              <ComponentCard title="Input Addons Left Icon">
                                <Form  >
                                  <InputGroup >
                                    <InputGroupText style={{ width: '50px' }}>
                                      HH
                                    </InputGroupText>
                                    <div style={{ width: "100px" }}>
                                      <Select
                                        style={{ width: '100px', height: '39px', textAlign: 'center', borderBottomRightRadius: '5px', borderTopRightRadius: '5px', borderColor: 'lightgray' }}
                                        name="hour"
                                        options={hours}
                                        placeholder="00"
                                        defaultValue={hour}
                                        onChange={e => selectOnChangeHours(e, i)}
                                      />

                                    </div>
                                  </InputGroup>
                                </Form>
                              </ComponentCard>
                              <ComponentCard>
                                <Form  >
                                  <InputGroup >
                                    <InputGroupText style={{ width: '50px' }}>
                                      MM
                                    </InputGroupText>
                                    <div style={{ width: "100px" }}>
                                      <Select
                                        style={{ width: '100px', height: '39px', textAlign: 'center', borderBottomRightRadius: '5px', borderTopRightRadius: '5px', borderColor: 'lightgray' }}
                                        name="minute"
                                        // defaultValue={data.projectName}
                                        placeholder="00"
                                        options={minutes}
                                        onChange={e => selectOnChangeMinutes(e, i)}
                                      />
                                    </div>
                                  </InputGroup>
                                </Form>
                              </ComponentCard>
                              <button type="submit" style={{ border: 'none', backgroundColor: 'white' }} onClick={() => handleDelete(i)}><FontAwesomeIcon icon={faTrash} style={{ color: "#f51436", }} /></button>
                            </Col>
                          </Row>
                        )
                      })}
                    </tbody>
                  </Table>
                </Container>
              </Row>
            ) : ""}

          </CardBody>
        </Card>
      </Container>
      {formFields && formFields.length > 0 ? (
        <div className="form-group">
          <VWButton
            messageKey="createTimesheetButton"
            defaultMessage="Create TimeSheet"
            buttonType="success"
            baseClassName="btn"
            className="me-2"
            onClick={handleCreateTimeSheet}
          // isLoading={props.isPending}
          // isDisabled={props.isPending}
          ></VWButton>
          <VWButton
            messageKey="cancelTimesheetButton"
            defaultMessage="Cancel"
            buttonType="secondary"
            baseClassName="btn"
            onClick={props.handleClose}
          // isDisabled={props.isPending}
          ></VWButton>
        </div>
      ) : ""}
    </>
  )
}
const mapStateToProps = (state) => ({
  userDetails: state.login.profile,
  errorMessage: state.TimeSheet.errorMessage,
  isPending: state.TimeSheet.isPending,
  LoggedHours: state.TimeSheet.LoggedHours
});
const mapDispatchToProps = (dispatch) => ({
  createTimeSheetAction: (formFields) => dispatch(createTimeSheet(formFields)),
  getProjectAsyncSelectAction: (searchValue, callback) =>
    dispatch(getProjectAsyncSelect(searchValue, callback)),
  getTaskListSelectAction: (ProjectID, searchValue, callback) =>
    dispatch(getTaskListSelect(ProjectID, searchValue, callback)),
  getLoggedHours: (date) => dispatch(getLoggedHoursAction(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(timeSheetCreate)
