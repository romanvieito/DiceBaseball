import React from "react";
import PropTypes from "prop-types";

class ScoreTable extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
          <table className="table">
            <thead>
              <tr className="green-color">
                <th scope="col">FINAL</th>
                <th scope="col">1</th>
                <th scope="col">2</th>
                <th scope="col">3</th>
                <th scope="col">4</th>
                <th scope="col">5</th>
                <th scope="col">6</th>
                <th scope="col">7</th>
                <th scope="col">8</th>
                <th scope="col">9</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Visitor</th>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <th scope="row">Host</th>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
          <table className="table">
            <thead>
              <tr className="green-color">
                <th scope="col">R</th>
                <th scope="col">H</th>
                <th scope="col">E</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">0</th>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <th scope="row">0</th>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <style jsx>{`
          .wrapper {
            display: flex;
          }
          .green-color {
            background-color: #cccccc;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default ScoreTable;
