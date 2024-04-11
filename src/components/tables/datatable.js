/* eslint-disable react/static-property-placement */
/* eslint-disable import/extensions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

require('datatables.net-bs');
require('datatables.net-bs4/js/dataTables.bootstrap4.js');
require('datatables.net-bs4/css/dataTables.bootstrap4.css');
require('datatables.net-buttons');
require('datatables.net-buttons-bs');
require('datatables.net-responsive');
require('datatables.net-responsive-bs');
require('datatables.net-responsive-bs/css/responsive.bootstrap.css');
require('datatables.net-buttons/js/buttons.colVis.js'); // Column visibility
require('datatables.net-buttons/js/buttons.html5.js'); // HTML 5 file export
require('datatables.net-buttons/js/buttons.flash.js'); // Flash file export
require('datatables.net-buttons/js/buttons.print.js'); // Print view button
require('datatables.net-keytable');
require('datatables.net-keytable-bs/css/keyTable.bootstrap.css');

export default class Datatable extends Component {
  static propTypes = {
    options: PropTypes.object,
    children: PropTypes.element.isRequired,
    dtInstance: PropTypes.func,
  };

  static defaultProps = {
    options: {},
  };

  componentDidMount() {
    const dtInstance = $(this.tableElement).dataTable(this.props.options);

    if (this.props.dtInstance) this.props.dtInstance(dtInstance);
  }

  componentWillUnmount() {
    $(this.tableElement).dataTable({ destroy: true });
  }

  setRef = (node) => {
    this.tableElement = node;
  };

  render() {
    return React.cloneElement(React.Children.only(this.props.children), {
      ref: this.setRef,
    });
  }
}





