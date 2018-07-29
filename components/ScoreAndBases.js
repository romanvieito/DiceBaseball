import React from "react";
import propTypes from "prop-types";
import Bases from "./Bases";
import basic from "../helpers/theme";

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
              padding: 0.4em 0 0.4em 0;
            }
          `}</style>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div>
          <div className="line-position" />
          <table className="text-left box-shadow">
            <tbody>
              <tr>
                <td className="font-light" colSpan="2">
                  Pitcher
                </td>
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
                      runs: home.runs.reduce(
                        (total, item) => (total += item),
                        0
                      )
                    })}
                  </div>
                </td>
                <td>
                  <Bases bases={bases} />
                </td>
              </tr>
              <tr className="no-border">
                <td>
                  {!isHomeAtBat ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}{" "}
                  {innings}
                </td>
                <td className="text-center">
                  {outs} <span className="font-light">Out</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <style jsx>{`
          .text-center {
            text-align: center;
          }
          .text-left {
            text-align: left;
          }
          table {
            font-weight: 900;
            color: ${basic.colors.primary};
            border-collapse: collapse;
            width: 12em;
            letter-spacing: 2px;
          }
          table tr td:first-of-type {
            padding-left: 1em;
          }
          tr:first-of-type td,
          tr:last-of-type td {
            padding: 0.3em;
          }
          td.pr-2 {
            padding-right: 0.8em;
          }
          tr.no-border td {
            border: 0;
          }
          table,
          th,
          td {
            border: 1px solid;
            border-color: ${basic.colors.border};
          }
          .font-light {
            font-weight: 400;
          }
          .line-position {
            content: " ";
            border-bottom: 1px solid ${basic.colors.primary};
            width: 6.5em;
            top: 4.3em;
            position: relative;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default ScoreAndBases;
