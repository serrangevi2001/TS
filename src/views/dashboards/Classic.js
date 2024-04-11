import { Card, CardBody, CardTitle } from 'reactstrap';
import TicketFilter from '../../components/apps/ticket/TicketFilter';

const Classic = () => {
  return (
    <Card>
      <CardTitle
        tag="h4"
        className="border-bottom px-4 py-3 mb-0 d-flex justify-content-between align-items-center"
      >
        Dashboard
      </CardTitle>
      <CardBody>

      <TicketFilter />
      </CardBody>
    </Card>
  );
};

export default Classic;
