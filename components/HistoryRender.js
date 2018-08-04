import React from 'react';
import PropTypes from 'prop-types';

class HistoryRender extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      numbers: PropTypes.array
    })
  };

  render() {
    const { details } = this.props;
    return (
      <li>
        <h3>
          {details.numbers.map((data, index) => (
            <span key={index}>
              {data}
              {index === 1 ? ' - ' : ''}
            </span>
          ))}
        </h3>
      </li>
    );
  }
}

export default HistoryRender;
