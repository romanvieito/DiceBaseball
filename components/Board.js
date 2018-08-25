/**
 *
 * Board.js
 *
 * Renders the main board
 */

import React from 'react';
import propTypes from 'prop-types';

import { batDictionary } from '../helpers/batting';

class Board extends React.Component {
  static propTypes = {
    className: propTypes.string,
    gameOver: propTypes.bool,
    /* eslint-disable react/no-unused-prop-types */
    dice: propTypes.number,
    whoIsWinning: propTypes.func,
    saveLabel: propTypes.func,
    outs: propTypes.number,
    lastKeyHistoryDice: propTypes.string,
    teamNames: propTypes.object
  };

  state = {
    label: 'Roll the dices'
  };

  componentDidUpdate(props) {
    const { lastKeyHistoryDice } = this.props;
    if (lastKeyHistoryDice !== props.lastKeyHistoryDice) {
      this.labelRender();
    }
  }

  labelRender = () => {
    const { dice, saveLabel } = this.props;
    const label = batDictionary(dice);

    this.setState({ label });
    saveLabel(label);
  };

  render() {
    const { className, teamNames, gameOver, whoIsWinning } = this.props;
    const { label } = this.state;

    return (
      <React.Fragment>
        <div className={`board ${className}`}>
          <span className="hit-label">
            {!gameOver ? (
              label
            ) : (
              <span className="uppercase">
                {whoIsWinning() === 1 ? teamNames.hc : teamNames.vis} win!!!
              </span>
            )}
          </span>
        </div>

        <style jsx>
          {`
            .board {
              background-color: black;
              color: white;
              height: 17em;
              border-style: solid;
              border-width: 6px;
              border-color: white;
              display: flex;
              align-items: center;
            }
            .hit-label {
              flex-grow: 3;
              font: 65px arial, sans-serif;
              font-weight: 700;
            }
            @media all and (max-width: 390px) {
              .board {
                height: 12em;
              }
            }
            @media all and (max-width: 450px) {
              .board {
                height: 14em;
              }
            }
            @media all and (max-width: 820px) {
              .board {
                margin-top: 1em;
              }
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default Board;
