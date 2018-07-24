import React from "react";
import propTypes from "prop-types";

class Bases extends React.Component {
  static propTypes = {
    bases: propTypes.array
  };
  render() {
    const copyArray = [...this.props.bases];
    return (
      <React.Fragment>
        <div>
          {copyArray[0] ? (
            <div className="rombo first on-base" />
          ) : (
            <div className="rombo first" />
          )}
          {copyArray[1] ? (
            <div className="rombo second on-base" />
          ) : (
            <div className="rombo second" />
          )}
          {copyArray[2] ? (
            <div className="rombo third on-base" />
          ) : (
            <div className="rombo third" />
          )}
        </div>
        <style jsx>{`
          .rombo {
            position: absolute;
            background: #cccccc;
            width: 1.5em;
            height: 1.5em;
            -moz-transform: rotate(45deg) skew(10deg, 10deg);
            -webkit-transform: rotate(45deg) skew(10deg, 10deg);
            -ms-transform: rotate(45deg) skew(10deg, 10deg);
            -o-transform: rotate(45deg) skew(10deg, 10deg);
            transform: rotate(45deg) skew(10deg, 10deg);
          }
          .first {
            margin-left: 3.96em;
            margin-top: 1.6em;
          }
          .second {
            margin-left: 3em;
            margin-top: 0.3em;
          }
          .third {
            margin-left: 2.08em;
            margin-top: 1.6em;
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
