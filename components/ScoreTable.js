import React from 'react';
import propTypes from 'prop-types';
import basic from '../helpers/theme';

class ScoreTable extends React.Component {
  static propTypes = {
    className: propTypes.string,
    visitor: propTypes.object,
    home: propTypes.object
  };

  render() {
    const { visitor, home, className } = this.props;

    return (
      <React.Fragment>
        <div className="wrapper">
          <table className={`table box-shadow ${className}`}>
            <thead>
              <tr className="green-color">
                <th scope="col" />
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v, i) => (
                  <th scope="col" key={i}>
                    {v}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="team-name" scope="row">
                  Visitor
                </th>
                {visitor.runs.map((value, i) => (
                  <td className="no-border" scope="col" key={i}>
                    {value}
                  </td>
                ))}
              </tr>
              <tr>
                <th className="team-name" scope="row">
                  Home
                </th>
                {home.runs.map((value, i) => (
                  <td className="no-border" scope="col" key={i}>
                    {value}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <table className={`table box-shadow ${className}`}>
            <thead>
              <tr className="green-color">
                <th scope="col">R</th>
                <th scope="col">H</th>
                <th scope="col">E</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{visitor.runs.reduce((total, item) => (total += item), 0)}</th>
                <td>{visitor.hitsTotal}</td>
                <td>0</td>
              </tr>
              <tr>
                <th scope="row">{home.runs.reduce((total, item) => (total += item), 0)}</th>
                <td>{home.hitsTotal}</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <style jsx>
          {`
            .wrapper {
              display: flex;
              justify-content: center;
            }
            .green-color {
              background-color: #cccccc;
              color: white;
            }
            table {
              font-weight: 300;
              border-color: ${basic.colors.border};
              color: ${basic.colors.primary};
              border-collapse: collapse;
            }
            th,
            td {
              border: 1px solid;
              border-color: #9c9ea0;
              padding: 0.3em 0.6em;
            }
            .team-name {
              text-align: left;
              font-weight: 100;
            }
            .no-border {
              border: 0;
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default ScoreTable;
