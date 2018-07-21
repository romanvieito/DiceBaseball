import React from "react";
import PropTypes from "prop-types";
import HistoryRender from "../components/HistoryRender"
class Index extends React.Component {

  state = {
    historyDices: {},
  };

  static propTypes = {
    historyDices: PropTypes.object
  };

  rollDice = event => {
    event.preventDefault();
    const randomNum1 = Math.ceil(Math.random() * 6);
    const randomNum2 = Math.ceil(Math.random() * 6);
    this.addNewDiceNumber(randomNum1, randomNum2);
  }

  addNewDiceNumber = (numberDice1, numberDice2) => {
    const historyDices = { ...this.state.historyDices };
    historyDices[`dices${Date.now()}`] = [numberDice1, numberDice2];
    this.setState({ historyDices });
  };

  render() {
    return (
      <>
        <ul>
          {Object.keys(this.state.historyDices).map(key => (
            <HistoryRender
              key={key}
              index={key}
              details={{ numbers: this.state.historyDices[key] }}
            />
          ))}
        </ul>
        <form className="xxx" onSubmit={this.rollDice}>
          <button type="submit">Roll dices→</button>
        </form>
      </>
    );
  }
}

export default Index;