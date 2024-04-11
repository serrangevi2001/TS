/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
// Sweet Alert
import swal from 'sweetalert';

/**
 * Wrapper component for sweetalert plugin
 */
const VWSwal = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    // pass swal reference so is possible to chain popups
    swal(props.options).then((p) => props.callback(p, swal));
  };

  const { callback, ...rest } = props;
  return (
    <div {...rest} onClick={handleClick}>
      {props.children}
    </div>
  );
};

VWSwal.propType = {
  /** swal options object */
  options: PropTypes.object.isRequired,
  /** callback function for swal response */
  callback: PropTypes.func,
};

VWSwal.defaultProps = {
  callback: () => {},
};

export default VWSwal;
