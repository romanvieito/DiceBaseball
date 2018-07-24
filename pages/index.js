import React from "react";
import PropTypes from "prop-types";
import HistoryRender from "../components/HistoryRender";
import Dices from "../components/Dices";
import Bases from "../components/Bases";
import { drawBases } from "../helpers/batting";

class Index extends React.Component {
  state = {
    historyDices: {},
    score: {
      visitor: {
        runs: [],
        hits: 0
      },
      home: {
        runs: [],
        hits: 0
      }
    },
    outs: 0,
    bases: [false, false, false],
    dice1: 1,
    dice2: 1,
    homeBatting: false
  };

  //For every turn at bat (btn click)
  rollDice = event => {
    event.preventDefault();
    const randomNum1 = Math.ceil(Math.random() * 6);
    const randomNum2 = Math.ceil(Math.random() * 6);
    this.addNewDiceNumberToHistory(randomNum1, randomNum2);
    //Update our state object (dice1,dice2)
    let dice1 = this.state.dice1;
    let dice2 = this.state.dice2;
    dice1 = randomNum1;
    dice2 = randomNum2;
    this.setState({ dice1 });
    this.setState({ dice2 });
    //Get just the right dice
    let dicenumber = dice1;
    if (dicenumber > dice2) dicenumber = dice2;
    //Draw Bases
    this.setState({ bases: drawBases(dicenumber, this.state.bases) });
    //Adding Outs
    if (dicenumber === 1) {
      this.addOuts();
    }
    if (dicenumber === 2) {
      this.addOuts();
      //Just double play if outs weren't 2 and there at least one runner on base
      if (this.state.outs !== 0 && this.existRunnerOnBase()) {
        this.addOuts();
      }
    }
  };

  //Find if exist runner on base and delete the more advanced
  existRunnerOnBase = () => {
    const bases = [...this.state.bases];
    //If exist runner get his base
    console.log(bases);
    const moreAdvanceRunner = bases.lastIndexOf(true);
    if (moreAdvanceRunner > 0) {
      //delete more "danger" runner and return true
      bases[moreAdvanceRunner] = false;
      this.setState({ bases });
      return true;
    }
    //Return false if bases are clean
    return false;
  }

  //Keep a history of every turn at bat
  addNewDiceNumberToHistory = (numberDice1, numberDice2) => {
    const historyDices = { ...this.state.historyDices };
    historyDices[`dices${Date.now()}`] = [numberDice1, numberDice2];
    this.setState({ historyDices });
  };

  addOuts = () => {
    let outs = this.state.outs;
    let homeBatting = this.state.homeBatting;
    //If 2 outs switch homeBatting flag and outs = 0
    if (outs === 2) {
      this.setState({ homeBatting: !this.state.homeBatting });
      this.setState({ outs: 0 });
    } else {
      // this.setState({ outs: outs++ });
      this.setState((prevState) => ({
        outs: prevState.outs + 1
      }));
    }
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={this.rollDice}>Roll dices→</button>
        <Dices valueDice1={this.state.dice1} valueDice2={this.state.dice2} />
        <Bases bases={this.state.bases} />
        <ul>
          {Object.keys(this.state.historyDices).map(key => (
            <HistoryRender
              key={key}
              index={key}
              details={{ numbers: this.state.historyDices[key] }}
            />
          ))}
        </ul>
        <style jsx>{``}</style>
      </React.Fragment>
    );
  }
}

export default Index;
