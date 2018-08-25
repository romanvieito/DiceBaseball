import React from 'react';
import PropTypes from 'prop-types';

class HistoryRender extends React.Component {
  static propTypes = {
    data: PropTypes.object
  };

  render() {
    const { data } = this.props;
    const arrayToRender = Object.keys(data).map(v => data[v]);
    return (
      <div>
        <ul>
          {arrayToRender.map((v, i) => (
            <li key={i}>{v[5]}</li>
          ))}
        </ul>
        <style jsx>
          {`
            ul {
              list-style: none;
            }
          `}
        </style>
      </div>
    );
  }
}

export default HistoryRender;
