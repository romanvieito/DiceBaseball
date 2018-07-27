import React from "react";
import propTypes from "prop-types";
import Bases from "./Bases";

class ScoreAndBases extends React.Component {
  static propTypes = {
    bases: propTypes.array.isRequired,
    visitor: propTypes.object.isRequired,
    home: propTypes.object.isRequired,
    isHomeAtBat: propTypes.bool.isRequired,
    outs: propTypes.number.isRequired
  };
  render() {
    const { bases, visitor, home, isHomeAtBat, outs } = this.props;
    const innings = home.runs.length + 1;

    function teamAndScore(props) {
      return (
        <div className="team-score">
          <div className="flex space-between">
            <span>{props.team}</span>
            <span>{props.runs}</span>
          </div>
          <style jsx>{`
            .space-between {
              justify-content: space-between;
              padding: 0.2em 0 0 0;
              margin: 0.2em 0 0 0;
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
              <td colSpan="2">Pitcher</td>
            </tr>
            <tr>
              <td className="pr-2">
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
              <td>
                <Bases bases={bases} />
              </td>
            </tr>
            <tr>
              <td >
                {!isHomeAtBat ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}{" "}
                {innings}
              </td>
              <td className="text-center">{outs} Out</td>
            </tr>
          </tbody>
        </table>

        <style jsx>{`
          .text-center {
            text-align: center;
          }
          .text-left {
            text-align: left;
          }
          table {
            border-collapse: collapse;
            width: 12em;
          }
          table tr td:first-of-type{
            padding-left:1em;
          }
          tr:first-of-type td, tr:last-of-type td{
            padding: .3em;
          }
          td.pr-2{
            padding-right:.8em;
          }
          table,
          th,
          td {
            border: 1px solid black;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default ScoreAndBases;
