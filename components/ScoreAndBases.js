import React from "react";
import propTypes from "prop-types";
import Bases from "./Bases";

class ScoreAndBases extends React.Component {
  static propTypes = {
    bases: propTypes.array.isRequired,
    visitor: propTypes.object.isRequired,
    home: propTypes.object.isRequired,
    isHomeAtBat: propTypes.bool.isRequired
  };
  render() {
    const { bases, visitor, home, isHomeAtBat } = this.props;
    const innings = home.runs.length + 1;

    function teamAndScore(props) {
      return (
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
    }

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
                  {/* TODO: Double check a best way to avoid double call of the same cmp */}
                  {teamAndScore({
                    team: "VIS",
                    runs: visitor.runs.reduce(
                      (total, item) => (total += item),
                      0
                    )
                  })}
                  {teamAndScore({
                    team: "HC",
                    runs: home.runs.reduce((total, item) => (total += item), 0)
                  })}
                </div>
              </td>
              <td rowSpan="2">
                <Bases bases={bases} />
              </td>
            </tr>
            <tr>
              <td>
                {!isHomeAtBat ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}{" "}
                {innings}
              </td>
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
