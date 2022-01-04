import React from 'react';

function withTooltip(Component) {
  return class WithTooltip extends React.Component {
    state = {
      showTooltip: false,
    };

    handleShowTooltip = () => this.setState({ showTooltip: true });

    handleHideTooltip = () => this.setState({ showTooltip: false });

    render() {
      const { showTooltip } = this.state;
      
      return (
        <div onMouseOver={ this.handleShowTooltip } onMouseOut={ this.handleHideTooltip }>
          <Component { ...this.props } showTooltip={ showTooltip } />
        </div>
      );
    }
  }
}

export default withTooltip;
