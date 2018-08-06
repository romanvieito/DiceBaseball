import React from 'react';
import propTypes from 'prop-types';

class Bases extends React.Component {
  static propTypes = {
    bases: propTypes.array
  };

  render() {
    const { bases } = this.props;
    return (
      <React.Fragment>
        <div className="bases">
          {bases[0] ? <div className="rombo first on-base" /> : <div className="rombo first" />}
          {bases[1] ? <div className="rombo second on-base" /> : <div className="rombo second" />}
          {bases[2] ? <div className="rombo third on-base" /> : <div className="rombo third" />}
        </div>
        <style jsx>
          {`
            .bases {
              position: relative;
              left: 28%;
            }
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
              margin-left: 3em;
            }
            .second {
              margin-left: 1.8em;
              margin-top: -1em;
            }
            .third {
              margin-left: 0.6em;
            }
            .on-base {
              background: #7c7c7c;
            }
            @media all and (max-width: 450px) {
              div.bases {
                left: 0%;
              }
            }
            @media all and (max-width: 600px) {
              .bases {
                left: 5%;
              }
            }
            @media all and (min-width: 820px) {
              .bases {
                left: -4%;
              }
            }
            @media all and (min-width: 900px) {
              .bases {
                left: 10%;
              }
            }
            @media all and (min-width: 1150px) {
              .bases {
                left: 20%;
              }
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default Bases;
