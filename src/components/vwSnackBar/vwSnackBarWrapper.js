/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import VWSnackbar from './vwSnackbar';

const mapStateToProps = (state) => ({
  snackbar: state.snackbar,
});

const SnackbarWrapper = (props) => {
  return (
    <VWSnackbar type="inline" isOpen={props.snackbar.isActive}>
      <p>{props.snackbar.message}</p>
    </VWSnackbar>
  );
};

export default connect(mapStateToProps)(SnackbarWrapper);
