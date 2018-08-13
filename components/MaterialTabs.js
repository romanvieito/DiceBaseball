import React from 'react';
import propTypes from 'prop-types';
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';
import ScoreTable from './ScoreTable';
import Board from './Board';
import HitterAnottation from './HittingAnottation';

class MaterialTabs extends React.Component {
  static propTypes = {
    score: propTypes.object,
    historyDices: propTypes.object,
    outs: propTypes.number,
    innings: propTypes.number,
    gameOver: propTypes.bool,
    isHomeAtBat: propTypes.bool,
    teamNames: propTypes.object
  };

  render() {
    const { score, historyDices, outs, innings, gameOver, teamNames, isHomeAtBat } = this.props;
    const lastDice =
      historyDices[Object.keys(historyDices)[Object.keys(historyDices).length - 1]] || [];
    const lastKeyHistoryDice =
      Object.keys(historyDices)[Object.keys(historyDices).length - 1] || '';

    return (
      <React.Fragment>
        <link href="//cdn.muicss.com/mui-0.9.39/css/mui.min.css" rel="stylesheet" type="text/css" />
        <Tabs justified>
          <Tab value="pane-1" label="Main">
            <ScoreTable {...score} innings={innings} className="white-background" />
            <Board
              teamNames={teamNames}
              gameOver={gameOver}
              dice={lastDice[2]}
              outs={outs}
              whoIsWinning={this.whoIsWinning}
            />
          </Tab>
          <Tab value="pane-2" label="Box Score">
            <Tabs justified>
              <Tab value="pane-1" label={teamNames.vis}>
                <div className="white-background">
                  <HitterAnottation
                    teamName={teamNames.vis}
                    lastKeyHistoryDice={lastKeyHistoryDice}
                    dice={lastDice[2]}
                    isHomeAtBat={isHomeAtBat}
                  />
                </div>
              </Tab>
              <Tab value="pane-2" label={teamNames.hc}>
                <div className="white-background">
                  <HitterAnottation
                    teamName={teamNames.hc}
                    lastKeyHistoryDice={lastKeyHistoryDice}
                    dice={lastDice[2]}
                    isHomeAtBat={isHomeAtBat}
                  />
                </div>
              </Tab>
            </Tabs>
          </Tab>
          <Tab value="pane-3" label="History">
            Pane-2
          </Tab>
        </Tabs>

        <style jsx>
          {`
            @media all and (min-width: 1150px) {
              .data {
                left: 20%;
              }
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default MaterialTabs;
