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
      this.addOneOuts();
    }
    if (dicenumber === 2) {
      this.showUpNumber2();
    }
  };

  //Find if exist runner on base and delete the more advanced
  existRunnerOnBase = () => {
    const bases = [...this.state.bases];
    //Return false if bases are clean
    if (bases.lastIndexOf(true) === -1) return false;

    return true;
  };

  //Delete more advance runner from bases
  deleteAdvanceRunner = () => {
    if (!this.existRunnerOnBase) return false;

    const bases = [...this.state.bases];
    //If exist runner get his base
    const moreAdvanceRunner = bases.lastIndexOf(true);
    //delete more "danger" runner and return true (set to false pos in array)
    bases[moreAdvanceRunner] = false;
    this.setState({ bases });
  };

  //Keep a history of every turn at bat
  addNewDiceNumberToHistory = (numberDice1, numberDice2) => {
    const historyDices = { ...this.state.historyDices };
    historyDices[`dices${Date.now()}`] = [numberDice1, numberDice2];
    this.setState({ historyDices });
  };

  //Initializing state for new inning
  setNewInning = () => {
    this.setState({ bases: [false, false, false] });
    this.setState({ outs: 0 });
    this.setState({ homeBatting: !this.state.homeBatting });
  };

  //Add one out to state
  addOneOuts = () => {
    let outs = this.state.outs;
    //If 2 outs switch homeBatting flag, clean bases, and outs = 0
    if (outs === 2) {
      this.setNewInning();
    } else {
      this.setState(prevState => ({
        outs: prevState.outs + 1
      }));
    }
  };

  //Add two out to state
  addTwoOuts = () => {
    if (!this.existRunnerOnBase()) return;

    let outs = this.state.outs;
    //If 1 or 2 outs switch homeBatting flag, clean bases, and outs = 0
    if (outs === 2 || outs === 1) {
      this.setNewInning();
    } else {
      this.deleteAdvanceRunner();
      this.setState(() => ({
        outs: 2
      }));
    }
  };

  //Execute when dice number is 2, add (1,2) outs
  showUpNumber2 = () => {
    if (!this.existRunnerOnBase()) {
      this.addOneOuts();
    } else this.addTwoOuts();
  };

  render() {
    const homeBatting = this.state.homeBatting;
    return (
      <React.Fragment>
        <div>
          At bat <b>{homeBatting ? "HC" : "Visitor"}</b>.
        </div>
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
