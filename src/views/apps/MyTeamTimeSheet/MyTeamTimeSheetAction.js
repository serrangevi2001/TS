import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Input, Label } from 'reactstrap';
import VWMessage from '../../../components/vwMessage/vwMessage';
import { clearForm } from '../../../store/core/form/actions';
import VWButton from '../../../components/vwButton/VWButton';
import { updateTimeSheetActionList } from '../../../store/apps/MyTeamTimeSheet/action';

const MyTeamTimeSheetAction = (props) => {
  //eslint-disable-next-line
  const [timeSheetAction, setTimeSheet] = useState({});
  //eslint-disable-next-line
  useEffect(() => {
    const { data } = props;
    console.log("data:", data)
    setTimeSheet(data)
  }, [])

  const validateOnChange = (event) => {
    const { name, value } = event.target;
    console.log("value:", value)
    setTimeSheet({
      ...timeSheetAction,
      [name]: value
    })
  }

  const handleCreateActionTimeSheet = () => {
    props.updateTimeSheetAction(timeSheetAction);
  };
  console.log("timeSheetAction:", timeSheetAction)
  console.log("isPending:", props.isPending)
  return (
    <>
      {props.errorMessage && (
        <VWMessage type="danger" defaultMessage={props.errorMessage} baseClassName="alert"></VWMessage>
      )}
      <form className="mb-3" name="formAddVechicle">
        <div className="form-group">
          <Label className="col-form-label">Reason
          </Label>
          <Input
            style={{ height: '100px' }}
            type="textarea"
            name="reason"
            placeholder="Enter Reason"
            onChange={validateOnChange}
            value={timeSheetAction.reason}
          />
        </div>
      </form>
      <div className="form-group">
        <VWButton
          messageKey="createTimeSheetActionButton"
          defaultMessage="  Save  "
          buttonType="success"
          baseClassName="btn"
          className="me-2"
          onClick={handleCreateActionTimeSheet}
        // isLoading={props.isPending}
        // isDisabled={props.isPending
        ></VWButton>
        <VWButton
          messageKey="cancelMyTeamTimeSheetButton"
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
  form: state.form,
  isPending: state.MyteamTimeSheet.isPending,
  errorMessage: state.MyteamTimeSheet.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  clearFormAction: () => dispatch(clearForm()),
  updateTimeSheetAction: (timeSheetAction) => dispatch(updateTimeSheetActionList(timeSheetAction)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyTeamTimeSheetAction);
