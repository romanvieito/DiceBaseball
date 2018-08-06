import React from 'react';
import propTypes from 'prop-types';

class HitterList extends React.Component {
  static propTypes = {
    teamName: propTypes.string
  };

  render() {
    const { teamName } = this.props;
    return (
      <React.Fragment>
        <div>{teamName}</div>
        <table className="box-shadow">
          <thead>
            <tr>
              <th scope="col">HITTERS</th>
              <th scope="col">H-AB</th>
              <th scope="col">AVG</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v, i) => (
              <tr key={i}>
                <td>Hitter {v}</td>
                <td>0-1</td>
                <td>.000</td>
              </tr>
            ))}
          </tbody>
        </table>
        <style jsx>
          {`
            table {
              border-collapse: collapse;
              width: 100%;
              color: #6c6d6f;
              font-size: 11px;
            }
            th,
            td {
              padding: 3px 8px;
              text-align: left;
              border-bottom: 1px solid #f1f2f3;
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default HitterList;
