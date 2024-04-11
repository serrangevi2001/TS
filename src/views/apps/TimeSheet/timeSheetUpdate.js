import React, { useEffect, useState } from 'react'
import Async from 'react-select/async';
import Select from "react-select";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import { connect } from 'react-redux';
import { Col, Form, InputGroup, InputGroupText, Label, Row } from 'reactstrap'
import VWButton from '../../../components/vwButton/VWButton';
import { getProjectAsyncSelect, updateTimeSheet } from '../../../store/apps/timeSheet/action';
import VWMessage from '../../../components/vwMessage/vwMessage';

const ScopeOptions = [
  { label: 'Development', value: 'Development' },
  { label: 'Testing', value: 'Testing' },
  { label: 'Discussion', value: 'Discussion' },
  { label: 'Review', value: 'Review' },
  { label: 'Deployment', value: 'Deployment' },
  { label: 'Documentation', value: 'Documentation' },
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

const timeSheetUpdate = (props) => {
  //eslint-disable-next-line
  const [formFields, setFormFields] = useState({})
  //eslint-disable-next-line
  const [prevProject, setprevProject] = useState({ label: '', value: '' })
  //eslint-disable-next-line
  const [prevTask, setprevTask] = useState({ label: '', value: '' })
  //eslint-disable-next-line
  const [prevScope, setprevScope] = useState({ label: '', value: '' })
  //eslint-disable-next-line
  const [prevHour, setprevHour] = useState({ label: '', value: '' })
  //eslint-disable-next-line
  const [prevMint, setprevMint] = useState({ label: '', value: '' })
  //eslint-disable-next-line
  useEffect(() => {
    const { TimeSheetDetails } = props;
    setFormFields(TimeSheetDetails)
    if (TimeSheetDetails) {
      setprevProject({ label: TimeSheetDetails.projectName, value: TimeSheetDetails.projectId })
    }
    if (TimeSheetDetails) {
      setprevTask({ label: TimeSheetDetails.taskName, value: TimeSheetDetails.taskId })
    }
    if (TimeSheetDetails) {
      setprevScope({ label: TimeSheetDetails.type, value: TimeSheetDetails.type })
    }
    if (TimeSheetDetails) {
      const times = String(TimeSheetDetails.workHours)
      const ansarray = times.split(":");
      console.log(ansarray)
      setprevHour({ label: ansarray[0], value: ansarray[0] })
      setprevMint({ label: ansarray[1], value: ansarray[1] })
      setFormFields({ ...TimeSheetDetails, hours: ansarray[0], mint: ansarray[1] })
    }
  }, [])

  const handleLoadProject = (inputValue, callback) => {
    const { getProjectAsyncSelectAction } = props;
    return getProjectAsyncSelectAction(inputValue.length > 0 ? inputValue : '', callback);
  };

  const handleChangeScopeSelect = (value) => {
    console.log("value:", value)
    setprevScope({ label: value.value, value: value.value })
    setFormFields({ ...formFields, type: value.value });
  }
  const selectOnChangeHours = (e) => {
    console.log("selected Hour", e.value)
    setprevHour({ label: e.value, value: e.value })
    setFormFields({ ...formFields, hours: e.value });
  }
  const selectOnChangeMinutes = (e) => {
    console.log("selected Minute", e.value)
    setprevMint({ label: e.value, value: e.value })
    setFormFields({ ...formFields, mint: e.value });
  }
  const handleUpdateTimeSheet = () => {
    props.updateTimeSheetAction(formFields);
  }
  console.log("TimeSheetDetails:", props.TimeSheetDetails)
  console.log("formFields:", formFields)

  return (

    <>
      {props.errorMessage && (
        <VWMessage type="danger" defaultMessage={props.errorMessage} baseClassName="alert"></VWMessage>
      )}
      <form className="mb-3" name="formAddVechicle">
        <div className="form-group">
          <Label className="col-form-label"> Date <span className="text-danger">*</span>
          </Label>


          <Datetime
            dateFormat="DD-MM-YYYY"
            timeFormat={false}
            closeOnSelect
            value={formFields && moment(formFields.createdDateTime)}
            //eslint-disable-next-line
            utc={true}
            inputProps={{ disabled: true }}
          />


        </div>
        <div className="form-group">
          <Label className="col-form-label"> Project Name <span className="text-danger">*</span>
          </Label>
          <Async
            id="selectedProject"
            name="selectedProject"
            placeholder="Select Project"
            className="vm-react-select"
            isSearchable
            defaultOptions
            loadOptions={handleLoadProject}
            value={prevProject}
            isDisabled
          />
        </div>
        <div className="form-group">
          <Label className="col-form-label"> Task <span className="text-danger">*</span>
          </Label>
          <Select
            name='selectedTask'
            placeholder='Select Task'
            value={prevTask}
            isDisabled

          />
        </div>
        <div className="form-group">
          <Label className="col-form-label"> Scope <span className="text-danger">*</span>
          </Label>
          <Select
            name="type"
            placeholder="Select Scope"
            options={ScopeOptions}
            value={prevScope}
            onChange={handleChangeScopeSelect}
          />
        </div>
        <Row>
          <Col md={6}>
            <Label className="col-form-label"> Hour <span className="text-danger">*</span>
            </Label>
            <Form  >
              <InputGroup >
                <InputGroupText style={{ width: '80px' }}>
                  HH
                </InputGroupText>
                <div style={{ width: "100px" }}>
                  <Select
                    style={{ width: '100px', height: '39px', textAlign: 'center', borderBottomRightRadius: '5px', borderTopRightRadius: '5px', borderColor: 'lightgray' }}
                    name="hour"
                    options={hours}
                    placeholder="00"
                    value={prevHour}
                    onChange={selectOnChangeHours}
                  />

                </div>
              </InputGroup>
            </Form>
          </Col>
          <Col md={6}>
            <Label className="col-form-label"> Minute <span className="text-danger">*</span>
            </Label>
            <Form  >
              <InputGroup >
                <InputGroupText style={{ width: '80px' }}>
                  MM
                </InputGroupText>
                <div style={{ width: "100px" }}>
                  <Select
                    style={{ width: '100px', height: '39px', textAlign: 'center', borderBottomRightRadius: '5px', borderTopRightRadius: '5px', borderColor: 'lightgray' }}
                    name="minute"
                    value={prevMint}
                    placeholder="00"
                    options={minutes}
                    onChange={selectOnChangeMinutes}
                  />
                </div>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </form>
      <div className="form-group">
        <VWButton
          messageKey="editTimeSheetButton"
          defaultMessage="Update TimeSheet"
          buttonType="dark-success"
          baseClassName="btn"
          className="me-2"
          onClick={handleUpdateTimeSheet}
        // isLoading={props.isPending}
        // isDisabled={props.isPending}
        ></VWButton>
        <VWButton
          messageKey="cancelTimeSheetButton"
          defaultMessage="Cancel"
          buttonType="secondary"
          baseClassName="btn"
          onClick={props.handleClose}
        // isDisabled={props.isPending}
        ></VWButton>
      </div>
    </>
  )
}
const mapStateToProps = (state) => ({
  isPending: state.TimeSheet.isPending,
  errorMessage: state.TimeSheet.updateTimeSheetErrorMessage,
  TimeSheetDetails: state.TimeSheet.timeSheetDetails,
});

const mapDispatchToProps = (dispatch) => ({
  updateTimeSheetAction: (formfield) => dispatch(updateTimeSheet(formfield)),
  getProjectAsyncSelectAction: (searchValue, callback) =>
    dispatch(getProjectAsyncSelect(searchValue, callback)),
});
export default connect(mapStateToProps, mapDispatchToProps)(timeSheetUpdate)