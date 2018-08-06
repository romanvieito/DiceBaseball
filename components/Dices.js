import React from 'react';
import propTypes from 'prop-types';
import NormalImg from './Img';
import DiceImg1 from '../static/1small.gif';
import DiceImg2 from '../static/2small.gif';
import DiceImg3 from '../static/3small.gif';
import DiceImg4 from '../static/4small.gif';
import DiceImg5 from '../static/5small.gif';
import DiceImg6 from '../static/6small.gif';

class Dices extends React.Component {
  static propTypes = {
    gameOver: propTypes.bool,
    className: propTypes.string,
    onClickDices: propTypes.func,
    valueDice1: propTypes.number,
    valueDice2: propTypes.number
  };

  handleKeyDown = event => {
    const { onClickDices } = this.props;
    if (event.keyCode === 13) onClickDices();
  };

  render() {
    const { valueDice1, valueDice2, className, onClickDices, gameOver } = this.props;
    if (gameOver) {
      return null;
    }
    return (
      <>
        <div>
          {/* eslint-disable jsx-a11y/no-noninteractive-tabindex */}
          <div
            className={`dices ${className}`}
            tabIndex="0"
            role="presentation"
            onClick={onClickDices}
            onKeyDown={this.handleKeyDown}
          >
            {/* eslint-disable jsx-a11y/no-noninteractive-tabindex */}
            <div className="first-dice" style={{ cursor: 'pointer' }}>
              {valueDice1 === 1 ? <NormalImg src={DiceImg1} alt={valueDice1.toString()} /> : null}
              {valueDice1 === 2 ? <NormalImg src={DiceImg2} alt={valueDice1.toString()} /> : null}
              {valueDice1 === 3 ? <NormalImg src={DiceImg3} alt={valueDice1.toString()} /> : null}
              {valueDice1 === 4 ? <NormalImg src={DiceImg4} alt={valueDice1.toString()} /> : null}
              {valueDice1 === 5 ? <NormalImg src={DiceImg5} alt={valueDice1.toString()} /> : null}
              {valueDice1 === 6 ? <NormalImg src={DiceImg6} alt={valueDice1.toString()} /> : null}
            </div>
            <div className="second-dice ml-1" style={{ cursor: 'pointer' }}>
              {valueDice2 === 1 ? <NormalImg src={DiceImg1} alt={valueDice2.toString()} /> : null}
              {valueDice2 === 2 ? <NormalImg src={DiceImg2} alt={valueDice2.toString()} /> : null}
              {valueDice2 === 3 ? <NormalImg src={DiceImg3} alt={valueDice2.toString()} /> : null}
              {valueDice2 === 4 ? <NormalImg src={DiceImg4} alt={valueDice2.toString()} /> : null}
              {valueDice2 === 5 ? <NormalImg src={DiceImg5} alt={valueDice2.toString()} /> : null}
              {valueDice2 === 6 ? <NormalImg src={DiceImg6} alt={valueDice2.toString()} /> : null}
            </div>
            <style jsx>
              {`
                .dices {
                  display: flex;
                  justify-content: center;
                }
                .ml-1 {
                  margin-left: 1em;
                }
              `}
            </style>
          </div>
        </div>
      </>
    );
  }
}

export default Dices;
