import React from 'react';
import propTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: propTypes.any,
    error: propTypes.any,
    errorInfo: propTypes.any
  };

  /* eslint-disable react/no-unused-state */
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo
    });
    // You can also log error messages to an error reporting service here
  }
  /* eslint-disable react/no-unused-state */

  render() {
    const { error, errorInfo, children } = this.props;
    if (errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return children;
  }
}

export default ErrorBoundary;
