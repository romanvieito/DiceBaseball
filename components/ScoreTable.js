import React from 'react';
import propTypes from 'prop-types';
import basic from '../helpers/theme';

class ScoreTable extends React.Component {
  static propTypes = {
    className: propTypes.string,
    visitor: propTypes.object,
    home: propTypes.object
  };

  state = {
    inningsNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  };

  componentDidUpdate() {
    const { visitor } = this.props;
    const { inningsNumbers } = this.state;
    if (visitor.runs.length > 9) {
      if (visitor.runs.length !== inningsNumbers.length) {
        let inningsNumbersAux = [];
        inningsNumbersAux = visitor.runs.map((value, i) => i + 1);
        this.updateState(inningsNumbersAux);
      }
    }
  }

  updateState(inningsNumbersAux) {
    this.setState({ inningsNumbers: inningsNumbersAux });
  }

  render() {
    const { visitor, home, className } = this.props;
    const { inningsNumbers } = this.state;

    return (
      <React.Fragment>
        <div className="wrapper">
          <table className={`table box-shadow ${className}`}>
            <thead>
              <tr className="green-color">
                <th scope="col" />
                {inningsNumbers.map((v, i) => (
                  <th scope="col" key={i}>
                    {v}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className={visitor.runs.length > home.runs.length ? 'back-color-inn-play' : ''}>
                <th className="team-name" scope="row">
                  Visitor
                </th>
                {visitor.runs.map((value, i) => (
                  <td className="no-border" key={i}>
                    {value}
                  </td>
                ))}
              </tr>
              <tr className={visitor.runs.length === home.runs.length ? 'back-color-inn-play' : ''}>
                <th className="team-name" scope="row">
                  Home
                </th>
                {home.runs.map((value, i) => (
                  <td className="no-border" key={i}>
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
                {/* eslint-disable no-param-reassign */}
                <th scope="row">{visitor.runs.reduce((total, item) => (total += item), 0)}</th>
                {/* eslint-disable no-param-reassign */}
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
            .back-color-inn-play td:last-child {
              background-color: #edeef0;
            }
            @media all and (max-width: 380px) {
              table th,
              table td {
                padding: 0.3em 0.23em;
              }
            }
            @media all and (max-width: 470px) {
              th,
              td {
                padding: 0.3em 0.4em;
              }
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default ScoreTable;
