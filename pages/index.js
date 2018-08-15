import React from 'react';
import HitterAnottation from '../components/HittingAnottation';
import Dices from '../components/Dices';
import ScoreAndBases from '../components/ScoreAndBases';
import ScoreTable from '../components/ScoreTable';
import QuestionMarkHelp from '../components/QuestionMarkHelp';
import Board from '../components/Board';
import MaterialTabs from '../components/MaterialTabs';

import ErrorBoundary from '../components/ErrorBoundary';
import { drawBases } from '../helpers/batting';
import basic from '../helpers/theme';

class Index extends React.Component {
  state = {
    historyDices: {},
    score: {
      visitor: {
        runs: [0],
        hitsTotal: 0
      },
      home: {
        runs: [],
        hitsTotal: 0
      }
    },
    outs: 0,
    runs: 0,
    innings: 1,
    bases: [false, false, false],
    dice1: 1,
    dice2: 1,
    gameOver: false,
    isHomeAtBat: false
  };

  componentDidUpdate(prevProps, prevState) {
    const { runs, innings, isHomeAtBat } = this.state;
    if (runs > prevState.runs) {
      this.addRunsToScore(runs, innings, isHomeAtBat);
    }
    if (isHomeAtBat !== prevState.isHomeAtBat) {
      // At the beginning of the inning cpu try to bat
      this.cpuBatting(2000);
    }
  }

  // Initializing state for new inning
  setNewInning = () => {
    const { isHomeAtBat, innings } = this.state;
    const auxIsHomeAtBat = isHomeAtBat;

    if (innings >= 9 && this.gameOver()) return; // Watch out, game over

    this.setState(prevState => ({
      bases: [false, false, false],
      outs: 0,
      runs: 0,
      isHomeAtBat: !prevState.isHomeAtBat
    }));

    if (isHomeAtBat) {
      // If home club batting add 1 inning to state and visitor start with 0 runs
      this.setState(prevState => ({
        innings: prevState.innings + 1
      }));
      this.addRunsToScore(0, innings + 1, !auxIsHomeAtBat);
    } else this.addRunsToScore(0, innings, !auxIsHomeAtBat); // If visitor batting home club start with 0 runs
  };

  // For every turn at bat (btn click)
  // Getting the right dice, setting (draw)bases states and adding outs
  rollDice = () => {
    const dice1 = Math.ceil(Math.random() * 6);
    const dice2 = Math.ceil(Math.random() * 6);
    const { bases, isHomeAtBat, innings } = this.state;
    // Update our state object (dice1,dice2)
    this.setState({ dice1 });
    this.setState({ dice2 });
    // Get just the right dice
    let dicenumber = dice1;
    if (dicenumber > dice2) dicenumber = dice2;
    // Draw Bases
    this.setState({ bases: drawBases(dicenumber, bases) });
    // Adding dices numbers to history
    this.addNewDiceNumberToHistory(dice1, dice2, dicenumber, isHomeAtBat, innings);
    // Adding Outs and Runs to state
    this.addingOutsAndRuns(dicenumber, bases);
    this.addingHits(dicenumber);

    this.cpuBatting(2000);
  };

  // Simulate cpu at bat
  cpuBatting = i => {
    const { isHomeAtBat, gameOver } = this.state;

    if (!isHomeAtBat || gameOver) return;

    setTimeout(() => {
      this.rollDice();
    }, i); // TODO Unmount this timeout
  };

  // Adding hits to the score
  addingHits = diceNumber => {
    if (diceNumber < 3) return;
    const { isHomeAtBat, innings } = this.state;
    const { score } = this.state;

    if (isHomeAtBat) {
      score.home.hitsTotal += 1;
    } else score.visitor.hitsTotal += 1;

    this.setState({ score }, () => {
      // Checking if visitor lose being on the field
      if (innings >= 9 && isHomeAtBat && this.whoIsWinning() === 1)
        this.setState({ gameOver: true });
    });
  };

  // Add runs to score or outs (states)
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
      case 4: {
        const runs2B = bases.reduce((n, value, i) => {
          if (i > 0) {
            return n + (value === true);
          }
          return 0;
        }, 0);
        this.setState(prevState => ({
          runs: prevState.runs + runs2B
        }));
        break;
      }
      case 5: {
        const runs3B = bases.reduce((n, value) => n + (value === true), 0);
        this.setState(prevState => ({
          runs: prevState.runs + runs3B
        }));
        break;
      }
      case 6: {
        const runsHR = bases.reduce((n, value) => n + (value === true), 0);
        this.setState(prevState => ({
          runs: prevState.runs + runsHR + 1
        }));
        break;
      }
      default:
        break;
    }
  };

  // Find if exist runner on base and delete the more advanced
  existRunnerOnBase = () => {
    // Return false if bases are clean
    const { bases } = this.state;
    if (bases.lastIndexOf(true) === -1) return false;
    return true;
  };

  // Delete more advance runner from bases
  deleteAdvanceRunner = () => {
    if (!this.existRunnerOnBase) return false;

    const { bases } = this.state;
    // If exist runner get his base
    const moreAdvanceRunner = bases.lastIndexOf(true);
    // delete more "danger" runner and return true (set to false pos in array)
    bases[moreAdvanceRunner] = false;
    this.setState({ bases });
    return true;
  };

  // Keep a history of every turn at bat
  addNewDiceNumberToHistory = (numberDice1, numberDice2, winnerDice, pIsHomeBatting, inning) => {
    const { historyDices } = this.state;
    historyDices[`dices${Date.now()}`] = [
      numberDice1,
      numberDice2,
      winnerDice,
      pIsHomeBatting,
      inning
    ];
    this.setState({ historyDices });
  };

  // If game over return true, else false (just call it when new inning start)
  gameOver = () => {
    const { isHomeAtBat } = this.state;
    if (!isHomeAtBat && this.whoIsWinning() === 1) {
      this.setState({ gameOver: true });
      // console.log('HC WIN');
      return true;
    }
    if (isHomeAtBat && this.whoIsWinning() === -1) {
      this.setState({ gameOver: true });
      // console.log('VISITOR WIN');
      return true;
    }
    return false;
  };

  // Return 1 if home club is winning, -1 if losing and 0 if score tied
  whoIsWinning = () => {
    const { score } = this.state;

    /* eslint-disable no-param-reassign */
    const homeTotalRuns = score.home.runs.reduce((total, item) => (total += item), 0);
    const visitorTotalRuns = score.visitor.runs.reduce((total, item) => (total += item), 0);
    /* eslint-disable no-param-reassign */

    if (homeTotalRuns > visitorTotalRuns) return 1;
    if (visitorTotalRuns > homeTotalRuns) return -1;
    return 0;
  };

  // Update runs score state
  addRunsToScore = (runs, inning, isHomeAtBat) => {
    const { score } = this.state;
    const inningAux = inning - 1;
    if (isHomeAtBat) {
      score.home.runs[inningAux] = runs;
    } else score.visitor.runs[inningAux] = runs;
    this.setState({ score });
  };

  // Add one out to state
  addOneOuts = () => {
    const { outs } = this.state;
    // If 2 outs switch isHomeAtBat flag, clean bases, and outs = 0
    if (outs === 2) {
      this.setNewInning();
    } else {
      this.setState(prevState => ({
        outs: prevState.outs + 1
      }));
    }
  };

  // Add two out to state
  addTwoOuts = () => {
    if (!this.existRunnerOnBase()) return;

    const { outs } = this.state;
    // If 1 or 2 outs switch isHomeAtBat flag, clean bases, and outs = 0
    if (outs === 2 || outs === 1) {
      this.setNewInning();
    } else {
      this.deleteAdvanceRunner();
      this.setState(() => ({
        outs: 2
      }));
    }
  };

  // Execute when dice number is 2, add (1,2) outs
  showUpNumber2 = () => {
    if (!this.existRunnerOnBase()) {
      this.addOneOuts();
    } else {
      this.addTwoOuts();
    }
  };

  render() {
    const {
      isHomeAtBat,
      score,
      historyDices,
      bases,
      outs,
      innings,
      gameOver,
      dice1,
      dice2
    } = this.state;

    const teamNamesLong = { hc: 'Home Club', vis: 'Visitor' };
    const lastDice =
      historyDices[Object.keys(historyDices)[Object.keys(historyDices).length - 1]] || [];
    const lastKeyHistoryDice =
      Object.keys(historyDices)[Object.keys(historyDices).length - 1] || '';
    return (
      <React.Fragment>
        <ErrorBoundary>
          <div className="wrapper">
            <header className="header">
              <h4 className="my-05">Simpler Baseball</h4>
              <div>
                At bat <b>{isHomeAtBat ? teamNamesLong.hc : teamNamesLong.vis}</b>.
              </div>
            </header>
            <article className="main">
              <div className="hide-desktop">
                <MaterialTabs
                  {...{ score, historyDices, outs, innings, gameOver, isHomeAtBat }}
                  teamNames={teamNamesLong}
                />
              </div>
              <div className="hide-mobile">
                <ScoreTable {...score} innings={innings} className="white-background" />
                <Board
                  teamNames={teamNamesLong}
                  gameOver={gameOver}
                  dice={lastDice[2]}
                  outs={outs}
                  whoIsWinning={this.whoIsWinning}
                />
              </div>
            </article>
            <aside className="aside visitor">
              <div className="flex-colum hide-mobile white-background">
                <HitterAnottation
                  teamName={teamNamesLong.vis}
                  lastKeyHistoryDice={lastKeyHistoryDice}
                  dice={lastDice[2]}
                  isHomeAtBat={isHomeAtBat}
                />
              </div>
              <div className="pt-1">
                <ScoreAndBases
                  className="white-background"
                  bases={bases}
                  isHomeAtBat={isHomeAtBat}
                  outs={outs}
                  innings={innings}
                  {...score}
                />
              </div>
            </aside>
            <aside className="aside host">
              <div className="flex-colum hide-mobile white-background">
                <div>
                  <HitterAnottation
                    teamName={teamNamesLong.hc}
                    lastKeyHistoryDice={lastKeyHistoryDice}
                    dice={lastDice[2]}
                    isHomeAtBat={isHomeAtBat}
                  />
                </div>
              </div>
              <div>
                <QuestionMarkHelp />
                <Dices
                  className="pt-1"
                  onClickDices={this.rollDice}
                  valueDice1={dice1}
                  valueDice2={dice2}
                  isHomeAtBat={isHomeAtBat}
                  gameOver={gameOver}
                />
              </div>
            </aside>
            <footer className="footer" />
          </div>

          <style jsx global>
            {`
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
              .pt-1 {
                padding-top: 1em;
              }
              .mt-1 {
                margin-top: 1em;
              }
              .justify-content-end {
                justify-content: flex-end;
              }
              .uppercase {
                text-transform: uppercase;
              }
            `}
          </style>

          <style jsx>
            {`
              .my-05 {
                margin-top: 0.5em;
                margin-bottom: 0.5em;
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
              .hide-mobile {
                display: none;
              }
              .text-center {
                text-align: center;
              }
              @media all and (max-width: 390px) {
                .wrapper aside.aside.host {
                  max-width: 25%;
                  padding-left: 2em;
                }
                .wrapper aside.aside.visitor {
                  max-width: 60%;
                }
              }
              @media all and (max-width: 450px) {
                .wrapper .aside.host {
                  max-width: 30%;
                }
                .wrapper .aside.visitor {
                  max-width: 50%;
                }
              }
              @media all and (max-width: 600px) {
                .wrapper .aside.host {
                  max-width: 25%;
                  padding-left: 3em;
                }
                .aside.visitor {
                  max-width: 45%;
                }
                .wrapper > * {
                  padding: 1px;
                }
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
                .hide-desktop {
                  display: none;
                }
                .main > .hide-mobile {
                  display: initial;
                }
              }
              @media all and (min-width: 820px) {
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
              @media all and (min-width: 1000px) {
                .wrapper {
                  padding: 0 3%;
                }
              }
            `}
          </style>
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}

export default Index;
