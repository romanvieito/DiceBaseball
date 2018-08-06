import React from 'react';
import HitterList from '../components/HitterList';
import Dices from '../components/Dices';
import ScoreAndBases from '../components/ScoreAndBases';
import ScoreTable from '../components/ScoreTable';
import ErrorBoundary from '../components/ErrorBoundary';
import { drawBases, batDictionary } from '../helpers/batting';
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
    const { runs } = this.state;
    if (runs > prevState.runs) {
      const { innings, isHomeAtBat } = this.state;
      this.addRunsToScore(runs, innings, isHomeAtBat);
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
    const { bases } = this.state;
    // Update our state object (dice1,dice2)
    this.setState({ dice1 });
    this.setState({ dice2 });
    // Get just the right dice
    let dicenumber = dice1;
    if (dicenumber > dice2) dicenumber = dice2;
    // Draw Bases
    this.setState({ bases: drawBases(dicenumber, bases) });
    // Adding dices numbers to history
    this.addNewDiceNumberToHistory(dice1, dice2, dicenumber);
    // Adding Outs and Runs to state
    this.addingOutsAndRuns(dicenumber, bases);
    this.addingHits(dicenumber);
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
      if (innings >= 9 && isHomeAtBat && this.whoIsWinning() === 1) this.state.gameOver = true;
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
  addNewDiceNumberToHistory = (numberDice1, numberDice2, winnerDice) => {
    const { historyDices } = this.state;
    historyDices[`dices${Date.now()}`] = [numberDice1, numberDice2, winnerDice];
    this.setState({ historyDices });
  };

  // If game over return true, else false (just call it when new inning start)
  gameOver = () => {
    const { isHomeAtBat } = this.state;
    if (!isHomeAtBat && this.whoIsWinning() === 1) {
      this.state.gameOver = true;
      // console.log('HC WIN');
      return true;
    }
    if (isHomeAtBat && this.whoIsWinning() === -1) {
      this.state.gameOver = true;
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
    } else this.addTwoOuts();
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
    const lastDices =
      historyDices[Object.keys(historyDices)[Object.keys(historyDices).length - 1]] || [];
    const teamNamesLong = { hc: 'Home Club', vis: 'Visitor' };
    return (
      <React.Fragment>
        <ErrorBoundary>
          <div className="wrapper">
            <header className="header">
              <h4>Simpler Baseball</h4>
              <div>
                At bat <b>{isHomeAtBat ? teamNamesLong.hc : teamNamesLong.vis}</b>.
              </div>
            </header>
            <article className="main">
              <div>
                <ScoreTable {...score} innings={innings} className="white-background" />
              </div>
              <div className="board">
                <span className="hit-label">
                  {!gameOver ? (
                    batDictionary(lastDices[lastDices.length - 1])
                  ) : (
                    <span className="uppercase">
                      {this.whoIsWinning() === 1 ? teamNamesLong.hc : teamNamesLong.vis} win!!!
                    </span>
                  )}
                </span>
              </div>
            </article>

            <aside className="aside visitor">
              <div className="flex-colum hide-mobile white-background">
                <div>
                  <HitterList teamName="Visitor" />
                </div>
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
                  <HitterList teamName="Home Club" />
                </div>
              </div>
              <div className="pt-1">
                <Dices
                  className="pt-3"
                  onClickDices={this.rollDice}
                  valueDice1={dice1}
                  valueDice2={dice2}
                  gameOver={gameOver}
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
            `}
          </style>

          <style jsx>
            {`
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
              .uppercase {
                text-transform: uppercase;
              }
              @media all and (max-width: 390px) {
                .wrapper aside.aside.host {
                  max-width: 20%;
                  padding-left: 2em;
                }
                .wrapper aside.aside.visitor {
                  max-width: 60%;
                }
                .board {
                  height: 12em;
                }
              }
              @media all and (max-width: 450px) {
                .wrapper .aside.host {
                  max-width: 30%;
                }
                .wrapper .aside.visitor {
                  max-width: 50%;
                }
                .board {
                  height: 14em;
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
              }
              @media all and (max-width: 820px) {
                .board {
                  margin-top: 1em;
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
