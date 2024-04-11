import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { getDashboardCounts } from '../../../store/apps/Dashboard/action';
// import { useDispatch, useSelector } from 'react-redux';

const TicketFilter = (props) => {

  
  useEffect(() => {
    //eslint-disable-next-line
    props.getDashboardCounts();
  }, [])

  console.log("allCountings:",props.allCountings)
  return (
    <>
    <Row>
      <Col lg="3">
        <Card
         color="secondary"
          className="text-white text-center"
        ><CardBody>
        {/* eslint-disable-next-line */}
        <h2>{props.allCountings && props.allCountings.total_Timesheetcount ||'0'}</h2>
        <h5>Total Timesheet Count</h5>
      </CardBody>
        </Card>
     
      </Col>  
      <Col lg="3">
        <Card
         color="primary"
          className="text-white text-center"
        >
          <CardBody>
            {/* eslint-disable-next-line */}
            <h2>{ props.allCountings && props.allCountings.submitted_Count || '0'}</h2>
            <h5>Submitted Count</h5>
          </CardBody>
  
        </Card>
      </Col>
      <Col lg="3">
        <Card
         color="success"
          className="text-white text-center"
        >
          <CardBody>
            {/* eslint-disable-next-line */}
            <h2>{props.allCountings && props.allCountings.approved_Count || '0'}</h2>
            <h5>Approved Count</h5>
          </CardBody>
          
        </Card>
      </Col>
      <Col lg="3">
        <Card
         color="danger"
          className="text-white text-center"
        >
          <CardBody>
            {/* eslint-disable-next-line */}
            <h2>{props.allCountings &&  props.allCountings.rejected_Count ||'0'}</h2>
            <h5>Rejected Count</h5>
          </CardBody>
          
        </Card>
      </Col>
    </Row>
    <Row>
    <Col lg="6">
        <Card
         color="dark"
          className="text-white text-center"
        >
          <CardBody>
            {/* eslint-disable-next-line */}
            <h2>{props.allCountings && props.allCountings.total_Teamtimesheet || '0'}</h2>
            <h5>Total Team Timesheet Count</h5>
          </CardBody>
          
        </Card>
      </Col>
    <Col lg="6">
        <Card
         color="warning"
          className="text-white text-center"
        >
          <CardBody>
            {/* eslint-disable-next-line */}
            <h2>{ props.allCountings && props.allCountings.pending_Approvals ||'0'}</h2>
            <h5>Pending Approvals Count</h5>
          </CardBody>
          
        </Card>
      </Col>
    </Row>
    </>
  );
};

const mapStateToProps = (state) => ({

  allCountings: state.dashboard.DashboardCounts,
 
})

const mapDispatchToProps = (dispatch) => ({
  getDashboardCounts: () => dispatch(getDashboardCounts())
})
export default connect(mapStateToProps,mapDispatchToProps) (TicketFilter);
