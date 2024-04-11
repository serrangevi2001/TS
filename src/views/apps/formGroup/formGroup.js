
import PropTypes from 'prop-types';

const ComponentCard = ({ children,  }) => {
  return (
    <>   
        <div>{children || "Date"}</div>
      
    </>
  );
};

ComponentCard.propTypes = {
  children: PropTypes.node,
};

export default ComponentCard;