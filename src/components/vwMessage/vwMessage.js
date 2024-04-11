/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class VWMessage extends Component {
  renderTypeClassName(type) {
    const { baseClassName } = this.props;
    switch (type) {
      case 'info':
        return ` ${baseClassName}-info`;
      case 'warning':
        return ` ${baseClassName}-warning`;
      case 'danger':
        return ` ${baseClassName}-danger`;
      case 'primary':
        return ` ${baseClassName}-danger`;
      case 'success':
        return ` ${baseClassName}-success`;
      default:
        return '';
    }
  }

  render() {
    const { type, defaultMessage, baseClassName } = this.props;
    return (
      <div className={`${baseClassName}${this.renderTypeClassName(type)} fade show`}>
        {defaultMessage.split('\n').map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    );
  }
}

export default VWMessage;
