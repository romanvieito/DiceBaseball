import React from "react";
import HitterList from "../components/HitterList";
import Dices from "../components/Dices";
import ScoreAndBases from "../components/ScoreAndBases";
import ScoreTable from "../components/ScoreTable";
import { drawBases, batDictionary } from "../helpers/batting";
import basic from "../helpers/theme";

class Index extends React.Component {
  state = {
    historyDices: {},
    score: {
      visitor: {
        runs: [],
        hitsTotal: 0
      },
      home: {
        runs: [],
        hitsTotal: 0
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
    this.addNewDiceNumberToHistory(dice1, dice2, dicenumber);
    //Adding Outs and Runs to state
    this.addingOutsAndRuns(dicenumber, bases);
    this.addingHits(dicenumber);
  };

  //Adding hits to the score
  addingHits = diceNumber => {
    if (diceNumber < 3) return;
    const isHomeAtBat = this.state.isHomeAtBat;
    let score = { ...this.state.score };

    if (isHomeAtBat) {
      score.home.hitsTotal++;
    } else score.visitor.hitsTotal++;

    this.setState({ score });
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
  addNewDiceNumberToHistory = (numberDice1, numberDice2, winnerDice) => {
    const historyDices = { ...this.state.historyDices };
    historyDices[`dices${Date.now()}`] = [numberDice1, numberDice2, winnerDice];
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

  //Update score state at the end of the inning
  addRunsToScore = (runs, isHomeAtBat) => {
    let score = { ...this.state.score };
    if (isHomeAtBat) {
      score.home.runs.push(runs);
    } else score.visitor.runs.push(runs);
    this.setState({ score });
  };

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
    const { isHomeAtBat, score, historyDices, bases, outs } = this.state;
    const lastDices =
      historyDices[
        Object.keys(historyDices)[Object.keys(historyDices).length - 1]
      ] || [];
    return (
      <React.Fragment>
        <div className="wrapper">
          <header className="header">
            <h4>BaseDice</h4>
            <div>
              At bat <b>{isHomeAtBat ? "Home Club" : "Visitor"}</b>.
            </div>
          </header>
          <article className="main">
            <div className="board">
              <span className="hit-label">
                {batDictionary(lastDices[lastDices.length - 1])}
              </span>
            </div>
            <div className="white-background">
              <ScoreTable {...score} />
            </div>
          </article>

          <aside className="aside visitor">
            <div className="flex-colum hide-mobile white-background">
              <div>Visitor</div>
              <div className="">
                <HitterList />
              </div>
            </div>
            <div className="pt-1">
              <ScoreAndBases
                className="white-background"
                bases={bases}
                isHomeAtBat={isHomeAtBat}
                outs={outs}
                {...score}
              />
            </div>
          </aside>
          <aside className="aside host">
            <div className="flex-colum hide-mobile white-background">
              <div>Home Club</div>
              <div className="">
                <HitterList />
              </div>
            </div>
            <div
              className="pt-1"
              onClick={this.rollDice}
              style={{ cursor: "pointer" }}
            >
              <Dices
                className="pt-3"
                valueDice1={this.state.dice1}
                valueDice2={this.state.dice2}
              />
            </div>
          </aside>
          <footer className="footer">
            {/* <ul style={{ maxWidth: "10%" }}>
              {Object.keys(historyDices).map(key => (
                <HistoryRender
                  key={key}
                  index={key}
                  details={{ numbers: historyDices[key] }}
                />
              ))}
            </ul> */}
          </footer>
        </div>

        <style jsx global>{`
          .flex {
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
          }
          body {
            font: ${basic.font};
          }
          .box-shadow {
            box-shadow: 0px 1px 1px #888888;
          }
          .white-background {
            background-color: white;
          }
          .pt-3 {
            padding-top: 3em;
          }
        `}</style>

        <style jsx>{`
          .pt-1 {
            padding-top: 1em;
          }
          .flex-colum {
            display: flex;
            justify-content: center;
            flex-direction: column;
          }
          .wrapper {
            display: flex;
            flex-flow: row wrap;
            text-align: center;
            background-color: #e4e4e4;
          }
          .visitor {
            text-align: center;
          }
          .wrapper > * {
            padding: 10px;
            flex: 1 100%;
          }
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
          .hide-mobile {
            display: none;
          }
          .text-center {
            text-align: center;
          }
          @media all and (min-width: 600px) {
            .aside {
              flex: 1 auto !important;
            }
            .flex-colum.hide-mobile {
              display: flex;
              justify-content: center;
              flex-direction: column;
            }
          }
          @media all and (min-width: 800px) {
            .main {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
          
              flex: 3 0px !important;
            }
            .visitor {
              order: 1 !important;
            }
            .main {
              order: 2 !important;
            }
            .host {
              order: 3 !important;
            }
            .footer {
              order: 4 !important;
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default Index;
