import React from 'react';

class LoadingMessage extends React.Component {
  constructor(props) {
    super(props);
    this.enableMessage = this.enableMessage.bind(this);

    this.state = {
      displayMessage: false
    };

    this.timer = setTimeout(this.enableMessage, 10);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  enableMessage() {
    this.setState({ displayMessage: true });
  }

  render() {
    const { displayMessage } = this.state;

    if (!displayMessage) {
      return null;
    }

    return <div>Running...</div>;
  }
}

export default LoadingMessage;
