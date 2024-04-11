/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class VWSnackbar extends Component {
  handleClick = (event, doClose) => {
    event.preventDefault();
    return doClose();
  };

  renderDirectionClassName = (direction) => {
    const { baseClassName } = this.props;
    switch (direction) {
      case 'top':
        return `${baseClassName}-top`;
      case 'bottom':
        return `${baseClassName}-bottom`;
      default:
        return '';
    }
  };

  renderTypeClassName = (type) => {
    const { baseClassName } = this.props;
    switch (type) {
      case 'inline':
        return `${baseClassName}-inline`;
      case 'block':
        return `${baseClassName}-block`;
      default:
        return '';
    }
  };

  render() {
    const { isOpen, direction, type, children, baseClassName, dataId } = this.props;

    return (
      <div
        className={
          isOpen
            ? `${baseClassName} ${this.renderDirectionClassName(
                direction,
              )} ${baseClassName}-visible`
            : `${baseClassName} ${this.renderDirectionClassName(direction)}`
        }
        data-id={dataId}
      >
        <div className={`${baseClassName}-content ${this.renderTypeClassName(type)}`}>
          {children}
        </div>
      </div>
    );
  }
}

VWSnackbar.defaultProps = {
  isOpen: false,
  baseClassName: 'snackbar',
  timeout: 5000,
  direction: 'bottom',
  type: 'inline',
};

export default VWSnackbar;
