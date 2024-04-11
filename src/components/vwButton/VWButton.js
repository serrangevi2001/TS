/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class VWButton extends Component {
  renderMessage = (messageKey, defaultMessage) => {
    return <span>{defaultMessage}</span>;
  };

  renderIsLoading = (isLoading) => {
    if (isLoading) {
      return <em></em>;
    }
    return null;
  };

  renderTypeClassName = (buttonType) => {
    const { baseClassName } = this.props;
    switch (buttonType) {
      case 'primary':
        return ` ${baseClassName}-primary`;
      case 'secondary':
        return ` ${baseClassName}-secondary`;
      case 'outline':
        return ` ${baseClassName}-outline`;
      case 'blueline':
        return ` ${baseClassName}-blueline`;
      case 'success':
        return ` ${baseClassName}-success`;
      case 'dark-success':
        return ` ${baseClassName}-dark-success`;
      default:
        return '';
    }
  };

  renderLengthClassName = (buttonLength) => {
    const { baseClassName } = this.props;
    switch (buttonLength) {
      case 'full':
        return ` ${baseClassName}-block`;
      default:
        return '';
    }
  };

  renderSizeClassName = (buttonSize) => {
    const { baseClassName } = this.props;
    switch (buttonSize) {
      case 'small':
        return ` ${baseClassName}-sm`;
      case 'extra-small':
        return ` ${baseClassName}-xs`;
      case 'large':
        return ` ${baseClassName}-lg`;
      default:
        return '';
    }
  };

  renderLoadingClassName = (isLoading) => {
    const { baseClassName } = this.props;
    if (isLoading) {
      return ` ${baseClassName}-loading`;
    }
    return '';
  };

  renderClassName = (buttonType, buttonLength, buttonSize, isLoading, className) => {
    const { baseClassName } = this.props;
    if (className) {
      return `${baseClassName}${this.renderTypeClassName(buttonType)}${this.renderLengthClassName(
        buttonLength,
      )}${this.renderSizeClassName(buttonSize)}${this.renderLoadingClassName(
        isLoading,
      )} ${className}`;
    }
    return `${baseClassName}${this.renderTypeClassName(buttonType)}${this.renderLengthClassName(
      buttonLength,
    )}${this.renderSizeClassName(buttonSize)}${this.renderLoadingClassName(isLoading)}`;
  };

  render() {
    const {
      messageKey,
      defaultMessage,
      isLoading,
      isDisabled,
      buttonType,
      buttonLength,
      buttonSize,
      className,
      baseClassName,
      onClick,
      ...args
    } = this.props;

    return (
      <button
        type="submit"
        onClick={(e) => {
          this.buttonDOM.blur();
          onClick(e);
        }}
        ref={(buttonDOM) => {
          this.buttonDOM = buttonDOM;
        }}
        className={this.renderClassName(buttonType, buttonLength, buttonSize, isLoading, className)}
        {...args}
        disabled={isDisabled}
      >
        {this.renderIsLoading(isLoading)}
        {this.renderMessage(messageKey, defaultMessage)}
      </button>
    );
  }
}

export default VWButton;
