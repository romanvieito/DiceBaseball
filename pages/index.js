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
    runs: 0,
    bases: [false, false, false],
    dice1: 1,
    dice2: 1,
    isHomeAtBat: false
  };

  //For every turn at bat (btn click)
  //Getting the right dice, setting (draw)bases states and adding outs
  rollDice = () => {
    const dice1 = Math.ceil(Math.random() * 6);
    const dice2 = Math.ceil(Math.random() * 6);
    const bases = this.state.bases;
    //Update our state object (dice1,dice2)
    this.setState({ dice1 });
    this.setState({ dice2 });
    //Get just the right dice
    let dicenumber = dice1;
    if (dicenumber > dice2) dicenumber = dice2;
    //Draw Bases
    this.setState({ bases: drawBases(dicenumber, bases) });
    //Adding dices numbers to history
    this.addNewDiceNumberToHistory(dice1, dice2);
    //Adding Outs and Runs to state
    this.addingOutsAndRuns(dicenumber, bases);
  };

  //Add runs to score or outs (states)
  addingOutsAndRuns = (dicenumber, bases) => {
    switch (dicenumber) {
      case 1:
        this.addOneOuts();
        break;
      case 2:
        this.showUpNumber2();
        break;
      case 3:
        if (bases[2] === true) {
          this.setState(prevState => ({
            runs: prevState.runs + 1
          }));
        }
        break;
      case 4:
        let runs2B = bases.reduce((n, value, i) => {
          if (i > 0) {
            return n + (value === true);
          }
          return 0;
        }, 0);
        this.setState(prevState => ({
          runs: prevState.runs + runs2B
        }));
        break;
      case 5:
        const runs3B = bases.reduce((n, value) => {
          return n + (value === true);
        }, 0);
        this.setState(prevState => ({
          runs: prevState.runs + runs3B
        }));
        break;
      case 6:
        const runsHR = bases.reduce((n, value) => {
          return n + (value === true);
        }, 0);
        this.setState(prevState => ({
          runs: prevState.runs + runsHR + 1
        }));
        break;
      default:
        break;
    }
  };

  //Find if exist runner on base and delete the more advanced
  existRunnerOnBase = () => {
    //Return false if bases are clean
    if (this.state.bases.lastIndexOf(true) === -1) return false;

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
    const { runs, isHomeAtBat } = this.state;
    this.addRunsToScore(runs, isHomeAtBat);

    this.setState({ bases: [false, false, false] });
    this.setState({ outs: 0 });
    this.setState({ runs: 0 });
    this.setState({ isHomeAtBat: !this.state.isHomeAtBat });
  };

  addRunsToScore = (runs, isHomeAtBat) => {
    let score = { ...this.state.score };
    if (isHomeAtBat) {
      score.home.runs.push(runs);
    } else
      score.visitor.runs.push(runs);
    this.setState({ score });
  }

  //Add one out to state
  addOneOuts = () => {
    let outs = this.state.outs;
    //If 2 outs switch isHomeAtBat flag, clean bases, and outs = 0
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
    //If 1 or 2 outs switch isHomeAtBat flag, clean bases, and outs = 0
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
    const isHomeAtBat = this.state.isHomeAtBat;
    return (
      <React.Fragment>
        <div>
          At bat <b>{isHomeAtBat ? "HomeClub" : "Visitor"}</b>.
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
