import React from "react";
import propTypes from "prop-types";

class Bases extends React.Component {
  static propTypes = {
    bases: propTypes.array
  };
  render() {
    const basesToRender = [...this.props.bases];
    return (
      <React.Fragment>
        <div>
          {basesToRender[0] ? (
            <div className="rombo first on-base" />
          ) : (
            <div className="rombo first" />
          )}
          {basesToRender[1] ? (
            <div className="rombo second on-base" />
          ) : (
            <div className="rombo second" />
          )}
          {basesToRender[2] ? (
            <div className="rombo third on-base" />
          ) : (
            <div className="rombo third" />
          )}
        </div>
        <style jsx>{`
          .rombo {
            position: absolute;
            background: #cccccc;
            width: 1.2em;
            height: 1.2em;
            -moz-transform: rotate(45deg) skew(0deg, 0deg);
            -webkit-transform: rotate(45deg) skew(0deg, 0deg);
            -ms-transform: rotate(45deg) skew(0deg, 0deg);
            -o-transform: rotate(45deg) skew(0deg, 0deg);
            transform: rotate(45deg) skew(0deg, 0deg);
          }
          .first {
            margin-left: 3.2em;
            margin-top: -0.5em;
          }
          .second {
            margin-left: 2em;
            margin-top: -1.5em;
          }
          .third {
            margin-left: 0.8em;
            margin-top: -0.5em;
          }
          .on-base {
            background: #7c7c7c;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default Bases;
