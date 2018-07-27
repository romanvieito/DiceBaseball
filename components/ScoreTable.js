import React from "react";
import propTypes from "prop-types";

class ScoreTable extends React.Component {
  static propTypes = {
    visitor: propTypes.object,
    home: propTypes.object
  };
  render() {
    const { visitor, home } = this.props;

    return (
      <React.Fragment>
        <div className="wrapper">
          <table className="table">
            <thead>
              <tr className="green-color">
                <th scope="col">SCORE</th>
                {[1,2,3,4,5,6,7,8,9].map((v,i) => <th scope="col" key={i}>{v}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Visitor</th>
                {visitor.runs.map((value, i) => <td scope="col" key={i}>{value}</td>)}
              </tr>
              <tr>
                <th scope="row">Home</th>
                {home.runs.map((value, i) => <td scope="col" key={i}>{value}</td>)}
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
                <th scope="row">{visitor.runs.reduce((total, item) => total+= item, 0)}</th>
                <td>{visitor.hitsTotal}</td>
                <td>0</td>
              </tr>
              <tr>
                <th scope="row">{home.runs.reduce((total, item) => total+= item, 0)}</th>
                <td>{home.hitsTotal}</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <style jsx>{`
          .wrapper {
            display: flex;
            justify-content: center;
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
