import React from 'react';
import propTypes from 'prop-types';

class HitterList extends React.Component {
  static propTypes = {
    teamName: propTypes.string,
    lastHitter: propTypes.string,
    battingList: propTypes.object
  };

  averageBat = (h, ab) => Math.round((parseInt(h, 10) / parseInt(ab, 10)) * 1000);

  render() {
    const { teamName, battingList, lastHitter } = this.props;
    const auxLastHitter = parseInt(lastHitter, 10);
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
              <tr className={auxLastHitter === v ? 'at-bat' : ''} key={i}>
                <td>Hitter {v}</td>
                <td>{battingList ? `${battingList[v].H}-${battingList[v].AB}` : ''}</td>
                <td>
                  {battingList && battingList[v].H
                    ? this.averageBat(battingList[v].H, battingList[v].AB)
                    : '000'}
                </td>
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
            tr.at-bat {
              background-color: gainsboro;
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default HitterList;
