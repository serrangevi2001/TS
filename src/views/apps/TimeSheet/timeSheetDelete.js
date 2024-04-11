import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import VWButton from '../../../components/vwButton/VWButton'
import { deleteTimeSheetAction } from '../../../store/apps/timeSheet/action';
import VWMessage from '../../../components/vwMessage/vwMessage';


const timeSheetDelete = (props) => {
     //eslint-disable-next-line
  const [timeSheetDeleteAction, setTimeSheetDelete] = useState({});
  //eslint-disable-next-line
  useEffect(() => {
    const { data } = props;
    console.log("data:", data)
    setTimeSheetDelete(data)
  }, [])

  const handleDeleteActionTimeSheet = () => {
    props.deleteTimeSheet(timeSheetDeleteAction);
  };

  console.group("timeSheetDeleteAction:",timeSheetDeleteAction);
  console.group("timeSheetDeleteAction:",props.errorMessage);
  return (
   <>
    {props.errorMessage && (
        <VWMessage type="danger" defaultMessage={props.errorMessage} baseClassName="alert"></VWMessage>
      )}
   <h5>Are you sure you want to delete ?</h5>
   <br></br>
   <VWButton
          messageKey="deleteTimeSheetActionButton"
          defaultMessage="  Delete  "
          buttonType="success"
          baseClassName="btn"
          className="me-2"
          onClick={handleDeleteActionTimeSheet}
        // isLoading={props.isPending}
        // isDisabled={props.isPending
        ></VWButton>
        <VWButton
          messageKey="cancelMyTimeSheetButton"
          defaultMessage="Cancel"
          buttonType="secondary"
          baseClassName="btn"
          onClick={props.handleClose}
        // isDisabled={props.isPending}
        ></VWButton>

   </>
  )
}
const mapStateToProps = (state) => ({
    errorMessage: state.TimeSheet.errorMessage,
    isPending: state.TimeSheet.isPending,

  });
  const mapDispatchToProps = (dispatch) => ({
    deleteTimeSheet: (timeSheetDeleteAction) => dispatch(deleteTimeSheetAction(timeSheetDeleteAction)),
  });

export default connect (mapStateToProps,mapDispatchToProps)(timeSheetDelete);