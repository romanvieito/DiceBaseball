import React from "react";
import propTypes from "prop-types";
import NormalImg from "./Img";
import DiceImg1 from "../static/1small.gif";
import DiceImg2 from "../static/2small.gif";
import DiceImg3 from "../static/3small.gif";
import DiceImg4 from "../static/4small.gif";
import DiceImg5 from "../static/5small.gif";
import DiceImg6 from "../static/6small.gif";
class Dices extends React.Component {
  static propTypes = {
    valueDice1: propTypes.number,
    valueDice2: propTypes.number
  };
  render() {
    return (
      <>
        <div className="dices">
          <div className="first-dice">
            {this.props.valueDice1 === 1 ? (
              <NormalImg
                src={DiceImg1}
                alt={this.props.valueDice1.toString()}
              />
            ) : null}
            {this.props.valueDice1 === 2 ? (
              <NormalImg
                src={DiceImg2}
                alt={this.props.valueDice1.toString()}
              />
            ) : null}
            {this.props.valueDice1 === 3 ? (
              <NormalImg
                src={DiceImg3}
                alt={this.props.valueDice1.toString()}
              />
            ) : null}
            {this.props.valueDice1 === 4 ? (
              <NormalImg
                src={DiceImg4}
                alt={this.props.valueDice1.toString()}
              />
            ) : null}
            {this.props.valueDice1 === 5 ? (
              <NormalImg
                src={DiceImg5}
                alt={this.props.valueDice1.toString()}
              />
            ) : null}
            {this.props.valueDice1 === 6 ? (
              <NormalImg
                src={DiceImg6}
                alt={this.props.valueDice1.toString()}
              />
            ) : null}
          </div>
          <div className="second-dice ml-2">
            {this.props.valueDice2 === 1 ? (
              <NormalImg
                src={DiceImg1}
                alt={this.props.valueDice2.toString()}
              />
            ) : null}
            {this.props.valueDice2 === 2 ? (
              <NormalImg
                src={DiceImg2}
                alt={this.props.valueDice2.toString()}
              />
            ) : null}
            {this.props.valueDice2 === 3 ? (
              <NormalImg
                src={DiceImg3}
                alt={this.props.valueDice2.toString()}
              />
            ) : null}
            {this.props.valueDice2 === 4 ? (
              <NormalImg
                src={DiceImg4}
                alt={this.props.valueDice2.toString()}
              />
            ) : null}
            {this.props.valueDice2 === 5 ? (
              <NormalImg
                src={DiceImg5}
                alt={this.props.valueDice2.toString()}
              />
            ) : null}
            {this.props.valueDice2 === 6 ? (
              <NormalImg
                src={DiceImg6}
                alt={this.props.valueDice2.toString()}
              />
            ) : null}
          </div>
          <style jsx>{`
            .dices {
              display: flex;
              padding: 1em;
            }
          `}</style>
        </div>
      </>
    );
  }
}

export default Dices;
