/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class VWModel extends Component {
  
  renderSizeClassName = (baseClassName, modalSize) => {
    // const customStyle = {
    //   width: '90%'
    // }
    switch (modalSize) {
      case 'small':
        return ` ${baseClassName}-sm`;
      case 'large':
        return ` ${baseClassName}-lg`;
      case 'extra-large':
        return ` ${baseClassName}-xl`;
      case 'xxl':
        return ` ${baseClassName}-xxl`;
        case'SizeChange':
        return ` ${baseClassName}-xl`
      default:
        return ` ${baseClassName}-custom-width`;
    }
  };

  renderClassName = (modalSize, className) => {
    const baseClassName = 'modal';
    if (className) {
      return `${this.renderSizeClassName(baseClassName, modalSize)} ${className}`;
    }
    return `${this.renderSizeClassName(baseClassName, modalSize)}`;
  };

  render() {
    const { header, children, isOpen, showFooter, handleClose, modalSize, className ,centered} = this.props;
console.log(className)
//eslint-disable-next-line
// const isCentered = centered === "true" ? true : false;
    return (
      <Modal isOpen={isOpen} centered={centered} className={this.renderClassName(modalSize, className)}>
        <ModalHeader toggle={handleClose}>{header}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        {showFooter && <ModalFooter></ModalFooter>}
      </Modal>
    );
  }
}

export default VWModel;
