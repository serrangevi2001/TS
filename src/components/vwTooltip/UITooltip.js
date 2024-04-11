/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';

class VWTooltip extends Component {
  state = {
    tooltipOpen: false,
  };

  // eslint-disable-next-line react/no-access-state-in-setstate
  toggle = () => this.setState({ tooltipOpen: !this.state.tooltipOpen });

  render() {
    return [
      <Tooltip
        {...this.props}
        isOpen={this.state.tooltipOpen}
        toggle={this.toggle}
        target={`id4tooltip_${this.props.id}`}
        key="1"
      >
        {this.props.content}
      </Tooltip>,
      React.cloneElement(React.Children.only(this.props.children), {
        id: `id4tooltip_${this.props.id}`,
        key: '2',
      }),
    ];
  }
}

export default VWTooltip;
