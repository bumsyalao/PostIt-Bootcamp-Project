import React from 'react';

class FlashMessage extends React.Component {
  render() {
    const { id, type, text } = this.props.message;
    return (
      <div>
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: React.PropTypes.object.isRequired
}

export default FlashMessage;