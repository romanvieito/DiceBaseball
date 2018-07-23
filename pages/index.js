import React from "react";
import PropTypes from "prop-types";
import HistoryRender from "../components/HistoryRender"
import Dices from "../components/Dices"
import Bases from "../components/Bases"

class Index extends React.Component {

  state = {
    historyDices: {},
    dice1: 1,
    dice2: 1,
  };

  static propTypes = {
    historyDices: PropTypes.object
  };

  rollDice = event => {
    event.preventDefault();
    const randomNum1 = Math.ceil(Math.random() * 6);
    const randomNum2 = Math.ceil(Math.random() * 6);
    this.addNewDiceNumber(randomNum1, randomNum2);
    
    
    let dice1 = { ...this.state.dice1 };
    let dice2 = { ...this.state.dice2 };
    dice1 = randomNum1;
    dice2 = randomNum2;
    this.setState({ dice1 });
    this.setState({ dice2 });

  }

  addNewDiceNumber = (numberDice1, numberDice2) => {
    const historyDices = { ...this.state.historyDices };
    historyDices[`dices${Date.now()}`] = [numberDice1, numberDice2];
    this.setState({ historyDices });
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={this.rollDice}>Roll dices→</button>
        <Dices valueDice1={this.state.dice1} valueDice2={this.state.dice2}/>
        <Bases bases={[true, false, true]}/>
        <ul>
          {Object.keys(this.state.historyDices).map(key => (
            <HistoryRender
              key={key}
              index={key}
              details={{ numbers: this.state.historyDices[key] }}
            />
          ))}
        </ul>
        <style jsx>{`
         
        `}</style>
      </React.Fragment>
    );
  }
}

export default Index;