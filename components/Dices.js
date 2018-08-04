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
    className: propTypes.string,
    onClickDices: propTypes.func,
    valueDice1: propTypes.number,
    valueDice2: propTypes.number
  };

  render() {
    const { valueDice1, valueDice2, className, onClickDices } = this.props;
    return (
      <>
        <div>
          <div className={`dices ${className}`}>
            <div className="first-dice" onClick={onClickDices} style={{ cursor: 'pointer' }}>
              {valueDice1 === 1 ? <NormalImg src={DiceImg1} alt={valueDice1.toString()} /> : null}
              {valueDice1 === 2 ? <NormalImg src={DiceImg2} alt={valueDice1.toString()} /> : null}
              {valueDice1 === 3 ? <NormalImg src={DiceImg3} alt={valueDice1.toString()} /> : null}
              {valueDice1 === 4 ? <NormalImg src={DiceImg4} alt={valueDice1.toString()} /> : null}
              {valueDice1 === 5 ? <NormalImg src={DiceImg5} alt={valueDice1.toString()} /> : null}
              {valueDice1 === 6 ? <NormalImg src={DiceImg6} alt={valueDice1.toString()} /> : null}
            </div>
            <div className="second-dice ml-1" onClick={onClickDices} style={{ cursor: 'pointer' }}>
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
