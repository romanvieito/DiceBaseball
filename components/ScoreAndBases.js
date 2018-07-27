import React from "react";
import propTypes from "prop-types";
import Bases from "./Bases";

class ScoreAndBases extends React.Component {
  static propTypes = {
    bases: propTypes.array
  };
  render() {
    const { bases } = this.props;

    const teamAndScore = props => (
      <div>
        <div className="flex space-between">
          <span>{props.team}</span>
          <span>{props.runs}</span>
        </div>
        <style jsx>{`
          .space-between {
            justify-content: space-between;
          }
        `}</style>
      </div>
    );

    return (
      <React.Fragment>
        <table className="text-left">
          <tbody>
            <tr>
              <td colSpan="2">McCarthy</td>
            </tr>
            <tr>
              <td>
                <div>
                  {teamAndScore({ team: "VIS", runs: "4" })}
                  {teamAndScore({ team: "HC", runs: "4" })}
                </div>
              </td>
              <td rowSpan="2">
                <Bases bases={bases} />
              </td>
            </tr>
            <tr>
              <td>^ 11</td>
              <td className="text-rigth">0 Out</td>
            </tr>
          </tbody>
        </table>

        <style jsx>{`
          .text-rigth {
            text-align: right;
          }
          .text-left {
            text-align: left;
          }
          .flex {
            flex-direction: column;
          }
          .flex-space-btw div {
            display: flex;
            justify-content: space-between;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default ScoreAndBases;
