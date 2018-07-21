import React from "react";
import PropTypes from "prop-types";

class HistoryRender extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      key: PropTypes.number,
    }),
  };
  render() {
    const { key } = this.props.details;
    return (
      <li>
        <h3>
          {key}
        </h3>
      </li>
    );
  }
}

export default HistoryRender;
