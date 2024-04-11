/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class VWSkeleton extends Component {
  renderType = (type) => {
    const { baseClassName } = this.props;
    switch (type) {
      case 'basic':
        return <div className={`${baseClassName}-line ${baseClassName}-line-70`} />;
      case 'base':
        return (
          <>
            <div className={`${baseClassName}-line ${baseClassName}-line-50`} />
            <div className={`${baseClassName}-line ${baseClassName}-line-90`} />
            <div className={`${baseClassName}-line ${baseClassName}-line-70`} />
          </>
        );
      case 'body':
        return (
          <>
            <div className={`${baseClassName}-line ${baseClassName}-line-100`} />
            <div className={`${baseClassName}-line ${baseClassName}-line-100`} />
            <div className={`${baseClassName}-line ${baseClassName}-line-40`} />
          </>
        );
      default:
        return '';
    }
  };

  render() {
    const { type, className, baseClassName } = this.props;
    return (
      <div className={className ? `${baseClassName} ${className}` : `${baseClassName}`}>
        {this.renderType(type)}
      </div>
    );
  }
}

VWSkeleton.defaultProps = {
  type: 'base',
  baseClassName: 'skeleton',
};

export default VWSkeleton;
