import React from "react";
import PropTypes from "prop-types";

class HistoryRender extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      numbers: PropTypes.array
    })
  };
  render() {
    const { numbers } = this.props.details;
    return (
      <li>
        <h3>
          {numbers.map((data, index) => (
            <span key={index}>
              {data} {index === 0 ? " - " : ""}
            </span>
          ))}
        </h3>
      </li>
    );
  }
}

export default HistoryRender;
